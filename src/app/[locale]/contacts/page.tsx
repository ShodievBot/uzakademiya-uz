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
        'Telegram, WhatsApp va Email tugmalari tayyor matn bilan ochiladi.',
      actions: {
        email: 'Email yozish',
        telegram: 'Telegram ochish',
        whatsapp: 'WhatsApp ochish',
        phone: 'Qo‘ng‘iroq qilish'
      }
    };
  }

  if (locale === 'en') {
    return {
      title: 'Contacts',
      subtitle:
        'Contact us for article publication, journal selection, and submission guidance.',
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
      brandChannel: 'Brand page',
      note:
        'Telegram, WhatsApp and Email open with a ready-made message.',
      actions: {
        email: 'Send email',
        telegram: 'Open Telegram',
        whatsapp: 'Open WhatsApp',
        phone: 'Call now'
      }
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
      'Telegram, WhatsApp и Email открываются с готовым текстом сообщения.',
    actions: {
      email: 'Написать на email',
      telegram: 'Открыть Telegram',
      whatsapp: 'Открыть WhatsApp',
      phone: 'Позвонить'
    }
  };
}

function ActionCard({
  title,
  value,
  href,
  buttonLabel,
  external = false
}: {
  title: string;
  value: string;
  href: string;
  buttonLabel: string;
  external?: boolean;
}) {
  return (
    <article className="rounded-3xl border border-[#ECE3DC] bg-white p-5 shadow-sm">
      <div className="text-sm font-medium text-[#7A7A7A]">{title}</div>
      <div className="mt-2 text-lg font-bold text-[#111111] break-all">{value}</div>

      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="mt-5 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
      >
        {buttonLabel}
      </a>
    </article>
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
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-8 shadow-[0_10px_30px_rgba(17,17,17,0.06)] sm:p-10">
          <h1 className="text-4xl font-bold text-[#111111] sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#5C5C5C] sm:text-lg">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div className="space-y-6">
          <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-[#7A7A7A]">
              {copy.selectedJournal}
            </div>
            <div className="mt-2 text-3xl font-bold text-[#111111]">
              {journalTitle || copy.selectedJournalFallback}
            </div>
          </section>

          <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-[#7A7A7A]">
              {copy.messageLabel}
            </div>

            <div className="mt-4 rounded-2xl border border-[#ECE3DC] bg-[#FFFDFC] px-5 py-4 text-sm leading-7 text-[#5C5C5C]">
              {links.message}
            </div>

            <p className="mt-4 text-sm text-[#6B6B6B]">{copy.note}</p>
          </section>

          <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#111111]">
              {copy.channelsTitle}
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#5C5C5C]">
              {copy.channelsDescription}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ActionCard
                title={copy.email}
                value={CONTACTS.email}
                href={links.email}
                buttonLabel={copy.actions.email}
              />
              <ActionCard
                title={copy.telegram}
                value={`@${CONTACTS.telegramUsername}`}
                href={links.telegram}
                buttonLabel={copy.actions.telegram}
                external
              />
              <ActionCard
                title={copy.whatsapp}
                value={`+${CONTACTS.whatsappNumber}`}
                href={links.whatsapp}
                buttonLabel={copy.actions.whatsapp}
                external
              />
              <ActionCard
                title={copy.phone}
                value={CONTACTS.phoneNumber}
                href={links.phone}
                buttonLabel={copy.actions.phone}
              />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#111111]">
              {copy.contactDetails}
            </h2>

            <div className="mt-5 space-y-3 text-sm leading-7 text-[#5C5C5C]">
              <div>
                <span className="font-semibold text-[#111111]">{copy.email}:</span>{' '}
                {CONTACTS.email}
              </div>
              <div>
                <span className="font-semibold text-[#111111]">{copy.telegram}:</span>{' '}
                @{CONTACTS.telegramUsername}
              </div>
              <div>
                <span className="font-semibold text-[#111111]">{copy.whatsapp}:</span>{' '}
                +{CONTACTS.whatsappNumber}
              </div>
              <div>
                <span className="font-semibold text-[#111111]">{copy.phone}:</span>{' '}
                {CONTACTS.phoneNumber}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-[#ECE3DC] bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-[#7A7A7A]">
              {copy.brandChannel}
            </div>

            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
            >
              {copy.instagram}: {CONTACTS.instagramHandle}
            </a>
          </section>
        </aside>
      </section>
    </main>
  );
}
