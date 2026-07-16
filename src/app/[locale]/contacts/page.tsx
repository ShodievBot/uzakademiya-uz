import {getJournalBySlug} from '@/lib/journals';
import {CONTACTS, getContactLinks} from '@/lib/contacts';

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{journal?: string}>;
};

function getJournalTitleByLocale(
  journal:
    | {
        title: string;
        titleRu: string;
        titleUz: string;
      }
    | undefined,
  locale: string
) {
  if (!journal) return null;

  if (locale === 'uz') return journal.titleUz || journal.title || journal.titleRu;
  if (locale === 'en') return journal.title || journal.titleRu || journal.titleUz;
  return journal.titleRu || journal.title || journal.titleUz;
}

function getCopy(locale: string) {
  if (locale === 'uz') {
    return {
      title: 'Kontaktlar',
      subtitle:
        'Maqola chop etish, jurnal tanlash va yuborish bo‘yicha biz bilan bog‘laning.',
      selectedJournal: 'Tanlangan jurnal',
      selectedJournalFallback: 'Jurnal tanlanmagan',
      messageLabel: 'Avtomatik xabar matni',
      channelsTitle: 'Bog‘lanish kanallari',
      channelsDescription:
        'Raqamli kanallarda xabar matni avtomatik to‘ldiriladi.',
      email: 'Email',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      phone: 'Qo‘ng‘iroq qilish',
      instagram: 'Instagram',
      contactDetails: 'Bog‘lanish ma’lumotlari',
      brandChannel: 'Brend sahifasi',
      note:
        'Telegram, WhatsApp va Email tugmalari tayyor matn bilan ochiladi.'
    };
  }

  if (locale === 'en') {
    return {
      title: 'Contacts',
      subtitle:
        'Contact us for article publication, journal selection and submission guidance.',
      selectedJournal: 'Selected journal',
      selectedJournalFallback: 'No journal selected',
      messageLabel: 'Auto-generated message',
      channelsTitle: 'Contact channels',
      channelsDescription:
        'Digital channels open with the message prefilled automatically.',
      email: 'Email',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      phone: 'Call',
      instagram: 'Instagram',
      contactDetails: 'Contact details',
      brandChannel: 'Brand channel',
      note:
        'Telegram, WhatsApp and Email buttons open with a ready-made message.'
    };
  }

  return {
    title: 'Контакты',
    subtitle:
      'Свяжитесь с нами по вопросам публикации статьи, подбора журнала и сопровождения подачи.',
    selectedJournal: 'Выбранный журнал',
    selectedJournalFallback: 'Журнал не выбран',
    messageLabel: 'Автоматический текст сообщения',
    channelsTitle: 'Каналы связи',
    channelsDescription:
      'Для цифровых каналов текст сообщения подставляется автоматически.',
    email: 'Email',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    phone: 'Позвонить',
    instagram: 'Instagram',
    contactDetails: 'Контактные данные',
    brandChannel: 'Страница бренда',
    note:
      'Кнопки Telegram, WhatsApp и Email открываются с готовым текстом.'
  };
}

function ContactActionCard({
  title,
  href,
  value,
  external = false
}: {
  title: string;
  href: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="text-sm font-medium text-slate-500">{title}</div>
      <div className="mt-2 text-base font-semibold text-slate-900">{value}</div>
    </a>
  );
}

export default async function LocalizedContactsPage({
  params,
  searchParams
}: Props) {
  const {locale} = await params;
  const {journal: journalSlug} = await searchParams;

  const copy = getCopy(locale);
  const journal = journalSlug ? getJournalBySlug(journalSlug) : undefined;
  const journalTitle = getJournalTitleByLocale(journal, locale);
  const links = getContactLinks(locale, journalTitle);

  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">{copy.subtitle}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-slate-500">
                {copy.selectedJournal}
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {journalTitle || copy.selectedJournalFallback}
              </div>

              {journalSlug && !journalTitle ? (
                <p className="mt-3 text-sm text-amber-700">
                  slug: {journalSlug}
                </p>
              ) : null}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-slate-500">
                {copy.messageLabel}
              </div>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                {links.message}
              </div>
              <p className="mt-4 text-sm text-slate-500">{copy.note}</p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                {copy.channelsTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {copy.channelsDescription}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <ContactActionCard
                  title={copy.email}
                  href={links.email}
                  value={CONTACTS.email}
                />
                <ContactActionCard
                  title={copy.telegram}
                  href={links.telegram}
                  value={`@${CONTACTS.telegramUsername}`}
                  external
                />
                <ContactActionCard
                  title={copy.whatsapp}
                  href={links.whatsapp}
                  value={`+${CONTACTS.whatsappNumber}`}
                  external
                />
                <ContactActionCard
                  title={copy.phone}
                  href={links.phone}
                  value={CONTACTS.phoneNumber}
                />
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                {copy.contactDetails}
              </h2>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div>
                  <span className="font-medium text-slate-800">{copy.email}:</span>{' '}
                  {CONTACTS.email}
                </div>
                <div>
                  <span className="font-medium text-slate-800">{copy.telegram}:</span>{' '}
                  @{CONTACTS.telegramUsername}
                </div>
                <div>
                  <span className="font-medium text-slate-800">{copy.whatsapp}:</span>{' '}
                  +{CONTACTS.whatsappNumber}
                </div>
                <div>
                  <span className="font-medium text-slate-800">{copy.phone}:</span>{' '}
                  {CONTACTS.phoneNumber}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-slate-500">
                {copy.brandChannel}
              </div>

              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                {copy.instagram}: {CONTACTS.instagramHandle}
              </a>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
