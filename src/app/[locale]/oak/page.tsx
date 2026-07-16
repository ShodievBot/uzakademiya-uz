import Link from 'next/link';
import {JournalCard} from '@/components/journals/journal-card';
import {getFilteredJournals} from '@/lib/journals';

type Props = {
  params: Promise<{locale: string}>;
};

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      badge: 'OAK Guide',
      title: 'OAK tavsiya etgan jurnallar',
      description:
        'Ushbu sahifada Oliy attestatsiya komissiyasi (OAK) tavsiya etgan jurnallar, maqola tanlash bo‘yicha qisqa tavsiyalar va foydali yo‘nalishlar jamlangan.',
      contacts: 'Bog‘lanish',
      legislation: 'Qonunchilik',
      section1: 'OAK nima?',
      section1Text:
        'OAK — Oliy attestatsiya komissiyasi. Ushbu bo‘lim mualliflar va tadqiqotchilarga OAK tavsiya etgan jurnallarni topish, nashr talablarini tushunish va maqola yuborishdan oldin asosiy tekshiruvlarni bajarishga yordam beradi.',
      section2: 'Nimani tekshirish kerak?',
      section2Text:
        'Jurnalni tanlashda quyidagi asosiy nuqtalarni tekshirish tavsiya etiladi.',
      section3: 'OAK tavsiya etgan jurnallar',
      section3Text:
        'Quyida OAK tomonidan tavsiya etilgan jurnallar ko‘rsatilgan.',
      found: 'Topilgan OAK jurnallari',
      disclaimerTitle: 'Muhim eslatma',
      disclaimerText:
        'Platformadagi ma’lumotlar yo‘naltiruvchi xarakterga ega. Yakuniy tekshiruvni doimo rasmiy manbalar orqali amalga oshiring.'
    };
  }

  if (locale === 'en') {
    return {
      badge: 'SAC Guide',
      title: 'SAC-recommended journals',
      description:
        'This page brings together journals recommended by the Supreme Attestation Commission (SAC), along with short guidance on journal selection and article submission.',
      contacts: 'Contact us',
      legislation: 'Legislation',
      section1: 'What is SAC?',
      section1Text:
        'SAC stands for the Supreme Attestation Commission. This section helps authors and researchers navigate SAC-recommended journals, understand publication requirements and perform basic checks before submission.',
      section2: 'What should be checked?',
      section2Text:
        'Before choosing a journal, it is recommended to verify the following key points.',
      section3: 'SAC-recommended journals',
      section3Text:
        'Below you can see journals recommended by the SAC.',
      found: 'SAC journals found',
      disclaimerTitle: 'Important note',
      disclaimerText:
        'Information on the platform is for guidance only. Always verify final details using official sources.'
    };
  }

  return {
    badge: 'ВАК Guide',
    title: 'Журналы, рекомендованные ВАК',
    description:
      'На этой странице собраны журналы, рекомендованные Высшей аттестационной комиссией (ВАК), а также краткие рекомендации по выбору журнала и публикации статьи.',
    contacts: 'Связаться с нами',
    legislation: 'Законодательство',
    section1: 'Что такое ВАК?',
    section1Text:
      'ВАК — Высшая аттестационная комиссия. Этот раздел помогает авторам и исследователям ориентироваться в журналах, рекомендованных ВАК, понимать требования к публикации и выполнять базовую проверку перед подачей статьи.',
    section2: 'Что нужно проверить?',
    section2Text:
      'Перед выбором журнала рекомендуется проверить следующие ключевые пункты.',
    section3: 'Журналы, рекомендованные ВАК',
    section3Text:
      'Ниже представлены журналы, рекомендованные ВАК.',
    found: 'Найдено журналов ВАК',
    disclaimerTitle: 'Важно',
    disclaimerText:
      'Информация на платформе носит навигационный характер. Финальную проверку всегда выполняйте по официальным источникам.'
  };
}

function getChecks(locale: string) {
  if (locale === 'uz') {
    return [
      'Jurnal rasmiy manbalarda va dolzarb ro‘yxatlarda tekshirilganmi.',
      'Jurnal yo‘nalishi sizning ilmiy mavzuingizga mos keladimi.',
      'Rasmiy sayt, arxiv va mualliflar uchun qoidalar mavjudmi.',
      'ISSN, nashriyot va aloqa ma’lumotlari ko‘rsatilganmi.',
      'Retsenziya yoki tahrir siyosati haqida ma’lumot bormi.',
      'Maqola tili jurnal talablariga mos keladimi.'
    ];
  }

  if (locale === 'en') {
    return [
      'Whether the journal is verified in official and up-to-date sources.',
      'Whether the journal scope matches your scientific topic.',
      'Whether the official website, archive and author guidelines are available.',
      'Whether ISSN, publisher and contact information are specified.',
      'Whether peer review or editorial policy information is available.',
      'Whether the article language matches journal requirements.'
    ];
  }

  return [
    'Проверен ли журнал по официальным и актуальным источникам.',
    'Соответствует ли профиль журнала вашей научной теме.',
    'Есть ли официальный сайт, архив и правила для авторов.',
    'Указаны ли ISSN, издатель и контактные данные.',
    'Есть ли информация о рецензировании или редакционной политике.',
    'Соответствует ли язык статьи требованиям журнала.'
  ];
}

export default async function LocalizedOakPage({params}: Props) {
  const {locale} = await params;
  const copy = getCopy(locale);
  const checks = getChecks(locale);

  const oakJournals = getFilteredJournals({oak: 'yes'});

  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
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
                href={`/${locale}/contacts`}
                className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                {copy.contacts}
              </Link>
              <Link
                href={`/${locale}/legislation`}
                className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                {copy.legislation}
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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {checks.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm leading-6 text-slate-700">{item}</p>
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
          <span className="font-semibold">{oakJournals.length}</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {oakJournals.map((journal) => (
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
