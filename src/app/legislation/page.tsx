import Link from "next/link";

export const metadata = {
  title: "Законодательство | Journal Platform UZ",
  description:
    "Нормативная и справочная информация о научной деятельности, требованиях к публикациям и официальных источниках Узбекистана.",
};

const legalBlocks = [
  {
    title: "Закон о науке и научной деятельности",
    text: "Базовый нормативный ориентир для понимания принципов научной деятельности, прав исследователей, роли государства, интеграции науки, образования и производства.",
  },
  {
    title: "Официальные источники OAK / SAC",
    text: "Для проверки требований к аттестации, научным степеням, диссертационным процедурам и связанным документам пользователю важно ориентироваться на официальные страницы уполномоченных органов.",
  },
  {
    title: "Требования организаций и советов",
    text: "Кроме общих правил, автору и соискателю часто необходимо учитывать внутренние требования университета, научной организации, кафедры или диссертационного совета.",
  },
  {
    title: "Проверка актуальности документов",
    text: "На сайте платформы важно предупреждать пользователя, что нормативные требования могут обновляться, поэтому окончательная сверка всегда должна идти по официальным источникам.",
  },
];

const principles = [
  "свобода научного творчества и информации",
  "эффективность и творческая конкуренция",
  "объективность научной экспертизы",
  "поддержка науки, молодых исследователей и научной инфраструктуры",
  "интеграция науки, образования и производства",
  "соблюдение этических стандартов и недопустимость плагиата",
];

const authorChecklist = [
  "Проверить официальный сайт журнала.",
  "Убедиться, что журнал подходит по тематике вашей работы.",
  "Сверить требования к статье и правила оформления.",
  "Проверить язык публикации и формат подачи материалов.",
  "Уточнить наличие рецензирования и редакционной политики.",
  "Проверить статус журнала по официальным источникам.",
  "Уточнить требования вашей организации или научного совета.",
  "Не полагаться только на рекламные обещания посредников.",
];

const officialSources = [
  {
    title: "Lex.uz",
    text: "Официальный источник нормативно-правовых актов Республики Узбекистан.",
    url: "https://lex.uz/acts/4825305",
    label: "Открыть Lex.uz",
  },
  {
    title: "OAK / SAC",
    text: "Официальный сайт уполномоченного органа по вопросам аттестации научных и научно-педагогических кадров высокой квалификации.",
    url: "https://oak.uz/",
    label: "Открыть OAK",
  },
];

const platformUseCases = [
  "показывать пользователю, какие данные нужно проверять перед подачей статьи",
  "объяснять разницу между справочной информацией и официальным подтверждением",
  "давать ссылки на официальные нормативные источники",
  "напоминать о необходимости ручной верификации данных журнала",
  "не обещать гарантированную публикацию или автоматическое соответствие требованиям",
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

export default function LegislationPage() {
  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              Legislation Guide
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Законодательство и официальные источники
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Этот раздел помогает пользователю понимать, на какие официальные
              источники опираться при работе с научными публикациями, журналами,
              требованиями к научной деятельности и аттестационными процедурами
              в Узбекистане.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/journals"
                className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Перейти в каталог журналов
              </Link>
              <Link
                href="/contacts"
                className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Задать вопрос
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionTitle
          title="Что важно понимать пользователю"
          description="Раздел законодательства на платформе не заменяет официальную юридическую проверку, но помогает быстро сориентироваться."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {legalBlocks.map((item) => (
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

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionTitle
          title="Базовые принципы научной деятельности"
          description="На платформе можно показать ключевые принципы как справочную основу для пользователей."
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-600">
            Эти ориентиры согласуются с Законом Республики Узбекистан «О науке и
            научной деятельности», который регулирует отношения в сфере науки,
            закрепляет принципы научной деятельности и определяет роль
            государственных органов, научных организаций и исследователей.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionTitle
          title="Что проверять автору и соискателю"
          description="Этот чек-лист особенно полезен перед подачей статьи или подготовкой публикаций под формальные требования."
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {authorChecklist.map((item) => (
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
          title="Официальные источники"
          description="Лучше всего давать пользователю прямые ссылки на официальные ресурсы."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {officialSources.map((source) => (
            <div
              key={source.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {source.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {source.text}
              </p>

              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                {source.label}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionTitle
          title="Как использовать этот раздел на платформе"
          description="Раздел законодательства нужен не для перегрузки пользователя, а для навигации и доверия."
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {platformUseCases.map((item) => (
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

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Важно: финальная проверка всегда должна идти по официальным данным
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700">
            Платформа может упрощать навигацию по журналам, требованиям и
            научной инфраструктуре, но не должна подменять официальные
            нормативные источники. Перед подачей статьи, подготовкой документов
            или выбором журнала пользователю нужно сверять данные по
            официальным сайтам и актуальным документам.
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
            Также важно не формулировать на сайте обещания о гарантированной
            публикации, автоматическом принятии статьи или стопроцентном
            соответствии журнала требованиям без ручной проверки.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/oak"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Перейти в раздел OAK
            </Link>
            <Link
              href="/scopus"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Открыть раздел Scopus
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
