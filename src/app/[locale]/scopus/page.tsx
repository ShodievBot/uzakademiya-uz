import Link from 'next/link';
import {JournalCard} from '@/components/journals/journal-card';
import {getFilteredJournals} from '@/lib/journals';
import type {Metadata} from 'next';

type Props = {
  params: Promise<{locale: string}>;
};

function withLocale(locale: string, href: string) {
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      badge: 'Scopus guide',
      title: 'Scopus jurnallari va nashr bo‘yicha yo‘riqnoma',
      description:
        'Bu sahifada Scopus bazasiga kiruvchi jurnallar, asosiy ko‘rsatkichlar va maqolani nashrga tayyorlash bo‘yicha muhim ma’lumotlar jamlangan.',
      primaryCta: 'Jurnallar katalogi',
      secondaryCta: 'Bog‘lanish',
      usefulCta: 'Foydali materiallar',
      stats: {
        journals: 'Scopus jurnallari',
        q12: 'Q1–Q2 jurnallar',
        subjects: 'Yo‘nalishlar soni'
      },
      highlightsTitle: 'Scopus haqida qisqacha',
      highlightsDescription:
        'Scopus — ilmiy nashrlar, iqtiboslar va jurnal ko‘rsatkichlarini tahlil qilish uchun ishlatiladigan xalqaro bibliografik va analitik baza.',
      highlights: [
        {
          title: 'Xalqaro indeksatsiya',
          text: 'Scopus bazasiga kiruvchi jurnallar ilmiy ko‘rinish va akademik ishonchlilikni oshiradi.'
        },
        {
          title: 'Jurnal metrikalari',
          text: 'CiteScore, percentile va quartile kabi ko‘rsatkichlar jurnal sifatini baholashga yordam beradi.'
        },
        {
          title: 'To‘g‘ri tanlov muhim',
          text: 'Mos jurnalni tanlash maqola ko‘rib chiqilishi va qabul qilinish ehtimoliga bevosita ta’sir qiladi.'
        }
      ],
      processTitle: 'Maqola yuborish bosqichlari',
      processDescription:
        'Quyida maqolaning jurnal bo‘ylab ko‘rib chiqilishidagi odatiy jarayon keltirilgan.',
      showcaseTitle: 'Scopus jurnallari vitrinası',
      showcaseDescription:
        'Quyida Scopus bazasida indekslangan jurnallar keltirilgan.',
      found: 'Topilgan Scopus jurnallari',
      noteTitle: 'Muhim eslatma',
      noteText:
        'Jurnalning Scopus bazasida mavjudligi avtomatik nashr kafolatini bermaydi. Yakuniy qarorni jurnal tahririyati qabul qiladi.',
      bottomTitle: 'Jurnal tanlashda yordam kerakmi?',
      bottomText:
        'Biz sizga yo‘nalish, kvartil, jurnal talablari va yuborish tartibi bo‘yicha yo‘l-yo‘riq beramiz.',
      bottomPrimary: 'Mutaxassis bilan bog‘lanish',
      bottomSecondary: 'Barcha jurnallarni ko‘rish'
    };
  }

  if (locale === 'en') {
    return {
      badge: 'Scopus guide',
      title: 'Scopus journals and publication guidance',
      description:
        'This page brings together Scopus-indexed journals, key metrics, and practical guidance for preparing and submitting an article.',
      primaryCta: 'Journal catalog',
      secondaryCta: 'Contact us',
      usefulCta: 'Useful materials',
      stats: {
        journals: 'Scopus journals',
        q12: 'Q1–Q2 journals',
        subjects: 'Subject areas'
      },
      highlightsTitle: 'Scopus at a glance',
      highlightsDescription:
        'Scopus is an international bibliographic and analytical database used to evaluate journals, citations, and scientific visibility.',
      highlights: [
        {
          title: 'International indexing',
          text: 'Journals indexed in Scopus usually provide stronger academic visibility and broader recognition.'
        },
        {
          title: 'Journal metrics',
          text: 'Metrics such as CiteScore, percentile, and quartile help assess the journal’s position and quality.'
        },
        {
          title: 'Choosing the right journal matters',
          text: 'A strong journal match directly affects review outcomes and the overall publication path.'
        }
      ],
      processTitle: 'Article submission stages',
      processDescription:
        'Below is a typical workflow of how an article moves through the journal review process.',
      showcaseTitle: 'Scopus journals showcase',
      showcaseDescription:
        'Below you can see journals indexed in the Scopus database.',
      found: 'Scopus journals found',
      noteTitle: 'Important note',
      noteText:
        'A journal being present in Scopus does not guarantee publication. The final decision is always made by the editorial board.',
      bottomTitle: 'Need help choosing a journal?',
      bottomText:
        'We can guide you on scope fit, quartile, journal requirements, and the submission pathway.',
      bottomPrimary: 'Contact a specialist',
      bottomSecondary: 'View all journals'
    };
  }

  return {
    badge: 'Scopus guide',
    title: 'Scopus-журналы и навигация по публикации',
    description:
      'На этой странице собраны журналы, индексируемые в Scopus, ключевые метрики и практическая информация по подготовке и подаче статьи.',
    primaryCta: 'Каталог журналов',
    secondaryCta: 'Связаться с нами',
    usefulCta: 'Полезные материалы',
    stats: {
      journals: 'Scopus-журналы',
      q12: 'Журналы Q1–Q2',
      subjects: 'Направления'
    },
    highlightsTitle: 'Кратко о Scopus',
    highlightsDescription:
      'Scopus — международная библиографическая и аналитическая база, которая помогает оценивать журналы, цитируемость и научную видимость.',
    highlights: [
      {
        title: 'Международная индексация',
        text: 'Журналы, входящие в Scopus, как правило, дают более высокий уровень академической видимости и доверия.'
      },
      {
        title: 'Метрики журнала',
        text: 'CiteScore, percentile и quartile помогают понять уровень, позицию и качество журнала.'
      },
      {
        title: 'Правильный выбор журнала критичен',
        text: 'Точное соответствие темы журналу напрямую влияет на процесс рецензирования и вероятность публикации.'
      }
    ],
    processTitle: 'Этапы подачи статьи',
    processDescription:
      'Ниже показан типовой сценарий прохождения статьи в журнале.',
    showcaseTitle: 'Витрина Scopus-журналов',
    showcaseDescription:
      'Ниже представлены журналы, которые индексируются в базе Scopus.',
    found: 'Найдено Scopus-журналов',
    noteTitle: 'Важное примечание',
    noteText:
      'Наличие журнала в Scopus не означает гарантию публикации. Финальное решение всегда принимает редакция журнала.',
    bottomTitle: 'Нужна помощь с выбором журнала?',
    bottomText:
      'Мы поможем с подбором по направлению, квартилю, требованиям журнала и маршруту подачи статьи.',
    bottomPrimary: 'Связаться со специалистом',
    bottomSecondary: 'Посмотреть все журналы'
  };
}

function getStages(locale: string) {
  if (locale === 'uz') {
    return [
      {
        title: '1. Dastlabki yuborish',
        text: 'Muallif maqolani jurnal saytiga, emailga yoki tahririy tizimga yuboradi.'
      },
      {
        title: '2. Texnik tekshiruv',
        text: 'Tahririyat format, to‘liqlik va asosiy talablarga moslikni tekshiradi.'
      },
      {
        title: '3. Tahririy baholash',
        text: 'Maqolaning jurnal yo‘nalishiga mosligi va boshlang‘ich ilmiy darajasi ko‘rib chiqiladi.'
      },
      {
        title: '4. Retsenziya',
        text: 'Maqola ekspertlarga yuboriladi, ular tavsiya va xulosalar beradi.'
      },
      {
        title: '5. Tuzatish',
        text: 'Muallif izohlar asosida tuzatish kiritadi va yangilangan variantni yuboradi.'
      },
      {
        title: '6. Yakuniy qaror',
        text: 'Jurnal maqolani qabul qiladi, qo‘shimcha ishlov so‘raydi yoki rad etadi.'
      }
    ];
  }

  if (locale === 'en') {
    return [
      {
        title: '1. Initial submission',
        text: 'The author submits the article through the journal website, email, or editorial system.'
      },
      {
        title: '2. Technical screening',
        text: 'The editorial office checks format, completeness, and compliance with basic requirements.'
      },
      {
        title: '3. Editorial assessment',
        text: 'The paper is checked for fit with the journal scope and initial academic quality.'
      },
      {
        title: '4. Peer review',
        text: 'The article is sent to reviewers who provide comments and recommendations.'
      },
      {
        title: '5. Revision',
        text: 'The author revises the manuscript according to the feedback and resubmits it.'
      },
      {
        title: '6. Final decision',
        text: 'The journal accepts the paper, requests further revision, or rejects it.'
      }
    ];
  }

  return [
    {
      title: '1. Первичная подача',
      text: 'Автор отправляет статью через сайт журнала, email или редакционную систему.'
    },
    {
      title: '2. Техническая проверка',
      text: 'Редакция проверяет формат, комплектность и базовое соответствие требованиям.'
    },
    {
      title: '3. Редакторская оценка',
      text: 'Проверяется соответствие темы профилю журнала и общий научный уровень.'
    },
    {
      title: '4. Рецензирование',
      text: 'Статья отправляется рецензентам для экспертной оценки.'
    },
    {
      title: '5. Доработка',
      text: 'Автор вносит правки по замечаниям и повторно отправляет материал.'
    },
    {
      title: '6. Финальное решение',
      text: 'Журнал принимает статью, запрашивает доработку или отклоняет её.'
    }
  ];
}

function StatCard({
  value,
  label
}: {
  value: number | string;
  label: string;
}) {
  return (
    <div className="rounded-[28px] border border-[#F0E2D8] bg-white/95 p-5 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
      <div className="text-3xl font-bold text-[#111111] sm:text-4xl">{value}</div>
      <div className="mt-2 text-sm leading-6 text-[#6B6B6B]">{label}</div>
    </div>
  );
}

function HighlightCard({
  title,
  text
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-[28px] border border-[#F0E2D8] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF2E9] text-lg font-bold text-[#FF6C26]">
        ●
      </div>

      <h3 className="mt-5 text-xl font-bold leading-tight text-[#111111]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">{text}</p>
    </article>
  );
}

function StageCard({
  index,
  title,
  text
}: {
  index: number;
  title: string;
  text: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-[28px] border border-[#ECE3DC] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
      <div className="absolute right-5 top-4 text-5xl font-bold text-[#FFF1E8]">
        {index}
      </div>

      <div className="inline-flex rounded-full border border-[#FFD8C2] bg-[#FFF7F2] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
        Step
      </div>

      <h3 className="mt-4 max-w-[85%] text-xl font-bold text-[#111111]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">{text}</p>
    </article>
  );
}
function getMetadataCopy(locale: string) {
  if (locale === 'uz') {
    return {
      title: 'Scopus — jurnallar va nashr yo‘riqnomasi',
      description:
        'Scopus bazasi, jurnal ko‘rsatkichlari, maqola yuborish bosqichlari va amaliy tavsiyalar.'
    };
  }

  if (locale === 'en') {
    return {
      title: 'Scopus — journals and publication guidance',
      description:
        'Practical guidance on Scopus journals, metrics, article submission stages, and publication navigation.'
    };
  }

  return {
    title: 'Scopus — журналы и публикационная навигация',
    description:
      'Практическая навигация по журналам Scopus, метрикам, этапам подачи статьи и публикационному маршруту.'
  };
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const {locale} = await params;
  const meta = getMetadataCopy(locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/scopus`,
      languages: {
        ru: '/ru/scopus',
        uz: '/uz/scopus',
        en: '/en/scopus'
      }
    }
  };
}

export default async function LocalizedScopusPage({params}: Props) {
  const {locale} = await params;
  const copy = getCopy(locale);
  const stages = getStages(locale);
  const scopusJournals = await getFilteredJournals({scopus: 'yes'});

  const q12Count = scopusJournals.filter(
    (journal) => journal.quartile === 'Q1' || journal.quartile === 'Q2'
  ).length;

  const subjectCount = new Set(
    scopusJournals.flatMap((journal) => journal.subjectAreas || [])
  ).size;

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.06)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
                {copy.badge}
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
                {copy.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#5C5C5C] sm:text-lg">
                {copy.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={withLocale(locale, '/journals')}
                  className="inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
                >
                  {copy.primaryCta}
                </Link>

                <Link
                  href={withLocale(locale, '/contacts')}
                  className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
                >
                  {copy.secondaryCta}
                </Link>

                <Link
                  href={withLocale(locale, '/useful')}
                  className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
                >
                  {copy.usefulCta}
                </Link>
              </div>
            </div>

            <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <StatCard
                value={scopusJournals.length}
                label={copy.stats.journals}
              />
              <StatCard value={q12Count} label={copy.stats.q12} />
              <StatCard value={subjectCount} label={copy.stats.subjects} />
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#111111]">
            {copy.highlightsTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6B6B6B]">
            {copy.highlightsDescription}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {copy.highlights.map((item) => (
            <HighlightCard
              key={item.title}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#111111]">
            {copy.processTitle}
          </h2>
          <p className="mt-2 text-sm leading-7 text-[#6B6B6B]">
            {copy.processDescription}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stages.map((stage, index) => (
            <StageCard
              key={stage.title}
              index={index + 1}
              title={stage.title}
              text={stage.text}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#111111]">
              {copy.showcaseTitle}
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#6B6B6B]">
              {copy.showcaseDescription}
            </p>
          </div>

          <div className="inline-flex rounded-full border border-[#ECE3DC] bg-[#FFF8F3] px-4 py-2 text-sm font-semibold text-[#6B6B6B]">
            {copy.found}: {scopusJournals.length}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {scopusJournals.map((journal) => (
            <JournalCard key={journal.id} journal={journal} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-[#F1D8C8] bg-[#FFF8F3] p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)] sm:p-8">
          <h3 className="text-xl font-bold text-[#111111]">{copy.noteTitle}</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#5C5C5C]">
            {copy.noteText}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#F1D8C8] bg-gradient-to-r from-[#FFF4EC] via-[#FFF8F4] to-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.06)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-[#111111]">
                {copy.bottomTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#5C5C5C] sm:text-base">
                {copy.bottomText}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={withLocale(locale, '/contacts')}
                className="inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
              >
                {copy.bottomPrimary}
              </Link>

              <Link
                href={withLocale(locale, '/journals')}
                className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
              >
                {copy.bottomSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
