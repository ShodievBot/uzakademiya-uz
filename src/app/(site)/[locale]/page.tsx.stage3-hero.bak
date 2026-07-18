import type {Metadata} from 'next'
import Link from 'next/link'
import {JournalCard} from '@/components/journals/journal-card'
import {getAllJournals} from '@/lib/journals'
import {
  getLatestLegislation,
  normalizeLocale,
  pickLocalizedText
} from '@/lib/legislation'

type Props = {
  params: Promise<{locale: string}>
}

function getMetadataCopy(locale: string) {
  if (locale === 'uz') {
    return {
      title: 'UzAkademiya.uz — ilmiy jurnallar va maqola nashri platformasi',
      description:
        'Scopus, OAK, ilmiy jurnallar katalogi, foydali materiallar va maqola nashri bo‘yicha aloqa platformasi.'
    }
  }

  if (locale === 'en') {
    return {
      title: 'UzAkademiya.uz — scientific journals and article publication platform',
      description:
        'A platform for Scopus, SAC, scientific journal discovery, useful materials, and article publication support.'
    }
  }

  return {
    title: 'UzAkademiya.uz — платформа научных журналов и публикации статей',
    description:
      'Scopus, ВАК, каталог научных журналов, полезные материалы и связь по вопросам публикации статей.'
  }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale: rawLocale} = await params
  const locale = normalizeLocale(rawLocale)
  const meta = getMetadataCopy(locale)

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: '/ru',
        uz: '/uz',
        en: '/en'
      }
    }
  }
}

type QuickLink = {
  title: string
  text: string
  href: string
}

type BenefitItem = {
  title: string
  text: string
}

function withLocale(locale: string, href: string) {
  if (href === '/') return `/${locale}`
  return `/${locale}${href}`
}

function getContent(locale: string) {
  if (locale === 'uz') {
    return {
      badge: 'Akademik platforma',
      title: 'Ilmiy jurnallar va maqola nashri bo‘yicha qulay navigatsiya platformasi',
      subtitle:
        'Scopus, OAK, jurnallar katalogi, foydali materiallar, rasmiy hujjatlar va aloqa kanallari — barchasi bir joyda, tushunarli va zamonaviy shaklda jamlangan.',
      searchPlaceholder: 'Jurnal nomi yoki nashriyot bo‘yicha qidiruv',
      searchButton: 'Jurnal topish',
      openCatalog: 'Katalogni ochish',
      contactUs: 'Bog‘lanish',
      stats: {
        total: 'Jami jurnallar',
        scopus: 'Scopus jurnallari',
        oak: 'OAK jurnallari'
      },
      quickLinksTitle: 'Asosiy bo‘limlar',
      quickLinksText: 'Kerakli bo‘limga tez o‘ting va ma’lumotni bir necha bosishda toping.',
      benefitsTitle: 'Platforma nima uchun qulay?',
      benefitsText:
        'Platforma jurnal izlash, yo‘nalishlarni solishtirish va nashrga tayyorgarlik ko‘rish jarayonini soddalashtiradi.',
      recommendedTitle: 'Tavsiya etilgan jurnallar',
      recommendedText:
        'Boshlash uchun tanlangan jurnallar. Batafsil ma’lumot sahifasidan ko‘rsatkichlar va aloqa yo‘nalishlarini ko‘rishingiz mumkin.',
      countLabel: 'Jurnallar',
      docsTitle: 'So‘nggi hujjatlar',
      docsText:
        'Ilmiy faoliyat, attestatsiya va nashr etikasi bo‘yicha muhim hujjatlar va rasmiy manbalar.',
      docsButton: 'Batafsil',
      helpTitle: 'Nashr bo‘yicha individual yordam kerakmi?',
      helpText:
        'Maqolangiz uchun mos jurnal tanlash, talablarni tekshirish va yuborish tartibini tushunishda sizga yordam beramiz.',
      helpPrimary: 'Kontaktlarga o‘tish',
      helpSecondary: 'Scopus sahifasini ochish',
      noteTitle: 'Muhim eslatma',
      noteText:
        'Platforma ma’lumot va navigatsiya uchun xizmat qiladi. Nashr bo‘yicha yakuniy qaror har doim jurnal tahririyati va rasmiy manbalar asosida qabul qilinadi.',
      quickLinks: [
        {title: 'Jurnallar', text: 'Ilmiy jurnallar katalogi va filtrlar', href: '/journals'},
        {title: 'Scopus', text: 'Scopus bo‘yicha yo‘riqnoma va jurnal vitrinası', href: '/scopus'},
        {title: 'OAK', text: 'OAK tavsiya etgan jurnallar va tekshiruv mezonlari', href: '/oak'},
        {title: 'Qonunchilik', text: 'Rasmiy hujjatlar va normativ manbalar', href: '/legislation'},
        {title: 'Foydali materiallar', text: 'Qo‘llanmalar, havolalar va resurslar', href: '/useful'},
        {title: 'Kontaktlar', text: 'Tezkor aloqa kanallari va tayyor xabar', href: '/contacts'}
      ] as QuickLink[],
      benefits: [
        {
          title: 'Barcha asosiy yo‘nalishlar bir joyda',
          text: 'Scopus, OAK, foydali materiallar va qonunchilik bo‘limlari yagona tizimga birlashtirilgan.'
        },
        {
          title: 'Jurnal tanlashni tezlashtiradi',
          text: 'Kvartil, indeksatsiya, mavzu va nashriyot bo‘yicha mos variantlarni tezroq topishingiz mumkin.'
        },
        {
          title: 'Muallif uchun amaliy navigatsiya',
          text: 'Platforma faqat ma’lumot bermaydi, balki nashrga tayyorgarlik ko‘rishda yo‘l ko‘rsatadi.'
        }
      ] as BenefitItem[]
    }
  }

  if (locale === 'en') {
    return {
      badge: 'Academic platform',
      title: 'A practical navigation platform for scientific journals and article publication',
      subtitle:
        'Scopus, SAC, journal catalog, useful materials, official documents, and contact channels — all brought together in one clean and modern interface.',
      searchPlaceholder: 'Search by journal title or publisher',
      searchButton: 'Find journal',
      openCatalog: 'Open catalog',
      contactUs: 'Contact us',
      stats: {
        total: 'Total journals',
        scopus: 'Scopus journals',
        oak: 'SAC journals'
      },
      quickLinksTitle: 'Core sections',
      quickLinksText:
        'Jump directly to the section you need and find relevant information in just a few clicks.',
      benefitsTitle: 'Why this platform is useful',
      benefitsText:
        'The platform simplifies journal discovery, comparison, and preparation for publication.',
      recommendedTitle: 'Recommended journals',
      recommendedText:
        'Selected journals for a faster start. Open the detail page to review metrics, scope, and publication options.',
      countLabel: 'Journals',
      docsTitle: 'Latest documents',
      docsText:
        'Important documents and official references related to research activity, attestation, and publication ethics.',
      docsButton: 'View details',
      helpTitle: 'Need individual help with publication?',
      helpText:
        'We can assist with journal selection, requirement checks, and understanding the submission pathway for your article.',
      helpPrimary: 'Go to contacts',
      helpSecondary: 'Open Scopus page',
      noteTitle: 'Important note',
      noteText:
        'The platform is intended for navigation and reference. Final publication decisions are always made by the journal editorial board and official sources.',
      quickLinks: [
        {title: 'Journals', text: 'Scientific journal catalog and filters', href: '/journals'},
        {title: 'Scopus', text: 'Scopus guidance and journal showcase', href: '/scopus'},
        {title: 'SAC', text: 'SAC-recommended journals and verification points', href: '/oak'},
        {title: 'Legislation', text: 'Official documents and regulatory sources', href: '/legislation'},
        {title: 'Useful materials', text: 'Guides, links, and academic resources', href: '/useful'},
        {title: 'Contacts', text: 'Fast contact channels and ready-made message', href: '/contacts'}
      ] as QuickLink[],
      benefits: [
        {
          title: 'All key directions in one place',
          text: 'Scopus, SAC, useful materials, and legislation are combined into one structured system.'
        },
        {
          title: 'Faster journal selection',
          text: 'You can quickly identify suitable options by quartile, indexing status, subject area, and publisher.'
        },
        {
          title: 'Practical guidance for authors',
          text: 'The platform not only informs but also helps authors navigate the publication process more confidently.'
        }
      ] as BenefitItem[]
    }
  }

  return {
    badge: 'Академическая платформа',
    title: 'Удобная навигационная платформа по научным журналам и публикации статей',
    subtitle:
      'Scopus, ВАК, каталог журналов, полезные материалы, официальные документы и каналы связи — всё собрано в одном современном и понятном интерфейсе.',
    searchPlaceholder: 'Поиск по названию журнала или издателю',
    searchButton: 'Найти журнал',
    openCatalog: 'Открыть каталог',
    contactUs: 'Связаться',
    stats: {
      total: 'Всего журналов',
      scopus: 'Scopus-журналы',
      oak: 'Журналы ВАК'
    },
    quickLinksTitle: 'Основные разделы',
    quickLinksText: 'Перейдите сразу в нужный раздел и найдите важную информацию за несколько кликов.',
    benefitsTitle: 'Почему платформа удобна',
    benefitsText:
      'Платформа упрощает поиск журнала, сравнение направлений и подготовку к публикации.',
    recommendedTitle: 'Рекомендуемые журналы',
    recommendedText:
      'Подборка журналов для быстрого старта. На детальной странице можно посмотреть метрики, профиль и варианты публикации.',
    countLabel: 'Журналы',
    docsTitle: 'Последние документы',
    docsText:
      'Важные документы и официальные источники по научной деятельности, аттестации и публикационной этике.',
    docsButton: 'Подробнее',
    helpTitle: 'Нужна индивидуальная помощь с публикацией?',
    helpText:
      'Поможем подобрать подходящий журнал, проверить требования и разобраться с маршрутом подачи статьи.',
    helpPrimary: 'Перейти в контакты',
    helpSecondary: 'Открыть страницу Scopus',
    noteTitle: 'Важное примечание',
    noteText:
      'Платформа носит навигационный и справочный характер. Финальные решения по публикации всегда принимаются редакцией журнала и подтверждаются официальными источниками.',
    quickLinks: [
      {title: 'Журналы', text: 'Каталог научных журналов и система фильтрации', href: '/journals'},
      {title: 'Scopus', text: 'Навигация по публикации и витрина Scopus-журналов', href: '/scopus'},
      {title: 'ВАК', text: 'Журналы ВАК и ключевые точки проверки', href: '/oak'},
      {title: 'Законодательство', text: 'Официальные документы и нормативные источники', href: '/legislation'},
      {title: 'Полезное', text: 'Материалы, ссылки и академические ресурсы', href: '/useful'},
      {title: 'Контакты', text: 'Быстрые каналы связи и готовый текст обращения', href: '/contacts'}
    ] as QuickLink[],
    benefits: [
      {
        title: 'Все ключевые направления в одном месте',
        text: 'Scopus, ВАК, полезные материалы и законодательство объединены в единую структурированную систему.'
      },
      {
        title: 'Более быстрый подбор журнала',
        text: 'Можно быстро находить подходящие варианты по квартилю, индексации, отрасли и издателю.'
      },
      {
        title: 'Практическая навигация для автора',
        text: 'Платформа не только информирует, но и помогает увереннее ориентироваться в процессе публикации.'
      }
    ] as BenefitItem[]
  }
}

function StatCard({
  value,
  label
}: {
  value: number | string
  label: string
}) {
  return (
    <div className="rounded-[28px] border border-[#F0E2D8] bg-white/95 p-5 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
      <div className="text-3xl font-bold text-[#111111] sm:text-4xl">{value}</div>
      <div className="mt-2 text-sm leading-6 text-[#6B6B6B]">{label}</div>
    </div>
  )
}

function QuickLinkCard({
  title,
  text,
  href
}: {
  title: string
  text: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-[28px] border border-[#ECE3DC] bg-[#FFF8F3] p-5 shadow-[0_8px_22px_rgba(17,17,17,0.04)] transition hover:-translate-y-1 hover:border-[#FF6C26] hover:bg-white hover:shadow-[0_14px_30px_rgba(255,108,38,0.10)]"
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#FF6C26] shadow-sm transition group-hover:bg-[#FFF2E9]">
        →
      </div>

      <h3 className="mt-5 text-xl font-bold text-[#111111] transition group-hover:text-[#E85E1B]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">{text}</p>
    </Link>
  )
}

function BenefitCard({
  title,
  text
}: {
  title: string
  text: string
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
  )
}

export default async function LocaleHomePage({params}: Props) {
  const {locale} = await params
  const normalizedLocale = normalizeLocale(locale)
  const content = getContent(normalizedLocale)

  const allJournals = await getAllJournals()
  const recommended = allJournals.slice(0, 6)
  const latestDocs = await getLatestLegislation(3)

  const totalCount = allJournals.length
  const scopusCount = allJournals.filter((journal) => journal.isScopusIndexed).length
  const oakCount = allJournals.filter((journal) => journal.isOakRecommended).length

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        <div className="rounded-[40px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-7 shadow-[0_20px_60px_rgba(17,17,17,0.08)] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white/95 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF6C26] shadow-[0_8px_20px_rgba(255,108,38,0.08)]">
                {content.badge}
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight text-[#111111] sm:text-5xl lg:text-[64px]">
                {content.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#5C5C5C] sm:text-[18px]">
                {content.subtitle}
              </p>

              <form
                action={withLocale(normalizedLocale, '/journals')}
                method="get"
                className="mt-9 rounded-[30px] border border-[#FFD8C2] bg-white/95 p-4 shadow-[0_14px_34px_rgba(17,17,17,0.06)] backdrop-blur"
              >
                <div className="flex flex-col gap-3 md:flex-row">
                  <input
                    type="text"
                    name="q"
                    placeholder={content.searchPlaceholder}
                    className="h-14 flex-1 rounded-2xl border border-[#ECE3DC] bg-[#FFFDFC] px-5 text-sm text-[#111111] outline-none placeholder:text-[#9A8F87] transition focus:border-[#FF6C26] focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#FF6C26] px-7 text-sm font-bold text-white shadow-[0_12px_24px_rgba(255,108,38,0.22)] transition hover:bg-[#E85E1B]"
                  >
                    {content.searchButton}
                  </button>
                </div>
              </form>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={withLocale(normalizedLocale, '/journals')}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(255,108,38,0.18)] transition hover:bg-[#E85E1B]"
                >
                  {content.openCatalog}
                </Link>

                <Link
                  href={withLocale(normalizedLocale, '/contacts')}
                  className="inline-flex items-center justify-center rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
                >
                  {content.contactUs}
                </Link>
              </div>
            </div>

            <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
              <StatCard value={totalCount} label={content.stats.total} />
              <StatCard value={scopusCount} label={content.stats.scopus} />
              <StatCard value={oakCount} label={content.stats.oak} />
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-[#111111]">
            {content.quickLinksTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6B6B6B]">
            {content.quickLinksText}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {content.quickLinks.map((item) => (
            <QuickLinkCard
              key={item.href}
              title={item.title}
              text={item.text}
              href={withLocale(normalizedLocale, item.href)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#111111]">
            {content.benefitsTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6B6B6B]">
            {content.benefitsText}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.benefits.map((item) => (
            <BenefitCard key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#F1D8C8] bg-gradient-to-br from-white via-[#FFF9F5] to-[#FFF4EC] p-6 shadow-[0_16px_44px_rgba(17,17,17,0.06)] sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#111111]">
                {content.recommendedTitle}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#6B6B6B]">
                {content.recommendedText}
              </p>
            </div>

            <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-2 text-sm font-semibold text-[#A15A33] shadow-[0_8px_20px_rgba(17,17,17,0.04)]">
              {content.countLabel}: {recommended.length}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recommended.map((journal) => (
              <JournalCard key={journal.id} journal={journal} locale={normalizedLocale} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#F1D8C8] bg-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.05)] sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#111111]">
                {content.docsTitle}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#6B6B6B]">
                {content.docsText}
              </p>
            </div>

            <Link
              href={withLocale(normalizedLocale, '/legislation')}
              className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
            >
              {content.docsButton}
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {latestDocs.map((doc) => (
              <article
                key={doc.slug}
                className="rounded-[28px] border border-[#ECE3DC] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)]"
              >
                <div className="inline-flex rounded-full border border-[#F3DDD1] bg-[#FFF8F3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#B56A42]">
                  {new Date(doc.publishedAt).getFullYear()}
                </div>

                <h3 className="mt-4 text-2xl font-bold leading-tight text-[#111111]">
                  {pickLocalizedText(doc.title, normalizedLocale)}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#5C5C5C]">
                  {pickLocalizedText(doc.summary, normalizedLocale)}
                </p>

                <Link
                  href={withLocale(normalizedLocale, `/legislation/${doc.slug}`)}
                  className="mt-6 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
                >
                  {content.docsButton}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] border border-[#F1D8C8] bg-gradient-to-r from-[#FFF1E7] via-[#FFF8F4] to-white p-7 shadow-[0_18px_48px_rgba(17,17,17,0.08)] sm:p-9 lg:p-11">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-[#111111]">
                {content.helpTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#5C5C5C] sm:text-base">
                {content.helpText}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href={withLocale(normalizedLocale, '/contacts')}
                className="inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
              >
                {content.helpPrimary}
              </Link>

              <Link
                href={withLocale(normalizedLocale, '/scopus')}
                className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
              >
                {content.helpSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-[#ECE3DC] bg-[#FFF8F3] p-6 shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
          <h3 className="text-xl font-bold text-[#111111]">{content.noteTitle}</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#5C5C5C]">
            {content.noteText}
          </p>
        </div>
      </section>
    </main>
  )
}