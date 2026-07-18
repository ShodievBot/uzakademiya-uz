import type {Metadata} from 'next';
import {getJournalBySlug} from '@/lib/journals';
import {getContactDisplayValues, getContactLinks} from '@/lib/contacts';
import {getSiteSettings} from '@/lib/site-settings';

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{journal?: string}>;
};

function normalizeMetaLocale(locale: string) {
  if (locale === 'uz' || locale === 'en') return locale;
  return 'ru';
}

function getMetadataCopy(locale: string, siteName: string) {
  if (locale === 'uz') {
    return {
      title: `Kontaktlar — ${siteName} bilan bog‘lanish`,
      description:
        'Jurnal tanlash, talablarni tekshirish va maqola nashri bo‘yicha biz bilan qulay aloqa kanallari orqali bog‘laning.'
    };
  }

  if (locale === 'en') {
    return {
      title: `Contacts — get in touch with ${siteName}`,
      description:
        'Contact us about journal selection, article requirements, and publication support through convenient communication channels.'
    };
  }

  return {
    title: `Контакты — связь с ${siteName}`,
    description:
      'Свяжитесь с нами по вопросам подбора журнала, проверки требований и сопровождения публикации статьи.'
  };
}

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = normalizeMetaLocale(rawLocale);
  const settings = await getSiteSettings();
  const meta = getMetadataCopy(locale, settings.siteName);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/contacts`,
      languages: {
        ru: '/ru/contacts',
        uz: '/uz/contacts',
        en: '/en/contacts'
      }
    }
  };
}

function getJournalTitleByLocale(
  journal:
    | {
        title: string;
        titleRu: string;
        titleUz: string;
      }
    | null
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
      badge: 'Aloqa markazi',
      title: 'Maqola nashri bo‘yicha bog‘lanish',
      subtitle:
        'Jurnal tanlash, talablarni tekshirish va maqolani topshirish jarayonida sizga bosqichma-bosqich hamrohlik qilamiz. Qulay kanalni tanlang va biz bilan darhol bog‘laning.',
      selectedJournal: 'Tanlangan jurnal',
      selectedJournalFallback: 'Jurnal tanlanmagan',
      messageLabel: 'Tayyor xabar matni',
      channelsTitle: 'Bog‘lanish kanallari',
      channelsDescription:
        'Telegram, WhatsApp va elektron pochta orqali tayyor xabar bilan tez bog‘lanishingiz mumkin.',
      email: 'Elektron pochta',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      phone: 'Qo‘ng‘iroq',
      instagram: 'Instagram',
      promoLabel: 'Afzallik',
      instagramDescription:
        'Ijtimoiy tarmoqlarimizda yangiliklar, foydali materiallar va maqola nashri bo‘yicha tavsiyalarni kuzatib boring.',
      note:
        'Agar jurnal tanlangan bo‘lsa, xabar matni avtomatik ravishda moslashtiriladi.',
      actions: {
        email: 'Email yozish',
        telegram: 'Telegram ochish',
        whatsapp: 'WhatsApp ochish',
        phone: 'Qo‘ng‘iroq qilish'
      },
      promo: [
        {
          title: '2020-yildan beri tajriba',
          description:
            'Maqolalarni tayyorlash, jurnal tanlash va nashrga yuborish bo‘yicha amaliy tajribaga egamiz.'
        },
        {
          title: 'Rasmiy shartnoma asosida ishlaymiz',
          description:
            'Hamkorlik barcha shartlar aniq ko‘rsatilgan rasmiy kelishuv asosida olib boriladi.'
        },
        {
          title: 'Natija bo‘lmasa — mablag‘ qaytariladi',
          description:
            'Agar nashr amalga oshmasa, shartlarga muvofiq to‘lovni 100% qaytarish kafolati mavjud.'
        }
      ]
    };
  }

  if (locale === 'en') {
    return {
      badge: 'Contact center',
      title: 'Contact us about article publication',
      subtitle:
        'We guide you through journal selection, requirement checks, and submission support step by step. Choose the most convenient channel and contact us right away.',
      selectedJournal: 'Selected journal',
      selectedJournalFallback: 'No journal selected',
      messageLabel: 'Ready-made message',
      channelsTitle: 'Communication channels',
      channelsDescription:
        'Reach us quickly via Telegram, WhatsApp, or Email with a prefilled message.',
      email: 'Электронная почта',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      phone: 'Call',
      instagram: 'Instagram',
      promoLabel: 'Benefit',
      instagramDescription:
        'Follow our social channels for updates, helpful materials, and recommendations on article publication.',
      note:
        'If a journal is selected, the message text is generated automatically for that request.',
      actions: {
        email: 'Send email',
        telegram: 'Open Telegram',
        whatsapp: 'Open WhatsApp',
        phone: 'Call now'
      },
      promo: [
        {
          title: 'Practical experience since 2020',
          description:
            'We have hands-on experience in manuscript preparation, journal selection, and publication support.'
        },
        {
          title: 'Official contract for every collaboration',
          description:
            'All cooperation is carried out under a formal agreement with clearly defined terms.'
        },
        {
          title: '100% refund if publication is unsuccessful',
          description:
            'If publication is not achieved, we provide a full refund according to the agreed conditions.'
        }
      ]
    };
  }

  return {
    badge: 'Центр связи',
    title: 'Связь по публикации статьи',
    subtitle:
      'Помогаем с подбором журнала, проверкой требований и сопровождением подачи статьи. Выберите удобный канал связи и свяжитесь с нами сразу.',
    selectedJournal: 'Выбранный журнал',
    selectedJournalFallback: 'Журнал не выбран',
    messageLabel: 'Готовый текст сообщения',
    channelsTitle: 'Каналы связи',
    channelsDescription:
      'Вы можете быстро написать нам через Telegram, WhatsApp или по электронной почте с уже подготовленным текстом сообщения.',
    email: 'Email',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    phone: 'Позвонить',
    instagram: 'Instagram',
    promoLabel: 'Преимущество',
    instagramDescription:
      'Следите за обновлениями, полезными материалами и новостями по публикации статей в наших социальных каналах.',
    note:
      'Если журнал уже выбран, текст сообщения подставляется автоматически с учетом вашего запроса.',
    actions: {
      email: 'Написать на email',
      telegram: 'Открыть Telegram',
      whatsapp: 'Открыть WhatsApp',
      phone: 'Позвонить'
    },
    promo: [
      {
        title: 'Практический опыт с 2020 года',
        description:
          'Сопровождаем авторов в вопросах подбора журнала, подготовки материалов и выхода статьи на публикацию.'
      },
      {
        title: 'Работаем по официальному договору',
        description:
          'Все условия сотрудничества фиксируются официально, чтобы процесс был прозрачным и понятным для автора.'
      },
      {
        title: '100% возврат средств при отсутствии результата',
        description:
          'Если публикация не состоялась, мы предусматриваем полный возврат средств в рамках согласованных условий.'
      }
    ]
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
    <article className="rounded-[28px] border border-[#F0E2D8] bg-white p-5 shadow-[0_8px_24px_rgba(17,17,17,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(255,108,38,0.10)]">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B56A42]">
        {title}
      </div>

      <div className="mt-3 break-all text-lg font-bold text-[#111111]">
        {value}
      </div>

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

function PromoCard({
  label,
  title,
  description
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-[28px] border border-[#F0E2D8] bg-white/95 p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B56A42]">
        {label}
      </div>

      <h3 className="mt-3 text-xl font-bold leading-tight text-[#111111]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">{description}</p>
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

  const [settings, journal] = await Promise.all([
    getSiteSettings(),
    journalSlug ? getJournalBySlug(journalSlug) : Promise.resolve(undefined)
  ]);

  const journalTitle = getJournalTitleByLocale(journal, locale);
  const links = getContactLinks(settings, locale, journalTitle);
  const contactInfo = getContactDisplayValues(settings);

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-[#F1D8C8] bg-gradient-to-br from-[#FFF8F3] via-[#FFF4ED] to-white p-6 shadow-[0_14px_40px_rgba(17,17,17,0.06)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <div className="inline-flex rounded-full border border-[#F3D6C3] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C06B3C]">
                {copy.badge}
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight text-[#111111] sm:text-5xl">
                {copy.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#5C5C5C] sm:text-lg">
                {copy.subtitle}
              </p>

              <div className="mt-8">
                <section className="rounded-[28px] border border-[#F0E2D8] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
                  <h2 className="text-2xl font-bold text-[#111111]">
                    {copy.channelsTitle}
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-[#5C5C5C]">
                    {copy.channelsDescription}
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <ActionCard
                      title={copy.email}
                      value={contactInfo.email}
                      href={links.email}
                      buttonLabel={copy.actions.email}
                    />
                    <ActionCard
                      title={copy.telegram}
                      value={contactInfo.telegramHandle}
                      href={links.telegram}
                      buttonLabel={copy.actions.telegram}
                      external
                    />
                    <ActionCard
                      title={copy.whatsapp}
                      value={contactInfo.whatsappDisplay}
                      href={links.whatsapp}
                      buttonLabel={copy.actions.whatsapp}
                      external
                    />
                    <ActionCard
                      title={copy.phone}
                      value={contactInfo.phoneDisplay}
                      href={links.phone}
                      buttonLabel={copy.actions.phone}
                    />
                  </div>
                </section>
              </div>
            </div>

            <aside className="space-y-5">
              {copy.promo.map((item) => (
                <PromoCard
                  key={item.title}
                  label={copy.promoLabel}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#ECE3DC] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B56A42]">
              {copy.selectedJournal}
            </div>

            <div className="mt-3 text-2xl font-bold text-[#111111] sm:text-3xl">
              {journalTitle || copy.selectedJournalFallback}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#ECE3DC] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B56A42]">
              {copy.messageLabel}
            </div>

            <div className="mt-4 rounded-2xl border border-[#F0E2D8] bg-[#FFF9F5] px-5 py-4 text-sm leading-7 text-[#5C5C5C]">
              {links.message}
            </div>

            <p className="mt-4 text-sm leading-7 text-[#6B6B6B]">{copy.note}</p>
          </section>
        </div>

        <aside className="rounded-[28px] border border-[#ECE3DC] bg-white p-6 shadow-[0_8px_24px_rgba(17,17,17,0.05)]">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B56A42]">
            {copy.instagram}
          </div>

          <h2 className="mt-3 text-2xl font-bold text-[#111111]">
            {settings.siteName}
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#5C5C5C]">
            {copy.instagramDescription}
          </p>

          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-2xl bg-[#FF6C26] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E85E1B]"
          >
            {copy.instagram}: {contactInfo.instagramHandle}
          </a>
        </aside>
      </section>
    </main>
  );
}
