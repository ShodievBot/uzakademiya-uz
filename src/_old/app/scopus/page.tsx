import Link from "next/link";

export const metadata = {
  title: "Scopus | Journal Platform UZ",
  description:
    "Информация о базе Scopus, метриках журналов, этапах проверки статьи и правилах выбора научного журнала.",
};

const checks = [
  "Совпадает ли название журнала на официальном сайте и в профиле Scopus.",
  "Указаны ли ISSN и E-ISSN.",
  "Есть ли действующий сайт журнала с архивом выпусков.",
  "Понятны ли требования к авторам и правила оформления статьи.",
  "Указан ли издатель и редакционная коллегия.",
  "Есть ли информация о peer review / рецензировании.",
  "Публикует ли журнал статьи по вашей отрасли знаний.",
  "Проверены ли годы охвата Scopus и текущий статус индексации.",
];

const reviewStages = [
  {
    title: "1. Первичная подача статьи",
    text: "Автор отправляет рукопись в журнал через сайт, e-mail или редакционную систему.",
  },
  {
    title: "2. Техническая проверка",
    text: "Редакция проверяет комплектность материалов, формат, структуру, оригинальность и соответствие базовым правилам.",
  },
  {
    title: "3. Редакторская оценка",
    text: "Главный редактор или ответственный редактор оценивает соответствие темы профилю журнала и базовый научный уровень.",
  },
  {
    title: "4. Рецензирование",
    text: "Статья направляется экспертам. Возможны single-blind, double-blind или open review модели.",
  },
  {
    title: "5. Доработка автором",
    text: "Автор получает замечания рецензентов и вносит правки, после чего отправляет исправленную версию.",
  },
  {
    title: "6. Финальное решение",
    text: "Редакция принимает решение: принять статью, запросить дополнительную доработку или отклонить.",
  },
  {
    title: "7. Подготовка к публикации",
    text: "После принятия статья проходит редактуру, верстку, присвоение DOI и публикацию в выпуске/онлайн.",
  },
];

const metrics = [
  {
    title: "CiteScore",
    text: "Показатель цитируемости источника в базе Scopus. На сайте журнала полезно показывать актуальные значения по годам.",
  },
  {
    title: "Percentile",
    text: "Процентиль показывает положение журнала среди других журналов в своей категории.",
  },
  {
    title: "Quartile",
    text: "Квартиль — упрощенная интерпретация позиции журнала в категории: Q1, Q2, Q3 или Q4.",
  },
  {
    title: "Coverage years",
    text: "Годы охвата показывают, за какие годы журнал представлен в Scopus.",
  },
];

const displayedFields = [
  "Название журнала",
  "Название на русском и узбекском языках",
  "Издатель",
  "Официальный сайт",
  "ISSN / E-ISSN",
  "Страна",
  "Языки публикации",
  "Отрасли знаний и категории",
  "Статус Scopus",
  "Годы охвата",
  "CiteScore 2025 / 2026",
  "Percentile",
  "Quartile",
  "Содержание Scopus по годам",
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

export default function ScopusPage() {
  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              Scopus Guide
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Scopus: что это, как проверить журнал и как читать метрики
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              На этой странице собрана базовая информация о Scopus для авторов,
              исследователей и соискателей: что означает индексация журнала, как
              оценивать профиль издания и на что смотреть перед подачей статьи.
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
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionTitle
          title="Что такое Scopus"
          description="Scopus — это международная библиографическая и аналитическая база научных публикаций, которая используется для поиска, анализа и оценки научных источников."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Индексация журнала
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Если журнал представлен в Scopus, это означает, что информация о
              нем и его публикациях включена в базу за определенные годы
              охвата.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Не все журналы одинаковы
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Даже внутри Scopus журналы отличаются по категориям, метрикам,
              качеству рецензирования, тематике и требованиям к авторам.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Важен профиль журнала
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              При выборе журнала нужно учитывать не только наличие в базе, но и
              соответствие вашей теме, типу статьи и языку публикации.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Метрики нужно читать правильно
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              CiteScore, процентиль и квартиль помогают ориентироваться, но не
              заменяют экспертную оценку качества журнала.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionTitle
          title="Что проверять перед подачей статьи"
          description="Перед отправкой рукописи в журнал желательно пройти базовый чек-лист."
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {checks.map((item) => (
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
          title="Этапы проверки статьи в журнале"
          description="Ниже — типовой сценарий рассмотрения статьи. Конкретный процесс зависит от редакции."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {reviewStages.map((stage) => (
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
        <SectionTitle
          title="Как понимать метрики журнала"
          description="На платформе журнала можно показывать ключевые показатели Scopus в понятном виде."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {metric.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {metric.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900">
            Логика определения квартиля по процентилю
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-emerald-50 p-5">
              <div className="text-sm text-emerald-700">Q1</div>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                &gt; 75
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50 p-5">
              <div className="text-sm text-blue-700">Q2</div>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                50–75
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50 p-5">
              <div className="text-sm text-amber-700">Q3</div>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                25–50
              </div>
            </div>

            <div className="rounded-2xl bg-rose-50 p-5">
              <div className="text-sm text-rose-700">Q4</div>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                &lt; 25
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-600">
            Эта логика может использоваться на вашей платформе для отображения
            квартиля автоматически, если в данных журнала есть процентиль.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionTitle
          title="Какие данные показывать на странице журнала"
          description="Эти поля уже хорошо подходят для структуры каталога и детальной карточки."
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {displayedFields.map((field) => (
              <div
                key={field}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                {field}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Важно: наличие журнала в базе не означает гарантию публикации
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700">
            Платформа должна информировать пользователей о параметрах журналов,
            но не обещать гарантированную публикацию. Финальное решение всегда
            принимает редакция журнала после проверки, рецензирования и
            внутренней оценки рукописи.
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
            Также важно предупреждать пользователей о необходимости проверять
            официальный сайт журнала, условия публикации, требования к статье,
            сроки рассмотрения и академическую добросовестность.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/journals"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Смотреть каталог журналов
            </Link>
            <Link
              href="/contacts"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Задать вопрос
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
