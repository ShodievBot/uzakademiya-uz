import Link from 'next/link';
import {JournalCard} from '@/components/journals/journal-card';
import {getFilteredJournals} from '@/lib/journals';

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
        'Ushbu sahifada Scopus bazasiga kiruvchi jurnallar, asosiy ko‘rsatkichlar va maqola yuborish jarayonining qisqacha tushuntirishi jamlangan.',
      catalog: 'Jurnallar katalogi',
      contacts: 'Bog‘lanish',
      section1: 'Scopus nima?',
      section1Text:
        'Scopus — ilmiy manbalarni qidirish, tahlil qilish va baholash uchun ishlatiladigan xalqaro bibliografik va analitik baza.',
      section2: 'Maqola yuborish bosqichlari',
      section2Text:
        'Quyida maqolaning jurnal bo‘ylab ko‘rib chiqilishidagi odatiy jarayon ko‘rsatilgan.',
      section3: 'Scopus jurnallari vitrinası',
      section3Text:
        'Quyida Scopus bazasida indekslangan jurnallar ko‘rsatilgan.',
      found: 'Topilgan Scopus jurnallari',
      noteTitle: 'Muhim eslatma',
      noteText:
        'Jurnalning Scopus bazasida mavjudligi avtomatik nashr kafolatini bermaydi. Yakuniy qarorni jurnal tahririyati qabul qiladi.'
    };
  }

  if (locale === 'en') {
    return {
      badge: 'Scopus guide',
      title: 'Scopus journals and publication guidance',
      description:
        'This page brings together Scopus-indexed journals, key metrics, and a short explanation of the article submission process.',
      catalog: 'Journal catalog',
      contacts: 'Contact us',
      section1: 'What is Scopus?',
      section1Text:
        'Scopus is an international bibliographic and analytical database used to search, analyze, and evaluate scientific sources.',
      section2: 'Article submission stages',
      section2Text:
        'Below is a typical workflow of how an article is reviewed in a journal.',
      section3: 'Scopus journals showcase',
      section3Text:
        'Below you can see journals indexed in the Scopus database.',
      found: 'Scopus journals found',
      noteTitle: 'Important note',
      noteText:
        'A journal being present in Scopus does not guarantee publication. The final decision is always made by the editorial board.'
    };
  }

  return {
    badge: 'Scopus guide',
    title: 'Scopus-журналы и навигация по публикации',
    description:
      'На этой странице собраны журналы, индексируемые в Scopus, ключевые метрики и краткая схема процесса подачи статьи.',
    catalog: 'Каталог журналов',
    contacts: 'Связаться с нами',
    section1: 'Что такое Scopus?',
    section1Text:
      'Scopus — международная библиографическая и аналитическая база научных публикаций, используемая для поиска, анализа и оценки научных источников.',
    section2: 'Этапы подачи статьи',
    section2Text:
      'Ниже показан типовой сценарий прохождения статьи в журнале.',
    section3: 'Витрина Scopus-журналов',
    section3Text:
      'Ниже представлены журналы, которые индексируются в базе Scopus.',
    found: 'Найдено Scopus-журналов',
    noteTitle: 'Важное примечание',
    noteText:
      'Наличие журнала в Scopus не означает гарантию публикации. Финальное решение всегда принимает редакция журнала.'
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

export default async function LocalizedScopusPage({params}: Props) {
  const {locale} = await params;
  const copy = getCopy(locale);
  const stages = getStages(locale);
  const scopusJournals = getFilteredJournals({scopus: 'yes'});

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-8 shadow-[0_10px_30px_rgba(17,17,17,0.06)] sm:p-10">
          <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
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
              {copy.catalog}
            </Link>

            <Link
              href={withLocale(locale, '/contacts')}
              className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
            >
              {copy.contacts}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-[#111111]">{copy.section1}</h2>
          <p className="mt-4 text-sm leading-7 text-[#5C5C5C]">{copy.section1Text}</p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-[#111111]">{copy.section2}</h2>
          <p className="mt-2 text-sm text-[#6B6B6B]">{copy.section2Text}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stages.map((stage) => (
            <div
              key={stage.title}
              className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-[#111111]">{stage.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">{stage.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#111111]">{copy.section3}</h2>
          <p className="mt-2 text-sm text-[#6B6B6B]">{copy.section3Text}</p>
        </div>

        <div className="mb-6 inline-flex rounded-full border border-[#ECE3DC] bg-[#FFF8F3] px-4 py-2 text-sm font-semibold text-[#6B6B6B]">
          {copy.found}: {scopusJournals.length}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {scopusJournals.map((journal) => (
            <JournalCard key={journal.id} journal={journal} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#ECE3DC] bg-[#FFF8F3] p-6">
          <h3 className="text-xl font-bold text-[#111111]">{copy.noteTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">{copy.noteText}</p>
        </div>
      </section>
    </main>
  );
}
