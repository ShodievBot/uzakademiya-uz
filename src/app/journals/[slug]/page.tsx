import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJournals, getJournalBySlug } from "@/lib/journals";

type RouteParams = {
  slug: string;
};

type PageProps =
  | { params: RouteParams }
  | { params: Promise<RouteParams> };

type JournalLike = {
  title: string;
  slug: string;

  description?: string;
  shortDescription?: string;
  scope?: string;

  issn?: string;
  eissn?: string;

  publisher?: string;
  country?: string;
  language?: string | string[];
  category?: string;
  subject?: string;
  fields?: string[];
  indexedIn?: string[];

  website?: string;
  url?: string;
  submissionUrl?: string;
  submitUrl?: string;
  telegram?: string;
  contactTelegram?: string;
  email?: string;

  scopusStatus?: string | boolean;
  scopusIndexed?: boolean;
  inScopus?: boolean;
  isScopus?: boolean;

  oakStatus?: string | boolean;
  vakStatus?: string | boolean;
  isOAK?: boolean;

  citeScore?: string | number;
  percentile?: string | number;
  quartile?: string;
  sjr?: string | number;
  hIndex?: string | number;

  coverage?: string;
  frequency?: string;
  reviewTime?: string;
  publicationTime?: string;
  acceptanceRate?: string;
  apc?: string | number;

  requirements?: string[];
  submissionSteps?: string[];
  documents?: string[];
  notes?: string[];
  verification?: string[];
};

function isTruthyStatus(value: unknown): boolean {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    return [
      "yes",
      "true",
      "active",
      "indexed",
      "available",
      "approved",
      "included",
      "scopus",
      "oak",
      "vak",
      "да",
      "есть",
      "включен",
      "индексируется",
      "активен",
      "в наличии",
      "подтверждено",
    ].includes(normalized);
  }

  return false;
}

function toArray(value?: string | string[]): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value];
}

function getText(...values: Array<unknown>): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return null;
}

function normalizeExternalHref(value?: string | null): string | null {
  if (!value) return null;

  const cleaned = value.trim();
  if (!cleaned) return null;

  if (
    cleaned.startsWith("http://") ||
    cleaned.startsWith("https://") ||
    cleaned.startsWith("mailto:") ||
    cleaned.startsWith("tel:")
  ) {
    return cleaned;
  }

  if (cleaned.startsWith("@")) {
    return `https://t.me/${cleaned.slice(1)}`;
  }

  if (cleaned.startsWith("t.me/")) {
    return `https://${cleaned}`;
  }

  if (cleaned.startsWith("telegram.me/")) {
    return `https://${cleaned}`;
  }

  if (cleaned.includes("wa.me/")) {
    return cleaned.startsWith("https://") ? cleaned : `https://${cleaned}`;
  }

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
    return `mailto:${cleaned}`;
  }

  if (
    cleaned.includes(".") &&
    !cleaned.includes(" ") &&
    !cleaned.startsWith("/")
  ) {
    return `https://${cleaned}`;
  }

  return cleaned;
}

function getPublishHref(journal: JournalLike): string | null {
  const telegramHref = normalizeExternalHref(
    getText(journal.telegram, journal.contactTelegram)
  );
  if (telegramHref) return telegramHref;

  const submitHref = normalizeExternalHref(
    getText(journal.submissionUrl, journal.submitUrl)
  );
  if (submitHref) return submitHref;

  const websiteHref = normalizeExternalHref(
    getText(journal.website, journal.url)
  );
  if (websiteHref) return websiteHref;

  return null;
}

function getWebsiteHref(journal: JournalLike): string | null {
  return normalizeExternalHref(getText(journal.website, journal.url));
}

function getEmailHref(journal: JournalLike): string | null {
  return normalizeExternalHref(journal.email);
}

function getPublishLabel(journal: JournalLike): string {
  const telegram = getText(journal.telegram, journal.contactTelegram);
  if (telegram) return "Publish via Telegram";

  const submit = getText(journal.submissionUrl, journal.submitUrl);
  if (submit) return "Submit article";

  const site = getText(journal.website, journal.url);
  if (site) return "Open journal website";

  return "Contact journal";
}

function normalizeStatusLabel(
  value: unknown,
  positiveLabel = "Available",
  negativeLabel = "Not specified"
): string {
  if (typeof value === "boolean") {
    return value ? positiveLabel : negativeLabel;
  }

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return negativeLabel;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Not specified";
  }

  return String(value);
}

function buildDescription(journal: JournalLike): string {
  return (
    getText(journal.description, journal.shortDescription, journal.scope) ||
    `${journal.title} jurnalining sahifasi. Scopus, OAK, ISSN va nashr ma'lumotlari.`
  );
}

async function resolveParams(params: PageProps["params"]): Promise<RouteParams> {
  return await Promise.resolve(params);
}

async function resolveJournal(slug: string): Promise<JournalLike | null> {
  const journal = await Promise.resolve(getJournalBySlug(slug));
  return (journal as JournalLike) ?? null;
}
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await resolveParams(props.params);
  const journal = await resolveJournal(slug);

  if (!journal) {
    return {
      title: "Journal not found | UzAkademiya.uz",
      description: "The requested journal page was not found.",
      alternates: {
        canonical: "https://uzakademiya.uz/journals",
      },
    };
  }

  const description = buildDescription(journal);
  const canonical = `https://uzakademiya.uz/journals/${journal.slug}`;

  return {
    title: `${journal.title} | UzAkademiya.uz`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${journal.title} | UzAkademiya.uz`,
      description,
      url: canonical,
      siteName: "UzAkademiya.uz",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${journal.title} | UzAkademiya.uz`,
      description,
    },
  };
}

export async function generateStaticParams() {
  const journals = (await Promise.resolve(getAllJournals())) as JournalLike[];

  return journals.map((journal) => ({
    slug: journal.slug,
  }));
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 break-words text-sm font-medium text-slate-900">
        {value ? String(value) : "Not specified"}
      </div>
    </div>
  );
}

function StatusBadge({
  active,
  activeText,
  inactiveText,
}: {
  active: boolean;
  activeText: string;
  inactiveText: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {active ? activeText : inactiveText}
    </span>
  );
}

function ListSection({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="flex gap-3">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function JournalDetailPage(props: PageProps) {
  const { slug } = await resolveParams(props.params);
  const journal = await resolveJournal(slug);

  if (!journal) {
    notFound();
  }

  const description = buildDescription(journal);

  const scopusActive =
    isTruthyStatus(journal.scopusStatus) ||
    Boolean(journal.scopusIndexed) ||
    Boolean(journal.inScopus) ||
    Boolean(journal.isScopus);

  const oakActive =
    isTruthyStatus(journal.oakStatus) ||
    isTruthyStatus(journal.vakStatus) ||
    Boolean(journal.isOAK);

  const publishHref = getPublishHref(journal);
  const websiteHref = getWebsiteHref(journal);
  const emailHref = getEmailHref(journal);

  const language = toArray(journal.language).join(", ");
  const subjects = journal.fields?.length
    ? journal.fields.join(", ")
    : getText(journal.subject, journal.category);

  const indexing = journal.indexedIn?.length
    ? journal.indexedIn.join(", ")
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: journal.title,
    description,
    url: `https://uzakademiya.uz/journals/${journal.slug}`,
    publisher: journal.publisher || "UzAkademiya.uz",
    about: subjects || journal.scope || "Academic journal",
    isPartOf: {
      "@type": "WebSite",
      name: "UzAkademiya.uz",
      url: "https://uzakademiya.uz",
    },
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <nav className="mb-6 text-sm text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/journals" className="hover:text-blue-600">
              Journals
            </Link>
            <span>/</span>
            <span className="text-slate-700">{journal.title}</span>
          </div>
        </nav>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap gap-2">
                <StatusBadge
                  active={scopusActive}
                  activeText="Scopus indexed"
                  inactiveText="Scopus not specified"
                />
                <StatusBadge
                  active={oakActive}
                  activeText="OAK / VAK"
                  inactiveText="OAK not specified"
                />
                {journal.quartile ? (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {journal.quartile}
                  </span>
                ) : null}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {journal.title}
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                {description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {publishHref ? (
                  <a
                    href={publishHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    {getPublishLabel(journal)}
                  </a>
                ) : null}

                {websiteHref ? (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Visit journal website
                  </a>
                ) : null}

                <Link
                  href="/journals"
                  className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Back to catalog
                </Link>
              </div>
            </div>

            <div className="w-full rounded-2xl bg-slate-50 p-5 lg:max-w-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Quick summary
              </h2>

              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                  <span className="text-slate-500">ISSN</span>
                  <span className="text-right font-medium text-slate-900">
                    {formatValue(journal.issn)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                  <span className="text-slate-500">E-ISSN</span>
                  <span className="text-right font-medium text-slate-900">
                    {formatValue(journal.eissn)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Publisher</span>
                  <span className="text-right font-medium text-slate-900">
                    {formatValue(journal.publisher)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Country</span>
                  <span className="text-right font-medium text-slate-900">
                    {formatValue(journal.country)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Language</span>
                  <span className="text-right font-medium text-slate-900">
                    {formatValue(language)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500">Coverage</span>
                  <span className="text-right font-medium text-slate-900">
                    {formatValue(journal.coverage)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard
            label="Scopus status"
            value={normalizeStatusLabel(
              journal.scopusStatus ?? journal.scopusIndexed ?? journal.inScopus,
              "Indexed in Scopus",
              "Not specified"
            )}
          />
          <InfoCard
            label="OAK / VAK status"
            value={normalizeStatusLabel(
              journal.oakStatus ?? journal.vakStatus ?? journal.isOAK,
              "Included",
              "Not specified"
            )}
          />
          <InfoCard label="Quartile" value={journal.quartile} />
          <InfoCard label="CiteScore" value={journal.citeScore} />
          <InfoCard label="Percentile" value={journal.percentile} />
          <InfoCard label="SJR" value={journal.sjr} />
          <InfoCard label="H-Index" value={journal.hIndex} />
          <InfoCard label="APC / Fee" value={journal.apc} />
          <InfoCard label="Review time" value={journal.reviewTime} />
          <InfoCard label="Publication time" value={journal.publicationTime} />
          <InfoCard label="Frequency" value={journal.frequency} />
          <InfoCard label="Acceptance rate" value={journal.acceptanceRate} />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Journal overview
              </h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
                <p>{description}</p>

                {journal.scope ? (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-slate-900">
                      Scope
                    </h3>
                    <p>{journal.scope}</p>
                  </div>
                ) : null}
              </div>
            </section>

            <ListSection
              title="Submission requirements"
              items={journal.requirements}
            />
            <ListSection
              title="Submission steps"
              items={journal.submissionSteps}
            />
            <ListSection
              title="Required documents"
              items={journal.documents}
            />
            <ListSection
              title="Verification / notes"
              items={journal.verification || journal.notes}
            />
          </div>

          <aside className="space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Additional information
              </h2>

              <div className="mt-4 grid gap-4">
                <InfoCard label="Subject / category" value={subjects} />
                <InfoCard label="Indexing" value={indexing} />
                <InfoCard label="Email" value={journal.email} />
                <InfoCard label="Website" value={websiteHref} />
              </div>

              {(emailHref || websiteHref) && (
                <div className="mt-5 flex flex-col gap-3">
                  {emailHref ? (
                    <a
                      href={emailHref}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Email journal
                    </a>
                  ) : null}

                  {websiteHref ? (
                    <a
                      href={websiteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Open official website
                    </a>
                  ) : null}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-blue-50 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Ready to submit your article?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-700">
                Use the journal contact link or the publication button below to
                continue with article submission.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {publishHref ? (
                  <a
                    href={publishHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    {getPublishLabel(journal)}
                  </a>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-600">
                    Contact link not specified for this journal.
                  </div>
                )}

                <Link
                  href="/contacts"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
                >
                  Contact UzAkademiya.uz
                </Link>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
