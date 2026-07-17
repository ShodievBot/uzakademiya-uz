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
      badge: 'OAK guide',
      title: 'OAK tavsiya etgan jurnallar va nashr bo‘yicha yo‘riqnoma',
      description:
        'Bu sahifada OAK tavsiya etgan jurnallar, tanlash mezonlari, muallif uchun muhim tekshiruv nuqtalari va maqolani yuborishdan oldingi tavsiyalar jamlangan.',
      primaryCta: 'Bog‘lanish',
      secondaryCta: 'Qonunchilik',
      usefulCta: 'Foydali materiallar',
      stats: {
        journals: 'OAK jurnallari',
        scopus: 'Scopus ham mavjud',
        countries: 'Mamlakatlar'
      },
      introTitle: 'OAK haqida qisqacha',
      introDescription:
        'OAK mualliflar uchun ilmiy nashrlarni baholashda muhim yo‘nalishlardan biridir. To‘g‘ri jurnal tanlash mavzu, til, rasmiy maqom va talablar bilan moslikni tekshirishdan boshlanadi.',
      introCards: [
        {
          title: 'Rasmiy maqom',
          text: 'Jurnal dolzarb OAK ro‘yxatlarida yoki tegishli rasmiy manbalarda tekshirilishi kerak.'
        },
        {
          title: 'Yo‘nalish mosligi',
          text: 'Jurnalning ilmiy profili sizning maqolangiz mavzusi va ixtisosligiga mos bo‘lishi muhim.'
        },
        {
          title: 'Muallif talablari',
          text: 'Format, til, havola uslubi va texnik talablar oldindan tekshirilsa, rad etilish xavfi kamayadi.'
        }
      ],
      checksTitle: 'Jurnal tanlashdan oldin nimani tekshirish kerak?',
      checksDescription:
        'Quyidagi punktlar muallifga jurnalni xavfsizroq va aniqroq tanlashga yordam beradi.',
      showcaseTitle: 'OAK tavsiya etgan jurnallar',
      showcaseDescription:
        'Quyida OAK tomonidan tavsiya etilgan jurnallar keltirilgan.',
      found: 'Topilgan OAK jurnallari',
      noteTitle: 'Muhim eslatma',
      noteText:
        'Platformadagi ma’lumotlar yo‘naltiruvchi xarakterga ega. Yakuniy tekshiruvni doimo rasmiy manbalar orqali amalga oshiring.',
      bottomTitle: 'Jurnal bo‘yicha individual yordam kerakmi?',
      bottomText:
        'Biz sizga OAK talablari, jurnal tanlash, maqola mosligi va yuborish tartibi bo‘yicha yo‘l-yo‘riq beramiz.',
      bottomPrimary: 'Mutaxassis bilan bog‘lanish',
      bottomSecondary: 'Barcha jurnallarni ko‘rish'
    };
  }

  if (locale === 'en') {
    return {
      badge: 'SAC guide',
      title: 'SAC-recommended journals and publication guidance',
      description:
        'This page brings together SAC-recommended journals, key selection criteria, author checkpoints, and practical recommendations before submission.',
      primaryCta: 'Contact us',
      secondaryCta: 'Legislation',
      usefulCta: 'Useful materials',
      stats: {
        journals: 'SAC journals',
        scopus: 'Also in Scopus',
        countries: 'Countries'
      },
      introTitle: 'SAC at a glance',
      introDescription:
        'The SAC route is important for authors navigating academic publication requirements. Choosing the right journal starts with checking scope, language, official status, and submission rules.',
      introCards: [
        {
          title: 'Official status',
          text: 'A journal should be verified against current SAC lists or other official sources.'
        },
        {
          title: 'Scope alignment',
          text: 'The journal’s profile should match your topic, discipline, and research direction.'
        },
        {
          title: 'Author requirements',
          text: 'Checking formatting, language, citation style, and submission rules in advance reduces risk.'
        }
      ],
      checksTitle: 'What should be checked before choosing a journal?',
      checksDescription:
        'The following points help authors make a safer and more accurate journal choice.',
      showcaseTitle: 'SAC-recommended journals',
      showcaseDescription:
        'Below you can see journals recommended by the SAC.',
      found: 'SAC journals found',
      noteTitle: 'Important note',
      noteText:
        'Information on the platform is for guidance only. Always verify final details using official sources.',
      bottomTitle: 'Need individual help with journal selection?',
      bottomText:
        'We can guide you on SAC requirements, journal fit, manuscript readiness, and the submission pathway.',
      bottomPrimary: 'Contact a specialist',
      bottomSecondary: 'View all journals'
    };
  }

  return {
    badge: 'ВАК guide',
    title: 'Журналы, рекомендованные ВАК, и навигация по публикации',
    description:
      'На этой странице собраны журналы, рекомендованные ВАК, критерии выбора, ключевые точки проверки для автора и практические рекомендации перед подачей статьи.',
    primaryCta: 'Связаться с нами',
    secondaryCta: 'Законодательство',
    usefulCta: 'Полезные материалы',
    stats: {
      journals: 'Журналы ВАК',
      scopus: 'Также в Scopus',
      countries: 'Страны'
    },
    introTitle: 'Кратко о ВАК',
    introDescription:
      'Публикация в журналах, связанных с ВАК, требует точного соответствия профилю издания, официальному статусу, языку и требованиям к автору. Правильный выбор журнала снижает риск отклонения.',
    introCards: [
      {
        title: 'Официальный статус',
        text: 'Журнал должен быть проверен по актуальным спискам ВАК или другим официальным источникам.'
      },
      {
        title: 'Соответствие профиля',
        text: 'Тематика журнала должна совпадать с направлением, специальностью и содержанием вашей статьи.'
      },
      {
        title: 'Требования к автору',
        text: 'Если заранее проверить формат, язык, оформление ссылок и правила подачи, вероятность ошибок заметно снижается.'
      }
    ],
    checksTitle: 'Что проверить перед выбором журнала?',
    checksDescription:
      'Ниже приведены ключевые пункты, которые помогают автору выбрать журнал точнее и безопаснее.',
    showcaseTitle: 'Журналы, рекомендованные ВАК',
    showcaseDescription:
      'Ниже представлены журналы, рекомендованные ВАК.',
    found: 'Найдено журналов ВАК',
    noteTitle: 'Важное примечание',
    noteText:
      'Информация на платформе носит навигационный характер. Финальную проверку всегда выполняйте по официальным источникам.',
    bottomTitle: 'Нужна индивидуальная помощь с выбором журнала?',
    bottomText:
      'Мы поможем разобраться с требованиями ВАК, подобрать подходящий журнал, проверить соответствие статьи и маршрут подачи.',
    bottomPrimary: 'Связаться со специалистом',
    bottomSecondary: 'Посмотреть все журналы'
  };
}

function getChecks(locale: string) {
  if (locale === 'uz') {
    return [
      'Jurnal rasmiy va dolzarb manbalarda tekshirilganmi.',
      'Jurnal yo‘nalishi sizning ilmiy mavzuingizga mos keladimi.',
      'Rasmiy sayt, arxiv va mualliflar uchun qoidalar mavjudmi.',
      'ISSN, nashriyot va aloqa ma’lumotlari aniq ko‘rsatilganmi.',
      'Retsenziya yoki tahririy siyosat haqida ma’lumot bormi.',
      'Maqola tili va rasmiylashtirish talablari jurnalga mos keladimi.'
    ];
  }

  if (locale === 'en') {
    return [
      'Whether the journal is verified in official and up-to-date sources.',
      'Whether the journal scope matches your research topic.',
      'Whether there is an official website, archive, and author guidelines.',
      'Whether ISSN, publisher, and contact details are clearly listed.',
      'Whether peer review or editorial policy information is available.',
      'Whether the article language and formatting match the journal requirements.'
    ];
  }

  return [
    'Проверен ли журнал по официальным и актуальным источникам.',
    'Соответствует ли профиль журнала вашей научной теме.',
    'Есть ли официальный сайт, архив и правила для авторов.',
    'Указаны ли ISSN, издатель и контактные данные.',
    'Есть ли информация о рецензировании или редакционной политике.',
    'Соответствует ли язык и оформление статьи требованиям журнала.'
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

function IntroCard({
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

function CheckCard({
  index,
  text
}: {
  index: number;
  text: string;
}) {
  return (
    <article className="rounded-[28px] border border-[#ECE3DC] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF2E9] text-sm font-bold text-[#FF6C26]">
        {index}
      </div>

      <p className="mt-4 text-sm leading-7 text-[#5C5C5C]">{text}</p>
    </article>
  );
}
function getMetadataCopy(locale: string) {
  if (locale === 'uz') {
    return {
      title: 'OAK — jurnallar va muallif yo‘riqnomasi',
      description:
        'OAK tavsiya etgan jurnallar, tanlash mezonlari, muallif uchun tekshiruv nuqtalari va amaliy tavsiyalar.'
    };
  }

  if (locale === 'en') {
    return {
      title: 'SAC — journals and author guidance',
      description:
        'Guidance on SAC-recommended journals, selection criteria, author checkpoints, and publication preparation.'
    };
  }

  return {
    title: 'ВАК — журналы и рекомендации для автора',
    description:
      'Навигация по рекомендованным журналам ВАК, критериям выбора, проверочным пунктам и подготовке к публикации.'
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
      canonical: `/${locale}/oak`,
      languages: {
        ru: '/ru/oak',
        uz: '/uz/oak',
        en: '/en/oak'
      }
    }
  };
}

export default async function LocalizedOakPage({params}: Props) {
  const {locale} = await params;
  const copy = getCopy(locale);
  const checks = getChecks(locale);
  const oakJournals = await getFilteredJournals({oak: 'yes'});

  const scopusCount = oakJournals.filter((journal) => journal.isScopusIndexed).length;
  const countriesCount = new Set(oakJournals.map((journal) => journal.country)).size;

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
                  href={withLocale(locale, '/contacts')}
                  className="inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
                >
                  {copy.primaryCta}
                </Link>

                <Link
                  href={withLocale(locale, '/legislation')}
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
              <StatCard value={oakJournals.length} label={copy.stats.journals} />
              <StatCard value={scopusCount} label={copy.stats.scopus} />
              <StatCard value={countriesCount} label={copy.stats.countries} />
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#111111]">{copy.introTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6B6B6B]">
            {copy.introDescription}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {copy.introCards.map((item) => (
            <IntroCard key={item.title} title={item.title} text={item.text} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#111111]">{copy.checksTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-[#6B6B6B]">
            {copy.checksDescription}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {checks.map((item, index) => (
            <CheckCard key={item} index={index + 1} text={item} />
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
            {copy.found}: {oakJournals.length}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {oakJournals.map((journal) => (
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
