import Link from 'next/link';
import {JournalCard} from '@/components/journals/journal-card';
import {getFilteredJournals} from '@/lib/journals';

type Props = {
  params: Promise<{locale: string}>;
};

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      badge: 'Scopus Guide',
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
        'Quyida maqola ko‘rib chiqilishining odatiy jarayoni keltirilgan.',
      section3: 'Scopus jurnallari vitrinası',
      section3Text:
        'Quyida Scopus bazasida indekslangan jurnallar ko‘rsatilgan.',
      found: 'Topilgan Scopus jurnallari',
      disclaimerTitle: 'Muhim eslatma',
      disclaimerText:
        'Jurnalning Scopus bazasida mavjudligi avtomatik nashr kafolatini bermaydi. Yakuniy qarorni jurnal tahririyati qabul qiladi.'
    };
  }

  if (locale === 'en') {
    return {
      badge: 'Scopus Guide',
      title: 'Scopus journals and publication guidance',
      description:
        'This page brings together Scopus-indexed journals, key metrics and a short explanation of the article submission process.',
      catalog: 'Journal catalog',
      contacts: 'Contact us',
      section1: 'What is Scopus?',
      section1Text:
        'Scopus is an international bibliographic and analytical database used to search, analyze and evaluate scientific sources.',
      section2: 'Article submission stages',
      section2Text:
        'Below is a typical workflow of how an article is reviewed by a journal.',
      section3: 'Scopus journals showcase',
      section3Text:
        'Below you can see journals indexed in the Scopus database.',
      found: 'Scopus journals found',
      disclaimerTitle: 'Important note',
      disclaimerText:
        'A journal being present in Scopus does not guarantee publication. The final decision is always made by the editorial board.'
    };
  }

  return {
    badge: 'Scopus Guide',
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
    disclaimerTitle: 'Важно',
    disclaimerText:
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
        text: 'Maqola ekspertlarga yuboriladi, ular tavsiyalar va xulosalar beradi.'
      },
      {
        title: '5. Tuzatish',
        text: 'Muallif izohlar asosida maqolani qayta ishlaydi va yana yuboradi.'
      },
      {
        title: '6. Yakuniy qaror',
        text: 'Jurnal maqolani qabul qiladi, qo‘shimcha tuzatish so‘raydi yoki rad etadi.'
      }
    ];
  }

  if (locale === 'en') {
    return [
      {
        title: '1. Initial submission',
        text: 'The author submits the manuscript via the journal website, email or editorial system.'
      },
      {
        title: '2. Technical check',
        text: 'The editorial office checks formatting, completeness and basic compliance.'
      },
      {
        title: '3. Editorial assessment',
        text: 'The topic fit and initial scientific quality are evaluated.'
      },
      {
        title: '4. Peer review',
        text: 'The article is sent to reviewers for evaluation and comments.'
      },
      {
        title: '5. Revision',
        text: 'The author revises the article according to reviewer comments.'
      },
      {
        title: '6. Final decision',
        text: 'The journal accepts, requests more revisions or rejects the article.'
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
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {copy.badge}
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {copy.title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/journals`}
                className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                {copy.catalog}
              </Link>
              <Link
                href={`/${locale}/contacts`}
                className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                {copy.contacts}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {copy.section1}
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            {copy.section1Text}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {copy.section2}
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">{copy.section2Text}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {stages.map((stage) => (
            <div
              key={stage.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {stage.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {stage.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {copy.section3}
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">{copy.section3Text}</p>
        </div>

        <div className="mb-6 text-sm text-slate-500">
          {copy.found}:{' '}
          <span className="font-semibold">{scopusJournals.length}</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {scopusJournals.map((journal) => (
            <JournalCard key={journal.id} journal={journal} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {copy.disclaimerTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700">
            {copy.disclaimerText}
          </p>
        </div>
      </section>
    </main>
  );
}
