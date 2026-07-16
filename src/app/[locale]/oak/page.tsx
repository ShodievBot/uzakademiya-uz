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
      badge: 'OAK guide',
      title: 'OAK tavsiya etgan jurnallar',
      description:
        'Ushbu sahifada Oliy attestatsiya komissiyasi tavsiya etgan jurnallar, qisqa tavsiyalar va foydali yo‘nalishlar jamlangan.',
      contacts: 'Bog‘lanish',
      legislation: 'Qonunchilik',
      section1: 'OAK nima?',
      section1Text:
        'OAK — Oliy attestatsiya komissiyasi. Ushbu bo‘lim mualliflarga OAK tavsiya etgan jurnallarni topish va nashr talablarini tushunishga yordam beradi.',
      section2: 'Nimani tekshirish kerak?',
      section2Text:
        'Jurnalni tanlashdan oldin quyidagi asosiy nuqtalarni tekshirish tavsiya etiladi.',
      section3: 'OAK tavsiya etgan jurnallar',
      section3Text:
        'Quyida OAK tomonidan tavsiya etilgan jurnallar ko‘rsatilgan.',
      found: 'Topilgan OAK jurnallari',
      noteTitle: 'Muhim eslatma',
      noteText:
        'Platformadagi ma’lumotlar yo‘naltiruvchi xarakterga ega. Yakuniy tekshiruvni doimo rasmiy manbalar orqali amalga oshiring.'
    };
  }

  if (locale === 'en') {
    return {
      badge: 'SAC guide',
      title: 'SAC-recommended journals',
      description:
        'This page brings together journals recommended by the Supreme Attestation Commission, along with short guidance for journal selection and submission.',
      contacts: 'Contact us',
      legislation: 'Legislation',
      section1: 'What is SAC?',
      section1Text:
        'SAC stands for the Supreme Attestation Commission. This section helps authors navigate SAC-recommended journals and understand publication requirements.',
      section2: 'What should be checked?',
      section2Text:
        'Before choosing a journal, it is recommended to verify the following key points.',
      section3: 'SAC-recommended journals',
      section3Text:
        'Below you can see journals recommended by the SAC.',
      found: 'SAC journals found',
      noteTitle: 'Important note',
      noteText:
        'Information on the platform is for guidance only. Always verify final details using official sources.'
    };
  }

  return {
    badge: 'ВАК guide',
    title: 'Журналы, рекомендованные ВАК',
    description:
      'На этой странице собраны журналы, рекомендованные Высшей аттестационной комиссией, а также краткие рекомендации по выбору журнала и публикации статьи.',
    contacts: 'Связаться с нами',
    legislation: 'Законодательство',
    section1: 'Что такое ВАК?',
    section1Text:
      'ВАК — Высшая аттестационная комиссия. Этот раздел помогает авторам ориентироваться в журналах, рекомендованных ВАК, и понимать требования к публикации.',
    section2: 'Что нужно проверить?',
    section2Text:
      'Перед выбором журнала рекомендуется проверить следующие ключевые пункты.',
    section3: 'Журналы, рекомендованные ВАК',
    section3Text:
      'Ниже представлены журналы, рекомендованные ВАК.',
    found: 'Найдено журналов ВАК',
    noteTitle: 'Важное примечание',
    noteText:
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
      'Retsenziya yoki tahririy siyosat haqida ma’lumot bormi.',
      'Maqola tili jurnal talablariga mos keladimi.'
    ];
  }

  if (locale === 'en') {
    return [
      'Whether the journal is verified in official and up-to-date sources.',
      'Whether the journal scope matches your research topic.',
      'Whether there is an official website, archive, and author guidelines.',
      'Whether ISSN, publisher, and contact details are clearly listed.',
      'Whether peer review or editorial policy information is available.',
      'Whether the article language matches the journal requirements.'
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
              href={withLocale(locale, '/contacts')}
              className="inline-flex rounded-2xl bg-[#FF6C26] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
            >
              {copy.contacts}
            </Link>

            <Link
              href={withLocale(locale, '/legislation')}
              className="inline-flex rounded-2xl border border-[#ECE3DC] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#FFF8F3]"
            >
              {copy.legislation}
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
          {checks.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm"
            >
              <p className="text-sm leading-7 text-[#5C5C5C]">{item}</p>
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
          {copy.found}: {oakJournals.length}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {oakJournals.map((journal) => (
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
