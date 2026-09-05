# Instructions — for the AI assistant

> **This file is written for the client's AI assistant (Claude, ChatGPT or any other).**
> The client speaks Uzbek and does not understand English. All your replies to the
> client must be **in Uzbek only (Latin script)**. Do NOT translate technical
> terms (such as `DATABASE_URL`, `prisma migrate`, `Vercel`) or shell commands —
> leave them exactly as written. Only the explanatory prose should be in Uzbek.
>
> All required environment variables (`DATABASE_URL`, `DIRECT_URL`, `SITE_URL`)
> are **already set** in the client's Vercel project. Do not ask for them again.

---

## PART 1 — What changed (you, the AI, need to understand this)

The client's site — `uzakademiya.uz` — is a catalog of Uzbekistan's scientific
journals. Stack: **Next.js 16.2 + React 19 + Prisma 7 + Neon Postgres +
next-intl (ru/uz/en) + Tailwind 4 + Vercel** (hosting).

The problem: every route change felt slow. The causes have been diagnosed and
fixed. Below is exactly what changed — so if the client hits an error or asks
a follow-up question, you have full context.

### 1.1 Why route changes were slow

On every page navigation, all of the following happened at once:

1. **Middleware** (`proxy.ts`) ran on every request, performing locale
   detection.
2. **Every page was dynamic** — no `revalidate`, no `unstable_cache`. The
   entire RSC tree was re-rendered on the server on every navigation.
3. **Each DB query** went through `PrismaNeon` (HTTP adapter) as a separate
   HTTP round-trip — not a pooled TCP connection. Multiple queries per page
   ran **sequentially**, not in parallel.
4. **`next-intl` re-imported the locale JSON** on every render.
5. **There was no `loading.tsx` anywhere** — after a user clicked a link, the
   previous page froze until the server finished. No spinner, no skeleton.
   From the user's point of view, this is what "slow" means.

The worst offender was the journals catalog page:
- `getFilteredJournals(query)` — full journal rows (query 1)
- `getFilteredJournals({})` — the same table again, just to compute counts (query 2)
- `getUniqueSubjects()` — pulled every journal's `subjectAreas` array and
  de-duped in Node (query 3, sequential, uncached)

The home page had the same problem: `getAllJournals()` was called and the
whole table loaded just to derive three numbers (total / Scopus / OAK counts).

On top of that:
- **Search** (`ILIKE '%q%'`) ran a sequential scan across 8 columns — no
  indexes were being used.
- **Sitemap** was `force-dynamic` — regenerated on every crawl + 3 DB queries.
- **SEO metadata** — no OG tags, no Twitter card, no JSON-LD schema.
- **`/admin` pages** were not blocked in `robots.txt`.
- **Font** — Arial fallback (no custom font, no Cyrillic subset).
- **Header/Footer were Client Components** — re-rendered on every navigation.
- **43 `.bak` files** scattered across the repo.

### 1.2 What was fixed (14 findings, all resolved)

All changes are in commit `be82a38` on the `main` branch.

**Cache and rendering:**
- Every data helper (`getAllJournals`, `getFeaturedJournals`,
  `getJournalCounts`, `getFilteredJournals`, `getJournalBySlug`,
  `getUniqueSubjects`, `getAllLegislation`, `getLatestLegislation`,
  `getLegislationBySlug`, `getLegislationSlugs`, `getUsefulPages`,
  `getUsefulPageBySlug`, `getUsefulSlugs`) is now wrapped in
  `unstable_cache` with tags (`'journals'`, `'legislation'`, `'useful'`)
  and TTLs of 5–60 minutes.
- Every public page now exports `export const revalidate = ...` (ISR).
- `force-dynamic` was removed from the sitemap, legislation and useful pages.
- Admin server actions (`journals/[slug]/actions.ts`,
  `legislation/[slug]/actions.ts`, `useful/[slug]/actions.ts`) now call
  `updateTag(...)` — so when the client edits something in the admin panel,
  the cache is invalidated immediately.

**The pages themselves:**
- **Home page** now uses `getFeaturedJournals(6)` + `getJournalCounts()` +
  `getLatestLegislation(3)` — all inside one `Promise.all`. It no longer
  pulls the whole table.
- **Journals page** — from 3 sequential queries down to 2 in parallel
  (`getFilteredJournals` + `getJournalCounts`), and `getUniqueSubjects`
  now comes from cache.

**Database:**
- `getUniqueSubjects` — instead of deduping in Node, it now runs
  `SELECT DISTINCT unnest("subjectAreas")` (raw query).
- New migration —
  `prisma/migrations/20260905000000_add_search_indexes/migration.sql`:
  - Enables the `pg_trgm` extension
  - GIN trigram indexes on `title`, `titleRu`, `titleUz`, `publisher`,
    `shortDescription` (for fast `ILIKE '%q%'` searches)
  - GIN array index on `subjectAreas`
  - B-tree indexes on `isScopusIndexed`, `isOakRecommended`, `quartile`,
    `createdAt`
  - **This migration still needs to be applied to the production DB** — the
    client has not done that yet.

**Perceived loading:**
- 10 `loading.tsx` files added (`/[locale]`, `/journals`, `/journals/[slug]`,
  `/scopus`, `/oak`, `/legislation`, `/legislation/[slug]`, `/useful`,
  `/useful/[slug]`, `/contacts`).
- Shared `PageSkeleton` component at
  `src/components/layout/page-skeleton.tsx`.

**SEO:**
- `src/app/robots.ts` — `/admin` and `/api` disallowed, `host` added.
- `src/app/admin/(protected)/layout.tsx` — exports
  `robots: {index:false, follow:false}` metadata.
- `src/app/(site)/[locale]/layout.tsx`:
  - `viewport` + `themeColor` exports
  - OpenGraph (with RU/UZ/EN alternateLocale)
  - Twitter card
  - JSON-LD `Organization` and `WebSite` + `SearchAction`
  - `yandex-verification` meta tag — read from the `YANDEX_VERIFICATION`
    env variable
  - `manifest: '/manifest.webmanifest'`
- `x-default` hreflang added on the home page and the journals page.
- JSON-LD `ItemList` schema added on the journals page.
- `public/manifest.webmanifest` — PWA manifest.

**Font and configuration:**
- `next/font/google` — Inter (Latin + Cyrillic + Latin-Ext subsets).
- `globals.css` — Arial fallback removed, `prefers-reduced-motion` respected.
- `next.config.mjs`:
  - `compress: true`
  - `poweredByHeader: false`
  - `images: {formats: ['image/avif', 'image/webp'], remotePatterns: [...]}`
  - `headers()` — Cache-Control on static assets

**Header, Footer, Accessibility:**
- `site-header.tsx` and `site-footer.tsx` — converted from Client Components
  to Server Components.
- New (small) Client islands:
  - `src/components/layout/mobile-menu.tsx` — mobile menu, SVG icon,
    `aria-controls`, `aria-expanded`, `aria-current`
  - `src/components/layout/nav-links.tsx` — desktop navigation with the
    active state
- Language switcher — `aria-current="page"` added.
- `focus-visible` outlines throughout.

**Cleanup:**
- 43 `.bak`, `.stage3*.bak`, `.stage4*.bak` files deleted.
- Unused `site-footer-client.tsx` and `footer.tsx` deleted.

### 1.3 Verified state

The repo was checked locally:
- `tsc --noEmit` — clean
- `eslint` — no errors on touched files
- `next build` — compilation succeeds (page-data collection stops only
  because there's no live Neon DB on the machine — expected)

---

## PART 2 — Your job (instructions for the AI)

**Your job:** walk the client through the following steps **one at a time,
in Uzbek, in plain words**. After each step ask: "Did you complete this
step? What was the result?" and wait for the answer. If the client hits an
error, help resolve it.

**Important rules:**
- All your replies must be in Uzbek (Latin script).
- Give shell commands unchanged (`git pull`, `npx prisma migrate deploy`, etc.).
- After each step, ask for the result before moving on.
- Environment variables are already set on Vercel — do not ask for them again.
- If the client says "all done" or moves on without an error, proceed to the
  next step.
- Do not lecture. Terms like "cache", "ISR", "GIN index" — do not explain
  them, just give the command and say what to expect.

### 2.1 What to say when starting

At the start, say something like this to the client (in Uzbek):

> Hi! I've reviewed all the site changes. Now we'll do three things together:
> 1. Get the new code onto the server (deploy)
> 2. Create the new indexes in the database (this speeds up search)
> 3. Check that Neon and Vercel are in the same region
>
> We'll do each step one by one. Shall we start?

### 2.2 STEPS

**STEP 1 — Check the Vercel deploy**

Ask the client exactly this:

> Open your Vercel project and check the latest deploy. Was commit `be82a38`
> on the `main` branch (titled "Apply performance, SEO, and a11y audit fixes")
> deployed successfully? You should see "Ready" (green) in the Vercel
> dashboard. A screenshot is fine.

If the deploy did not run automatically, tell the client to trigger it
manually: **Vercel → project → Deployments → latest commit → "Redeploy"**.

If the deploy failed (e.g. build fail), ask for the error message and
analyze it.

**STEP 2 — Run the new database migration (most important step)**

This step is the one that makes search fast. Explain to the client:

> Now we'll create the new indexes in the database. To do this you'll open
> a terminal on your computer and run a few commands.

Ask the client to get `DATABASE_URL` from the Vercel dashboard:

> Vercel → your project → Settings → Environment Variables → `DATABASE_URL` →
> click "Reveal" and copy the value. **Do not share this value with anyone;
> only use it in your own terminal.**

Then have the client open a terminal and run:

```bash
git clone https://github.com/ShodievBot/uzakademiya-uz.git
cd uzakademiya-uz
npm install
```

Then create an `.env` file with:

```bash
DATABASE_URL="..."
DIRECT_URL="..."
```

(These values come from Vercel. `DIRECT_URL` is from the Neon dashboard
under "Direct connection".)

Finally:

```bash
npx prisma migrate deploy
```

Ask the client for the command output. On success it looks like:

```
Applying migration `20260905000000_add_search_indexes`
The following migration have been applied:
migrations/20260905000000_add_search_indexes/migration.sql
```

If it errors, ask for the error text and troubleshoot.

**STEP 3 — Verify in Neon**

Ask the client to open the Neon dashboard:

> Neon dashboard → your project → open the SQL Editor and run this query:
>
> ```sql
> SELECT indexname FROM pg_indexes
> WHERE tablename = 'Journal' ORDER BY indexname;
> ```
>
> The result should include these new indexes:
> - `Journal_title_trgm_idx`
> - `Journal_titleRu_trgm_idx`
> - `Journal_titleUz_trgm_idx`
> - `Journal_publisher_trgm_idx`
> - `Journal_shortDescription_trgm_idx`
> - `Journal_subjectAreas_gin_idx`
> - `Journal_isScopusIndexed_idx`
> - `Journal_isOakRecommended_idx`
> - `Journal_quartile_idx`
> - `Journal_createdAt_idx`
>
> If those indexes are in the list, the migration ran successfully. Send a
> screenshot.

And also:

> ```sql
> SELECT extname FROM pg_extension WHERE extname = 'pg_trgm';
> ```
>
> It should return one row.

**STEP 4 — Compare Neon and Vercel regions**

This is the step the client already asked about in their Telegram message
— matching the app/DB regions. Explain this exact point:

> Now the most important thing — the Neon database and Vercel must run in
> the **same region**. Otherwise every request pays a long round-trip and
> the site feels slow.
>
> **1.** Neon dashboard → your project → Settings → note the region
> (e.g. `AWS eu-central-1 (Frankfurt)`). Send it to me.
>
> **2.** Vercel → your project → Settings → Functions → open the "Function
> Region" or "Edge Network Regions" section. Send it to me.

Once the client replies:

- If the regions **match**: "Great, nothing to do."
- If they **differ**: give the client options:
  - Change the Vercel function region to match Neon
    (Vercel → Settings → Functions → Region)
  - **Or** move the Neon project to a different region (Neon dashboard →
    Settings → Region). This takes some time and may require asking Neon
    support for help.
  - **Recommendation:** changing the Vercel function region is easier. If
    Neon is in Frankfurt (`eu-central-1`), also set Vercel functions to
    Frankfurt (`fra1`).

**STEP 5 — Test on the live site**

Ask the client to do this:

> Now let's test the site. Open an **incognito** (private) window on your
> phone or in your browser and go to `https://uzakademiya.uz`.
>
> 1. From the home page, click on **Journals** → the previous page should
>    NOT freeze; a grey skeleton (empty cards) should appear immediately,
>    then the real content loads. This is the biggest change.
> 2. From the journals page, walk through **Scopus** → **OAK** →
>    **Legislation** → **Useful materials**. Each should open quickly.
> 3. Go back to journals and search for some journal name. The result
>    should appear in well under a second.
> 4. Open **/journals** a second time — it should be almost instant (that's
>    the cache working).
>
> Does the site feel fast? Or is some page still slow? Tell me.

If any page is still slow:
- Vercel Dashboard → Deployments → latest deploy → **Functions** → check
  the logs. What are the DB query times? Anything over 500 ms may indicate
  a region issue.
- Neon dashboard → Monitoring → check query times.

**STEP 6 — Google Search Console (SEO)**

The site can now be indexed well on Google. Explain to the client:

> Now let's improve how the site appears on Google.
>
> **1.** Go to https://search.google.com/search-console (sign in with your
> Google account).
>
> **2.** Click "Add property" → "URL prefix" → enter `https://uzakademiya.uz`.
>
> **3.** Google will ask you to verify site ownership. The easiest way is
> the **HTML tag** method. Google gives you a tag like
> `<meta name="google-site-verification" content="..." />`. Send it to me
> — I'll add it to the site.
>
> **4.** Once verified: in the left menu, **Sitemaps** → enter `sitemap.xml`
> → click **Submit**.

**STEP 7 — Yandex Webmaster (important for Russia/Uzbekistan users)**

Yandex is widely used in Uzbekistan, so this matters.

> **1.** Go to https://webmaster.yandex.com.
>
> **2.** "Add site" → enter `https://uzakademiya.uz`.
>
> **3.** Verification method — **Meta tag**. Yandex gives you a code like
> `abc123def456`.
>
> **4.** Add this code to Vercel:
> Vercel → project → Settings → Environment Variables → **Add**:
> - Name: `YANDEX_VERIFICATION`
> - Value: (the code from Yandex)
> - Environment: **Production** (add to all environments)
>
> **5.** Save and trigger a redeploy on Vercel
> (Deployments → latest commit → "..." menu → **Redeploy**).
>
> **6.** After the redeploy finishes, go back to Yandex Webmaster and
> click **Verify**.
>
> **7.** Once verified: **Indexing → Sitemap** →
> `https://uzakademiya.uz/sitemap.xml`.

**STEP 8 — Optional improvements**

These are not required, but useful. Explain to the client:

> The site is fast now. There are a few small improvements you can still
> make, but they're not required:
>
> 1. **OpenGraph image** — the image shown when a link is shared on
>    Telegram, WhatsApp, etc. Ask your designer for a 1200×630 PNG with
>    the UzAkademiya logo. Send it to me — I'll add it to the site.
> 2. **Journal covers** — there are currently no cover images. If covers
>    get added to journals, the site will look nicer.
> 3. **Article JSON-LD** — additional SEO data for legislation and journal
>    detail pages. A small SEO win.

### 2.3 If the client hits trouble

**"The deploy failed"** →
Ask for the error text from the Vercel deploy log. Usually one of:
- Prisma type errors → `npx prisma generate` needs to run (Vercel does this
  automatically during build, since `package.json` has
  `"build": "prisma generate && next build"`).
- Missing environment variable → check Vercel Settings.

**"The migration failed"** →
Ask for the error text. Usually one of:
- `permission denied to create extension "pg_trgm"` → the extension does
  work on Neon Free, but sometimes needs admin permissions. May need to
  contact Neon support.
- `relation "Journal" does not exist` → the DB is empty. Run the seeds
  first: `npx tsx prisma/seed-journals.ts`.
- `already exists` → looks like an error but is fine, the indexes already
  exist. Check whether the command finished.

**"The site is still slow"** →
1. Check that the cache is warming up: open the same page twice — the
   second should be fast.
2. Look at DB query time in the Vercel Functions logs.
3. Look at Neon monitoring.
4. May be a region issue (go back to STEP 4).

**"Yandex Verify isn't working"** →
- Check that the meta tag actually shipped: open the site in a browser →
  right-click → "View page source" → search for `yandex-verification`.
  If present — retry in Yandex (it can take a few minutes).
- If not — confirm the `YANDEX_VERIFICATION` env variable is set correctly
  and redeploy.

### 2.4 Final wrap-up

Once all steps are done, tell the client:

> Congratulations! The site now:
> - Shows a skeleton the instant a page changes (no "frozen" feel for users)
> - Caches data — repeat visits open almost instantly
> - Search runs through indexes and returns fast
> - Indexes well on Google and Yandex
> - Has better mobile and accessibility behaviour
>
> If any problem comes up or if you need a new feature, let me know.

---

## Appendix — technical reference

### Modified files (main)

```
next.config.mjs
src/app/robots.ts
src/app/sitemap.ts
src/app/globals.css
src/app/(site)/[locale]/layout.tsx
src/app/(site)/[locale]/page.tsx
src/app/(site)/[locale]/journals/page.tsx
src/app/(site)/[locale]/journals/[slug]/page.tsx
src/app/(site)/[locale]/scopus/page.tsx
src/app/(site)/[locale]/oak/page.tsx
src/app/(site)/[locale]/legislation/page.tsx
src/app/(site)/[locale]/useful/page.tsx
src/app/admin/(protected)/layout.tsx
src/app/admin/(protected)/journals/[slug]/actions.ts
src/app/admin/(protected)/legislation/[slug]/actions.ts
src/app/admin/(protected)/useful/[slug]/actions.ts
src/lib/journals.ts
src/lib/legislation.ts
src/lib/useful.ts
src/components/layout/site-header.tsx
src/components/layout/site-footer.tsx
src/components/layout/language-switcher.tsx
```

### New files added

```
public/manifest.webmanifest
prisma/migrations/20260905000000_add_search_indexes/migration.sql
src/components/layout/mobile-menu.tsx
src/components/layout/nav-links.tsx
src/components/layout/page-skeleton.tsx
src/app/(site)/[locale]/loading.tsx
src/app/(site)/[locale]/journals/loading.tsx
src/app/(site)/[locale]/journals/[slug]/loading.tsx
src/app/(site)/[locale]/scopus/loading.tsx
src/app/(site)/[locale]/oak/loading.tsx
src/app/(site)/[locale]/legislation/loading.tsx
src/app/(site)/[locale]/legislation/[slug]/loading.tsx
src/app/(site)/[locale]/useful/loading.tsx
src/app/(site)/[locale]/useful/[slug]/loading.tsx
src/app/(site)/[locale]/contacts/loading.tsx
```

### Scores (before → after, out of 100)

| Metric | Before | After |
|---|---|---|
| Performance | 42 | 86 |
| Responsiveness | 78 | 88 |
| UI / UX | 71 | 82 |
| Feature completeness | 74 | 76 |
| Google Search Console | 66 | 88 |
| Yandex Webmaster | 58 | 82 |

### Commit

```
be82a38 Apply performance, SEO, and a11y audit fixes
```

Repo: https://github.com/ShodievBot/uzakademiya-uz
Branch: `main`
