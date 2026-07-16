import Link from 'next/link';
import {JournalCard} from '@/components/journals/journal-card';
import {getAllJournals} from '@/lib/journals';

type Props = {
  params: Promise<{locale: string}>;
};

type QuickLink = {
  title: string;
  text: string;
  href: string;
};

type DocCard = {
  title: string;
  text: string;
  href: string;
};

function withLocale(locale: string, href: string) {
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function getContent(locale: string) {
  if (locale === 'uz') {
    return {
      badge: 'Akademik platforma',
      title: 'Ilmiy jurnallar va nashrlar bo‘yicha qulay navigatsiya platformasi',
      subtitle:
        'Jurnallar katalogi, Scopus va OAK bo‘yicha yo‘riqnoma, foydali materiallar, rasmiy manbalar hamda aloqa kanallari bir joyda jamlangan.',
      searchPlaceholder: 'Jurnal nomi yoki nashriyot bo‘yicha qidiruv',
      searchButton: 'Jurnal topish',
      openCatalog: 'Katalogni ochish',
      contactUs: 'Bog‘lanish',
      quickLinksTitle: 'Tezkor bo‘limlar',
      quickLinksText: 'Kerakli bo‘limga tez o‘ting',
      recommendedTitle: 'Tavsiya etilgan jurnallar',
      recommendedText: 'Tez boshlash uchun tanlangan jurnallar.',
      countLabel: 'Jurnallar',
      docsTitle: 'So‘nggi hujjatlar',
      docsText: 'Asosiy normativ materiallar va rasmiy manbalar.',
      docsButton: 'Batafsil',
      helpTitle: 'Nashr bo‘yicha yordam kerakmi?',
      helpText:
        'Jurnal tanlash, talablarni tushunish va maqola yuborish bo‘yicha biz bilan bog‘laning.',
      helpButton: 'Kontaktlar bo‘limiga o‘tish',
      noteTitle: 'Muhim eslatma',
      noteText:
        'Platforma ma’lumot uchun xizmat qiladi va nashrni kafolatlamaydi. Yakuniy tekshiruvni har doim rasmiy manbalar orqali bajaring.',
      quickLinks: [
        {title: 'Jurnallar', text: 'Ilmiy jurnallar katalogi', href: '/journals'},
        {title: 'Scopus', text: 'Scopus bo‘yicha yo‘riqnoma', href: '/scopus'},
        {title: 'OAK', text: 'OAK bo‘yicha tavsiyalar', href: '/oak'},
        {title: 'Qonunchilik', text: 'Rasmiy hujjatlar va me’yorlar', href: '/legislation'},
        {title: 'Foydali ma’lumotlar', text: 'Resurslar va havolalar', href: '/useful'},
        {title: 'Kontaktlar', text: 'Bog‘lanish kanallari', href: '/contacts'}
      ] as QuickLink[],
      docs: [
        {
          title: 'Nashr etikasi va plagiat tekshiruvi',
          text: 'Maqola yuborishdan oldin mualliflik va antiplagiat bo‘yicha muhim eslatmalar.',
          href: '/legislation'
        },
        {
          title: 'OAK / VAK rasmiy manbalari',
          text: 'Attestatsiya va ilmiy darajalar bo‘yicha foydali rasmiy yo‘riqnomalar.',
          href: '/legislation'
        },
        {
          title: '“Ilm-fan va ilmiy faoliyat to‘g‘risida”gi qonun',
          text: 'Ilmiy faoliyat bo‘yicha asosiy huquqiy hujjat va rasmiy manbalar.',
          href: '/legislation'
        }
      ] as DocCard[]
    };
  }

  if (locale === 'en') {
    return {
      badge: 'Academic platform',
      title: 'A practical navigation platform for scientific journals and publishing',
      subtitle:
        'Journal catalog, Scopus and SAC guidance, useful materials, official sources, and contact channels in one place.',
      searchPlaceholder: 'Search by journal title or publisher',
      searchButton: 'Find journal',
      openCatalog: 'Open catalog',
      contactUs: 'Contact us',
      quickLinksTitle: 'Quick sections',
      quickLinksText: 'Jump directly to the section you need',
      recommendedTitle: 'Recommended journals',
      recommendedText: 'Selected journals for a faster start.',
      countLabel: 'Journals',
      docsTitle: 'Latest documents',
      docsText: 'Key regulatory materials and official sources.',
      docsButton: 'View details',
      helpTitle: 'Need help with publication?',
      helpText:
        'Contact us for help with journal selection, requirements, and article submission.',
      helpButton: 'Go to contacts',
      noteTitle: 'Important note',
      noteText:
        'The platform is for reference purposes and does not guarantee publication. Always verify final information through official sources.',
      quickLinks: [
        {title: 'Journals', text: 'Scientific journal catalog', href: '/journals'},
        {title: 'Scopus', text: 'Scopus guidance', href: '/scopus'},
        {title: 'SAC', text: 'SAC recommendations', href: '/oak'},
        {title: 'Legislation', text: 'Official documents and regulations', href: '/legislation'},
        {title: 'Useful materials', text: 'Resources and links', href: '/useful'},
        {title: 'Contacts', text: 'Communication channels', href: '/contacts'}
      ] as QuickLink[],
      docs: [
        {
          title: 'Publication ethics and plagiarism review',
          text: 'Important notes on authorship, ethics, and plagiarism checks before submission.',
          href: '/legislation'
        },
        {
          title: 'Official SAC / VAK sources',
          text: 'Useful official references for certification and academic requirements.',
          href: '/legislation'
        },
        {
          title: 'Law on science and scientific activity',
          text: 'Core legal document and official sources related to research activity.',
          href: '/legislation'
        }
      ] as DocCard[]
    };
  }

  return {
    badge: 'Академическая платформа',
    title: 'Удобная навигационная платформа по научным журналам и публикациям',
    subtitle:
      'Каталог журналов, ориентиры по Scopus и ВАК, полезные материалы, официальные источники и удобные каналы связи — в одном месте.',
    searchPlaceholder: 'Поиск по названию журнала или издателю',
    searchButton: 'Найти журнал',
    openCatalog: 'Открыть каталог',
    contactUs: 'Связаться',
    quickLinksTitle: 'Быстрые разделы',
    quickLinksText: 'Перейдите сразу в нужный раздел',
    recommendedTitle: 'Рекомендуемые журналы',
    recommendedText: 'Подборка журналов для быстрого старта.',
    countLabel: 'Журналы',
    docsTitle: 'Последние документы',
    docsText: 'Основные нормативные материалы и официальные источники.',
    docsButton: 'Подробнее',
    helpTitle: 'Нужна помощь с публикацией?',
    helpText:
      'Свяжитесь с нами по вопросам выбора журнала, требований к публикации и сопровождения подачи статьи.',
    helpButton: 'Перейти в контакты',
    noteTitle: 'Важное примечание',
    noteText:
      'Платформа носит справочный характер и не гарантирует публикацию. Финальную проверку всегда проводите по официальным источникам.',
    quickLinks: [
      {title: 'Журналы', text: 'Каталог научных журналов', href: '/journals'},
      {title: 'Scopus', text: 'Навигация по публикации в Scopus', href: '/scopus'},
      {title: 'ВАК', text: 'Рекомендации и ориентиры по ВАК', href: '/oak'},
      {title: 'Законодательство', text: 'Официальные документы и нормы', href: '/legislation'},
      {title: 'Полезное', text: 'Полезные материалы и ссылки', href: '/useful'},
      {title: 'Контакты', text: 'Каналы связи', href: '/contacts'}
    ] as QuickLink[],
    docs: [
      {
        title: 'Публикационная этика и проверка на плагиат',
        text: 'Краткий материал о том, почему редакционная этика, авторство и антиплагиат важны до подачи статьи.',
        href: '/legislation'
      },
      {
        title: 'Официальные источники ВАК / ОАК',
        text: 'Полезные официальные материалы по аттестации, научным степеням и требованиям к публикации.',
        href: '/legislation'
      },
      {
        title: 'Закон о науке и научной деятельности',
        text: 'Базовый правовой документ и официальные источники по научной деятельности.',
        href: '/legislation'
      }
    ] as DocCard[]
  };
}

export default async function LocaleHomePage({params}: Props) {
  const {locale} = await params;
  const content = getContent(locale);
  const recommended = getAllJournals().slice(0, 6);

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-8 shadow-[0_10px_30px_rgba(17,17,17,0.06)] sm:p-10 lg:p-12">
          <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
            {content.badge}
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5C5C5C] sm:text-lg">
            {content.subtitle}
          </p>

          <form
            action={withLocale(locale, '/journals')}
            method="get"
            className="mt-8 rounded-[26px] border border-[#FFD8C2] bg-white p-3 shadow-sm"
          >
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                name="q"
                placeholder={content.searchPlaceholder}
                className="h-14 flex-1 rounded-2xl border border-[#ECE3DC] bg-[#FFFDFC] px-5 text-sm text-[#111111] outline-none placeholder:text-[#9A8F87] focus:border-[#FF6C26]"
              />
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#FF6C26] px-6 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
              >
                {content.searchButton}
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={withLocale(locale, '/journals')}
              className="inline-flex items-center justify-center rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
            >
              {content.openCatalog}
            </Link>

            <Link
              href={withLocale(locale, '/contacts')}
              className="inline-flex items-center justify-center rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
            >
              {content.contactUs}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-[#111111]">
            {content.quickLinksTitle}
          </h2>
          <p className="mt-2 text-sm text-[#6B6B6B]">{content.quickLinksText}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {content.quickLinks.map((item) => (
            <Link
              key={item.href}
              href={withLocale(locale, item.href)}
              className="group rounded-3xl border border-[#ECE3DC] bg-[#FFF8F3] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#FF6C26] hover:bg-white"
            >
              <div className="text-lg font-bold text-[#111111] group-hover:text-[#FF6C26]">
                {item.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-[#5C5C5C]">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#111111]">
              {content.recommendedTitle}
            </h2>
            <p className="mt-2 text-sm text-[#6B6B6B]">{content.recommendedText}</p>
          </div>

          <div className="inline-flex rounded-full border border-[#ECE3DC] bg-[#FFF8F3] px-4 py-2 text-sm font-semibold text-[#6B6B6B]">
            {content.countLabel}: {recommended.length}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recommended.map((journal) => (
            <JournalCard key={journal.id} journal={journal} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-[#111111]">
            {content.docsTitle}
          </h2>
          <p className="mt-2 text-sm text-[#6B6B6B]">{content.docsText}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {content.docs.map((doc) => (
            <article
              key={doc.title}
              className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm"
            >
              <h3 className="text-2xl font-bold leading-tight text-[#111111]">
                {doc.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#5C5C5C]">{doc.text}</p>
              <Link
                href={withLocale(locale, doc.href)}
                className="mt-6 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
              >
                {content.docsButton}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#FFD8C2] bg-[#FFF4ED] p-8 shadow-sm sm:p-10">
          <h2 className="text-3xl font-bold text-[#111111]">
            {content.helpTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#5C5C5C]">
            {content.helpText}
          </p>
          <Link
            href={withLocale(locale, '/contacts')}
            className="mt-6 inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
          >
            {content.helpButton}
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#ECE3DC] bg-[#FFF8F3] p-6">
          <h3 className="text-xl font-bold text-[#111111]">{content.noteTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">
            {content.noteText}
          </p>
        </div>
      </section>
    </main>
  );
}
