import Link from "next/link";

export const metadata = {
  title: "OAK | Journal Platform UZ",
  description:
    "Информация об OAK, научных изданиях, требованиях к публикациям и проверке журналов для авторов и соискателей.",
};

const oakChecks = [
  "Проверен ли журнал по официальным источникам и актуальным перечням.",
  "Соответствует ли профиль журнала вашей специальности или научной области.",
  "Есть ли у журнала действующий сайт и архив публикаций.",
  "Указаны ли редакция, издатель, контакты и правила для авторов.",
  "Есть ли информация о рецензировании и редакционной политике.",
  "Соответствует ли язык статьи требованиям журнала.",
  "Понятны ли сроки рассмотрения, публикации и формат подачи материалов.",
  "Проверены ли требования вашей организации, кафедры или диссертационного совета.",
];

const sections = [
  {
    title: "Что такое OAK",
    text: "Раздел OAK на платформе нужен для того, чтобы пользователи могли быстро ориентироваться в научных изданиях, требованиях к публикациям и базовых правилах выбора журнала для научной работы.",
  },
  {
    title: "Зачем нужен этот раздел",
    text: "Авторам, соискателям и исследователям важно понимать, какие журналы подходят под конкретные цели: публикация статьи, отчётность, защита диссертации, выполнение внутренних требований вуза или научной организации.",
  },
  {
    title: "Почему нужна ручная проверка",
    text: "Даже если журнал выглядит подходящим, всегда нужно дополнительно проверять официальный сайт издания, актуальность перечней, требования к статьям, редакционную политику и статус публикации.",
  },
  {
    title: "Что важно показывать на сайте",
    text: "На платформе полезно хранить статус журнала, область науки, издателя, сайт, ISSN, язык публикации, требования к авторам и примечания по верификации.",
  },
];

const publicationTypes = [
  {
    title: "Научная статья",
    text: "Основной тип публикации для представления результатов исследования, анализа, эксперимента или методологического подхода.",
  },
  {
    title: "Обзорная статья",
    text: "Систематизирует существующие исследования по теме, показывает текущее состояние научной области и основные подходы.",
  },
  {
    title: "Краткое сообщение",
    text: "Короткий формат для представления отдельного научного результата, наблюдения или промежуточного вывода.",
  },
  {
    title: "Методическая статья",
    text: "Материал, посвящённый методам преподавания, прикладным подходам, педагогическим или исследовательским инструментам.",
  },
  {
    title: "Аналитическая статья",
    text: "Публикация с акцентом на анализ явлений, процессов, правовых норм, экономических моделей или управленческих решений.",
  },
  {
    title: "Практико-ориентированная работа",
    text: "Материал, связанный с прикладными разработками, кейсами, профессиональной практикой или отраслевыми решениями.",
  },
];

const whatToStore = [
  "Название журнала",
  "Название на русском языке",
  "Название на узбекском языке",
  "Издатель",
  "Сайт журнала",
  "ISSN / E-ISSN",
  "Страна",
  "Языки публикации",
  "Научная область",
  "Категории и специализация",
  "Статус OAK / ВАК",
  "Статус Scopus",
  "Правила для авторов",
  "Информация о рецензировании",
  "Комментарий по верификации",
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

export default function OakPage() {
  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              OAK Guide
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              OAK: как выбирать научный журнал и что проверять перед подачей
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Этот раздел помогает ориентироваться в научных журналах,
              требованиях к публикациям и базовых критериях проверки издания
              перед отправкой статьи.
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
          title="Общая информация"
          description="На этой странице можно собрать практическую информацию для авторов, преподавателей, исследователей и соискателей."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {sections.map((item) => (
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
          title="Что проверять перед подачей статьи"
          description="Перед отправкой статьи желательно пройти базовый чек-лист проверки журнала."
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {oakChecks.map((item) => (
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
          title="Какие виды научных работ можно объяснить на сайте"
          description="Этот блок полезен для образовательной части платформы."
        />

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {publicationTypes.map((item) => (
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
          title="Какие данные стоит хранить в базе журнала"
          description="Эти поля хорошо подходят для карточки журнала, фильтров и дальнейшей ручной модерации."
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {whatToStore.map((field) => (
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
            Важно: всегда проверяйте журнал по актуальным официальным источникам
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700">
            Платформа может помогать с навигацией по журналам и объяснять
            структуру публикационных требований, но перед подачей статьи нужно
            обязательно сверять данные журнала с официальным сайтом, редакционной
            политикой и актуальными перечнями.
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
            Также не стоит обещать пользователю гарантированную публикацию:
            окончательное решение всегда принимает редакция журнала.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/journals"
              className="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Смотреть каталог
            </Link>
            <Link
              href="/legislation"
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Открыть раздел законодательства
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
