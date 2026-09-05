# Ko'rsatmalar — sun'iy intellekt uchun

> **Bu fayl mijozning sun'iy intellekti (Claude, ChatGPT yoki boshqa) uchun yozilgan.**
> Mijoz o'zbek tilida gaplashadi va ingliz tilini tushunmaydi. Barcha javoblaringiz
> **faqat o'zbek tilida (lotin yozuvida)** bo'lsin. Texnik terminlar (masalan
> `DATABASE_URL`, `prisma migrate`, `Vercel`) va buyruqlarni tarjima qilmang —
> ular xuddi shu holicha qoldiring. Faqat tushuntirish matni o'zbekcha bo'lsin.
>
> Mijozning Vercel loyihasida barcha kerakli environment variable'lar
> (`DATABASE_URL`, `DIRECT_URL`, `SITE_URL`) **allaqachon o'rnatilgan**. Ularni
> qayta so'ramang.

---

## 1-QISM — Nima o'zgardi (siz — AI — buni tushunishingiz kerak)

Mijozning sayti — `uzakademiya.uz` — Uzbekistan ilmiy jurnallar katalogi.
Texnologiyalar: **Next.js 16.2 + React 19 + Prisma 7 + Neon Postgres +
next-intl (ru/uz/en) + Tailwind 4 + Vercel** (hosting).

Muammo: har bir sahifa o'zgarganda sayt sekin ochilardi. Sabablari topildi va
tuzatildi. Quyida aynan nima o'zgarganini bilib oling — mijoz sizdan biror
xatolik yoki qo'shimcha savol so'rasa, kontekstga ega bo'lasiz.

### 1.1 Route o'zgarishi nima uchun sekin edi

Har bir sahifa ochilganda bir vaqtning o'zida quyidagilar yuz berardi:

1. **Middleware** (`proxy.ts`) har bir so'rovda ishlab, locale (til)
   aniqlashardi.
2. **Har bir sahifa dinamik** edi — `revalidate` yo'q, `unstable_cache` yo'q.
   Har navigatsiyada butun RSC daraxti server tomonida qayta render qilinardi.
3. **Har bir DB so'rov** `PrismaNeon` (HTTP adapter) orqali alohida HTTP
   round-trip edi — TCP pool emas. Bir sahifada bir necha so'rov
   **ketma-ket** (parallel emas) ishlar edi.
4. **`next-intl` har renderda locale JSON'ni qayta import** qilar edi.
5. **Hech qanday `loading.tsx` yo'q edi** — foydalanuvchi havolani bosgach,
   server ish tugaguncha eski sahifa muzlab turar edi. Hech qanday spinner
   yoki skeleton yo'q edi. Bu — foydalanuvchi ko'zi bilan "sekin" degani.

Eng yomon joy — jurnallar katalog sahifasi:
- `getFilteredJournals(query)` — jurnallar to'liq ma'lumot bilan (1-so'rov)
- `getFilteredJournals({})` — xuddi shu jadval yana, faqat count'lar uchun (2-so'rov)
- `getUniqueSubjects()` — har jurnalning `subjectAreas` massivini tortib,
  Node'da dedupe qilar edi (3-so'rov, sekvensial, cache'siz)

Bosh sahifada ham xuddi shunday muammo: `getAllJournals()` chaqirilib, faqat
3 ta son (jami/Scopus/OAK) uchun butun jadval yuklanardi.

Va yana:
- **Qidiruv** (`ILIKE '%q%'`) 8 ta ustunda sequential scan qilardi — indeks
  ishlatilmasdi.
- **Sitemap** `force-dynamic` — har crawl'da qayta generatsiya + 3 DB so'rov.
- **SEO metadata** — OG teglar, Twitter card, JSON-LD schema yo'q edi.
- **`/admin` sahifalari** `robots.txt`'da bloklanmagandi.
- **Font** — Arial fallback (custom font yo'q, Cyrillic subset yo'q).
- **Header/Footer Client Component** — har navigatsiyada re-render.
- **43 ta `.bak` fayl** repo bo'ylab sochilib yotardi.

### 1.2 Nima tuzatildi (14 ta muammo, hammasi hal qilindi)

Barcha o'zgarishlar `be82a38` commit'ida `main` shoxida.

**Cache va rendering:**
- Har bir data helper (`getAllJournals`, `getFeaturedJournals`,
  `getJournalCounts`, `getFilteredJournals`, `getJournalBySlug`,
  `getUniqueSubjects`, `getAllLegislation`, `getLatestLegislation`,
  `getLegislationBySlug`, `getLegislationSlugs`, `getUsefulPages`,
  `getUsefulPageBySlug`, `getUsefulSlugs`) — `unstable_cache` bilan
  o'ralgan, tag'lar bilan (`'journals'`, `'legislation'`, `'useful'`),
  TTL 5-60 daqiqa.
- Har bir public sahifa `export const revalidate = ...` qo'shilgan (ISR).
- `force-dynamic` — sitemap, legislation va useful sahifalaridan olib
  tashlangan.
- Admin action'lar (`journals/[slug]/actions.ts`,
  `legislation/[slug]/actions.ts`, `useful/[slug]/actions.ts`) endi
  `updateTag(...)` chaqiradi — mijoz admin panelda o'zgartirsa, cache
  darhol yangilanadi.

**Sahifalarning o'zi:**
- **Bosh sahifa** endi `getFeaturedJournals(6)` + `getJournalCounts()` +
  `getLatestLegislation(3)` — hammasi `Promise.all` ichida. Butun
  jadvalni tortmaydi.
- **Jurnallar sahifasi** — 3 sekvensial so'rov o'rniga 2 ta parallel
  (`getFilteredJournals` + `getJournalCounts`), `getUniqueSubjects` esa
  cache'dan keladi.

**Ma'lumotlar bazasi:**
- `getUniqueSubjects` — Node'da dedupe o'rniga
  `SELECT DISTINCT unnest("subjectAreas")` (raw query).
- Yangi migratsiya —
  `prisma/migrations/20260905000000_add_search_indexes/migration.sql`:
  - `pg_trgm` extension yoqiladi
  - `title`, `titleRu`, `titleUz`, `publisher`, `shortDescription` —
    GIN trigram indexlari (`ILIKE '%q%'` uchun tez qidiruv)
  - `subjectAreas` — GIN array index
  - `isScopusIndexed`, `isOakRecommended`, `quartile`, `createdAt` —
    b-tree indexlar
  - **Bu migratsiya ishlab chiqarish DB'siga qo'llanishi kerak** — mijoz
    buni hali qilmagan.

**Ko'rish (loading):**
- 10 ta `loading.tsx` fayli qo'shildi (`/[locale]`, `/journals`,
  `/journals/[slug]`, `/scopus`, `/oak`, `/legislation`,
  `/legislation/[slug]`, `/useful`, `/useful/[slug]`, `/contacts`).
- Umumiy `PageSkeleton` komponenti —
  `src/components/layout/page-skeleton.tsx`.

**SEO:**
- `src/app/robots.ts` — `/admin` va `/api` bloklandi, `host` qo'shildi.
- `src/app/admin/(protected)/layout.tsx` — `robots: {index:false,
  follow:false}` metadata eksporti.
- `src/app/(site)/[locale]/layout.tsx`:
  - `viewport` + `themeColor` eksporti
  - OpenGraph (RU/UZ/EN alternateLocale bilan)
  - Twitter card
  - JSON-LD `Organization` va `WebSite` + `SearchAction`
  - `yandex-verification` meta tag — `YANDEX_VERIFICATION` env
    o'zgaruvchisidan olinadi
  - `manifest: '/manifest.webmanifest'`
- Bosh sahifa va jurnallar sahifasida `x-default` hreflang qo'shildi.
- Jurnallar sahifasida JSON-LD `ItemList` schema qo'shildi.
- `public/manifest.webmanifest` — PWA uchun.

**Font va konfiguratsiya:**
- `next/font/google` — Inter (Latin + Cyrillic + Latin-Ext subsetlar).
- `globals.css` — Arial fallback olib tashlandi, `prefers-reduced-motion`
  hurmatga olindi.
- `next.config.mjs`:
  - `compress: true`
  - `poweredByHeader: false`
  - `images: {formats: ['image/avif', 'image/webp'], remotePatterns: [...]}`
  - `headers()` — statik asset'larga Cache-Control

**Header, Footer, Accessibility:**
- `site-header.tsx` va `site-footer.tsx` — Client Component'dan Server
  Component'ga aylantirildi.
- Yangi Client island'lar (kichkina):
  - `src/components/layout/mobile-menu.tsx` — mobil menyu, SVG icon,
    `aria-controls`, `aria-expanded`, `aria-current`
  - `src/components/layout/nav-links.tsx` — desktop navigatsiya, active
    holat
- Language switcher — `aria-current="page"` qo'shildi.
- `focus-visible` outline'lar hamma joyda.

**Tozalash:**
- 43 ta `.bak` va `.stage3*.bak`, `.stage4*.bak` fayl o'chirildi.
- Ishlatilmagan `site-footer-client.tsx`, `footer.tsx` fayllari o'chirildi.

### 1.3 Tekshirilgan holat

Repo mahalliy tekshirildi:
- `tsc --noEmit` — xatoliksiz
- `eslint` — o'zgartirilgan fayllarda xatolik yo'q
- `next build` — kompilyatsiya muvaffaqiyatli (page-data collection faqat
  jonli Neon DB bo'lmagani uchun to'xtaydi — bu kutilgan holat)

---

## 2-QISM — Sizning vazifangiz (AI uchun ko'rsatmalar)

**Sizning vazifangiz:** mijozga quyidagi qadamlarni **bittalab, o'zbek tilida,
oddiy so'zlar bilan** tushuntirish. Har qadamdan keyin: "Bu qadamni bajardingizmi?
Natijasi qanday bo'ldi?" deb so'rang va javobini kuting. Agar mijoz xatoga uchrasa,
uni hal qiling.

**Muhim qoidalar:**
- Barcha javoblaringiz o'zbek tilida (lotin yozuvi) bo'lsin.
- Terminal buyruqlarini o'zgartirmasdan bering (`git pull`, `npx prisma migrate deploy` va h.k.).
- Har bir qadamdan keyin natijani so'rang, keyingisiga o'tmang.
- Environment variable'lar allaqachon Vercel'da o'rnatilgan — ularni yana so'ramang.
- Agar mijoz "hammasi tayyor" desa yoki xato bermay o'tsa, keyingi qadamga o'ting.
- Texnik gapirmang. "Cache", "ISR", "GIN index" — bularni tushuntirmang, faqat
  buyruqlarni bering va nima kutish kerakligini ayting.

### 2.1 Mijozdan boshlashda so'raysiz

Boshlanishida mijozga shunday deb yozing (yoki shunga o'xshash):

> Salom! Men saytdagi barcha o'zgarishlarni ko'rib chiqdim. Endi biz uchtala
> ishni birgalikda bajaramiz:
> 1. Yangi kodni serverga chiqarish (deploy)
> 2. Ma'lumotlar bazasida yangi indekslarni yaratish (bu qidiruvni tezlashtiradi)
> 3. Neon va Vercel regionlarini tekshirish
>
> Har qadamni birma-bir qilamiz. Boshlaymizmi?

### 2.2 QADAMLAR

**QADAM 1 — Vercel'da deploy tekshirish**

Mijozga aynan shu narsani so'rang:

> Vercel'da loyihangizga kiring va so'nggi deploy'ni tekshiring. `main` shoxidagi
> commit `be82a38` (nomi: "Apply performance, SEO, and a11y audit fixes")
> muvaffaqiyatli deploy bo'lganmi? Vercel dashboard'ida "Ready" (yashil) yozuv
> ko'rinishi kerak. Skrinshot yuborsangiz ham bo'ladi.

Agar deploy avtomatik bo'lmagan bo'lsa, mijozdan qo'lda deploy tugmasini
bosishni so'rang: **Vercel → loyiha → Deployments → so'nggi commit → "Redeploy"**.

Agar deploy xato bergan bo'lsa (masalan build fail), xato matnini so'rang va
tahlil qiling.

**QADAM 2 — Ma'lumotlar bazasi migratsiyasini ishga tushirish (eng muhim qadam)**

Bu qadam — qidiruv tezligi uchun. Mijozga tushuntiring:

> Endi ma'lumotlar bazasida yangi indekslarni yaratamiz. Buni qilish uchun
> siz kompyuteringizda terminalni ochib, quyidagilarni ishga tushirasiz.

Mijozdan `DATABASE_URL`'ni Vercel dashboard'dan olishni so'rang:

> Vercel → loyihangiz → Settings → Environment Variables → `DATABASE_URL` —
> "Reveal" tugmasini bosing va qiymatni nusxa oling. **Bu qiymatni hech kimga
> yubormang, faqat o'z terminalingizga ishlating.**

Keyin mijoz kompyuterida terminalni ochsin va shu buyruqlarni ishga tushirsin:

```bash
git clone https://github.com/ShodievBot/uzakademiya-uz.git
cd uzakademiya-uz
npm install
```

Keyin `.env` fayl yaratsin:

```bash
DATABASE_URL="..."
DIRECT_URL="..."
```

(Bu yerga Vercel'dan olingan qiymatlar qo'yiladi. `DIRECT_URL` — Neon
dashboard'dan olinadi, "Direct connection" bo'limi.)

Nihoyat:

```bash
npx prisma migrate deploy
```

Mijozdan buyruq natijasini so'rang. Muvaffaqiyatli bo'lsa, quyidagicha
ko'rinadi:

```
Applying migration `20260905000000_add_search_indexes`
The following migration have been applied:
migrations/20260905000000_add_search_indexes/migration.sql
```

Agar xato bersa, xato matnini so'rang va hal qiling.

**QADAM 3 — Neon'da tekshirish**

Mijozdan Neon dashboard'ga kirishni so'rang:

> Neon dashboard → loyihangiz → SQL Editor bo'limini oching va shu so'rovni
> ishga tushiring:
>
> ```sql
> SELECT indexname FROM pg_indexes
> WHERE tablename = 'Journal' ORDER BY indexname;
> ```
>
> Natijada quyidagi yangi indekslar ro'yxatda bo'lishi kerak:
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
> Bu indekslar ro'yxatda bo'lsa, migratsiya muvaffaqiyatli o'tgan. Skrinshot
> yuboring.

Va yana:

> ```sql
> SELECT extname FROM pg_extension WHERE extname = 'pg_trgm';
> ```
>
> Bitta qator qaytarishi kerak.

**QADAM 4 — Neon va Vercel regionlarini solishtirish**

Bu — mijozning o'zi Telegram habarida aytgan ilova/DB regionlarini moslashtirish
qadami. Aynan shu qismni tushuntiring:

> Endi eng muhim narsa — Neon ma'lumotlar bazasi va Vercel qayerda ishlashi
> **bir xil region**da bo'lishi kerak. Aks holda har bir so'rov uzoq masofani
> bosib o'tadi va sayt sekin ishlaydi.
>
> **1.** Neon dashboard → loyihangiz → Settings → regionni ko'ring
> (masalan: `AWS eu-central-1 (Frankfurt)`). Menga yozing.
>
> **2.** Vercel → loyihangiz → Settings → Functions → "Function Region"
> yoki "Edge Network Regions" bo'limini oching. Menga yozing.

Mijoz javob bergach:

- Agar regionlar **bir xil** bo'lsa: "A'lo, hech narsa qilish kerak emas."
- Agar **turlicha** bo'lsa: mijozga variantlarni bering:
  - Vercel'da funksiya regionini Neon regioniga moslash
    (Vercel → Settings → Functions → Region)
  - **Yoki** Neon loyihasini boshqa regionga ko'chirish (Neon dashboard →
    Settings → Region). Bu bir oz vaqt oladi va Neon'dan yordam so'rash
    kerak bo'lishi mumkin.
  - **Tavsiya:** Vercel funksiya regionini o'zgartirish osonroq. Neon Frankfurt
    (eu-central-1)'da bo'lsa, Vercel funksiyasini ham Frankfurt (`fra1`)
    qilish kerak.

**QADAM 5 — Saytda test qilish**

Mijozdan quyidagilarni qilishni so'rang:

> Endi saytni sinab ko'ramiz. Telefonda yoki brauzeringizda **inkognito**
> (yashirin) oyna oching va `https://uzakademiya.uz` saytiga o'ting.
>
> 1. Bosh sahifadan **Jurnallar** ustiga bosing → oldingi sahifa muzlab
>    qolmasdan, kulrang skeleton (bo'sh kartochkalar) darhol paydo bo'lishi
>    kerak, keyin haqiqiy kontent yuklanadi. Bu — eng katta o'zgarish.
> 2. Jurnallar sahifasidan **Scopus** → **OAK** → **Qonunchilik** → **Foydali
>    materiallar** — orasida yurib chiqing. Har biri tez ochilishi kerak.
> 3. Jurnallar sahifasiga qaytib borib, biror jurnal nomini qidirib ko'ring.
>    Bir soniyadan kam vaqt ichida natija chiqishi kerak.
> 4. **/journals** sahifasini ikkinchi marta ochib ko'ring — deyarli darhol
>    ochilishi kerak (bu — cache ishlayotganining belgisi).
>
> Sayt tez ishlayaptimi? Yoki qaysidir sahifa hali ham sekin? Menga ayting.

Agar biror sahifa hali ham sekin bo'lsa:
- Vercel Dashboard → Deployments → so'nggi deploy → **Functions** → log'larni
  ko'ring. DB so'rov vaqtlari qancha? 500 ms'dan ko'p bo'lsa — region muammosi
  bo'lishi mumkin.
- Neon dashboard → Monitoring → so'rov vaqtlarini ko'ring.

**QADAM 6 — Google Search Console (SEO)**

Sayt endi Google'da yaxshi indekslanishi mumkin. Mijozga tushuntiring:

> Endi saytni Google'da ko'rinishini yaxshilaymiz.
>
> **1.** https://search.google.com/search-console saytiga kiring
> (Google akkauntingiz bilan).
>
> **2.** "Add property" tugmasini bosing → "URL prefix" → `https://uzakademiya.uz`
> kiriting.
>
> **3.** Google sizdan saytga egaligingizni tasdiqlashni so'raydi. Eng oson
> yo'l — **HTML tag** usuli. Google sizga `<meta name="google-site-verification"
> content="..." />` shaklidagi tag beradi. Uni menga yuboring — men saytga
> qo'shib beraman.
>
> **4.** Tasdiqlangandan keyin: chap menyudan **Sitemaps** → `sitemap.xml`
> kiriting va **Submit** bosing.

**QADAM 7 — Yandex Webmaster (Rossiya/Uzbekistan foydalanuvchilari uchun muhim)**

Yandex O'zbekistonda ko'p ishlatiladi, shuning uchun bu muhim.

> **1.** https://webmaster.yandex.com saytiga kiring.
>
> **2.** "Add site" → `https://uzakademiya.uz` kiriting.
>
> **3.** Tasdiqlash usuli — **Meta tag**. Yandex sizga
> `abc123def456` shaklidagi kod beradi.
>
> **4.** Bu kodni Vercel'ga qo'shamiz:
> Vercel → loyiha → Settings → Environment Variables → **Add**:
> - Nomi: `YANDEX_VERIFICATION`
> - Qiymati: (Yandex bergan kod)
> - Environment: **Production** (barcha muhitlarga qo'ying)
>
> **5.** Saqlang va Vercel'da qayta deploy qiling
> (Deployments → so'nggi commit → "..." menyu → **Redeploy**).
>
> **6.** Qayta deploy tugagach, Yandex Webmaster'ga qayting va **Verify**
> tugmasini bosing.
>
> **7.** Tasdiqlangandan keyin: **Indexing → Sitemap** →
> `https://uzakademiya.uz/sitemap.xml` kiriting.

**QADAM 8 — Ixtiyoriy takomillashtirishlar**

Bu qadamlar shart emas, lekin foydali. Mijozga tushuntiring:

> Sayt endi tez ishlaydi. Yana bir necha kichik yaxshilashlar qilish mumkin,
> lekin bu shart emas:
>
> 1. **OpenGraph rasm** — saytga havola Telegram, WhatsApp yoki boshqa
>    joylarda ulashilganda chiqadigan rasm. Dizaynerdan 1200×630 o'lchamdagi
>    UzAkademiya logotipi bilan PNG rasm so'rang. Menga yuboring — saytga
>    qo'shib beraman.
> 2. **Jurnal muqovalari** — hozir muqova rasmlari yo'q. Agar jurnallarga
>    muqova rasm qo'shilsa, sayt yanada chiroyli ko'rinadi.
> 3. **Article JSON-LD** — qonunchilik va jurnal batafsil sahifalari uchun
>    qo'shimcha SEO ma'lumot. Kichik SEO yutuq.

### 2.3 Agar mijoz muammoga uchrasa

**"Deploy fail bo'ldi"** →
Vercel deploy log'idan xato matnini so'rang. Odatda:
- Prisma type xatolari → `npx prisma generate` ishlatilishi kerak (Vercel
  buni build vaqtida avtomatik qiladi, `package.json`'da `"build": "prisma
  generate && next build"` bor).
- Environment variable yo'q → Vercel Settings'da tekshiring.

**"Migratsiya xato berdi"** →
Xato matnini so'rang. Odatda:
- `permission denied to create extension "pg_trgm"` → Neon'da bu extension
  Free plan'da ham ishlaydi, lekin ba'zan admin permissions kerak. Neon
  support'ga yozish kerak bo'lishi mumkin.
- `relation "Journal" does not exist` → Ma'lumotlar bazasi bo'sh. Avval
  seed'lar ishlashi kerak: `npx tsx prisma/seed-journals.ts`.
- `already exists` → Xatosizmiga o'xshaydi, indekslar allaqachon bor.
  Buyruq oxirigacha ishlab bo'lganmi, tekshiring.

**"Sayt hali ham sekin"** →
1. Cache ochilganini tekshiring: sahifani ikki marta ochsin — ikkinchisi tez
   bo'lishi kerak.
2. Vercel Functions log'idan DB so'rov vaqtini ko'ring.
3. Neon monitoring'ni ko'ring.
4. Region muammosi bo'lishi mumkin (QADAM 4'ga qayting).

**"Yandex Verify ishlamayapti"** →
- Meta tag saytga chiqqanini tekshiring: brauzerda saytni oching → o'ng
  tugma → "View page source" → `yandex-verification` ni qidiring. Bor bo'lsa —
  Yandex'da qayta urinib ko'ring (ba'zan bir necha daqiqa vaqt oladi).
- Yo'q bo'lsa — `YANDEX_VERIFICATION` env variable to'g'ri qo'yilganini
  tekshiring va qayta deploy qiling.

### 2.4 Yakuniy tekshiruv

Hamma qadamlar bajarilgach, mijozga shuni ayting:

> Tabriklayman! Sayt endi:
> - Har bir sahifa o'zgarishida darhol skeleton ko'rsatadi (foydalanuvchi
>   "muzlab qoldi" degan tuyg'usi bo'lmaydi)
> - Ma'lumotlar cache'lanadi — takroriy tashriflar deyarli darhol ochiladi
> - Qidiruv indekslar orqali ishlaydi — tez javob beradi
> - Google va Yandex'da yaxshi indekslanadi
> - Mobile va accessibility bo'yicha yaxshilangan
>
> Agar biror muammo yuzaga kelsa yoki yangi funksiya kerak bo'lsa, ayting.

---

## Ilova — texnik ma'lumot

### O'zgartirilgan fayllar (asosiy)

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

### Qo'shilgan yangi fayllar

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

### Baholar (avval → keyin, 100 balldan)

| Ko'rsatkich | Avval | Keyin |
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
