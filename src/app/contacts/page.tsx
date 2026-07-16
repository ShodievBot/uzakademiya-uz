import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контакты | UzAkademiya.uz",
  description:
    "Контакты UzAkademiya.uz: обратная связь, консультации по выбору журнала, информации о Scopus, OAK и структуре публикационных требований.",
  alternates: {
    canonical: "https://uzakademiya.uz/contacts",
  },
  openGraph: {
    title: "Контакты | UzAkademiya.uz",
    description:
      "Свяжитесь с UzAkademiya.uz по вопросам навигации по каталогу журналов, Scopus, OAK и публикационных требований.",
    url: "https://uzakademiya.uz/contacts",
    siteName: "UzAkademiya.uz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты | UzAkademiya.uz",
    description:
      "Контакты UzAkademiya.uz: email, Telegram, WhatsApp и помощь по структуре данных журналов.",
  },
};

const contactCards = [
  {
    title: "Email",
    value: "info@uzakademiya.uz",
    description:
      "Для общих вопросов, предложений по сотрудничеству и уточнения информации по журналам.",
    actionLabel: "Написать на email",
    actionHref: "mailto:info@uzakademiya.uz",
  },
  {
    title: "Telegram",
    value: "@uzakademiya_uz",
    description:
      "Для быстрой связи, уточнения деталей и оперативных вопросов по работе платформы.",
    actionLabel: "Открыть Telegram",
    actionHref: "https://t.me/uzakademiya_uz",
  },
  {
    title: "WhatsApp",
    value: "+998 90 123 45 67",
    description:
      "Для удобной коммуникации с пользователями из Узбекистана и быстрого контакта по заявкам.",
    actionLabel: "Написать в WhatsApp",
    actionHref: "https://wa.me/998901234567",
  },
];

const supportTopics = [
  "Навигация по каталогу научных журналов",
  "Пояснение полей Scopus: CiteScore, процентиль, квартиль, годы охвата",
  "Пояснение раздела OAK и структуры требований к журналам",
  "Уточнение структуры карточки журнала на платформе",
  "Консультация по тому, какие данные стоит подготовить перед подачей статьи",
  "Обратная связь по качеству данных или замечаниям в карточках журналов",
];

const workflow = [
  {
    title: "1. Вы отправляете запрос",
    text: "Напишите через email, Telegram или WhatsApp и кратко опишите, какая информация вам нужна.",
  },
  {
    title: "2. Мы уточняем задачу",
    text: "Если необходимо, мы уточняем отрасль знаний, тип журнала, цель публикации и какие данные нужно проверить.",
  },
  {
    title: "3. Вы получаете навигацию по данным",
    text: "Мы помогаем сориентироваться по разделам платформы, карточкам журналов и справочной информации.",
  },
  {
    title: "4. Вы самостоятельно принимаете решение",
    text: "Финальный выбор журнала, подача статьи и проверка требований всегда остаются на стороне автора.",
  },
];

const importantNotes = [
  "Платформа не гарантирует публикацию статьи.",
  "Финальное решение всегда принимает редакция журнала.",
  "Перед подачей статьи необходимо проверять официальный сайт журнала.",
  "Нормативные и справочные данные нужно дополнительно сверять по официальным источникам.",
];

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-3xl text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              UzAkademiya.uz Contact Center
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Контакты
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Если вам нужна помощь в навигации по платформе, пояснение по
              данным журналов, структуре карточек, метрикам Scopus или разделу
              OAK, вы можете связаться с нами удобным способом.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/journals"
                className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Перейти в каталог
              </Link>

              <Link
                href="/scopus"
                className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Открыть раздел Scopus
              </Link>

              <Link
                href="/oak"
                className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Открыть раздел OAK
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionTitle
          title="Способы связи"
          description="На старте проекта лучше дать 2–3 простых канала связи, которыми пользователи реально пользуются."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {contactCards.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h3>

              <div className="mt-3 break-words text-lg font-medium text-slate-800">
                {item.value}
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>

              <a
                href={item.actionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                {item.actionLabel}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionTitle
          title="С какими вопросами можно обратиться"
          description="Этот блок поможет пользователю быстрее понять, чем именно полезен раздел контактов."
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {supportTopics.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionTitle
          title="Как строится работа с пользователем"
          description="Даже без сложной CRM можно показать простой и понятный процесс взаимодействия."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {workflow.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Важные замечания
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {importantNotes.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-amber-200 bg-white/70 p-4 text-sm leading-6 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/legislation"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Раздел законодательства
            </Link>

            <Link
              href="/oak"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Раздел OAK
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
