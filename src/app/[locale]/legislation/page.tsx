import Link from 'next/link';

type Props = {
  params: Promise<{locale: string}>;
};

type DocCard = {
  title: string;
  text: string;
  source: string;
};

function withLocale(locale: string, href: string) {
  if (href === '/') return `/${locale}`;
  return `/${locale}${href}`;
}

function getContent(locale: string) {
  if (locale === 'uz') {
    return {
      badge: 'Rasmiy manbalar',
      title: 'Qonunchilik va rasmiy hujjatlar',
      description:
        'Ilmiy faoliyat, attestatsiya, maqola chop etish talablari va rasmiy manbalar bo‘yicha asosiy yo‘riqnomalar.',
      docs: [
        {
          title: 'Nashr etikasi va plagiat tekshiruvi',
          text: 'Mualliflik, antiplagiat va tahririy etikaga oid asosiy tavsiyalar.',
          source: 'Rasmiy va uslubiy materiallar'
        },
        {
          title: 'OAK / VAK rasmiy manbalari',
          text: 'Attestatsiya, ilmiy daraja va rasmiy talablar bo‘yicha foydali manbalar.',
          source: 'Rasmiy me’yoriy hujjatlar'
        },
        {
          title: 'Ilm-fan va ilmiy faoliyat bo‘yicha qonunchilik',
          text: 'Ilmiy faoliyat va tadqiqotlar bilan bog‘liq asosiy normativ hujjatlar.',
          source: 'Davlat va rasmiy huquqiy manbalar'
        }
      ] as DocCard[],
      noteTitle: 'Muhim eslatma',
      noteText:
        'Yakuniy qaror va dolzarb talablarni doimo rasmiy davlat yoki attestatsiya manbalari orqali tekshiring.',
      cta: 'Kontaktlarga o‘tish'
    };
  }

  if (locale === 'en') {
    return {
      badge: 'Official sources',
      title: 'Legislation and official documents',
      description:
        'Core guidance on scientific activity, attestation, publication requirements, and official reference sources.',
      docs: [
        {
          title: 'Publication ethics and plagiarism checks',
          text: 'Core notes on authorship, editorial ethics, and plagiarism screening.',
          source: 'Official and methodological materials'
        },
        {
          title: 'Official SAC / VAK sources',
          text: 'Useful references on certification, academic degrees, and official requirements.',
          source: 'Regulatory and official documents'
        },
        {
          title: 'Law on science and scientific activity',
          text: 'Basic legal materials related to research activity and scientific work.',
          source: 'Government and official legal sources'
        }
      ] as DocCard[],
      noteTitle: 'Important note',
      noteText:
        'Always verify current rules and final requirements through official state or attestation sources.',
      cta: 'Go to contacts'
    };
  }

  return {
    badge: 'Официальные источники',
    title: 'Законодательство и официальные документы',
    description:
      'Основные материалы по научной деятельности, аттестации, публикационным требованиям и официальным источникам.',
    docs: [
      {
        title: 'Публикационная этика и проверка на плагиат',
        text: 'Краткие ориентиры по авторству, редакционной этике и проверке текста перед подачей статьи.',
        source: 'Официальные и методические материалы'
      },
      {
        title: 'Официальные источники ВАК / ОАК',
        text: 'Полезные материалы по аттестации, научным степеням и актуальным требованиям к публикации.',
        source: 'Нормативные и официальные документы'
      },
      {
        title: 'Законодательство о науке и научной деятельности',
        text: 'Базовые правовые материалы по научной деятельности, исследованиям и связанным требованиям.',
        source: 'Государственные и правовые источники'
      }
    ] as DocCard[],
    noteTitle: 'Важное примечание',
    noteText:
      'Финальную проверку актуальности документов и требований всегда выполняйте по официальным государственным источникам.',
    cta: 'Перейти в контакты'
  };
}

export default async function LocalizedLegislationPage({params}: Props) {
  const {locale} = await params;
  const t = getContent(locale);

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-8 shadow-[0_10px_30px_rgba(17,17,17,0.06)] sm:p-10">
          <div className="inline-flex rounded-full border border-[#FFD8C2] bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF6C26]">
            {t.badge}
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
            {t.title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5C5C5C] sm:text-lg">
            {t.description}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {t.docs.map((doc) => (
            <article
              key={doc.title}
              className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="text-2xl font-bold leading-tight text-[#111111]">
                {doc.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#5C5C5C]">
                {doc.text}
              </p>

              <div className="mt-5 inline-flex rounded-full bg-[#FFF8F3] px-3 py-1 text-xs font-semibold text-[#B85A2B]">
                {doc.source}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#ECE3DC] bg-[#FFF8F3] p-6">
          <h3 className="text-xl font-bold text-[#111111]">{t.noteTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">{t.noteText}</p>

          <Link
            href={withLocale(locale, '/contacts')}
            className="mt-5 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
          >
            {t.cta}
          </Link>
        </div>
      </section>
    </main>
  );
}
