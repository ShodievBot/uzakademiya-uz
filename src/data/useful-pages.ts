import type { LocalizedText, UsefulPage } from "@/types/useful-page";

const lt = (ru: string, uz: string, en: string): LocalizedText => ({
  ru,
  uz,
  en,
});

export const usefulPages: UsefulPage[] = [
  {
    slug: "what-is-orcid",
    title: lt("Что такое ORCID", "ORCID nima", "What is ORCID"),
    cardText: lt(
      "ORCID — это персональный идентификатор исследователя. Он нужен для того, чтобы точно отличать одного автора от другого и связывать его с публикациями, аффилиациями, грантами и другими научными результатами.",
      "ORCID — tadqiqotchining shaxsiy identifikatori. U bir muallifni boshqasidan aniq ajratish va uni maqolalari, affiliasiyasi, grantlari hamda boshqa ilmiy natijalari bilan bog‘lash uchun kerak.",
      "ORCID is a personal researcher identifier. It is used to distinguish one author from another and connect the author with publications, affiliations, grants, and other research outputs."
    ),
    shortText: lt(
      "ORCID — это персональный идентификатор исследователя. Он нужен для того, чтобы точно отличать одного автора от другого и связывать его с публикациями, аффилиациями, грантами и другими научными результатами.",
      "ORCID — tadqiqotchining shaxsiy identifikatori. U bir muallifni boshqasidan aniq ajratish va uni maqolalari, affiliasiyasi, grantlari hamda boshqa ilmiy natijalari bilan bog‘lash uchun kerak.",
      "ORCID is a personal researcher identifier. It is used to distinguish one author from another and connect the author with publications, affiliations, grants, and other research outputs."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "ORCID расшифровывается как Open Researcher and Contributor ID. Это международная система, которая присваивает исследователю уникальный цифровой код и помогает избежать путаницы в авторстве.",
          "ORCID — Open Researcher and Contributor ID degani. Bu tadqiqotchiga noyob raqamli kod beradigan xalqaro tizim bo‘lib, mualliflikdagi chalkashliklarning oldini olishga yordam beradi.",
          "ORCID stands for Open Researcher and Contributor ID. It is an international system that assigns a researcher a unique digital code and helps avoid confusion in authorship."
        ),
      },
      {
        type: "list",
        title: lt(
          "Такой идентификатор особенно полезен, если",
          "Bunday identifikator ayniqsa quyidagi holatlarda foydali",
          "Such an identifier is especially useful if"
        ),
        items: [
          lt("у автора распространённая фамилия;", "muallifning familiyasi juda keng tarqalgan bo‘lsa;", "the author has a common surname;"),
          lt("имя пишется по-разному на разных языках;", "ismi turli tillarda turlicha yozilsa;", "the name is written differently in different languages;"),
          lt("автор меняет место работы;", "muallif ish joyini o‘zgartirsa;", "the author changes institution;"),
          lt("нужно объединить публикации из разных платформ в одну научную историю.", "turli platformalardagi nashrlarni bitta ilmiy tarixga birlashtirish kerak bo‘lsa.", "publications from different platforms need to be combined into one research history."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Пример ORCID", "ORCID misoli", "Example of ORCID"),
        text: lt(
          "https://orcid.org/0000-0002-1825-0097",
          "https://orcid.org/0000-0002-1825-0097",
          "https://orcid.org/0000-0002-1825-0097"
        ),
      },
      {
        type: "list",
        title: lt("ORCID можно указывать", "ORCID quyidagi joylarda ko‘rsatiladi", "ORCID can be used"),
        items: [
          lt("при подаче статьи в журнал;", "jurnalga maqola topshirishda;", "when submitting an article to a journal;"),
          lt("в профиле автора;", "muallif profilida;", "in the author profile;"),
          lt("в заявках на гранты;", "grant arizalarida;", "in grant applications;"),
          lt("в университетских и издательских системах;", "universitet va nashriyot tizimlarida;", "in university and publisher systems;"),
          lt("в метаданных публикации.", "nashr metama’lumotlarida.", "in publication metadata."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Важно понимать: ORCID не заменяет Scopus Author ID или Google Scholar Profile. Это другая система. Но именно ORCID часто используется как универсальный идентификатор, который признают многие издатели и научные платформы.",
          "Muhimi shundaki, ORCID Scopus Author ID yoki Google Scholar Profile o‘rnini bosmaydi. Bu boshqa tizim. Lekin aynan ORCID ko‘plab nashriyotlar va ilmiy platformalar tan oladigan universal identifikator sifatida tez-tez qo‘llanadi.",
          "It is important to understand that ORCID does not replace Scopus Author ID or Google Scholar Profile. It is a different system. However, ORCID is often used as a universal identifier recognized by many publishers and research platforms."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "ORCID — это не показатель качества и не метрика. Это инструмент точной идентификации автора.",
          "ORCID sifat ko‘rsatkichi ham, metrika ham emas. Bu muallifni aniq identifikatsiya qilish vositasidir.",
          "ORCID is not a quality indicator or a metric. It is a tool for accurate author identification."
        ),
      },
    ],
    sourceIds: ["1", "6"],
  },

  {
    slug: "what-is-a-doi",
    title: lt("Что такое DOI", "DOI nima", "What is DOI"),
    cardText: lt(
      "DOI — это постоянный цифровой идентификатор статьи, книги, главы, датасета или другого научного материала. Он нужен для точного поиска, проверки и цитирования публикации.",
      "DOI — maqola, kitob, bo‘lim, dataset yoki boshqa ilmiy materialning doimiy raqamli identifikatori. U nashrni aniq topish, tekshirish va iqtibos qilish uchun kerak.",
      "DOI is a persistent digital identifier for an article, book, chapter, dataset, or other scholarly material. It is used for accurate discovery, verification, and citation."
    ),
    shortText: lt(
      "DOI — это постоянный цифровой идентификатор статьи, книги, главы, датасета или другого научного материала. Он нужен для точного поиска, проверки и цитирования публикации.",
      "DOI — maqola, kitob, bo‘lim, dataset yoki boshqa ilmiy materialning doimiy raqamli identifikatori. U nashrni aniq topish, tekshirish va iqtibos qilish uchun kerak.",
      "DOI is a persistent digital identifier for an article, book, chapter, dataset, or other scholarly material. It is used for accurate discovery, verification, and citation."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "DOI расшифровывается как Digital Object Identifier. Это устойчивый идентификатор объекта, который остаётся с ним даже в том случае, если сайт издателя или ссылка на публикацию меняются.",
          "DOI — Digital Object Identifier degani. Bu obyektning barqaror identifikatori bo‘lib, nashriyot sayti yoki havola o‘zgarsa ham u saqlanib qoladi.",
          "DOI stands for Digital Object Identifier. It is a persistent identifier of an object that remains with it even if the publisher’s website or publication link changes."
        ),
      },
      {
        type: "paragraph",
        title: lt("Пример DOI", "DOI misoli", "Example DOI"),
        text: lt("10.1000/182", "10.1000/182", "10.1000/182"),
      },
      {
        type: "paragraph",
        title: lt("Как ссылка DOI выглядит так", "DOI havolasi quyidagicha ko‘rinadi", "A DOI link looks like this"),
        text: lt(
          "https://doi.org/10.1000/182",
          "https://doi.org/10.1000/182",
          "https://doi.org/10.1000/182"
        ),
      },
      {
        type: "list",
        title: lt("Главные преимущества DOI", "DOI ning asosiy afzalliklari", "Main advantages of DOI"),
        items: [
          lt("он уникален;", "u noyobdir;", "it is unique;"),
          lt("он постоянен;", "u doimiydir;", "it is persistent;"),
          lt("он облегчает поиск публикации;", "u nashrni topishni osonlashtiradi;", "it facilitates discovery of the publication;"),
          lt("он используется в научных ссылках и библиографических системах.", "u ilmiy havolalar va bibliografik tizimlarda qo‘llanadi.", "it is used in scholarly references and bibliographic systems."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "DOI особенно важен для корректного цитирования. Даже если издатель перенёс статью на другой адрес, DOI должен продолжать вести к актуальной версии записи.",
          "DOI to‘g‘ri iqtibos keltirish uchun ayniqsa muhim. Nashriyot maqolani boshqa manzilga ko‘chirgan taqdirda ham, DOI dolzarb yozuvga olib borishi kerak.",
          "DOI is especially important for correct citation. Even if the publisher moves the article to another address, the DOI should continue to lead to the current version of the record."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Но есть важное уточнение: DOI не означает индексацию. Если у статьи есть DOI, это не значит, что она автоматически включена в Scopus, Web of Science или другую международную базу. DOI — это идентификатор объекта, а не подтверждение статуса журнала.",
          "Ammo muhim aniqlik bor: DOI indeksatsiyani anglatmaydi. Maqolada DOI borligi uning avtomatik ravishda Scopus, Web of Science yoki boshqa xalqaro bazaga kiritilganini anglatmaydi. DOI — bu obyekt identifikatori, jurnal maqomining tasdig‘i emas.",
          "However, there is an important clarification: DOI does not mean indexing. If an article has a DOI, that does not mean it is automatically included in Scopus, Web of Science, or another international database. DOI is an object identifier, not confirmation of journal status."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "DOI — это постоянный адрес научного объекта, но не знак качества и не гарантия индексации.",
          "DOI — ilmiy obyektning doimiy manzili, ammo sifat belgisi ham, indeksatsiya kafolati ham emas.",
          "DOI is a persistent address of a scholarly object, but not a quality mark or a guarantee of indexing."
        ),
      },
    ],
    sourceIds: ["2"],
  },

  {
    slug: "what-is-scopus",
    title: lt("Что такое Scopus", "Scopus nima", "What is Scopus"),
    cardText: lt(
      "Scopus — это международная база научной литературы, которая индексирует журналы, статьи, книги, конференции и отслеживает цитирования, авторов и источники.",
      "Scopus — jurnallar, maqolalar, kitoblar, konferensiyalarni indekslaydigan hamda iqtiboslar, mualliflar va manbalarni kuzatadigan xalqaro ilmiy adabiyotlar bazasidir.",
      "Scopus is an international scholarly literature database that indexes journals, articles, books, conference materials, and tracks citations, authors, and sources."
    ),
    shortText: lt(
      "Scopus — это международная база научной литературы, которая индексирует журналы, статьи, книги, конференции и отслеживает цитирования, авторов и источники.",
      "Scopus — jurnallar, maqolalar, kitoblar, konferensiyalarni indekslaydigan hamda iqtiboslar, mualliflar va manbalarni kuzatadigan xalqaro ilmiy adabiyotlar bazasidir.",
      "Scopus is an international scholarly literature database that indexes journals, articles, books, conference materials, and tracks citations, authors, and sources."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Scopus — это одна из крупнейших научных баз данных. Она используется для поиска публикаций, проверки журналов, анализа цитируемости и оценки научной активности авторов и организаций.",
          "Scopus — eng yirik ilmiy ma’lumotlar bazalaridan biridir. U nashrlarni qidirish, jurnallarni tekshirish, iqtiboslilikni tahlil qilish va mualliflar hamda tashkilotlarning ilmiy faolligini baholash uchun ishlatiladi.",
          "Scopus is one of the largest scholarly databases. It is used for finding publications, checking journals, analyzing citations, and evaluating the research activity of authors and institutions."
        ),
      },
      {
        type: "list",
        title: lt("Scopus включает несколько уровней данных", "Scopus bir necha darajadagi ma’lumotlarni o‘z ichiga oladi", "Scopus includes several levels of data"),
        items: [
          lt("источники — журналы, proceedings, book series;", "manbalar — jurnallar, proceedings, book series;", "sources — journals, proceedings, book series;"),
          lt("документы — статьи, обзоры, conference papers, editorials;", "hujjatlar — maqolalar, sharhlar, conference papers, editorials;", "documents — articles, reviews, conference papers, editorials;"),
          lt("авторы — профили с Author ID;", "mualliflar — Author ID ga ega profillar;", "authors — profiles with Author ID;"),
          lt("цитирования — данные о научных ссылках между публикациями.", "iqtiboslar — nashrlar o‘rtasidagi ilmiy havolalar haqidagi ma’lumotlar.", "citations — data about scholarly references between publications."),
        ],
      },
      {
        type: "list",
        title: lt("Scopus нужен авторам и организациям, чтобы", "Scopus mualliflar va tashkilotlarga quyidagilar uchun kerak", "Scopus is used by authors and institutions to"),
        items: [
          lt("проверить, индексируется ли журнал;", "jurnal indekslanadimi-yo‘qmi tekshirish;", "check whether a journal is indexed;"),
          lt("посмотреть метрики журнала;", "jurnal metrikalarini ko‘rish;", "view journal metrics;"),
          lt("найти публикации автора;", "muallif nashrlarini topish;", "find an author’s publications;"),
          lt("оценить цитируемость;", "iqtiboslilikni baholash;", "evaluate citations;"),
          lt("анализировать научную результативность.", "ilmiy natijadorlikni tahlil qilish.", "analyze research performance."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Важно понимать разницу между журналом и статьёй. Если журнал индексируется в Scopus, это ещё не означает, что каждая новая статья появится там сразу. Индексация статьи зависит от передачи метаданных издателем и последующей обработки в базе.",
          "Jurnal bilan maqola o‘rtasidagi farqni tushunish muhim. Agar jurnal Scopus’da indekslansa ham, bu har bir yangi maqola darhol bazada paydo bo‘ladi degani emas. Maqolaning indekslanishi nashriyot metadata yuborishi va keyinchalik bazada qayta ishlanishiga bog‘liq.",
          "It is important to understand the difference between a journal and an article. If a journal is indexed in Scopus, it does not mean every new article will appear there immediately. Indexing of an article depends on metadata delivery by the publisher and subsequent processing in the database."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Также Scopus использует систему отбора и переоценки источников. Поэтому наличие журнала в базе связано не только с подачей данных, но и с требованиями к качеству, регулярности и публикационной политике.",
          "Shuningdek, Scopus manbalarni tanlash va qayta baholash tizimidan foydalanadi. Shu sababli jurnalning bazada mavjudligi faqat ma’lumot yuborishga emas, balki sifat, muntazamlik va nashr siyosati talablariga ham bog‘liq.",
          "Scopus also uses a system of source selection and reevaluation. Therefore, a journal’s presence in the database depends not only on submitted data but also on requirements for quality, regularity, and publication policy."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Scopus — это не просто список журналов, а полноценная научная база с аналитикой по источникам, авторам и цитированиям.",
          "Scopus shunchaki jurnallar ro‘yxati emas, balki manbalar, mualliflar va iqtiboslar bo‘yicha analitikaga ega to‘liq ilmiy bazadir.",
          "Scopus is not just a list of journals but a full scholarly database with analytics on sources, authors, and citations."
        ),
      },
    ],
    sourceIds: ["3", "4", "15"],
  },

  {
    slug: "what-is-journal-quartile",
    title: lt("Что такое квартиль журнала", "Jurnal kvartili nima", "What is a journal quartile"),
    cardText: lt(
      "Квартиль показывает, какое место журнал занимает среди других журналов своей научной категории. Q1 — верхние 25%, Q2 — следующие 25%, Q3 — ниже среднего, Q4 — нижние 25%.",
      "Kvartil jurnalning o‘z ilmiy kategoriyasidagi boshqa jurnallar orasida qaysi o‘rinni egallashini ko‘rsatadi. Q1 — yuqori 25%, Q2 — keyingi 25%, Q3 — o‘rtachadan past, Q4 — quyi 25%.",
      "A quartile shows a journal’s position among other journals in its subject category. Q1 is the top 25%, Q2 the next 25%, Q3 below average, and Q4 the bottom 25%."
    ),
    shortText: lt(
      "Квартиль показывает, какое место журнал занимает среди других журналов своей научной категории. Q1 — верхние 25%, Q2 — следующие 25%, Q3 — ниже среднего, Q4 — нижние 25%.",
      "Kvartil jurnalning o‘z ilmiy kategoriyasidagi boshqa jurnallar orasida qaysi o‘rinni egallashini ko‘rsatadi. Q1 — yuqori 25%, Q2 — keyingi 25%, Q3 — o‘rtachadan past, Q4 — quyi 25%.",
      "A quartile shows a journal’s position among other journals in its subject category. Q1 is the top 25%, Q2 the next 25%, Q3 below average, and Q4 the bottom 25%."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Квартиль — это относительный показатель. Он помогает понять, насколько высоко журнал стоит внутри своей предметной области по сравнению с другими журналами той же категории.",
          "Kvartil nisbiy ko‘rsatkichdir. U jurnalning o‘z fan sohasida shu kategoriya doirasidagi boshqa jurnallarga nisbatan qanchalik yuqori o‘rinda turganini tushunishga yordam beradi.",
          "A quartile is a relative indicator. It helps understand how highly a journal stands within its subject area compared to other journals in the same category."
        ),
      },
      {
        type: "list",
        title: lt("Обычно квартиль понимают так", "Odatda kvartil quyidagicha tushuniladi", "Quartiles are usually understood as follows"),
        items: [
          lt("Q1 — лучшие 25% журналов категории;", "Q1 — kategoriyadagi eng yaxshi 25% jurnallar;", "Q1 — the best 25% of journals in the category;"),
          lt("Q2 — 25–50%;", "Q2 — 25–50%;", "Q2 — 25–50%;"),
          lt("Q3 — 50–75%;", "Q3 — 50–75%;", "Q3 — 50–75%;"),
          lt("Q4 — 75–100%.", "Q4 — 75–100%.", "Q4 — 75–100%."),
        ],
      },
      {
        type: "list",
        title: lt("Почему это важно", "Bu nima uchun muhim", "Why this is important"),
        items: [
          lt("авторы ориентируются на квартиль при выборе журнала;", "mualliflar jurnal tanlashda kvartilga qaraydilar;", "authors use quartile when choosing a journal;"),
          lt("некоторые университеты и комиссии учитывают квартиль в отчётности;", "ayrim universitetlar va komissiyalar hisobotda kvartilni hisobga oladi;", "some universities and commissions consider quartiles in reporting;"),
          lt("он помогает быстро оценить уровень журнала внутри конкретной области.", "u ma’lum soha ichida jurnal darajasini tez baholashga yordam beradi.", "it helps quickly assess a journal’s level within a particular field."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно учитывать", "Nimani hisobga olish muhim", "What is important to consider"),
        text: lt(
          "Квартиль относится к журналу, а не к статье. Сильная статья может выйти и не в Q1-журнале, а слабая — даже в более высоком квартиле.",
          "Kvartil maqolaga emas, jurnalga tegishli. Kuchli maqola Q1 bo‘lmagan jurnalda ham chiqishi mumkin, zaif maqola esa yuqoriroq kvartilda ham uchrashi mumkin.",
          "Quartile refers to the journal, not the article. A strong paper may appear in a non-Q1 journal, and a weak paper may appear even in a higher-quartile journal."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Один журнал может иметь несколько категорий. Если журнал относится сразу к нескольким научным областям, его позиции в них могут отличаться.",
          "Bitta jurnal bir nechta kategoriyaga ega bo‘lishi mumkin. Agar jurnal bir vaqtning o‘zida bir nechta ilmiy sohaga tegishli bo‘lsa, ularning har birida pozitsiyasi farq qilishi mumkin.",
          "A journal may have several categories. If it belongs to multiple subject areas, its positions in them may differ."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Квартиль может меняться. Метрики обновляются, и журнал может перейти из Q2 в Q1 или наоборот.",
          "Kvartil o‘zgarishi mumkin. Metrikalar yangilanadi va jurnal Q2 dan Q1 ga yoki aksincha o‘tishi mumkin.",
          "A quartile can change. Metrics are updated, and a journal may move from Q2 to Q1 or vice versa."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Квартиль — это позиция журнала внутри его категории, а не абсолютная оценка качества любой статьи в нём.",
          "Kvartil — bu jurnalning o‘z kategoriyasidagi o‘rni, undagi har qanday maqola sifatining mutlaq bahosi emas.",
          "A quartile is the position of a journal within its category, not an absolute assessment of the quality of every article in it."
        ),
      },
    ],
    sourceIds: ["5"],
  },

  {
    slug: "google-scholar-h-index",
    title: lt("h-индекс в Google Scholar", "Google Scholar’dagi h-indeks", "h-index in Google Scholar"),
    cardText: lt(
      "В Google Scholar h-индекс автора рассчитывается автоматически на основе его публикаций и количества цитирований. Платформа также показывает общее число цитат и i10-index.",
      "Google Scholar’da muallifning h-indeksi uning nashrlari va iqtiboslar soni asosida avtomatik hisoblanadi. Platforma umumiy iqtiboslar soni va i10-index’ni ham ko‘rsatadi.",
      "In Google Scholar, an author’s h-index is calculated automatically based on publications and citation counts. The platform also shows total citations and the i10-index."
    ),
    shortText: lt(
      "В Google Scholar h-индекс автора рассчитывается автоматически на основе его публикаций и количества цитирований. Платформа также показывает общее число цитат и i10-index.",
      "Google Scholar’da muallifning h-indeksi uning nashrlari va iqtiboslar soni asosida avtomatik hisoblanadi. Platforma umumiy iqtiboslar soni va i10-index’ni ham ko‘rsatadi.",
      "In Google Scholar, an author’s h-index is calculated automatically based on publications and citation counts. The platform also shows total citations and the i10-index."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Google Scholar Profiles позволяют автору собрать свои работы в одном профиле и отслеживать, как часто на них ссылаются другие публикации.",
          "Google Scholar Profiles muallifga o‘z ishlarini bitta profilda jamlash va ularga boshqa nashrlar qanchalik tez-tez havola qilayotganini kuzatish imkonini beradi.",
          "Google Scholar Profiles allow an author to gather works in one profile and track how often they are cited by other publications."
        ),
      },
      {
        type: "list",
        title: lt("Система автоматически считает", "Tizim avtomatik ravishda hisoblaydi", "The system automatically calculates"),
        items: [
          lt("total citations — общее число цитирований;", "total citations — umumiy iqtiboslar soni;", "total citations — total number of citations;"),
          lt("h-index;", "h-index;", "h-index;"),
          lt("i10-index;", "i10-index;", "i10-index;"),
          lt("отдельные показатели для всего периода и для последних лет.", "butun davr va so‘nggi yillar uchun alohida ko‘rsatkichlar.", "separate indicators for the whole period and recent years."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что означает h-индекс", "h-indeks nimani anglatadi", "What h-index means"),
        text: lt(
          "Если у автора h-index = 10, это значит, что у него есть как минимум 10 публикаций, каждая из которых была процитирована не менее 10 раз.",
          "Agar muallifning h-index’i 10 bo‘lsa, bu uning kamida 10 ta nashri borligini va ularning har biri kamida 10 martadan iqtibos qilinganini anglatadi.",
          "If an author has an h-index of 10, it means the author has at least 10 publications, each cited at least 10 times."
        ),
      },
      {
        type: "paragraph",
        title: lt("Почему h-индекс в Google Scholar часто выше", "Nega Google Scholar’dagi h-indeks ko‘pincha yuqoriroq", "Why h-index in Google Scholar is often higher"),
        text: lt(
          "Google Scholar индексирует очень широкий круг источников: статьи, материалы конференций, диссертации, репозитории, некоторые книги и главы, а также версии научных текстов, размещённые в сети.",
          "Google Scholar juda keng doiradagi manbalarni indekslaydi: maqolalar, konferensiya materiallari, dissertatsiyalar, repozitoriylar, ayrim kitoblar va bo‘limlar, shuningdek internetda joylashtirilgan ilmiy matn versiyalari.",
          "Google Scholar indexes a very broad range of sources: articles, conference materials, dissertations, repositories, some books and chapters, and versions of scholarly texts posted online."
        ),
      },
      {
        type: "list",
        title: lt("Из-за этого платформа часто показывает", "Shu sababli platforma ko‘pincha quyidagilarni ko‘rsatadi", "Because of this, the platform often shows"),
        items: [
          lt("больше публикаций;", "ko‘proq nashrlar;", "more publications;"),
          lt("больше цитирований;", "ko‘proq iqtiboslar;", "more citations;"),
          lt("более высокий h-индекс, чем более строгие базы вроде Scopus.", "Scopus kabi qat’iyroq bazalarga nisbatan balandroq h-indeks.", "a higher h-index than stricter databases such as Scopus."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно учитывать", "Nimani hisobga olish kerak", "What is important to consider"),
        text: lt(
          "Google Scholar удобен, но не всегда идеально чист с точки зрения метаданных. Иногда в профиль могут попадать лишние публикации, дубликаты или статьи других авторов с похожим именем. Поэтому профиль нужно периодически проверять вручную.",
          "Google Scholar qulay, ammo metadata nuqtai nazaridan har doim ham ideal darajada toza emas. Ba’zan profilga ortiqcha nashrlar, dublikatlar yoki ismi o‘xshash boshqa mualliflarning maqolalari tushib qolishi mumkin. Shuning uchun profilni vaqti-vaqti bilan qo‘lda tekshirib turish kerak.",
          "Google Scholar is convenient, but from a metadata perspective it is not always perfectly clean. Sometimes extra publications, duplicates, or articles by other authors with similar names may appear in the profile. Therefore, the profile should be checked manually from time to time."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "h-индекс в Google Scholar полезен для общей видимости научного профиля, но его нужно воспринимать с учётом широкой и не всегда идеально точной индексации.",
          "Google Scholar’dagi h-indeks ilmiy profilning umumiy ko‘rinishi uchun foydali, ammo uni keng va har doim ham mutlaqo aniq bo‘lmagan indeksatsiyani hisobga olgan holda talqin qilish kerak.",
          "The h-index in Google Scholar is useful for general visibility of a research profile, but it should be interpreted with the broad and not always perfectly accurate indexing in mind."
        ),
      },
    ],
    sourceIds: ["7"],
  },

  {
    slug: "scopus-h-index",
    title: lt("h-индекс в Scopus", "Scopus’dagi h-indeks", "h-index in Scopus"),
    cardText: lt(
      "В Scopus h-индекс рассчитывается по тем публикациям автора, которые индексируются именно в базе Scopus. Он показывает, сколько работ автора получили не менее такого же числа цитирований.",
      "Scopus’da h-indeks aynan shu bazada indekslangan muallif nashrlari bo‘yicha hisoblanadi. U muallifning nechta ishi kamida shuncha marta iqtibos olganini ko‘rsatadi.",
      "In Scopus, the h-index is calculated based on the author’s publications indexed specifically in the Scopus database. It shows how many works have received at least that same number of citations."
    ),
    shortText: lt(
      "В Scopus h-индекс рассчитывается по тем публикациям автора, которые индексируются именно в базе Scopus. Он показывает, сколько работ автора получили не менее такого же числа цитирований.",
      "Scopus’da h-indeks aynan shu bazada indekslangan muallif nashrlari bo‘yicha hisoblanadi. U muallifning nechta ishi kamida shuncha marta iqtibos olganini ko‘rsatadi.",
      "In Scopus, the h-index is calculated based on the author’s publications indexed specifically in the Scopus database. It shows how many works have received at least that same number of citations."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Scopus формирует авторский профиль и на его основе показывает ключевые показатели: количество документов, число цитирований, научные области, Scopus Author ID и h-index.",
          "Scopus muallif profilini shakllantiradi va uning asosida asosiy ko‘rsatkichlarni ko‘rsatadi: hujjatlar soni, iqtiboslar soni, ilmiy sohalar, Scopus Author ID va h-index.",
          "Scopus creates an author profile and on that basis shows key indicators: number of documents, citations, subject areas, Scopus Author ID, and h-index."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Смысл h-индекса здесь такой же, как и в других системах: если у автора h-index = 8, это значит, что у него есть как минимум 8 публикаций, каждая из которых процитирована не менее 8 раз.",
          "Bu yerda h-indeksning ma’nosi boshqa tizimlardagidek: agar muallifning h-index’i 8 bo‘lsa, bu uning kamida 8 ta nashri borligini va ularning har biri kamida 8 martadan iqtibos qilinganini anglatadi.",
          "The meaning of the h-index here is the same as in other systems: if an author has an h-index of 8, it means the author has at least 8 publications, each cited at least 8 times."
        ),
      },
      {
        type: "list",
        title: lt("Главное отличие Scopus в том, что", "Scopus’ning asosiy farqi shundaki", "The main difference of Scopus is that"),
        items: [
          lt("учитываются только документы, попавшие в Scopus;", "faqat Scopus’ga tushgan hujjatlar hisobga olinadi;", "only documents included in Scopus are counted;"),
          lt("учитываются только те цитирования, которые видит Scopus;", "faqat Scopus ko‘radigan iqtiboslar hisobga olinadi;", "only citations seen by Scopus are counted;"),
          lt("итог зависит от корректности авторского профиля.", "yakuniy natija muallif profilining to‘g‘riligiga bog‘liq.", "the result depends on the correctness of the author profile."),
        ],
      },
      {
        type: "list",
        title: lt("Иногда у автора в Scopus бывают проблемы", "Ba’zan muallifda Scopus’da quyidagi muammolar bo‘ladi", "Sometimes authors in Scopus have problems"),
        items: [
          lt("часть публикаций не прикреплена;", "nashrlarning bir qismi biriktirilmagan bo‘ladi;", "some publications are not attached;"),
          lt("профиль разделён на несколько карточек;", "profil bir nechta kartochkaga bo‘linib ketgan bo‘ladi;", "the profile is split into several records;"),
          lt("в профиль попали чужие документы;", "profilga boshqa birovning hujjatlari tushib qoladi;", "other people’s documents appear in the profile;"),
          lt("статья есть в базе, но не отображается у нужного автора.", "maqola bazada bo‘ladi, lekin kerakli muallifda ko‘rinmaydi.", "the article is in the database but does not appear under the correct author."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Поэтому h-индекс в Scopus полезен не только как метрика, но и как сигнал: если он выглядит странно, стоит проверить сам профиль автора.",
          "Shu sababli Scopus’dagi h-indeks nafaqat metrika, balki signal sifatida ham foydalidir: agar u g‘alati ko‘rinsa, muallif profilining o‘zini tekshirish kerak.",
          "Therefore, the h-index in Scopus is useful not only as a metric but also as a signal: if it looks unusual, the author profile itself should be checked."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "h-индекс в Scopus — это показатель по данным самой базы Scopus, поэтому он может отличаться от других платформ.",
          "Scopus’dagi h-indeks aynan Scopus bazasi ma’lumotlariga asoslangan ko‘rsatkichdir, shu sababli u boshqa platformalardan farq qilishi mumkin.",
          "The h-index in Scopus is a metric based on Scopus database data itself, so it may differ from other platforms."
        ),
      },
    ],
    sourceIds: ["6"],
  },
  {
    slug: "difference-between-google-scholar-and-scopus-h-index",
    title: lt(
      "h-индекс в Google Scholar и в Scopus: в чём разница",
      "Google Scholar va Scopus’dagi h-indeks: farqi nimada",
      "h-index in Google Scholar and Scopus: what is the difference"
    ),
    cardText: lt(
      "h-индекс в Google Scholar и в Scopus часто не совпадает, потому что эти системы индексируют разный объём публикаций и цитирований. Google Scholar обычно показывает более широкое покрытие, а Scopus — более строгую и структурированную выборку.",
      "Google Scholar va Scopus’dagi h-indeks ko‘pincha bir xil bo‘lmaydi, chunki bu tizimlar turli hajmdagi nashrlar va iqtiboslarni indekslaydi. Google Scholar odatda kengroq qamrovni, Scopus esa qat’iyroq va tartiblangan tanlovni ko‘rsatadi.",
      "The h-index in Google Scholar and Scopus often differs because these systems index different volumes of publications and citations. Google Scholar usually shows broader coverage, while Scopus reflects a stricter and more structured selection."
    ),
    shortText: lt(
      "h-индекс в Google Scholar и в Scopus часто не совпадает, потому что эти системы индексируют разный объём публикаций и цитирований. Google Scholar обычно показывает более широкое покрытие, а Scopus — более строгую и структурированную выборку.",
      "Google Scholar va Scopus’dagi h-indeks ko‘pincha bir xil bo‘lmaydi, chunki bu tizimlar turli hajmdagi nashrlar va iqtiboslarni indekslaydi. Google Scholar odatda kengroq qamrovni, Scopus esa qat’iyroq va tartiblangan tanlovni ko‘rsatadi.",
      "The h-index in Google Scholar and Scopus often differs because these systems index different volumes of publications and citations. Google Scholar usually shows broader coverage, while Scopus reflects a stricter and more structured selection."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Многие авторы сравнивают свои показатели в разных системах и удивляются, почему цифры отличаются. Это нормально: базы работают по разным принципам.",
          "Ko‘plab mualliflar turli tizimlardagi ko‘rsatkichlarini taqqoslab, nega sonlar farq qilishiga hayron bo‘ladilar. Bu tabiiy holat: bazalar turli tamoyillar asosida ishlaydi.",
          "Many authors compare their metrics across systems and wonder why the numbers differ. This is normal: the databases operate on different principles."
        ),
      },
      {
        type: "paragraph",
        title: lt("Google Scholar", "Google Scholar", "Google Scholar"),
        text: lt(
          "Google Scholar индексирует большой массив научного контента из интернета: журнальные статьи, материалы конференций, диссертации, репозитории, рукописи на университетских сайтах, а иногда и разные версии одной и той же работы.",
          "Google Scholar internetdagi katta hajmdagi ilmiy kontentni indekslaydi: jurnal maqolalari, konferensiya materiallari, dissertatsiyalar, repozitoriylar, universitet saytlaridagi qo‘lyozmalar va ba’zan bir ishning turli versiyalarini ham.",
          "Google Scholar indexes a large body of scholarly content from the internet: journal articles, conference materials, dissertations, repositories, manuscripts on university websites, and sometimes different versions of the same work."
        ),
      },
      {
        type: "list",
        title: lt(
          "Из-за этого Google Scholar часто показывает",
          "Shu sababli Google Scholar ko‘pincha quyidagilarni ko‘rsatadi",
          "Because of this, Google Scholar often shows"
        ),
        items: [
          lt("больше публикаций;", "ko‘proq nashrlar;", "more publications;"),
          lt("больше цитирований;", "ko‘proq iqtiboslar;", "more citations;"),
          lt("более высокий h-индекс.", "yuqoriroq h-indeks.", "a higher h-index."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Scopus", "Scopus", "Scopus"),
        text: lt(
          "Scopus работает более строго: включает только отобранные источники, учитывает свои собственные профили авторов и считает цитирования внутри своей базы.",
          "Scopus qat’iyroq ishlaydi: faqat tanlab olingan manbalarni qamrab oladi, o‘zining muallif profillarini yuritadi va iqtiboslarni o‘z bazasi ichida hisoblaydi.",
          "Scopus operates more strictly: it includes only selected sources, uses its own author profiles, and counts citations within its own database."
        ),
      },
      {
        type: "list",
        title: lt(
          "В результате у автора в Scopus обычно",
          "Natijada Scopus’da muallifda odatda",
          "As a result, in Scopus an author usually has"
        ),
        items: [
          lt("меньше публикаций;", "kamroq nashrlar;", "fewer publications;"),
          lt("меньше цитат;", "kamroq iqtiboslar;", "fewer citations;"),
          lt("более консервативный h-индекс.", "konservativroq h-indeks.", "a more conservative h-index."),
        ],
      },
      {
        type: "paragraph",
        title: lt(
          "Что это значит на практике",
          "Bu amalda nimani anglatadi",
          "What this means in practice"
        ),
        text: lt(
          "Нельзя просто взять цифру из Google Scholar и ожидать, что она совпадёт со Scopus. Это не ошибка и не обязательно проблема в профиле. Чаще всего это следствие разной политики индексации.",
          "Google Scholar’dagi raqamni olib, u Scopus bilan aynan bir xil bo‘lishini kutib bo‘lmaydi. Bu xato ham emas, profil muammosi ham bo‘lishi shart emas. Ko‘pincha bu turli indeksatsiya siyosatining natijasidir.",
          "You cannot simply take a number from Google Scholar and expect it to match Scopus. This is not necessarily an error or a profile problem. Most often it is a result of different indexing policies."
        ),
      },
      {
        type: "list",
        title: lt("Что использовать", "Nimadan foydalanish kerak", "What to use"),
        items: [
          lt(
            "Google Scholar полезен для широкой видимости и общего представления о цитируемости.",
            "Google Scholar keng ko‘rinuvchanlik va iqtiboslilik haqida umumiy tasavvur uchun foydali.",
            "Google Scholar is useful for broad visibility and a general view of citation impact."
          ),
          lt(
            "Scopus чаще используют для формальной аналитики, отчётности и оценки индексируемых публикаций.",
            "Scopus ko‘proq rasmiy tahlil, hisobot va indekslanadigan nashrlarni baholashda qo‘llanadi.",
            "Scopus is more often used for formal analytics, reporting, and evaluation of indexed publications."
          ),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Если h-индекс в Google Scholar выше, чем в Scopus, это обычная ситуация, а не признак ошибки сам по себе.",
          "Agar Google Scholar’dagi h-indeks Scopus’dagidan yuqori bo‘lsa, bu odatiy holat bo‘lib, o‘z-o‘zidan xato belgisi emas.",
          "If the h-index in Google Scholar is higher than in Scopus, this is a normal situation and not by itself a sign of an error."
        ),
      },
    ],
    sourceIds: ["3", "4", "6", "7"],
  },
  {
    slug: "what-is-oak",
    title: lt(
      "Журналы, рекомендованные ВАК / ОАК",
      "VAK / OAK tavsiya qilgan jurnallar",
      "Journals recommended by VAK / OAK"
    ),
    cardText: lt(
      "Журналы ВАК / ОАК — это издания, включённые в официальный перечень, признанный для публикации основных научных результатов диссертаций. Для Узбекистана ориентироваться нужно на официальный перечень OAK.",
      "VAK / OAK jurnallari — dissertatsiyalarning asosiy ilmiy natijalarini chop etish uchun tan olingan rasmiy ro‘yxatga kiritilgan nashrlardir. O‘zbekiston uchun OAKning rasmiy ro‘yxatiga tayanish kerak.",
      "VAK / OAK journals are publications included in an official list recognized for publishing the main scientific results of dissertations. For Uzbekistan, one should rely on the official OAK list."
    ),
    shortText: lt(
      "Журналы ВАК / ОАК — это издания, включённые в официальный перечень, признанный для публикации основных научных результатов диссертаций. Для Узбекистана ориентироваться нужно на официальный перечень OAK.",
      "VAK / OAK jurnallari — dissertatsiyalarning asosiy ilmiy natijalarini chop etish uchun tan olingan rasmiy ro‘yxatga kiritilgan nashrlardir. O‘zbekiston uchun OAKning rasmiy ro‘yxatiga tayanish kerak.",
      "VAK / OAK journals are publications included in an official list recognized for publishing the main scientific results of dissertations. For Uzbekistan, one should rely on the official OAK list."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Когда говорят «журнал ВАК» или «журнал ОАК», обычно имеют в виду, что издание входит в официальный список рекомендованных научных изданий. Такой статус особенно важен для тех, кто готовит диссертацию или работает в системе академической аттестации.",
          "«VAK jurnali» yoki «OAK jurnali» deyilganda, odatda nashr tavsiya etilgan ilmiy jurnallarning rasmiy ro‘yxatiga kirgani nazarda tutiladi. Bunday maqom ayniqsa dissertatsiya tayyorlayotganlar yoki akademik attestatsiya tizimida ishlayotganlar uchun muhim.",
          "When people say “VAK journal” or “OAK journal,” they usually mean that the publication is included in the official list of recommended scientific journals. This status is especially important for those preparing a dissertation or working within the academic attestation system."
        ),
      },
      {
        type: "list",
        title: lt(
          "Для автора значение этого статуса в том, что публикация может учитываться",
          "Muallif uchun bu maqomning ahamiyati shundaki, nashr quyidagi holatlarda hisobga olinishi mumkin",
          "For an author, this status matters because the publication may be counted"
        ),
        items: [
          lt("при защите диссертации;", "dissertatsiya himoyasida;", "during dissertation defense;"),
          lt("при отчётности по научной работе;", "ilmiy ish bo‘yicha hisobotlarda;", "in research reporting;"),
          lt("при подтверждении публикационной активности;", "nashr faolligini tasdiqlashda;", "when confirming publication activity;"),
          lt("в требованиях отдельных научных и образовательных структур.", "ayrim ilmiy va ta’lim tuzilmalari talablarida.", "in the requirements of certain scientific and educational bodies."),
        ],
      },
      {
        type: "paragraph",
        title: lt(
          "Нельзя доверять только словам журнала",
          "Faqat jurnalning o‘z so‘ziga ishonib bo‘lmaydi",
          "Do not rely only on the journal’s own claim"
        ),
        text: lt(
          "Если на сайте журнала написано, что он «входит в перечень ВАК/ОАК», это желательно проверять по официальному источнику, а не по рекламному описанию.",
          "Agar jurnal saytida u «VAK/OAK ro‘yxatiga kiradi» deb yozilgan bo‘lsa, buni reklama matni orqali emas, rasmiy manba orqali tekshirish kerak.",
          "If a journal website says that it “is included in the VAK/OAK list,” this should be checked against an official source rather than taken from a promotional description."
        ),
      },
      {
        type: "paragraph",
        title: lt("Перечни могут обновляться", "Ro‘yxatlar yangilanib turadi", "Lists may be updated"),
        text: lt(
          "Журнал мог входить в список раньше, но его текущий статус надо проверять по актуальной версии перечня или по официальному сайту уполномоченного органа.",
          "Jurnal ilgari ro‘yxatda bo‘lgan bo‘lishi mumkin, ammo uning hozirgi maqomini ro‘yxatning amaldagi versiyasi yoki vakolatli organning rasmiy sayti orqali tekshirish kerak.",
          "A journal may have been in the list earlier, but its current status should be checked against the current version of the list or the official website of the authorized body."
        ),
      },
      {
        type: "paragraph",
        title: lt("ВАК/ОАК и Scopus — это разное", "VAK/OAK va Scopus — bu boshqa-boshqa tizimlar", "VAK/OAK and Scopus are different"),
        text: lt(
          "Журнал может входить в перечень ВАК/ОАК, но не индексироваться в Scopus; индексироваться в Scopus, но не быть в перечне ВАК/ОАК. Это разные системы признания и разные задачи.",
          "Jurnal VAK/OAK ro‘yxatida bo‘lishi, lekin Scopus’da indekslanmasligi mumkin; yoki aksincha Scopus’da bo‘lib, VAK/OAK ro‘yxatida bo‘lmasligi mumkin. Bu tan olishning turli tizimlari va turli vazifalardir.",
          "A journal may be included in the VAK/OAK list but not indexed in Scopus, or it may be indexed in Scopus but not included in the VAK/OAK list. These are different recognition systems with different purposes."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Статус ВАК/ОАК надо проверять по официальному перечню и по дате проверки, а не только по информации на сайте журнала.",
          "VAK/OAK maqomini faqat jurnal saytiga qarab emas, balki rasmiy ro‘yxat va tekshirish sanasi bo‘yicha aniqlash kerak.",
          "VAK/OAK status should be checked using the official list and the date of verification, not only the information on the journal’s website."
        ),
      },
    ],
    sourceIds: ["19"],
  },
  {
    slug: "publication-and-indexing-stages",
    title: lt(
      "Хронология публикации статьи в журнале Scopus",
      "Scopus jurnalida maqola chop etilish xronologiyasi",
      "Publication timeline of an article in a Scopus journal"
    ),
    cardText: lt(
      "Публикация статьи в журнале, индексируемом Scopus, — это не один шаг, а целая цепочка: подача, редакционная проверка, рецензирование, правки, принятие, техническая подготовка, онлайн-публикация и только потом — появление записи в базе.",
      "Scopus indekslaydigan jurnalda maqola chop etilishi bitta bosqich emas, balki butun zanjirdir: topshirish, tahririy tekshiruv, taqriz, tuzatishlar, qabul, texnik tayyorlash, onlayn nashr va shundan keyingina bazada paydo bo‘lish.",
      "Publishing an article in a Scopus-indexed journal is not a single step but a whole chain: submission, editorial screening, peer review, revisions, acceptance, technical preparation, online publication, and only then appearance in the database."
    ),
    shortText: lt(
      "Публикация статьи в журнале, индексируемом Scopus, — это не один шаг, а целая цепочка: подача, редакционная проверка, рецензирование, правки, принятие, техническая подготовка, онлайн-публикация и только потом — появление записи в базе.",
      "Scopus indekslaydigan jurnalda maqola chop etilishi bitta bosqich emas, balki butun zanjirdir: topshirish, tahririy tekshiruv, taqriz, tuzatishlar, qabul, texnik tayyorlash, onlayn nashr va shundan keyingina bazada paydo bo‘lish.",
      "Publishing an article in a Scopus-indexed journal is not a single step but a whole chain: submission, editorial screening, peer review, revisions, acceptance, technical preparation, online publication, and only then appearance in the database."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Авторы часто воспринимают публикацию как один момент: «статья вышла». На практике у статьи есть несколько последовательных стадий, и каждая из них имеет свой статус.",
          "Mualliflar ko‘pincha nashrni bir lahza sifatida qabul qiladilar: «maqola chiqdi». Amalda esa maqolaning ketma-ket bir necha bosqichi bo‘ladi va har birining o‘z maqomi bor.",
          "Authors often perceive publication as a single moment: “the article came out.” In practice, an article has several successive stages, and each has its own status."
        ),
      },
      {
        type: "list",
        title: lt("Основные стадии", "Asosiy bosqichlar", "Main stages"),
        items: [
          lt("1. Подача рукописи — автор отправляет статью через editorial system журнала.", "1. Qo‘lyozmani topshirish — muallif maqolani jurnalning editorial system’i orqali yuboradi.", "1. Manuscript submission — the author sends the article through the journal’s editorial system."),
          lt("2. Первичная редакционная проверка — проверяют тему, комплектность файлов, технические требования, этику и оформление.", "2. Dastlabki tahririy tekshiruv — mavzu, fayllar to‘liqligi, texnik talablar, etika va rasmiylashtirish tekshiriladi.", "2. Initial editorial screening — the topic, completeness of files, technical requirements, ethics, and formatting are checked."),
          lt("3. Назначение редактора — рукопись получает редактор или член редколлегии.", "3. Muharrir tayinlash — qo‘lyozma muharrir yoki tahrir hay’ati a’zosiga beriladi.", "3. Editor assignment — the manuscript is assigned to an editor or editorial board member."),
          lt("4. Peer review — статья уходит внешним рецензентам.", "4. Peer review — maqola tashqi taqrizchilarga yuboriladi.", "4. Peer review — the article goes to external reviewers."),
          lt("5. Решение — reject, minor revision, major revision или accept.", "5. Qaror — reject, minor revision, major revision yoki accept.", "5. Decision — reject, minor revision, major revision, or accept."),
          lt("6. Производственный этап — copyediting, typesetting, proofing и подготовка к публикации.", "6. Ishlab chiqarish bosqichi — copyediting, typesetting, proofing va nashrga tayyorlash.", "6. Production stage — copyediting, typesetting, proofing, and preparation for publication."),
          lt("7. Online first / Article in Press — статья появляется на сайте раньше окончательного выпуска.", "7. Online first / Article in Press — maqola yakuniy sondan oldin saytda chiqadi.", "7. Online first / Article in Press — the article appears online before final issue assignment."),
          lt("8. Финальная публикация — статья закрепляется за томом, выпуском, страницами или другой финальной формой.", "8. Yakuniy nashr — maqola tom, son, sahifalar yoki boshqa yakuniy shaklga biriktiriladi.", "8. Final publication — the article is assigned to a volume, issue, pages, or another final publication form."),
          lt("9. Появление в Scopus — после передачи данных издателем и обработки записи статья появляется как индексируемый документ в базе.", "9. Scopus’da paydo bo‘lish — nashriyot ma’lumot yuborgani va yozuv qayta ishlangandan keyin maqola bazada indekslanadigan hujjat sifatida ko‘rinadi.", "9. Appearance in Scopus — after metadata transfer by the publisher and record processing, the article appears as an indexed document in the database."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Статусы «принята», «опубликована онлайн», «вышла в номере» и «проиндексировалась в Scopus» — это не одно и то же.",
          "«Qabul qilingan», «onlayn chop etilgan», «sonda chiqqan» va «Scopus’da indekslangan» maqomlari bir xil narsa emas.",
          "The statuses “accepted,” “published online,” “assigned to an issue,” and “indexed in Scopus” are not the same thing."
        ),
      },
    ],
    sourceIds: ["11", "13", "18", "20"],
  },
  {
    slug: "publication-frequency",
    title: lt(
      "Частота публикаций в журналах",
      "Jurnallarda nashr chastotasi",
      "Publication frequency in journals"
    ),
    cardText: lt(
      "Частота публикации показывает, как часто журнал выпускает новые номера или размещает финальные материалы: ежемесячно, ежеквартально, раз в полгода, ежегодно или по модели continuous publication.",
      "Nashr chastotasi jurnal yangi sonlarni yoki yakuniy materiallarni qanchalik tez-tez chiqarishini ko‘rsatadi: har oy, har chorak, yarim yilda bir, yilda bir yoki continuous publication modeli bo‘yicha.",
      "Publication frequency shows how often a journal releases new issues or posts final materials: monthly, quarterly, semiannually, annually, or under a continuous publication model."
    ),
    shortText: lt(
      "Частота публикации показывает, как часто журнал выпускает новые номера или размещает финальные материалы: ежемесячно, ежеквартально, раз в полгода, ежегодно или по модели continuous publication.",
      "Nashr chastotasi jurnal yangi sonlarni yoki yakuniy materiallarni qanchalik tez-tez chiqarishini ko‘rsatadi: har oy, har chorak, yarim yilda bir, yilda bir yoki continuous publication modeli bo‘yicha.",
      "Publication frequency shows how often a journal releases new issues or posts final materials: monthly, quarterly, semiannually, annually, or under a continuous publication model."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Под частотой публикации обычно понимают график работы журнала. Например: monthly, bimonthly, quarterly, semiannual, annual, continuous publication.",
          "Nashr chastotasi deganda odatda jurnalning ish jadvali tushuniladi. Masalan: monthly, bimonthly, quarterly, semiannual, annual, continuous publication.",
          "Publication frequency usually means the working schedule of a journal. For example: monthly, bimonthly, quarterly, semiannual, annual, or continuous publication."
        ),
      },
      {
        type: "list",
        title: lt("Для автора это важно по двум причинам", "Bu muallif uchun ikki sababga ko‘ra muhim", "This matters to an author for two reasons"),
        items: [
          lt("1. Частота влияет на ожидания по срокам.", "1. Chastota muddatlar bo‘yicha kutilmalarga ta’sir qiladi.", "1. Frequency affects expectations about timing."),
          lt("2. Частота говорит о стабильности источника.", "2. Chastota manbaning barqarorligi haqida ma’lumot beradi.", "2. Frequency says something about source stability."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Если журнал выходит два раза в год, то даже после принятия статьи финальное включение в выпуск может занять больше времени, чем в ежемесячном журнале.",
          "Agar jurnal yiliga ikki marta chiqsa, maqola qabul qilingandan keyin ham uni yakuniy songa kiritish har oy chiqadigan jurnaldagidan ko‘proq vaqt olishi mumkin.",
          "If a journal is published twice a year, then even after acceptance the final placement of an article into an issue may take longer than in a monthly journal."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Для научного журнала регулярность выпуска — важный признак нормальной издательской работы. В требованиях Scopus регулярность публикации тоже имеет значение.",
          "Ilmiy jurnal uchun sonlarning muntazam chiqishi normal nashriyot ishining muhim belgisidir. Scopus talablarida ham nashr muntazamligi ahamiyatga ega.",
          "For a scientific journal, regularity of publication is an important sign of normal publishing practice. In Scopus requirements, publication regularity also matters."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Но есть важное уточнение: сегодня многие журналы работают не только по модели «номер за номером». Статья может сначала появиться онлайн, а потом уже попасть в выпуск.",
          "Ammo muhim aniqlik bor: bugun ko‘plab jurnallar faqat «sondan songa» modeli bo‘yicha ishlamaydi. Maqola avval onlayn chiqib, keyin songa kiritilishi mumkin.",
          "But there is an important clarification: today many journals do not work only under an “issue by issue” model. An article may appear online first and only later be assigned to an issue."
        ),
      },
      {
        type: "list",
        title: lt("Что это значит для автора", "Bu muallif uchun nimani anglatadi", "What this means for the author"),
        items: [
          lt("график журнала не гарантирует мгновенную публикацию;", "jurnal jadvali darhol nashrni kafolatlamaydi;", "the journal schedule does not guarantee immediate publication;"),
          lt("низкая частота не всегда плоха;", "past chastota har doim ham yomon emas;", "low frequency is not always bad;"),
          lt("online first может ускорить появление статьи на сайте, даже если выпуск выйдет позже;", "online first maqolaning saytda tezroq paydo bo‘lishini ta’minlashi mumkin, hatto son keyinroq chiqsa ham;", "online first may speed up the appearance of the article on the site even if the issue comes later;"),
          lt("реальный срок зависит не только от периодичности, но и от редакционного цикла.", "haqiqiy muddat nafaqat davriylikka, balki tahririy siklga ham bog‘liq.", "the actual timing depends not only on periodicity but also on the editorial cycle."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Частота публикации — это ритм работы журнала, но не точный прогноз даты выхода конкретной статьи.",
          "Nashr chastotasi jurnal ishining ritmi, ammo aniq maqolaning chiqish sanasi bo‘yicha aniq prognoz emas.",
          "Publication frequency is the rhythm of a journal’s work, not an exact forecast of the release date of a specific article."
        ),
      },
    ],
    sourceIds: ["4", "13", "15"],
  },
  {
    slug: "what-is-source-id",
    title: lt(
      "Что такое Source ID в Scopus",
      "Scopus’da Source ID nima",
      "What is Source ID in Scopus"
    ),
    cardText: lt(
      "Source ID — это внутренний идентификатор журнала или другого источника в системе Scopus. Он помогает точно различать источники и связывать данные без путаницы в названиях.",
      "Source ID — Scopus tizimidagi jurnal yoki boshqa manbaning ichki identifikatori. U manbalarni aniq farqlash va nomlardagi chalkashliksiz ma’lumotlarni bog‘lashga yordam beradi.",
      "Source ID is an internal identifier of a journal or another source in the Scopus system. It helps accurately distinguish sources and connect data without confusion in titles."
    ),
    shortText: lt(
      "Source ID — это внутренний идентификатор журнала или другого источника в системе Scopus. Он помогает точно различать источники и связывать данные без путаницы в названиях.",
      "Source ID — Scopus tizimidagi jurnal yoki boshqa manbaning ichki identifikatori. U manbalarni aniq farqlash va nomlardagi chalkashliksiz ma’lumotlarni bog‘lashga yordam beradi.",
      "Source ID is an internal identifier of a journal or another source in the Scopus system. It helps accurately distinguish sources and connect data without confusion in titles."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "В Scopus используются разные типы идентификаторов: Author ID — для автора; Source ID — для журнала, серии или другого источника; идентификаторы документа — для конкретной публикации.",
          "Scopus’da turli identifikatorlar ishlatiladi: Author ID — muallif uchun; Source ID — jurnal, seriya yoki boshqa manba uchun; hujjat identifikatorlari — aniq nashr uchun.",
          "Scopus uses different kinds of identifiers: Author ID for an author; Source ID for a journal, series, or another source; and document identifiers for a specific publication."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Source ID нужен для точной технической идентификации источника внутри базы. Это особенно полезно, когда у журналов похожие названия, название журнала менялось, нужно сверять данные между разными системами или журнал используется в каталоге, CRM, базе или аналитике.",
          "Source ID bazaning ichida manbani aniq texnik identifikatsiya qilish uchun kerak. Bu ayniqsa jurnallarning nomlari o‘xshash bo‘lganda, jurnal nomi o‘zgarganda, turli tizimlar o‘rtasida ma’lumotlarni solishtirish kerak bo‘lganda yoki jurnal katalog, CRM, baza yoki analitikada ishlatilganda foydalidir.",
          "Source ID is needed for accurate technical identification of a source within the database. This is especially useful when journals have similar names, when a journal title has changed, when data must be matched across systems, or when a journal is used in a catalog, CRM, database, or analytics."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Для обычного автора Source ID редко является повседневным инструментом, но для сайта о журналах это очень полезное поле. Оно помогает связывать карточку журнала с конкретной записью в Scopus и уменьшает риск ошибок.",
          "Oddiy muallif uchun Source ID kundalik vosita bo‘lib xizmat qilmaydi, ammo jurnallar haqidagi sayt uchun bu juda foydali maydondir. U jurnal kartasini Scopus’dagi aniq yozuv bilan bog‘lashga va xatolar xavfini kamaytirishga yordam beradi.",
          "For an ordinary author, Source ID is rarely an everyday tool, but for a journal-focused website it is a very useful field. It helps link a journal card to a specific record in Scopus and reduces the risk of mistakes."
        ),
      },
      {
        type: "list",
        title: lt(
          "Важно не путать Source ID с другими идентификаторами",
          "Source ID’ni boshqa identifikatorlar bilan aralashtirmaslik kerak",
          "It is important not to confuse Source ID with other identifiers"
        ),
        items: [
          lt(
            "ISSN — это международный номер сериального издания;",
            "ISSN — bu davriy nashrning xalqaro raqami;",
            "ISSN is the international serial number of a continuing publication;"
          ),
          lt(
            "DOI — идентификатор статьи или другого объекта;",
            "DOI — maqola yoki boshqa obyekt identifikatori;",
            "DOI is an identifier of an article or another object;"
          ),
          lt(
            "Source ID — внутренний ключ источника в Scopus.",
            "Source ID — Scopus’dagi manbaning ichki kaliti.",
            "Source ID is the internal key of the source in Scopus."
          ),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Source ID — это идентификатор самого журнала в Scopus, а не статьи и не автора.",
          "Source ID — Scopus’dagi jurnalning o‘zi uchun identifikator, maqola yoki muallifniki emas.",
          "Source ID is the identifier of the journal itself in Scopus, not of the article and not of the author."
        ),
      },
    ],
    sourceIds: ["21", "5"],
  },
  {
    slug: "internal-and-external-review",
    title: lt(
      "Внутренние и внешние рецензии статьи",
      "Maqolaning ichki va tashqi taqrizlari",
      "Internal and external review of an article"
    ),
    cardText: lt(
      "В публикационном процессе обычно есть два уровня оценки статьи: внутренняя редакционная проверка и внешнее научное рецензирование. Сначала статью оценивает редакция, затем — при необходимости — независимые специалисты по теме.",
      "Nashr jarayonida odatda maqolani baholashning ikki darajasi bo‘ladi: ichki tahririy tekshiruv va tashqi ilmiy taqriz. Avval maqolani tahririyat ko‘radi, keyin zarur bo‘lsa mavzu bo‘yicha mustaqil mutaxassislar baholaydi.",
      "In the publication process there are usually two levels of evaluation: internal editorial screening and external scholarly peer review. First the article is assessed by the editorial office, then—if needed—by independent subject experts."
    ),
    shortText: lt(
      "В публикационном процессе обычно есть два уровня оценки статьи: внутренняя редакционная проверка и внешнее научное рецензирование. Сначала статью оценивает редакция, затем — при необходимости — независимые специалисты по теме.",
      "Nashr jarayonida odatda maqolani baholashning ikki darajasi bo‘ladi: ichki tahririy tekshiruv va tashqi ilmiy taqriz. Avval maqolani tahririyat ko‘radi, keyin zarur bo‘lsa mavzu bo‘yicha mustaqil mutaxassislar baholaydi.",
      "In the publication process there are usually two levels of evaluation: internal editorial screening and external scholarly peer review. First the article is assessed by the editorial office, then—if needed—by independent subject experts."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Авторы часто называют всё одним словом — «рецензия», но на практике этапы различаются.",
          "Mualliflar ko‘pincha hammasini bitta so‘z bilan — «taqriz» deb ataydilar, ammo amalda bosqichlar farqlanadi.",
          "Authors often call everything simply “review,” but in practice the stages differ."
        ),
      },
      {
        type: "paragraph",
        title: lt("Внутренняя проверка", "Ichki tekshiruv", "Internal screening"),
        text: lt(
          "Это стартовый этап, когда рукопись просматривает редакция журнала. Здесь оценивают: соответствует ли статья профилю журнала; соблюдены ли требования к оформлению; достаточно ли базового качества; нет ли очевидных проблем с этикой, структурой или подачей.",
          "Bu boshlang‘ich bosqich bo‘lib, unda qo‘lyozmani jurnal tahririyati ko‘rib chiqadi. Bu yerda quyidagilar baholanadi: maqola jurnal profiliga mos keladimi; rasmiylashtirish talablari bajarilganmi; dastlabki sifat yetarlimi; etika, tuzilma yoki taqdimot bo‘yicha yaqqol muammolar yo‘qmi.",
          "This is the initial stage when the manuscript is screened by the journal editorial office. They evaluate whether the article fits the journal’s scope, whether formatting requirements are met, whether the basic quality is sufficient, and whether there are obvious problems with ethics, structure, or presentation."
        ),
      },
      {
        type: "list",
        title: lt(
          "Такой этап могут называть",
          "Bu bosqich quyidagicha atalishi mumkin",
          "This stage may be called"
        ),
        items: [
          lt("editorial screening;", "editorial screening;", "editorial screening;"),
          lt("initial quality check;", "initial quality check;", "initial quality check;"),
          lt("desk evaluation.", "desk evaluation.", "desk evaluation."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Иногда статья отклоняется уже здесь, без отправки внешним рецензентам.",
          "Ba’zan maqola tashqi taqrizchilarga yuborilmasdan aynan shu bosqichda rad etiladi.",
          "Sometimes a paper is rejected already at this stage, without being sent to external reviewers."
        ),
      },
      {
        type: "paragraph",
        title: lt("Внешнее рецензирование", "Tashqi taqriz", "External peer review"),
        text: lt(
          "Если статья проходит редакционный фильтр, её могут направить профильным экспертам. Именно они оценивают научную новизну, корректность методов, логику результатов, силу выводов и общую научную ценность работы.",
          "Agar maqola tahririy filtrdan o‘tsa, u soha bo‘yicha mutaxassis ekspertlarga yuborilishi mumkin. Aynan ular ilmiy yangilikni, metodlarning to‘g‘riligini, natijalar mantiqini, xulosalarning kuchini va ishning umumiy ilmiy qiymatini baholaydilar.",
          "If the article passes the editorial filter, it may be sent to subject experts. They evaluate scientific novelty, methodological correctness, the logic of results, the strength of conclusions, and the overall scholarly value of the work."
        ),
      },
      {
        type: "list",
        title: lt(
          "Какие бывают модели review",
          "Review modellari qanday bo‘ladi",
          "What review models exist"
        ),
        items: [
          lt("single anonymized review;", "single anonymized review;", "single anonymized review;"),
          lt("double anonymized review;", "double anonymized review;", "double anonymized review;"),
          lt("triple anonymized review;", "triple anonymized review;", "triple anonymized review;"),
          lt("open review.", "open review.", "open review."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Для автора важно понимать, что «молчание от рецензентов» не всегда означает задержку. Статья может ещё находиться на внутреннем этапе и даже не быть отправленной на внешнюю экспертизу.",
          "Muallif uchun «taqrizchilardan sukut» har doim ham kechikishni anglatmasligini tushunish muhim. Maqola hali ichki bosqichda bo‘lishi va tashqi ekspertizaga umuman yuborilmagan bo‘lishi mumkin.",
          "It is important for the author to understand that “silence from reviewers” does not always mean delay. The article may still be at the internal stage and may not even have been sent out for external review yet."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Внутренняя проверка отвечает за редакционную пригодность статьи, а внешнее рецензирование — за научную оценку содержания.",
          "Ichki tekshiruv maqolaning tahririy yaroqliligi uchun, tashqi taqriz esa mazmunning ilmiy bahosi uchun javob beradi.",
          "Internal screening is responsible for editorial suitability, while external peer review is responsible for the scientific evaluation of the content."
        ),
      },
    ],
    sourceIds: ["11", "14", "20"],
  },
  {
    slug: "what-is-antiplagiarism",
    title: lt(
      "Антиплагиат в статьях",
      "Maqolalardagi antiplagiat",
      "Antiplagiarism in articles"
    ),
    cardText: lt(
      "Проверка на заимствования — важная часть публикационного процесса, но её нельзя сводить к одному «безопасному проценту». Редакция оценивает не только объём совпадений, но и их характер, контекст и место в тексте.",
      "O‘zlashtirishlarni tekshirish nashr jarayonining muhim qismi, ammo uni bitta «xavfsiz foiz»ga keltirib bo‘lmaydi. Tahririyat nafaqat mos tushgan hajmni, balki ularning turi, konteksti va matndagi o‘rnini ham baholaydi.",
      "Similarity checking is an important part of the publication process, but it cannot be reduced to a single “safe percentage.” Editors evaluate not only the volume of overlap but also its nature, context, and location in the text."
    ),
    shortText: lt(
      "Проверка на заимствования — важная часть публикационного процесса, но её нельзя сводить к одному «безопасному проценту». Редакция оценивает не только объём совпадений, но и их характер, контекст и место в тексте.",
      "O‘zlashtirishlarni tekshirish nashr jarayonining muhim qismi, ammo uni bitta «xavfsiz foiz»ga keltirib bo‘lmaydi. Tahririyat nafaqat mos tushgan hajmni, balki ularning turi, konteksti va matndagi o‘rnini ham baholaydi.",
      "Similarity checking is an important part of the publication process, but it cannot be reduced to a single “safe percentage.” Editors evaluate not only the volume of overlap but also its nature, context, and location in the text."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Один из самых популярных мифов среди авторов — будто существует универсальный допустимый процент совпадений. На практике это неверно.",
          "Mualliflar orasidagi eng keng tarqalgan afsonalardan biri — go‘yoki mos tushishlarning universal ruxsat etilgan foizi mavjudligi. Amalda bu noto‘g‘ri.",
          "One of the most common myths among authors is that there is a universal acceptable percentage of overlap. In practice, this is not true."
        ),
      },
      {
        type: "list",
        title: lt(
          "Редакторы смотрят не просто на цифру, а на то",
          "Muharrirlar faqat raqamga emas, balki quyidagilarga qaraydilar",
          "Editors look not just at the number but at"
        ),
        items: [
          lt("где именно найдены совпадения;", "mos tushishlar aynan qayerda topilganiga;", "where exactly the overlaps were found;"),
          lt("какие фрагменты совпадают;", "qaysi parchalar mos tushayotganiga;", "which fragments match;"),
          lt("это цитаты, общепринятые формулировки или реальные заимствования;", "ular iqtibosmi, odatiy formulirovkami yoki haqiqiy ko‘chirmalarmi;", "whether they are quotations, conventional phrases, or actual copying;"),
          lt("насколько совпадения влияют на оригинальность текста.", "mos tushishlar matnning originalligiga qanchalik ta’sir qilishiga.", "how much the overlaps affect the originality of the text."),
        ],
      },
      {
        type: "list",
        title: lt("Например", "Masalan", "For example"),
        items: [
          lt("повторяющиеся технические формулировки в методах могут не быть серьёзной проблемой;", "metodlar bo‘limidagi takrorlanuvchi texnik iboralar jiddiy muammo bo‘lmasligi mumkin;", "repeated technical wording in methods may not be a serious problem;"),
          lt("большие совпадающие куски введения, обсуждения или выводов уже вызывают вопросы.", "kirish, muhokama yoki xulosalardagi katta mos tushgan bo‘laklar esa savol tug‘diradi.", "large matching chunks in the introduction, discussion, or conclusions raise concerns."),
        ],
      },
      {
        type: "list",
        title: lt("Чем пользуются журналы", "Jurnallar nimalardan foydalanadi", "What journals use"),
        items: [
          lt("iThenticate;", "iThenticate;", "iThenticate;"),
          lt("Crossref Similarity Check.", "Crossref Similarity Check.", "Crossref Similarity Check."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Но важно понимать: программа выявляет совпадения, а не выносит окончательный этический вердикт. Решение всегда остаётся за редакцией.",
          "Ammo shuni tushunish kerak: dastur mos tushishlarni aniqlaydi, lekin yakuniy etik hukm chiqarmaydi. Qaror har doim tahririyatda qoladi.",
          "But it is important to understand: a tool detects overlaps, it does not make the final ethical judgment. The decision always remains with the editorial office."
        ),
      },
      {
        type: "list",
        title: lt("Что важно автору", "Muallif uchun muhim jihatlar", "What matters for the author"),
        items: [
          lt("высокий процент не всегда означает плагиат;", "yuqori foiz har doim ham plagiat degani emas;", "a high percentage does not always mean plagiarism;"),
          lt("низкий процент не всегда означает безопасность;", "past foiz har doim ham xavfsizlikni anglatmaydi;", "a low percentage does not always mean safety;"),
          lt("одинаково важны и цифра, и содержание;", "raqam ham, mazmun ham birdek muhim;", "both the number and the content matter;"),
          lt("лучше заранее проверять текст на заимствования и аккуратно оформлять цитаты.", "matnni oldindan tekshirish va iqtiboslarni ehtiyotkorlik bilan rasmiylashtirish ma’qul.", "it is better to check the text in advance and format quotations carefully."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Антиплагиат — это не игра в проценты, а проверка того, насколько текст действительно оригинален и корректно оформлен.",
          "Antiplagiat foizlar o‘yini emas, balki matn qanchalik original va to‘g‘ri rasmiylashtirilganini tekshirishdir.",
          "Antiplagiarism is not a game of percentages, but an assessment of how genuinely original and properly presented a text is."
        ),
      },
    ],
    sourceIds: ["10", "12"],
  },
  {
    slug: "ai-in-scientific-writing",
    title: lt(
      "Использование ИИ в научных статьях",
      "Ilmiy maqolalarda SI’dan foydalanish",
      "Using AI in scientific articles"
    ),
    cardText: lt(
      "ИИ можно использовать как вспомогательный инструмент, но только прозрачно и ответственно. Искусственный интеллект не может быть автором статьи, а вся ответственность за текст всегда остаётся за человеком.",
      "Sun’iy intellektdan yordamchi vosita sifatida foydalanish mumkin, ammo faqat shaffof va mas’uliyatli tarzda. Sun’iy intellekt maqola muallifi bo‘la olmaydi, matn uchun barcha javobgarlik esa doimo insonga tegishli bo‘ladi.",
      "AI may be used as a supporting tool, but only transparently and responsibly. Artificial intelligence cannot be the author of an article, and all responsibility for the text always remains with a human."
    ),
    shortText: lt(
      "ИИ можно использовать как вспомогательный инструмент, но только прозрачно и ответственно. Искусственный интеллект не может быть автором статьи, а вся ответственность за текст всегда остаётся за человеком.",
      "Sun’iy intellektdan yordamchi vosita sifatida foydalanish mumkin, ammo faqat shaffof va mas’uliyatli tarzda. Sun’iy intellekt maqola muallifi bo‘la olmaydi, matn uchun barcha javobgarlik esa doimo insonga tegishli bo‘ladi.",
      "AI may be used as a supporting tool, but only transparently and responsibly. Artificial intelligence cannot be the author of an article, and all responsibility for the text always remains with a human."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Современные журналы всё чаще сталкиваются с использованием ИИ-инструментов при подготовке рукописей. В базовом виде подход такой: использовать ИИ можно, но скрывать это нельзя, если инструмент реально участвовал в создании значимой части текста, анализа или визуального контента.",
          "Zamonaviy jurnallar qo‘lyozma tayyorlashda SI vositalaridan foydalanish holatlariga tobora ko‘proq duch kelmoqda. Asosiy yondashuv shunday: SI’dan foydalanish mumkin, ammo agar vosita matn, tahlil yoki vizual kontentning muhim qismini yaratishda haqiqatan qatnashgan bo‘lsa, buni yashirib bo‘lmaydi.",
          "Modern journals increasingly encounter the use of AI tools in manuscript preparation. The basic approach is this: AI may be used, but it should not be hidden if the tool actually participated in creating a significant part of the text, analysis, or visual content."
        ),
      },
      {
        type: "list",
        title: lt("Что обычно допустимо", "Odatda nimaga ruxsat beriladi", "What is usually acceptable"),
        items: [
          lt("для языкового редактирования;", "til tahriri uchun;", "for language editing;"),
          lt("для улучшения структуры текста;", "matn tuzilmasini yaxshilash uchun;", "for improving text structure;"),
          lt("для черновой формулировки абзацев;", "abzatslarni dastlabki shakllantirish uchun;", "for drafting paragraphs;"),
          lt("для помощи в техническом анализе, если это раскрыто и проверено автором.", "agar bu ochiqlansa va muallif tomonidan tekshirilsa, texnik tahlilda yordam uchun.", "for assistance in technical analysis, if disclosed and verified by the author."),
        ],
      },
      {
        type: "list",
        title: lt("Что считается проблемой", "Nima muammo hisoblanadi", "What is considered problematic"),
        items: [
          lt("указывать ИИ как автора;", "SI’ni muallif sifatida ko‘rsatish;", "listing AI as an author;"),
          lt("скрывать использование ИИ там, где это нужно раскрывать;", "oshkor qilish kerak bo‘lgan joyda SI’dan foydalanishni yashirish;", "hiding the use of AI where disclosure is required;"),
          lt("вставлять непроверенные факты, ссылки или выводы;", "tekshirilmagan faktlar, havolalar yoki xulosalarni kiritish;", "including unverified facts, references, or conclusions;"),
          lt("передавать конфиденциальную рукопись в сервисы, которые могут нарушить правила конфиденциальности.", "maxfiy qo‘lyozmani maxfiylik qoidalarini buzishi mumkin bo‘lgan servislarga yuborish.", "sending a confidential manuscript to services that may violate confidentiality rules."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "COPE и WAME прямо указывают, что ИИ не может считаться автором и не может нести ответственность за научную публикацию. Ответственность несут только реальные авторы.",
          "COPE va WAME SI muallif hisoblanmasligini va ilmiy nashr uchun javobgarlikni zimmasiga ola olmasligini bevosita ko‘rsatadi. Javobgarlik faqat haqiqiy mualliflarda bo‘ladi.",
          "COPE and WAME explicitly state that AI cannot be regarded as an author and cannot bear responsibility for a scholarly publication. Responsibility belongs only to real human authors."
        ),
      },
      {
        type: "list",
        title: lt("Что делать автору", "Muallif nima qilishi kerak", "What the author should do"),
        items: [
          lt("проверить правила конкретного журнала;", "aniq jurnal qoidalarini tekshirish;", "check the rules of the specific journal;"),
          lt("при необходимости указать это в разделе Methods, Disclosure, Acknowledgements или Author Note;", "zarur bo‘lsa buni Methods, Disclosure, Acknowledgements yoki Author Note bo‘limida ko‘rsatish;", "if necessary, disclose this in Methods, Disclosure, Acknowledgements, or an Author Note;"),
          lt("внимательно перепроверить все формулировки, факты и ссылки.", "barcha formulirovkalar, faktlar va havolalarni sinchiklab qayta tekshirish.", "carefully re-check all wording, facts, and references."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "ИИ — это инструмент, а не соавтор. Пользоваться им можно только с прозрачным раскрытием и полной проверкой результата.",
          "SI — bu vosita, hammuallif emas. Undan faqat shaffof oshkor qilish va natijani to‘liq tekshirish bilan foydalanish mumkin.",
          "AI is a tool, not a co-author. It may be used only with transparent disclosure and full verification of the result."
        ),
      },
    ],
    sourceIds: ["9", "11", "16"],
  },
  {
    slug: "pre-publication-and-online-first",
    title: lt(
      "Предварительная публикация статьи на сайте журнала",
      "Jurnal saytida maqolaning dastlabki e’loni",
      "Preliminary publication of an article on the journal website"
    ),
    cardText: lt(
      "Статья может появиться на сайте журнала ещё до выхода окончательного номера. Такие версии часто называют Article in Press, journal pre-proof или online first.",
      "Maqola jurnal saytida yakuniy son chiqishidan oldin ham paydo bo‘lishi mumkin. Bunday versiyalar ko‘pincha Article in Press, journal pre-proof yoki online first deb ataladi.",
      "An article may appear on a journal website before the final issue is released. Such versions are often called Article in Press, journal pre-proof, or online first."
    ),
    shortText: lt(
      "Статья может появиться на сайте журнала ещё до выхода окончательного номера. Такие версии часто называют Article in Press, journal pre-proof или online first.",
      "Maqola jurnal saytida yakuniy son chiqishidan oldin ham paydo bo‘lishi mumkin. Bunday versiyalar ko‘pincha Article in Press, journal pre-proof yoki online first deb ataladi.",
      "An article may appear on a journal website before the final issue is released. Such versions are often called Article in Press, journal pre-proof, or online first."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Во многих современных журналах публикация идёт поэтапно. После принятия и базовой издательской подготовки статья может быть размещена онлайн до того, как получит окончательное место в выпуске.",
          "Ko‘plab zamonaviy jurnallarda nashr bosqichma-bosqich amalga oshadi. Maqola qabul qilingach va dastlabki nashriyot tayyorlovidan so‘ng, u yakuniy son joyiga ega bo‘lishidan oldin onlayn joylashtirilishi mumkin.",
          "In many modern journals, publication proceeds in stages. After acceptance and basic publisher preparation, the article may be placed online before it receives its final place in an issue."
        ),
      },
      {
        type: "list",
        title: lt(
          "Такая публикация означает, что статья уже",
          "Bunday nashr shuni anglatadiki, maqola allaqachon",
          "Such publication means that the article has already"
        ),
        items: [
          lt("прошла рецензирование;", "taqrizdan o‘tgan;", "passed peer review;"),
          lt("принята редакцией;", "tahririyat tomonidan qabul qilingan;", "been accepted by the editorial office;"),
          lt("подготовлена к публичному размещению;", "ommaviy joylashtirishga tayyorlangan;", "been prepared for public posting;"),
          lt("доступна читателям.", "o‘quvchilar uchun ochiq.", "become available to readers."),
        ],
      },
      {
        type: "list",
        title: lt(
          "Но это ещё не всегда финальная версия записи",
          "Lekin bu har doim ham yakuniy versiya emas",
          "But this is not always the final version of record"
        ),
        items: [
          lt("могут отсутствовать окончательные страницы;", "yakuniy sahifalar bo‘lmasligi mumkin;", "final page numbers may be missing;"),
          lt("финальная вёрстка;", "yakuniy maket bo‘lmasligi mumkin;", "final layout may be missing;"),
          lt("том и номер;", "tom va son bo‘lmasligi mumkin;", "volume and issue may be absent;"),
          lt("полное оформление supplementary materials;", "supplementary materials to‘liq rasmiylashtirilmagan bo‘lishi mumkin;", "supplementary materials may not yet be fully finalized;"),
          lt("окончательная версия ссылок и навигации.", "havolalar va navigatsiyaning yakuniy versiyasi bo‘lmasligi mumkin.", "the final version of links and navigation may still be pending."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Для автора это важный этап, потому что статья уже видна, её уже можно найти и нередко уже можно цитировать по DOI и году онлайн-публикации.",
          "Muallif uchun bu muhim bosqich, chunki maqola allaqachon ko‘rinadi, uni topish mumkin va ko‘pincha DOI hamda onlayn e’lon qilingan yil bo‘yicha iqtibos keltirish ham mumkin bo‘ladi.",
          "For the author, this is an important stage because the article is already visible, searchable, and often citable by DOI and online publication year."
        ),
      },
      {
        type: "paragraph",
        title: lt("Почему возникает путаница", "Nega chalkashlik yuzaga keladi", "Why confusion arises"),
        text: lt(
          "Многие считают, что если статья уже опубликована на сайте, значит весь процесс завершён. На самом деле это часто только промежуточная, хотя и официальная публикационная стадия.",
          "Ko‘pchilik maqola saytda e’lon qilingan bo‘lsa, demak butun jarayon tugadi deb o‘ylaydi. Aslida esa bu ko‘pincha faqat oraliq, garchi rasmiy nashr bosqichi bo‘lsa ham.",
          "Many people assume that if the article is already published on the website, the whole process is complete. In reality, this is often only an intermediate, though official, publication stage."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Предварительная онлайн-публикация означает, что статья уже стала публичной, но её окончательное место в выпуске может быть назначено позже.",
          "Dastlabki onlayn nashr maqola allaqachon ommaga ochilganini anglatadi, ammo uning sondagi yakuniy o‘rni keyinroq belgilanishi mumkin.",
          "Preliminary online publication means that the article has already become public, but its final place in an issue may be assigned later."
        ),
      },
    ],
    sourceIds: ["13", "18"],
  },
  {
    slug: "online-publication-and-issue-release",
    title: lt(
      "Онлайн-публикация и выход номера — не одно и то же",
      "Onlayn nashr va son chiqishi — bir xil emas",
      "Online publication and issue release are not the same thing"
    ),
    cardText: lt(
      "Статья может появиться на сайте журнала раньше, чем выйдет сам номер, том или сборник. Онлайн-публикация не всегда означает, что выпуск уже завершён.",
      "Maqola jurnal saytida son, tom yoki to‘plam chiqishidan oldinroq paydo bo‘lishi mumkin. Onlayn nashr har doim ham butun son tayyor bo‘lganini anglatmaydi.",
      "An article may appear on the journal website before the issue, volume, or collection itself is released. Online publication does not always mean that the issue is already complete."
    ),
    shortText: lt(
      "Статья может появиться на сайте журнала раньше, чем выйдет сам номер, том или сборник. Онлайн-публикация не всегда означает, что выпуск уже завершён.",
      "Maqola jurnal saytida son, tom yoki to‘plam chiqishidan oldinroq paydo bo‘lishi mumkin. Onlayn nashr har doim ham butun son tayyor bo‘lganini anglatmaydi.",
      "An article may appear on the journal website before the issue, volume, or collection itself is released. Online publication does not always mean that the issue is already complete."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Один из частых вопросов авторов: если статья уже опубликована на сайте журнала, значит ли это, что номер уже вышел? Не обязательно.",
          "Mualliflarning tez-tez beradigan savollaridan biri: agar maqola jurnal saytida allaqachon e’lon qilingan bo‘lsa, bu son ham chiqqanini anglatadimi? Shart emas.",
          "One of the frequent questions from authors is: if an article is already published on the journal website, does that mean the issue has already been released? Not necessarily."
        ),
      },
      {
        type: "list",
        title: lt(
          "Во многих издательских моделях статья проходит несколько стадий",
          "Ko‘plab nashriyot modellarida maqola bir necha bosqichdan o‘tadi",
          "In many publishing models, an article goes through several stages"
        ),
        items: [
          lt("accepted;", "accepted;", "accepted;"),
          lt("online first / article in press;", "online first / article in press;", "online first / article in press;"),
          lt("final version of record;", "final version of record;", "final version of record;"),
          lt("later issue assignment.", "later issue assignment.", "later issue assignment."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Это означает, что статья может быть уже доступна читателям и даже цитироваться, но её окончательное место в томе, выпуске или сборнике будет назначено позже.",
          "Bu shuni anglatadiki, maqola o‘quvchilar uchun allaqachon ochiq bo‘lishi va hatto iqtibos qilinishi mumkin, ammo uning tom, son yoki to‘plamdagi yakuniy o‘rni keyinroq belgilanadi.",
          "This means that the article may already be available to readers and even be citable, but its final place in a volume, issue, or collection will be assigned later."
        ),
      },
      {
        type: "list",
        title: lt(
          "Для автора это важно по нескольким причинам",
          "Bu muallif uchun bir necha sababga ko‘ra muhim",
          "This matters to the author for several reasons"
        ),
        items: [
          lt("онлайн-версия может появиться за недели или месяцы до выхода номера;", "onlayn versiya son chiqishidan haftalar yoki oylar oldin paydo bo‘lishi mumkin;", "the online version may appear weeks or months before the issue release;"),
          lt("печатная версия или полный выпуск могут выйти позднее;", "bosma versiya yoki to‘liq son keyinroq chiqishi mumkin;", "the print version or full issue may come later;"),
          lt("наличие статьи на сайте ещё не означает, что опубликован весь комплект материалов номера.", "maqolaning saytda borligi butun son materiallari e’lon qilinganini anglatmaydi.", "the presence of the article on the website does not mean the full set of issue materials has been published."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "В современной научной публикации это нормальная практика. Журнал может сначала опубликовать готовую статью онлайн, а затем включить её в номер согласно своему графику.",
          "Zamonaviy ilmiy nashr amaliyotida bu normal holat. Jurnal avval tayyor maqolani onlayn e’lon qilib, keyin o‘z jadvaliga muvofiq songa kiritishi mumkin.",
          "In modern scholarly publishing this is normal practice. A journal may first publish a completed article online and then include it in an issue according to its schedule."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Онлайн-публикация статьи и выход полного номера журнала — это разные этапы одного процесса.",
          "Maqolaning onlayn nashri va jurnalning to‘liq soni chiqishi — bitta jarayonning turli bosqichlaridir.",
          "Online publication of an article and release of the full journal issue are different stages of the same process."
        ),
      },
    ],
    sourceIds: ["13", "18"],
  },
  {
    slug: "article-versions",
    title: lt(
      "Типы статьи: публикационные версии",
      "Maqolaning nashr versiyalari",
      "Publication versions of an article"
    ),
    cardText: lt(
      "Одна и та же научная работа может существовать в нескольких версиях: от авторской рукописи до окончательной опубликованной статьи. Это важно для понимания статуса текста, цитирования и правил распространения.",
      "Bir xil ilmiy ish bir nechta versiyada mavjud bo‘lishi mumkin: muallif qo‘lyozmasidan tortib yakuniy chop etilgan maqolagacha. Bu matn maqomini, iqtibos keltirishni va tarqatish qoidalarini tushunish uchun muhim.",
      "The same scholarly work may exist in several versions: from the author’s manuscript to the final published article. This is important for understanding the text’s status, citation, and sharing rules."
    ),
    shortText: lt(
      "Одна и та же научная работа может существовать в нескольких версиях: от авторской рукописи до окончательной опубликованной статьи. Это важно для понимания статуса текста, цитирования и правил распространения.",
      "Bir xil ilmiy ish bir nechta versiyada mavjud bo‘lishi mumkin: muallif qo‘lyozmasidan tortib yakuniy chop etilgan maqolagacha. Bu matn maqomini, iqtibos keltirishni va tarqatish qoidalarini tushunish uchun muhim.",
      "The same scholarly work may exist in several versions: from the author’s manuscript to the final published article. This is important for understanding the text’s status, citation, and sharing rules."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Авторы часто смешивают два разных понятия: тип статьи по содержанию — например, research article, review, editorial; и версия статьи по стадии публикации — manuscript, proof, version of record и так далее.",
          "Mualliflar ko‘pincha ikki xil tushunchani aralashtirib yuboradilar: mazmuniga ko‘ra maqola turi — masalan, research article, review, editorial; va nashr bosqichiga ko‘ra maqola versiyasi — manuscript, proof, version of record va hokazo.",
          "Authors often mix up two different concepts: the content type of an article—for example, research article, review, editorial—and the publication-stage version of the article, such as manuscript, proof, or version of record."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Если говорить именно о публикационных версиях, международная практика различает несколько основных стадий.",
          "Agar aynan nashr versiyalari haqida gapiradigan bo‘lsak, xalqaro amaliyot bir nechta asosiy bosqichlarni ajratadi.",
          "If we speak specifically about publication versions, international practice distinguishes several main stages."
        ),
      },
      {
        type: "list",
        title: lt("Основные публикационные версии", "Asosiy nashr versiyalari", "Main publication versions"),
        items: [
          lt("Author’s Original — исходная авторская версия;", "Author’s Original — muallifning dastlabki versiyasi;", "Author’s Original — the original author version;"),
          lt("Submitted Manuscript Under Review — версия, отправленная в журнал и находящаяся на рассмотрении;", "Submitted Manuscript Under Review — jurnalga yuborilgan va ko‘rib chiqilayotgan versiya;", "Submitted Manuscript Under Review — the version submitted to the journal and under review;"),
          lt("Accepted Manuscript — текст после научного принятия, но до финального издательского оформления;", "Accepted Manuscript — ilmiy qabuldan keyingi, lekin yakuniy nashriyot rasmiylashtiruvidan oldingi matn;", "Accepted Manuscript — the text after scholarly acceptance but before final publisher formatting;"),
          lt("Proof — версия после вёрстки и редакционно-издательской обработки, направленная на проверку;", "Proof — maket va tahririy-nashriyot ishlovidan keyingi, tekshirish uchun yuborilgan versiya;", "Proof — the version after layout and editorial processing sent for checking;"),
          lt("Version of Record — окончательная официально опубликованная версия;", "Version of Record — yakuniy rasmiy chop etilgan versiya;", "Version of Record — the final officially published version;"),
          lt("Corrected Version of Record — исправленная опубликованная версия;", "Corrected Version of Record — tuzatilgan chop etilgan versiya;", "Corrected Version of Record — the corrected published version;"),
          lt("Enhanced Version of Record — опубликованная версия с дополнительными цифровыми материалами или улучшениями.", "Enhanced Version of Record — qo‘shimcha raqamli materiallar yoki yaxshilanishlar bilan chop etilgan versiya.", "Enhanced Version of Record — the published version with additional digital materials or enhancements."),
        ],
      },
      {
        type: "list",
        title: lt("Понимание этих стадий важно, потому что", "Bu bosqichlarni tushunish muhim, chunki", "Understanding these stages is important because"),
        items: [
          lt("не каждая версия одинаково подходит для цитирования;", "har bir versiya iqtibos keltirish uchun bir xil darajada mos kelmaydi;", "not every version is equally suitable for citation;"),
          lt("разные журналы по-разному разрешают распространять preprint, accepted manuscript и финальную публикацию;", "turli jurnallar preprint, accepted manuscript va yakuniy nashrni turlicha tarqatishga ruxsat beradi;", "different journals allow sharing of preprints, accepted manuscripts, and final publications in different ways;"),
          lt("для отчётности и академических процедур может иметь значение, о какой версии идёт речь.", "hisobot va akademik jarayonlar uchun qaysi versiya nazarda tutilayotgani muhim bo‘lishi mumkin.", "for reporting and academic procedures, it may matter which version is being referred to."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Научная статья — это не всегда один неизменный файл. У неё могут быть разные версии, и каждая из них имеет свой статус.",
          "Ilmiy maqola har doim ham bitta o‘zgarmas fayl emas. Uning turli versiyalari bo‘lishi mumkin va har birining o‘z maqomi bor.",
          "A scientific article is not always one unchanging file. It may have different versions, and each has its own status."
        ),
      },
    ],
    sourceIds: ["18"],
  },
  {
    slug: "scopus-document-types",
    title: lt(
      "Типы документов в Scopus",
      "Scopus’dagi hujjat turlari",
      "Document types in Scopus"
    ),
    cardText: lt(
      "Scopus делит материалы не только на статьи, но и на разные типы документов: article, review, conference paper, editorial, letter, note и другие. Тип документа влияет на то, как публикация отображается и интерпретируется в базе.",
      "Scopus materiallarni faqat maqola sifatida emas, balki turli hujjat turlariga ajratadi: article, review, conference paper, editorial, letter, note va boshqalar. Hujjat turi nashrning bazada qanday ko‘rinishi va talqin qilinishiga ta’sir qiladi.",
      "Scopus classifies materials not only as articles but into different document types: article, review, conference paper, editorial, letter, note, and others. The document type affects how a publication appears and is interpreted in the database."
    ),
    shortText: lt(
      "Scopus делит материалы не только на статьи, но и на разные типы документов: article, review, conference paper, editorial, letter, note и другие. Тип документа влияет на то, как публикация отображается и интерпретируется в базе.",
      "Scopus materiallarni faqat maqola sifatida emas, balki turli hujjat turlariga ajratadi: article, review, conference paper, editorial, letter, note va boshqalar. Hujjat turi nashrning bazada qanday ko‘rinishi va talqin qilinishiga ta’sir qiladi.",
      "Scopus classifies materials not only as articles but into different document types: article, review, conference paper, editorial, letter, note, and others. The document type affects how a publication appears and is interpreted in the database."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "В Scopus каждая запись относится к определённому document type. Это помогает системе правильно каталогизировать материалы, строить аналитику и рассчитывать показатели.",
          "Scopus’da har bir yozuv ma’lum bir document type’ga tegishli bo‘ladi. Bu tizimga materiallarni to‘g‘ri kataloglash, analitika tuzish va ko‘rsatkichlarni hisoblashga yordam beradi.",
          "In Scopus, each record belongs to a specific document type. This helps the system catalogue materials correctly, build analytics, and calculate indicators."
        ),
      },
      {
        type: "list",
        title: lt(
          "Среди наиболее распространённых типов документов в Scopus",
          "Scopus’dagi eng ko‘p uchraydigan hujjat turlari",
          "Among the most common document types in Scopus"
        ),
        items: [
          lt("Article", "Article", "Article"),
          lt("Article-in-Press", "Article-in-Press", "Article-in-Press"),
          lt("Review", "Review", "Review"),
          lt("Conference Paper", "Conference Paper", "Conference Paper"),
          lt("Editorial", "Editorial", "Editorial"),
          lt("Letter", "Letter", "Letter"),
          lt("Note", "Note", "Note"),
          lt("Short Survey", "Short Survey", "Short Survey"),
          lt("Erratum", "Erratum", "Erratum"),
          lt("Retracted Article", "Retracted Article", "Retracted Article"),
          lt("Book", "Book", "Book"),
          lt("Book Chapter", "Book Chapter", "Book Chapter"),
          lt("Data Paper", "Data Paper", "Data Paper"),
        ],
      },
      {
        type: "list",
        title: lt("Почему это важно", "Bu nima uchun muhim", "Why this matters"),
        items: [
          lt("не все типы документов одинаково воспринимаются в научной практике;", "ilmiy amaliyotda barcha hujjat turlari bir xil qabul qilinmaydi;", "not all document types are viewed the same way in scholarly practice;"),
          lt("при анализе профиля автора или журнала тип публикации имеет значение;", "muallif yoki jurnal profilini tahlil qilganda nashr turi muhim ahamiyatga ega;", "when analyzing an author or journal profile, the publication type matters;"),
          lt("статья и editorial — это не одно и то же даже при наличии DOI и индексации.", "hatto DOI va indeksatsiya mavjud bo‘lsa ham, article va editorial bir xil narsa emas.", "an article and an editorial are not the same thing even if both have DOI and indexing."),
        ],
      },
      {
        type: "list",
        title: lt("Например", "Masalan", "For example"),
        items: [
          lt("article и review чаще воспринимаются как полноценные научные публикации;", "article va review ko‘proq to‘laqonli ilmiy nashr sifatida qabul qilinadi;", "article and review are more often treated as full scholarly publications;"),
          lt("editorial — это редакционный материал;", "editorial — bu tahririy material;", "editorial is an editorial text;"),
          lt("erratum — исправление;", "erratum — tuzatish;", "erratum is a correction;"),
          lt("conference paper — материал конференции;", "conference paper — konferensiya materiali;", "conference paper is conference material;"),
          lt("article-in-press — статья на стадии ранней онлайн-публикации.", "article-in-press — erta onlayn nashr bosqichidagi maqola.", "article-in-press is a paper at the early online publication stage."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Иногда издатель называет материал одним образом, а Scopus классифицирует его немного иначе. Поэтому при оценке публикации полезно смотреть не только на наличие записи, но и на её тип.",
          "Ba’zan nashriyot materialni bir usulda ataydi, Scopus esa uni biroz boshqacha tasniflaydi. Shuning uchun nashrni baholashda faqat yozuv borligiga emas, balki uning turiga ham qarash foydali.",
          "Sometimes a publisher labels a material one way, while Scopus classifies it somewhat differently. Therefore, when evaluating a publication, it is useful to look not only at whether the record exists but also at its type."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Если публикация видна в Scopus, важно смотреть не только на факт индексации, но и на тип документа, под которым она учтена.",
          "Agar nashr Scopus’da ko‘rinayotgan bo‘lsa, faqat indeksatsiya faktiga emas, balki u qaysi hujjat turi ostida hisobga olinganiga ham qarash muhim.",
          "If a publication is visible in Scopus, it is important to look not only at the fact of indexing but also at the document type under which it is counted."
        ),
      },
    ],
    sourceIds: ["4"],
  },
  {
    slug: "publication-vs-indexing-in-scopus",
    title: lt(
      "Публикация статьи и индексация в Scopus",
      "Maqola nashri va Scopus’dagi indeksatsiya",
      "Article publication and indexing in Scopus"
    ),
    cardText: lt(
      "Публикация статьи и её индексация в Scopus — это разные процессы. Статья сначала публикуется журналом, а затем её данные передаются и обрабатываются в базе.",
      "Maqolaning chop etilishi va uning Scopus’da indekslanishi ikki xil jarayondir. Avval maqolani jurnal chop etadi, keyin uning ma’lumotlari bazaga uzatiladi va qayta ishlanadi.",
      "Article publication and its indexing in Scopus are different processes. The article is first published by the journal, and only then its data are transferred to and processed in the database."
    ),
    shortText: lt(
      "Публикация статьи и её индексация в Scopus — это разные процессы. Статья сначала публикуется журналом, а затем её данные передаются и обрабатываются в базе.",
      "Maqolaning chop etilishi va uning Scopus’da indekslanishi ikki xil jarayondir. Avval maqolani jurnal chop etadi, keyin uning ma’lumotlari bazaga uzatiladi va qayta ishlanadi.",
      "Article publication and its indexing in Scopus are different processes. The article is first published by the journal, and only then its data are transferred to and processed in the database."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Одна из самых частых ошибок — считать, что если статья уже появилась на сайте журнала, значит она уже есть в Scopus. На практике между этими этапами есть разница.",
          "Eng ko‘p uchraydigan xatolardan biri — agar maqola jurnal saytida allaqachon paydo bo‘lgan bo‘lsa, demak u Scopus’da ham bor deb o‘ylashdir. Amalda bu bosqichlar o‘rtasida farq bor.",
          "One of the most common mistakes is to think that if an article has already appeared on the journal website, then it is already in Scopus. In practice, there is a difference between these stages."
        ),
      },
      {
        type: "paragraph",
        title: lt("Публикация статьи", "Maqolaning nashri", "Publication of an article"),
        text: lt(
          "Это то, что делает журнал или издатель: принимает статью, оформляет её, размещает онлайн, включает в выпуск или публикует как version of record.",
          "Bu jurnal yoki nashriyot qiladigan ish: maqolani qabul qiladi, rasmiylashtiradi, onlayn joylashtiradi, songa kiritadi yoki version of record sifatida chop etadi.",
          "This is what the journal or publisher does: accepts the article, formats it, places it online, assigns it to an issue, or publishes it as the version of record."
        ),
      },
      {
        type: "paragraph",
        title: lt("Индексация статьи", "Maqolaning indeksatsiyasi", "Indexing of the article"),
        text: lt(
          "Это следующий этап: издатель передаёт метаданные, запись обрабатывается в базе, статья становится видимой в поиске и аналитике Scopus.",
          "Bu keyingi bosqichdir: nashriyot metadata’ni yuboradi, yozuv bazada qayta ishlanadi va maqola Scopus qidiruvi hamda analitikasida ko‘rinadigan bo‘ladi.",
          "This is the next stage: the publisher transfers metadata, the record is processed in the database, and the article becomes visible in Scopus search and analytics."
        ),
      },
      {
        type: "list",
        title: lt("Из-за этого может возникать задержка", "Shu sababli kechikish yuz berishi mumkin", "Because of this, delays may occur"),
        items: [
          lt("даже если статья уже опубликована, она может ещё не появиться в базе;", "maqola allaqachon chop etilgan bo‘lsa ham, u hali bazada ko‘rinmasligi mumkin;", "even if the article is already published, it may not yet appear in the database;"),
          lt("она может появиться позже;", "u keyinroq paydo bo‘lishi mumkin;", "it may appear later;"),
          lt("она может быть в базе, но не прикрепиться к нужному профилю автора.", "u bazada bo‘lishi, lekin kerakli muallif profiliga birikmasligi mumkin.", "it may be in the database but not attached to the correct author profile."),
        ],
      },
      {
        type: "list",
        title: lt("Задержка зависит от", "Kechikish quyidagilarga bog‘liq", "The delay depends on"),
        items: [
          lt("темпа работы издателя;", "nashriyot ishining tezligiga;", "the publisher’s workflow speed;"),
          lt("качества метаданных;", "metadata sifatiga;", "the quality of the metadata;"),
          lt("особенностей журнала;", "jurnalning o‘ziga xos xususiyatlariga;", "journal-specific features;"),
          lt("внутреннего цикла обработки данных.", "ma’lumotlarni ichki qayta ishlash sikliga.", "the internal data processing cycle."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Публикация статьи — это действие журнала. Индексация в Scopus — это отдельный этап, который может произойти позже.",
          "Maqolaning nashri — jurnalning harakati. Scopus’dagi indeksatsiya esa keyinroq sodir bo‘lishi mumkin bo‘lgan alohida bosqichdir.",
          "Publication of an article is an action by the journal. Indexing in Scopus is a separate stage that may occur later."
        ),
      },
    ],
    sourceIds: ["4", "13", "15"],
  },
  {
    slug: "how-to-check-article-indexing-in-scopus",
    title: lt(
      "Как проверить индексацию статьи в Scopus",
      "Maqolaning Scopus’da indekslanganini qanday tekshirish kerak",
      "How to check article indexing in Scopus"
    ),
    cardText: lt(
      "Проверять индексацию статьи в Scopus лучше сразу несколькими способами: по DOI, точному названию статьи, профилю автора и самому журналу.",
      "Maqolaning Scopus’da indekslanganini bir nechta usul bilan tekshirgan ma’qul: DOI, maqolaning aniq nomi, muallif profili va jurnalning o‘zi orqali.",
      "It is better to check whether an article is indexed in Scopus using several methods at once: by DOI, exact article title, author profile, and the journal itself."
    ),
    shortText: lt(
      "Проверять индексацию статьи в Scopus лучше сразу несколькими способами: по DOI, точному названию статьи, профилю автора и самому журналу.",
      "Maqolaning Scopus’da indekslanganini bir nechta usul bilan tekshirgan ma’qul: DOI, maqolaning aniq nomi, muallif profili va jurnalning o‘zi orqali.",
      "It is better to check whether an article is indexed in Scopus using several methods at once: by DOI, exact article title, author profile, and the journal itself."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Если автор хочет убедиться, что статья действительно появилась в Scopus, лучше не ограничиваться одним вариантом поиска.",
          "Agar muallif maqola haqiqatan ham Scopus’da paydo bo‘lganiga ishonch hosil qilmoqchi bo‘lsa, qidiruvning faqat bitta usuli bilan cheklanmagan ma’qul.",
          "If an author wants to make sure that an article has actually appeared in Scopus, it is better not to rely on only one search method."
        ),
      },
      {
        type: "list",
        title: lt("Основные способы проверки", "Tekshirishning asosiy usullari", "Main ways to verify"),
        items: [
          lt("1. Проверка по DOI — это самый точный способ, если DOI уже присвоен и корректно зарегистрирован.", "1. DOI bo‘yicha tekshirish — agar DOI allaqachon berilgan va to‘g‘ri ro‘yxatdan o‘tgan bo‘lsa, bu eng aniq usuldir.", "1. DOI check — this is the most accurate method if the DOI has already been assigned and correctly registered."),
          lt("2. Проверка по точному названию — иногда DOI ещё не ищется или введён с ошибкой, но статья уже присутствует в базе по заголовку.", "2. Aniq sarlavha bo‘yicha tekshirish — ba’zan DOI hali topilmaydi yoki noto‘g‘ri kiritiladi, ammo maqola sarlavha orqali bazada allaqachon mavjud bo‘ladi.", "2. Exact-title check — sometimes the DOI is not yet searchable or is entered incorrectly, but the article is already present in the database by title."),
          lt("3. Проверка через профиль автора — в Scopus Author Details можно смотреть список публикаций, вкладку Documents, Citation Overview и общие данные профиля.", "3. Muallif profili orqali tekshirish — Scopus Author Details’da nashrlar ro‘yxati, Documents bo‘limi, Citation Overview va umumiy profil ma’lumotlarini ko‘rish mumkin.", "3. Check through the author profile — in Scopus Author Details one can review the publication list, the Documents tab, Citation Overview, and overall profile data."),
          lt("4. Проверка по журналу — можно посмотреть выпуск, раздел или сам журнал в базе и проверить, появилась ли там нужная запись.", "4. Jurnal bo‘yicha tekshirish — bazada son, bo‘lim yoki jurnalning o‘zini ko‘rib, kerakli yozuv paydo bo‘lganmi-yo‘qmi tekshirish mumkin.", "4. Check through the journal — one can review the issue, section, or journal itself in the database to see whether the needed record has appeared there."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Если статья не отображается в профиле автора, это не всегда означает, что её нет в Scopus. Возможны и другие причины.",
          "Agar maqola muallif profilida ko‘rinmasa, bu har doim ham uning Scopus’da yo‘qligini anglatmaydi. Boshqa sabablar ham bo‘lishi mumkin.",
          "If the article does not appear in the author profile, this does not always mean that it is absent from Scopus. There may be other reasons."
        ),
      },
      {
        type: "list",
        title: lt("Например", "Masalan", "For example"),
        items: [
          lt("профиль автора обновился не полностью;", "muallif profili to‘liq yangilanmagan bo‘lishi mumkin;", "the author profile may not have been fully updated;"),
          lt("статья попала в другой профиль;", "maqola boshqa profilga tushgan bo‘lishi mumkin;", "the article may have been assigned to another profile;"),
          lt("произошло некорректное объединение профилей;", "profillar noto‘g‘ri birlashtirilgan bo‘lishi mumkin;", "profiles may have been merged incorrectly;"),
          lt("в метаданных были ошибки в имени, аффилиации или данных автора.", "metadata’da ism, affiliasiya yoki muallif ma’lumotlarida xatolar bo‘lishi mumkin.", "there may have been errors in the metadata for the name, affiliation, or author details."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Поэтому логично проверять по нескольким признакам сразу.",
          "Shuning uchun bir vaqtning o‘zida bir nechta belgi bo‘yicha tekshirish mantiqan to‘g‘ri bo‘ladi.",
          "Therefore, it is logical to verify using several indicators at once."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Надёжная проверка индексации — это не один поиск, а сочетание DOI, названия статьи, авторского профиля и данных журнала.",
          "Indeksatsiyani ishonchli tekshirish — bu bitta qidiruv emas, balki DOI, maqola nomi, muallif profili va jurnal ma’lumotlarini birgalikda ko‘rishdir.",
          "Reliable verification of indexing is not a single search but a combination of DOI, article title, author profile, and journal data."
        ),
      },
    ],
    sourceIds: ["6", "21"],
  },
  {
    slug: "article-acceptance-stages",
    title: lt(
      "Этапы принятия статьи в журналах Scopus",
      "Scopus jurnallarida maqolani qabul qilish bosqichlari",
      "Stages of article acceptance in Scopus journals"
    ),
    cardText: lt(
      "Статья в журнале, индексируемом Scopus, обычно проходит несколько стадий: редакционная проверка, рецензирование, возможные правки, принятие, техническая подготовка и публикация. Само принятие статьи — важный этап, но не финал всего процесса.",
      "Scopus indekslaydigan jurnaldagi maqola odatda bir necha bosqichdan o‘tadi: tahririy tekshiruv, taqriz, ehtimoliy tuzatishlar, qabul, texnik tayyorlash va nashr. Maqolaning qabul qilinishi muhim bosqich, lekin butun jarayonning yakuni emas.",
      "An article in a Scopus-indexed journal usually goes through several stages: editorial screening, peer review, possible revisions, acceptance, technical preparation, and publication. Acceptance itself is an important stage, but not the end of the whole process."
    ),
    shortText: lt(
      "Статья в журнале, индексируемом Scopus, обычно проходит несколько стадий: редакционная проверка, рецензирование, возможные правки, принятие, техническая подготовка и публикация. Само принятие статьи — важный этап, но не финал всего процесса.",
      "Scopus indekslaydigan jurnaldagi maqola odatda bir necha bosqichdan o‘tadi: tahririy tekshiruv, taqriz, ehtimoliy tuzatishlar, qabul, texnik tayyorlash va nashr. Maqolaning qabul qilinishi muhim bosqich, lekin butun jarayonning yakuni emas.",
      "An article in a Scopus-indexed journal usually goes through several stages: editorial screening, peer review, possible revisions, acceptance, technical preparation, and publication. Acceptance itself is an important stage, but not the end of the whole process."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Хотя у разных журналов свои редакционные правила, общий путь рукописи обычно похож.",
          "Turli jurnallarning tahririy qoidalari turlicha bo‘lsa-da, qo‘lyozmaning umumiy yo‘li odatda o‘xshash bo‘ladi.",
          "Although different journals have their own editorial rules, the general path of a manuscript is usually similar."
        ),
      },
      {
        type: "list",
        title: lt("Основные этапы", "Asosiy bosqichlar", "Main stages"),
        items: [
          lt("1. Initial quality check — редакция проверяет комплектность файлов, формальные требования, базовое качество текста, соблюдение этических норм и пригодность статьи для журнала.", "1. Initial quality check — tahririyat fayllarning to‘liqligini, rasmiy talablarni, matnning dastlabki sifatini, etik me’yorlarga rioya qilinishini va maqolaning jurnalga mosligini tekshiradi.", "1. Initial quality check — the editorial office checks completeness of files, formal requirements, basic text quality, compliance with ethics, and the article’s suitability for the journal."),
          lt("2. Editor assigned — статья передаётся редактору, который решает, стоит ли отправлять её дальше на научное рассмотрение.", "2. Editor assigned — maqola muharrirga beriladi va u uni ilmiy ko‘rib chiqishga yuborish kerakmi-yo‘qmi hal qiladi.", "2. Editor assigned — the article is assigned to an editor who decides whether it should be sent for scholarly review."),
          lt("3. Peer review — внешние эксперты оценивают новизну, методы, качество анализа, обоснованность выводов и значимость результатов.", "3. Peer review — tashqi ekspertlar yangilik, metodlar, tahlil sifati, xulosalarning asoslanganligi va natijalarning ahamiyatini baholaydilar.", "3. Peer review — external experts evaluate novelty, methods, quality of analysis, validity of conclusions, and significance of results."),
          lt("4. Decision — автор может получить reject, revise, accept with revisions или accept.", "4. Decision — muallif reject, revise, accept with revisions yoki accept qarorlaridan birini olishi mumkin.", "4. Decision — the author may receive reject, revise, accept with revisions, or accept."),
          lt("5. Final acceptance — после необходимых исправлений статья получает окончательное принятие.", "5. Final acceptance — kerakli tuzatishlardan keyin maqola yakuniy qabulni oladi.", "5. Final acceptance — after necessary corrections, the article receives final acceptance."),
          lt("6. Производственный этап — copyediting, typesetting, proofreading, online publication и issue assignment.", "6. Ishlab chiqarish bosqichi — copyediting, typesetting, proofreading, online publication va issue assignment.", "6. Production stage — copyediting, typesetting, proofreading, online publication, and issue assignment."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Именно здесь многие авторы ошибочно думают, что «всё уже завершено», хотя на деле статья может ещё не быть опубликованной в окончательном виде и не индексироваться в базе.",
          "Aynan shu yerda ko‘plab mualliflar «hammasi tugadi» deb xato o‘ylaydilar, aslida esa maqola hali yakuniy ko‘rinishda chop etilmagan va bazada indekslanmagan bo‘lishi mumkin.",
          "This is exactly where many authors mistakenly think that “everything is already finished,” whereas in reality the article may still not be published in final form and may not yet be indexed in the database."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Принятие статьи означает, что журнал согласился её публиковать, но после этого ещё идут техническая подготовка, онлайн-размещение и возможная задержка до индексации.",
          "Maqolaning qabul qilinishi jurnal uni chop etishga rozi bo‘lganini anglatadi, biroq undan keyin ham texnik tayyorlash, onlayn joylashtirish va indeksatsiyagacha bo‘lgan ehtimoliy kechikish davom etadi.",
          "Acceptance means that the journal has agreed to publish the article, but after that there are still technical preparation steps, online posting, and a possible delay before indexing."
        ),
      },
    ],
    sourceIds: ["11", "13", "18", "20"],
  },
  {
    slug: "myth-of-5-year-indexing",
    title: lt(
      "Сроки индексации в Scopus и миф про удаление через 5 лет",
      "Scopus’dagi indeksatsiya muddatlari va 5 yildan keyin o‘chirish haqidagi mif",
      "Scopus indexing timelines and the myth of removal after 5 years"
    ),
    cardText: lt(
      "Единого точного срока индексации статьи в Scopus нет. Появление записи зависит от издателя, качества метаданных и внутренней обработки. Утверждение, что индексация «автоматически удаляется через 5 лет», официальными источниками не подтверждается.",
      "Scopus’da maqolaning indekslanishi uchun yagona aniq muddat yo‘q. Yozuvning paydo bo‘lishi nashriyotga, metadata sifatiga va ichki qayta ishlashga bog‘liq. Indeksatsiya «5 yildan keyin avtomatik o‘chadi» degan gap rasmiy manbalar bilan tasdiqlanmaydi.",
      "There is no single exact time frame for indexing an article in Scopus. The appearance of a record depends on the publisher, metadata quality, and internal processing. The claim that indexing is “automatically removed after 5 years” is not confirmed by official sources."
    ),
    shortText: lt(
      "Единого точного срока индексации статьи в Scopus нет. Появление записи зависит от издателя, качества метаданных и внутренней обработки. Утверждение, что индексация «автоматически удаляется через 5 лет», официальными источниками не подтверждается.",
      "Scopus’da maqolaning indekslanishi uchun yagona aniq muddat yo‘q. Yozuvning paydo bo‘lishi nashriyotga, metadata sifatiga va ichki qayta ishlashga bog‘liq. Indeksatsiya «5 yildan keyin avtomatik o‘chadi» degan gap rasmiy manbalar bilan tasdiqlanmaydi.",
      "There is no single exact time frame for indexing an article in Scopus. The appearance of a record depends on the publisher, metadata quality, and internal processing. The claim that indexing is “automatically removed after 5 years” is not confirmed by official sources."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Срок появления статьи в Scopus может отличаться от журнала к журналу и от выпуска к выпуску. Даже у индексируемого источника новые статьи не всегда попадают в базу сразу.",
          "Maqolaning Scopus’da paydo bo‘lish muddati jurnaldan jurnalga va sondan songa farq qilishi mumkin. Hatto indekslanadigan manbada ham yangi maqolalar har doim darhol bazaga tushmaydi.",
          "The time it takes for an article to appear in Scopus can vary from journal to journal and from issue to issue. Even in an indexed source, new articles do not always enter the database immediately."
        ),
      },
      {
        type: "list",
        title: lt("На скорость влияют", "Tezlikka ta’sir qiluvchi omillar", "What affects the speed"),
        items: [
          lt("издательский цикл;", "nashriyot sikli;", "the publisher’s cycle;"),
          lt("регулярность передачи метаданных;", "metadata yuborish muntazamligi;", "regularity of metadata transfer;"),
          lt("полнота и корректность данных;", "ma’lumotlarning to‘liqligi va to‘g‘riligi;", "completeness and correctness of the data;"),
          lt("особенности публикационной модели;", "nashr modelining xususiyatlari;", "features of the publication model;"),
          lt("технические процессы обработки в базе.", "bazadagi texnik qayta ishlash jarayonlari.", "technical processing workflows in the database."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Поэтому корректнее говорить не «Scopus индексирует за конкретное число дней», а «индексация зависит от публикационного и технического цикла».",
          "Shuning uchun «Scopus falon kun ichida indekslaydi» deyishdan ko‘ra, «indeksatsiya nashr va texnik siklga bog‘liq» deyish to‘g‘riroq bo‘ladi.",
          "Therefore, it is more accurate to say not “Scopus indexes within a specific number of days,” but rather “indexing depends on the publication and technical cycle.”"
        ),
      },
      {
        type: "paragraph",
        title: lt(
          "Миф про удаление через 5 лет",
          "5 yildan keyin o‘chirish haqidagi mif",
          "The myth about removal after 5 years"
        ),
        text: lt(
          "Иногда авторам говорят, что публикация может «исчезнуть из Scopus через 5 лет». Официальные материалы это не подтверждают.",
          "Ba’zan mualliflarga nashr «5 yildan keyin Scopus’dan yo‘qolishi mumkin» deb aytiladi. Rasmiy materiallar buni tasdiqlamaydi.",
          "Sometimes authors are told that a publication may “disappear from Scopus after 5 years.” Official materials do not confirm this."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Scopus указывает, что если журнал затем перестаёт индексироваться, уже включённый контент обычно остаётся в базе как часть научной записи. Исключения возможны только в серьёзных случаях доказанной неэтичной публикационной практики.",
          "Scopus shuni ko‘rsatadiki, agar jurnal keyinchalik indekslanmay qolsa ham, ilgari kiritilgan kontent odatda ilmiy yozuvning bir qismi sifatida bazada qoladi. Istisnolar faqat isbotlangan jiddiy noetik nashriyot amaliyoti holatlarida bo‘lishi mumkin.",
          "Scopus indicates that if a journal later stops being indexed, the content already included usually remains in the database as part of the scholarly record. Exceptions are possible only in serious cases of proven unethical publication practice."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Цифра «5 лет» в документах Scopus относится к другому вопросу — к сроку повторного рассмотрения отдельных discontinued titles, а не к автоматическому удалению уже проиндексированных статей.",
          "Scopus hujjatlaridagi «5 yil» raqami boshqa masalaga — ayrim discontinued titles’ni qayta ko‘rib chiqish muddatiga tegishli, allaqachon indekslangan maqolalarni avtomatik o‘chirishga emas.",
          "The figure “5 years” in Scopus documents refers to another issue—the time frame for reconsidering certain discontinued titles, not the automatic deletion of already indexed articles."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Задержка индексации — это нормальная ситуация. А утверждение про автоматическое удаление статьи из Scopus через 5 лет не подтверждается официальной политикой базы.",
          "Indeksatsiyadagi kechikish — normal holat. Ammo maqola Scopus’dan 5 yildan keyin avtomatik o‘chiriladi degan gap bazaning rasmiy siyosati bilan tasdiqlanmaydi.",
          "A delay in indexing is normal. But the claim that an article is automatically removed from Scopus after 5 years is not supported by the database’s official policy."
        ),
      },
    ],
    sourceIds: ["4", "15"],
  },
  {
    slug: "what-is-scientific-article",
    title: lt(
      "Что такое научная статья",
      "Ilmiy maqola nima",
      "What is a scientific article"
    ),
    cardText: lt(
      "Научная статья — это структурированный текст, в котором автор представляет результаты исследования, анализа, наблюдений или эксперимента в академической форме.",
      "Ilmiy maqola — muallif tadqiqot, tahlil, kuzatish yoki eksperiment natijalarini akademik shaklda taqdim etadigan tuzilgan matndir.",
      "A scientific article is a structured text in which an author presents the results of research, analysis, observation, or experiment in an academic form."
    ),
    shortText: lt(
      "Научная статья — это структурированный текст, в котором автор представляет результаты исследования, анализа, наблюдений или эксперимента в академической форме.",
      "Ilmiy maqola — muallif tadqiqot, tahlil, kuzatish yoki eksperiment natijalarini akademik shaklda taqdim etadigan tuzilgan matndir.",
      "A scientific article is a structured text in which an author presents the results of research, analysis, observation, or experiment in an academic form."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Научная статья — один из основных способов представить исследовательский результат научному сообществу. Её задача — не просто изложить мнение, а зафиксировать работу так, чтобы другие специалисты могли понять, что именно делал автор, оценить качество исследования, использовать результаты в дальнейшей работе, проверить выводы и сопоставить их с другими данными.",
          "Ilmiy maqola ilmiy natijani ilmiy hamjamiyatga taqdim etishning asosiy usullaridan biridir. Uning vazifasi shunchaki fikr bildirish emas, balki ishni shunday qayd etishki, boshqa mutaxassislar muallif aynan nima qilganini tushunsin, tadqiqot sifatini baholasin, natijalardan keyingi ishlarida foydalansin, xulosalarni tekshirsin va ularni boshqa ma’lumotlar bilan solishtirsin.",
          "A scientific article is one of the main ways to present a research result to the scholarly community. Its task is not merely to express an opinion, but to record the work in such a way that other specialists can understand what the author actually did, assess the quality of the research, use the results in further work, verify the conclusions, and compare them with other data."
        ),
      },
      {
        type: "list",
        title: lt("Обычно научная статья включает", "Odatda ilmiy maqola quyidagilarni o‘z ichiga oladi", "A scientific article usually includes"),
        items: [
          lt("заголовок;", "sarlavha;", "title;"),
          lt("аннотацию;", "annotatsiya;", "abstract;"),
          lt("введение;", "kirish;", "introduction;"),
          lt("методы;", "metodlar;", "methods;"),
          lt("результаты;", "natijalar;", "results;"),
          lt("обсуждение;", "muhokama;", "discussion;"),
          lt("выводы;", "xulosalar;", "conclusions;"),
          lt("список литературы.", "adabiyotlar ro‘yxati.", "references."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "В разговорной речи часто смешивают термины scientific paper, research article, manuscript, journal article. Но между ними есть нюансы. Например, manuscript — это чаще рукопись до публикации или на стадии подачи, а journal article — уже публикационный формат статьи.",
          "Og‘zaki nutqda scientific paper, research article, manuscript, journal article atamalari ko‘pincha aralashtirib yuboriladi. Ammo ular o‘rtasida nozik farqlar bor. Masalan, manuscript odatda nashrgacha bo‘lgan yoki topshirish bosqichidagi qo‘lyozmani bildiradi, journal article esa allaqachon nashr formatidagi maqolani anglatadi.",
          "In everyday usage, terms such as scientific paper, research article, manuscript, and journal article are often mixed up. However, there are nuances between them. For example, a manuscript is usually a text before publication or at the submission stage, whereas a journal article is the publication format of the paper."
        ),
      },
      {
        type: "list",
        title: lt("Научной статью делает исследовательская логика", "Ilmiy maqolani ilmiy qiladigan narsa — tadqiqot mantig‘i", "What makes an article scientific is research logic"),
        items: [
          lt("есть вопрос или задача;", "savol yoki vazifa mavjud bo‘ladi;", "there is a question or problem;"),
          lt("есть метод;", "metod mavjud bo‘ladi;", "there is a method;"),
          lt("есть данные или аргументы;", "ma’lumotlar yoki dalillar mavjud bo‘ladi;", "there are data or arguments;"),
          lt("есть выводы;", "xulosalar mavjud bo‘ladi;", "there are conclusions;"),
          lt("есть связь с научной литературой.", "ilmiy adabiyot bilan bog‘liqlik mavjud bo‘ladi.", "there is a connection with the scholarly literature."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Научная статья — это не просто текст по теме, а оформленное исследовательское сообщение, рассчитанное на профессиональную оценку и использование.",
          "Ilmiy maqola — bu shunchaki mavzu bo‘yicha matn emas, balki professional baholash va foydalanishga mo‘ljallangan rasmiylashtirilgan tadqiqot xabaridir.",
          "A scientific article is not just a text on a topic, but a formatted research communication intended for professional evaluation and use."
        ),
      },
    ],
    sourceIds: ["22", "23", "24"],
  },
  {
    slug: "what-is-journal-publication",
    title: lt(
      "Что такое публикация в журнале",
      "Jurnalda nashr nima",
      "What is publication in a journal"
    ),
    cardText: lt(
      "Публикация в журнале — это процесс превращения рукописи автора в официальную научную публикацию после редакционной обработки и, как правило, рецензирования.",
      "Jurnalda nashr — bu muallif qo‘lyozmasining tahririy ishlov va odatda taqrizdan so‘ng rasmiy ilmiy nashrga aylanish jarayonidir.",
      "Publication in a journal is the process of turning an author’s manuscript into an official scholarly publication after editorial processing and, as a rule, peer review."
    ),
    shortText: lt(
      "Публикация в журнале — это процесс превращения рукописи автора в официальную научную публикацию после редакционной обработки и, как правило, рецензирования.",
      "Jurnalda nashr — bu muallif qo‘lyozmasining tahririy ishlov va odatda taqrizdan so‘ng rasmiy ilmiy nashrga aylanish jarayonidir.",
      "Publication in a journal is the process of turning an author’s manuscript into an official scholarly publication after editorial processing and, as a rule, peer review."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Многие авторы воспринимают публикацию как момент загрузки файла в редакционную систему. На самом деле публикация — это более длинный и формальный процесс.",
          "Ko‘plab mualliflar nashrni faylni tahririy tizimga yuklash payti deb qabul qiladilar. Aslida nashr bundan ancha uzun va rasmiy jarayondir.",
          "Many authors perceive publication as the moment of uploading a file into the editorial system. In reality, publication is a longer and more formal process."
        ),
      },
      {
        type: "list",
        title: lt("Обычно он включает", "Odatda u quyidagilarni o‘z ichiga oladi", "It usually includes"),
        items: [
          lt("подготовку рукописи;", "qo‘lyozmani tayyorlash;", "preparation of the manuscript;"),
          lt("подачу в журнал;", "jurnalga topshirish;", "submission to the journal;"),
          lt("редакционный отбор;", "tahririy saralash;", "editorial screening;"),
          lt("peer review;", "peer review;", "peer review;"),
          lt("правки;", "tuzatishlar;", "revisions;"),
          lt("принятие статьи;", "maqolaning qabul qilinishi;", "acceptance of the article;"),
          lt("proofing и издательскую подготовку;", "proofing va nashriyot tayyorlovini;", "proofing and publisher preparation;"),
          lt("онлайн-публикацию;", "onlayn nashrni;", "online publication;"),
          lt("включение в выпуск или публикацию как final version.", "songa kiritish yoki final version sifatida chop etishni.", "assignment to an issue or publication as the final version."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Публикация означает, что статья становится частью официальной научной записи журнала. В зависимости от политики издателя это может происходить при online first, при article in press, при выходе финального выпуска или при публикации version of record.",
          "Nashr maqolaning jurnalning rasmiy ilmiy yozuvining bir qismiga aylanishini anglatadi. Nashriyot siyosatiga qarab bu online first, article in press, yakuniy son chiqishi yoki version of record chop etilishi vaqtida sodir bo‘lishi mumkin.",
          "Publication means that the article becomes part of the journal’s official scholarly record. Depending on publisher policy, this may occur at the online first stage, as article in press, upon final issue release, or at the publication of the version of record."
        ),
      },
      {
        type: "list",
        title: lt("Важно не путать разные состояния", "Turli holatlarni aralashtirmaslik kerak", "It is important not to confuse different statuses"),
        items: [
          lt("текст написан;", "matn yozilgan;", "the text is written;"),
          lt("статья отправлена;", "maqola yuborilgan;", "the article is submitted;"),
          lt("статья принята;", "maqola qabul qilingan;", "the article is accepted;"),
          lt("статья опубликована;", "maqola chop etilgan;", "the article is published;"),
          lt("статья проиндексирована.", "maqola indekslangan.", "the article is indexed."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Все эти статусы разные, и для автора это имеет практическое значение.",
          "Bu maqomlarning barchasi bir-biridan farq qiladi va muallif uchun bu amaliy ahamiyatga ega.",
          "All of these statuses are different, and this distinction has practical significance for the author."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Публикация в журнале — это не просто отправка статьи, а официальное включение работы в публикационную систему журнала.",
          "Jurnalda nashr — bu shunchaki maqolani yuborish emas, balki ishning jurnalning nashr tizimiga rasmiy kiritilishidir.",
          "Publication in a journal is not merely submission of an article, but the official inclusion of the work into the journal’s publication system."
        ),
      },
    ],
    sourceIds: ["13", "18", "20", "25", "26"],
  },
  {
    slug: "what-is-scientific-journal",
    title: lt(
      "Что такое научный журнал для статей",
      "Maqolalar uchun ilmiy jurnal nima",
      "What is a scientific journal for articles"
    ),
    cardText: lt(
      "Научный журнал — это периодическое издание, в котором публикуются исследовательские материалы, оформленные по академическим стандартам и проходящие редакционную процедуру.",
      "Ilmiy jurnal — akademik standartlar asosida rasmiylashtirilgan va tahririy jarayondan o‘tadigan tadqiqot materiallari chop etiladigan davriy nashrdir.",
      "A scientific journal is a periodical in which research materials are published according to academic standards and undergo an editorial process."
    ),
    shortText: lt(
      "Научный журнал — это периодическое издание, в котором публикуются исследовательские материалы, оформленные по академическим стандартам и проходящие редакционную процедуру.",
      "Ilmiy jurnal — akademik standartlar asosida rasmiylashtirilgan va tahririy jarayondan o‘tadigan tadqiqot materiallari chop etiladigan davriy nashrdir.",
      "A scientific journal is a periodical in which research materials are published according to academic standards and undergo an editorial process."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Научный журнал — это не просто сайт со статьями и не любое издание с международным названием. Это публикационная площадка, которая работает как часть научной коммуникации.",
          "Ilmiy jurnal shunchaki maqolalar joylangan sayt ham emas, xalqaro nomga ega istalgan nashr ham emas. Bu ilmiy kommunikatsiyaning bir qismi sifatida ishlaydigan nashr maydonidir.",
          "A scientific journal is not just a website with articles and not any publication with an international-sounding title. It is a publishing venue that functions as part of scholarly communication."
        ),
      },
      {
        type: "list",
        title: lt("Обычно у научного журнала есть", "Odatda ilmiy jurnalda quyidagilar bo‘ladi", "A scientific journal usually has"),
        items: [
          lt("постоянное название;", "doimiy nom;", "a stable title;"),
          lt("ISSN;", "ISSN;", "an ISSN;"),
          lt("издатель;", "nashriyot;", "a publisher;"),
          lt("редакционная коллегия;", "tahrir hay’ati;", "an editorial board;"),
          lt("правила для авторов;", "mualliflar uchun qoidalar;", "author guidelines;"),
          lt("архив выпусков;", "sonlar arxivi;", "an archive of issues;"),
          lt("система рассмотрения рукописей;", "qo‘lyozmalarni ko‘rib chiqish tizimi;", "a manuscript review system;"),
          lt("публикационная и этическая политика.", "nashr va etika siyosati.", "publication and ethics policies."),
        ],
      },
      {
        type: "list",
        title: lt("Научный журнал может публиковать", "Ilmiy jurnal quyidagilarni chop etishi mumkin", "A scientific journal may publish"),
        items: [
          lt("original research articles;", "original research articles;", "original research articles;"),
          lt("review articles;", "review articles;", "review articles;"),
          lt("short communications;", "short communications;", "short communications;"),
          lt("case studies;", "case studies;", "case studies;"),
          lt("methods papers;", "methods papers;", "methods papers;"),
          lt("editorials;", "editorials;", "editorials;"),
          lt("letters.", "letters.", "letters."),
        ],
      },
      {
        type: "list",
        title: lt("От обычного информационного сайта его отличают", "Uni oddiy axborot saytidan ajratib turadigan belgilar", "What distinguishes it from an ordinary information site"),
        items: [
          lt("серийность выпуска;", "davriy chiqishi;", "serial/periodic publication;"),
          lt("формализованная редакционная процедура;", "rasmiylashtirilgan tahririy jarayon;", "a formalized editorial procedure;"),
          lt("наличие метаданных;", "metadata mavjudligi;", "the presence of metadata;"),
          lt("сохранение архива;", "arxivning saqlanishi;", "preservation of an archive;"),
          lt("ориентация на научную, а не развлекательную или рекламную функцию.", "ko‘ngilochar yoki reklama emas, ilmiy vazifaga yo‘naltirilganligi.", "orientation toward a scholarly rather than entertainment or promotional function."),
        ],
      },
      {
        type: "list",
        title: lt("При выборе журнала автору полезно смотреть", "Jurnal tanlashda muallif uchun quyidagilarni ko‘rish foydali", "When choosing a journal, it is useful for an author to check"),
        items: [
          lt("есть ли ISSN;", "ISSN bormi;", "whether it has an ISSN;"),
          lt("указан ли издатель;", "nashriyot ko‘rsatilganmi;", "whether the publisher is identified;"),
          lt("существует ли архив выпусков;", "sonlar arxivi bormi;", "whether an archive of issues exists;"),
          lt("есть ли peer review policy;", "peer review policy bormi;", "whether there is a peer review policy;"),
          lt("где журнал индексируется;", "jurnal qayerda indekslanadi;", "where the journal is indexed;"),
          lt("открыта ли информация о редакции и правилах подачи.", "tahririyat va topshirish qoidalari haqidagi ma’lumot ochiqmi.", "whether information about the editorial board and submission rules is openly available."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Научный журнал — это регулярное академическое издание, а не просто площадка, где можно разместить текст.",
          "Ilmiy jurnal — bu shunchaki matn joylashtiriladigan joy emas, balki muntazam akademik nashrdir.",
          "A scientific journal is a regular academic publication, not just a place where one can post a text."
        ),
      },
    ],
    sourceIds: ["23", "27", "28", "29"],
  },
  {
    slug: "difference-between-thesis-and-article",
    title: lt(
      "Разница между научным тезисом и научной статьёй",
      "Ilmiy tezis va ilmiy maqola o‘rtasidagi farq",
      "Difference between a scientific thesis abstract and a scientific article"
    ),
    cardText: lt(
      "Научный тезис и научная статья — это не одно и то же, хотя оба формата относятся к академической публикации. Разница между ними прежде всего в объёме, глубине изложения и цели.",
      "Ilmiy tezis va ilmiy maqola bir xil narsa emas, garchi ikkala format ham akademik nashrga tegishli bo‘lsa-da. Ular orasidagi farq, avvalo, hajm, bayon chuqurligi va maqsadda.",
      "A scientific thesis abstract and a scientific article are not the same thing, although both belong to academic publishing. The difference lies primarily in volume, depth of presentation, and purpose."
    ),
    shortText: lt(
      "Тезисы — это короткое изложение исследования. Научная статья — это полноценный научный текст с методами, результатами, обсуждением и выводами.",
      "Tezislar — tadqiqotning qisqacha bayonidir. Ilmiy maqola esa metodlar, natijalar, muhokama va xulosalardan iborat to‘laqonli ilmiy matndir.",
      "Theses/abstracts are a short presentation of research. A scientific article is a full scholarly text with methods, results, discussion, and conclusions."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("В чём разница", "Farqi nimada", "What is the difference"),
        text: lt(
          "Тезисы обычно готовят для конференций, сборников материалов или предварительного представления исследования. Их задача — кратко показать, о чём работа, в чём её идея и какие получены основные результаты.",
          "Tezislar odatda konferensiyalar, materiallar to‘plamlari yoki tadqiqotni dastlabki taqdim etish uchun tayyorlanadi. Ularning vazifasi ish nima haqida ekanini, g‘oyasi nimada ekanini va qanday asosiy natijalar olinganini qisqacha ko‘rsatishdir.",
          "Theses or abstract texts are usually prepared for conferences, proceedings, or preliminary presentation of research. Their task is to briefly show what the work is about, what its main idea is, and what key results were obtained."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Научная статья решает другую задачу. Она не просто анонсирует исследование, а подробно показывает, какую проблему изучал автор, на какой научный контекст он опирался, какие методы использовал, какие результаты получил и как эти результаты интерпретируются.",
          "Ilmiy maqola esa boshqa vazifani bajaradi. U tadqiqotni shunchaki e’lon qilmaydi, balki muallif qanday muammoni o‘rganganini, qaysi ilmiy kontekstga tayanganini, qanday metodlardan foydalanganini, qanday natijalar olganini va bu natijalar qanday talqin qilinishini batafsil ko‘rsatadi.",
          "A scientific article serves a different purpose. It does not merely announce the research, but shows in detail what problem the author studied, what scholarly context it relied on, what methods were used, what results were obtained, and how those results are interpreted."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Если говорить совсем просто, тезисы отвечают на вопрос «о чём исследование?», а статья — на вопрос «как именно оно проведено и почему выводы заслуживают доверия?»",
          "Juda sodda aytganda, tezislar «tadqiqot nima haqida?» degan savolga javob beradi, maqola esa «u aynan qanday o‘tkazildi va nima uchun xulosalarga ishonish mumkin?» degan savolga javob beradi.",
          "Put very simply, theses answer the question “What is the research about?”, whereas an article answers “How exactly was it conducted and why are the conclusions trustworthy?”"
        ),
      },
      {
        type: "list",
        title: lt("Что обычно содержат тезисы", "Tezislar odatda nimani o‘z ichiga oladi", "What theses usually contain"),
        items: [
          lt("тему исследования;", "tadqiqot mavzusini;", "the research topic;"),
          lt("цель работы;", "ishning maqsadini;", "the aim of the work;"),
          lt("краткое описание подхода;", "yondashuvning qisqacha tavsifini;", "a brief description of the approach;"),
          lt("основные результаты;", "asosiy natijalarni;", "the main results;"),
          lt("короткий вывод.", "qisqa xulosani.", "a short conclusion."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Они компактны, быстро читаются и не требуют полного раскрытия всех деталей.",
          "Ular ixcham bo‘ladi, tez o‘qiladi va barcha tafsilotlarni to‘liq ochishni talab qilmaydi.",
          "They are compact, quick to read, and do not require full disclosure of all details."
        ),
      },
      {
        type: "list",
        title: lt("Что обычно содержит научная статья", "Ilmiy maqola odatda nimani o‘z ichiga oladi", "What a scientific article usually contains"),
        items: [
          lt("заголовок;", "sarlavha;", "title;"),
          lt("аннотацию;", "annotatsiya;", "abstract;"),
          lt("введение;", "kirish;", "introduction;"),
          lt("методы;", "metodlar;", "methods;"),
          lt("результаты;", "natijalar;", "results;"),
          lt("обсуждение;", "muhokama;", "discussion;"),
          lt("выводы;", "xulosalar;", "conclusions;"),
          lt("список литературы.", "adabiyotlar ro‘yxatini.", "references."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Именно поэтому статья считается основным форматом научного сообщения, а тезисы — сокращённым.",
          "Shuning uchun maqola ilmiy xabarning asosiy formati, tezislar esa qisqartirilgan shakli hisoblanadi.",
          "That is why an article is considered the main format of scholarly communication, while theses are a shortened form."
        ),
      },
      {
        type: "paragraph",
        title: lt("Почему это важно автору", "Bu muallif uchun nega muhim", "Why this matters for an author"),
        text: lt(
          "Авторы часто считают, что если тезисы опубликованы, то это уже эквивалент статьи. На практике это не так. Тезисы могут учитываться как публикационная активность в определённом контексте, но обычно не приравниваются к полноценной журнальной статье.",
          "Mualliflar ko‘pincha tezislar chop etilgan bo‘lsa, bu allaqachon maqolaga teng deb hisoblaydilar. Amalda unday emas. Tezislar ma’lum kontekstda nashr faolligi sifatida hisobga olinishi mumkin, lekin odatda to‘laqonli jurnal maqolasiga tenglashtirilmaydi.",
          "Authors often believe that if theses are published, this is already equivalent to an article. In practice, this is not so. Theses may count as publication activity in a certain context, but they are usually not treated as equivalent to a full journal article."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Тезисы — это краткое представление исследования. Научная статья — это полное и обоснованное изложение научной работы.",
          "Tezislar — tadqiqotning qisqacha taqdimotidir. Ilmiy maqola esa ilmiy ishning to‘liq va asoslangan bayonidir.",
          "Theses are a brief presentation of research. A scientific article is a complete and reasoned exposition of scholarly work."
        ),
      },
    ],
    sourceIds: ["30"],
  },
  {
    slug: "what-is-issn",
    title: lt("Что такое ISSN", "ISSN nima", "What is ISSN"),
    cardText: lt(
      "ISSN — это международный номер сериального издания. Он нужен для точной идентификации журнала или другого продолжающегося ресурса.",
      "ISSN — bu davriy nashrning xalqaro raqami. U jurnal yoki boshqa davomli resursni aniq identifikatsiya qilish uchun kerak.",
      "ISSN is the international number of a serial publication. It is used for the accurate identification of a journal or another continuing resource."
    ),
    shortText: lt(
      "ISSN — это международный номер сериального издания. Он нужен для точной идентификации журнала или другого продолжающегося ресурса.",
      "ISSN — bu davriy nashrning xalqaro raqami. U jurnal yoki boshqa davomli resursni aniq identifikatsiya qilish uchun kerak.",
      "ISSN is the international number of a serial publication. It is used for the accurate identification of a journal or another continuing resource."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Что означает ISSN", "ISSN nimani anglatadi", "What ISSN means"),
        text: lt(
          "ISSN расшифровывается как International Standard Serial Number. Это специальный 8-значный код, который присваивается журналу или другому продолжающемуся изданию.",
          "ISSN — International Standard Serial Number degani. Bu jurnal yoki boshqa davomli nashrga beriladigan maxsus 8 xonali koddir.",
          "ISSN stands for International Standard Serial Number. It is a special 8-digit code assigned to a journal or another continuing publication."
        ),
      },
      {
        type: "paragraph",
        title: lt("Пример записи", "Yozuv namunasi", "Example record"),
        text: lt("ISSN 1234-5678", "ISSN 1234-5678", "ISSN 1234-5678"),
      },
      {
        type: "paragraph",
        text: lt(
          "Этот номер нужен не для красоты и не для рекламы. Его основная функция — точно отличать одно издание от другого, особенно если названия похожи или менялись со временем.",
          "Bu raqam bezak yoki reklama uchun emas. Uning asosiy vazifasi — ayniqsa nomlari o‘xshash yoki vaqt o‘tishi bilan o‘zgargan bo‘lsa, bir nashrni boshqasidan aniq ajratishdir.",
          "This number is not for appearance or advertising. Its main function is to accurately distinguish one publication from another, especially when titles are similar or have changed over time."
        ),
      },
      {
        type: "list",
        title: lt("Для чего нужен ISSN", "ISSN nima uchun kerak", "Why ISSN is needed"),
        items: [
          lt("правильно идентифицировать журнал;", "jurnalni to‘g‘ri identifikatsiya qilish;", "to correctly identify a journal;"),
          lt("связывать его с базами данных и каталогами;", "uni ma’lumotlar bazalari va kataloglar bilan bog‘lash;", "to connect it with databases and catalogues;"),
          lt("избегать путаницы между похожими названиями;", "o‘xshash nomlar orasidagi chalkashlikning oldini olish;", "to avoid confusion between similar titles;"),
          lt("вести библиотечный и издательский учёт.", "kutubxona va nashriyot hisobini yuritish.", "to support library and publishing records."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Для сайта о журналах ISSN особенно полезен как технический ориентир: по нему удобнее сверять источник в Scopus, Crossref, каталогах и других системах.",
          "Jurnallar haqidagi sayt uchun ISSN texnik yo‘naltiruvchi sifatida ayniqsa foydalidir: uning yordamida manbani Scopus, Crossref, kataloglar va boshqa tizimlarda solishtirish osonroq bo‘ladi.",
          "For a website about journals, ISSN is especially useful as a technical reference point: it makes it easier to verify a source in Scopus, Crossref, catalogues, and other systems."
        ),
      },
      {
        type: "list",
        title: lt("Что ISSN не показывает", "ISSN nimani ko‘rsatmaydi", "What ISSN does not show"),
        items: [
          lt("не подтверждает, что журнал индексируется в Scopus;", "jurnal Scopus’da indekslanishini tasdiqlamaydi;", "it does not confirm that the journal is indexed in Scopus;"),
          lt("не гарантирует качество журнала;", "jurnal sifatini kafolatlamaydi;", "it does not guarantee journal quality;"),
          lt("не делает издание автоматически научным или добросовестным;", "nashrni avtomatik ravishda ilmiy yoki halol qilmaydi;", "it does not make a publication automatically scholarly or trustworthy;"),
          lt("не показывает страну или репутацию издателя.", "nashriyotning mamlakati yoki obro‘sini ko‘rsatmaydi.", "it does not show the publisher’s country or reputation."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Иными словами, ISSN — это идентификатор, а не знак качества.",
          "Boshqacha aytganda, ISSN — bu sifat belgisi emas, identifikatordir.",
          "In other words, ISSN is an identifier, not a mark of quality."
        ),
      },
      {
        type: "paragraph",
        title: lt("Print ISSN и eISSN", "Print ISSN va eISSN", "Print ISSN and eISSN"),
        text: lt(
          "У одного журнала может быть два номера: print ISSN — для печатной версии; eISSN — для электронной версии. Это нормальная практика. Если журнал выходит и в печатной, и в онлайн-форме, у каждой версии может быть свой отдельный идентификатор.",
          "Bitta jurnalda ikki raqam bo‘lishi mumkin: print ISSN — bosma versiya uchun; eISSN — elektron versiya uchun. Bu normal amaliyot. Agar jurnal bosma hamda onlayn shaklda chiqsa, har bir versiyaning alohida identifikatori bo‘lishi mumkin.",
          "A single journal may have two numbers: print ISSN for the print version and eISSN for the electronic version. This is normal practice. If a journal appears both in print and online, each version may have its own separate identifier."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "ISSN нужен для точного распознавания журнала. Это полезный и важный номер, но сам по себе он не говорит ни о качестве журнала, ни о его индексации.",
          "ISSN jurnalni aniq tanib olish uchun kerak. Bu foydali va muhim raqam, lekin uning o‘zi jurnal sifati yoki indeksatsiyasi haqida gapirmaydi.",
          "ISSN is needed for the precise identification of a journal. It is a useful and important number, but by itself it says nothing about journal quality or indexing."
        ),
      },
    ],
    sourceIds: ["31", "32"],
  },
  {
    slug: "how-to-determine-journal-country",
    title: lt(
      "Как определить страну журнала",
      "Jurnal mamlakatini qanday aniqlash kerak",
      "How to determine a journal’s country"
    ),
    cardText: lt(
      "Страну журнала не стоит определять по названию, языку сайта или ISSN. Надёжнее смотреть на данные текущего издателя и официальные библиографические записи.",
      "Jurnal mamlakatini nomi, sayt tili yoki ISSN orqali aniqlash to‘g‘ri emas. Amaldagi nashriyot ma’lumotlari va rasmiy bibliografik yozuvlarga qarash ishonchliroq.",
      "A journal’s country should not be determined by its name, website language, or ISSN. It is more reliable to look at the current publisher’s data and official bibliographic records."
    ),
    shortText: lt(
      "Страну журнала не стоит определять по названию, языку сайта или ISSN. Надёжнее смотреть на данные текущего издателя и официальные библиографические записи.",
      "Jurnal mamlakatini nomi, sayt tili yoki ISSN orqali aniqlash to‘g‘ri emas. Amaldagi nashriyot ma’lumotlari va rasmiy bibliografik yozuvlarga qarash ishonchliroq.",
      "A journal’s country should not be determined by its name, website language, or ISSN. It is more reliable to look at the current publisher’s data and official bibliographic records."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Подробно", "Batafsil", "In detail"),
        text: lt(
          "Определение страны журнала кажется простой задачей, но на практике именно здесь авторы часто ошибаются. Международное название, английский сайт или привычный домен ещё не означают, что журнал действительно относится к той стране, которую предполагает автор.",
          "Jurnal mamlakatini aniqlash oddiy vazifa bo‘lib tuyuladi, lekin amalda mualliflar aynan shu yerda ko‘p xato qiladilar. Xalqaro nom, inglizcha sayt yoki odatiy domen jurnal muallif taxmin qilgan mamlakatga tegishli ekanini anglatmaydi.",
          "Determining a journal’s country seems simple, but in practice authors often make mistakes here. An international-sounding title, an English-language website, or a familiar domain does not yet mean that the journal actually belongs to the country assumed by the author."
        ),
      },
      {
        type: "list",
        title: lt("Почему здесь так много ошибок", "Nega bu yerda xatolar ko‘p", "Why there are so many mistakes here"),
        items: [
          lt("сайт на английском языке;", "sayt ingliz tilida bo‘lishi;", "the website is in English;"),
          lt("название звучит «международно»;", "nomi «xalqaro» eshitilishi;", "the title sounds “international”;"),
          lt("домен .com или .org;", "domen .com yoki .org bo‘lishi;", "the domain is .com or .org;"),
          lt("в редакции есть иностранные специалисты;", "tahririyatda xorijiy mutaxassislar bo‘lishi;", "there are foreign specialists on the editorial board;"),
          lt("журнал использует латиницу и западный стиль оформления.", "jurnal lotin yozuvi va g‘arbona uslubdan foydalanishi.", "the journal uses Latin script and a Western style of presentation."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Но всё это не даёт надёжного ответа.",
          "Ammo bularning hech biri ishonchli javob bermaydi.",
          "But none of this gives a reliable answer."
        ),
      },
      {
        type: "paragraph",
        title: lt("На что смотреть в первую очередь", "Avvalo nimaga qarash kerak", "What to look at first"),
        text: lt(
          "Главный ориентир — текущий издатель и его официально указанный адрес. Именно эти данные лучше всего показывают, к какой стране относится журнал в издательском и библиографическом смысле.",
          "Asosiy mezon — amaldagi nashriyot va uning rasmiy ko‘rsatilgan manzili. Aynan shu ma’lumotlar jurnal nashriyot va bibliografik ma’noda qaysi mamlakatga tegishli ekanini eng yaxshi ko‘rsatadi.",
          "The main reference point is the current publisher and its officially stated address. These data best show which country the journal belongs to in a publishing and bibliographic sense."
        ),
      },
      {
        type: "list",
        title: lt("Проверять это лучше последовательно", "Buni izchil tekshirgan ma’qul", "It is best checked step by step"),
        items: [
          lt("1. Сайт журнала: кто указан как publisher, какой дан официальный адрес, что написано в разделе About Journal, где находится editorial office, есть ли publishing information или imprint.", "1. Jurnal sayti: publisher sifatida kim ko‘rsatilgan, rasmiy manzil qanday, About Journal bo‘limida nima yozilgan, editorial office qayerda, publishing information yoki imprint bormi.", "1. The journal website: who is listed as publisher, what official address is given, what is written in About Journal, where the editorial office is located, and whether publishing information or an imprint is provided."),
          lt("2. ISSN Portal и библиографические записи: там могут быть указаны название издания, издатель, место публикации и версия ресурса.", "2. ISSN Portal va bibliografik yozuvlar: u yerda nashr nomi, nashriyot, chop etilish joyi va resurs versiyasi ko‘rsatilgan bo‘lishi mumkin.", "2. ISSN Portal and bibliographic records: these may show the publication title, publisher, place of publication, and resource version."),
          lt("3. Scopus Source Details: если журнал индексируется в Scopus, стоит посмотреть и его карточку в базе.", "3. Scopus Source Details: agar jurnal Scopus’da indekslansa, uning bazadagi kartasini ham ko‘rish kerak.", "3. Scopus Source Details: if the journal is indexed in Scopus, its source card in the database should also be reviewed."),
          lt("4. Дополнительные метаданные: иногда полезно смотреть регистрационные сведения в Crossref или других каталогах.", "4. Qo‘shimcha metadata: ba’zan Crossref yoki boshqa kataloglardagi ro‘yxatga olish ma’lumotlarini ko‘rish foydali.", "4. Additional metadata: sometimes it is useful to check registration details in Crossref or other catalogues."),
        ],
      },
      {
        type: "list",
        title: lt("Что не стоит использовать как основной критерий", "Asosiy mezon sifatida nimadan foydalanmaslik kerak", "What should not be used as the main criterion"),
        items: [
          lt("доменную зону;", "domen zonasini;", "the domain zone;"),
          lt("язык интерфейса;", "interfeys tilini;", "the interface language;"),
          lt("гражданство редактора;", "muharrirning fuqaroligini;", "the editor’s citizenship;"),
          lt("формулировку «international journal»;", "«international journal» degan ifodani;", "the phrase “international journal”;"),
          lt("номер ISSN.", "ISSN raqamini.", "the ISSN number."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "ISSN, например, не кодирует страну. По самому номеру нельзя узнать, где издаётся журнал.",
          "Masalan, ISSN mamlakatni kodlamaydi. Faqat raqamning o‘zidan jurnal qayerda nashr etilishini bilib bo‘lmaydi.",
          "For example, ISSN does not encode a country. You cannot tell where a journal is published from the number alone."
        ),
      },
      {
        type: "list",
        title: lt("Почему это важно", "Bu nega muhim", "Why this matters"),
        items: [
          lt("при выборе площадки для публикации;", "nashr maydonini tanlashda;", "when choosing a publication venue;"),
          lt("при отчётности;", "hisobotda;", "in reporting;"),
          lt("при оценке репутации издателя;", "nashriyot obro‘sini baholashda;", "when assessing the publisher’s reputation;"),
          lt("при проверке достоверности информации о журнале.", "jurnal haqidagi ma’lumotlarning ishonchliligini tekshirishda.", "when verifying the reliability of information about the journal."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "Страну журнала определяют прежде всего по издателю и официальной библиографической записи, а не по внешнему виду сайта и не по названию.",
          "Jurnal mamlakati, avvalo, sayt ko‘rinishi yoki nomiga qarab emas, balki nashriyot va rasmiy bibliografik yozuv asosida aniqlanadi.",
          "A journal’s country is determined primarily by the publisher and the official bibliographic record, not by the look of the website or the journal’s title."
        ),
      },
    ],
    sourceIds: ["31", "32", "21"],
  },
  {
    slug: "what-is-imrad",
    title: lt(
      "Что такое стандарт IMRAD",
      "IMRAD standarti nima",
      "What is the IMRAD standard"
    ),
    cardText: lt(
      "IMRAD — это классическая структура научной статьи: Introduction, Methods, Results, Discussion — то есть Введение, Методы, Результаты, Обсуждение.",
      "IMRAD — ilmiy maqolaning klassik tuzilmasi: Introduction, Methods, Results, Discussion — ya’ni Kirish, Metodlar, Natijalar, Muhokama.",
      "IMRAD is the classic structure of a scientific article: Introduction, Methods, Results, Discussion."
    ),
    shortText: lt(
      "IMRAD — это классическая структура научной статьи: Introduction, Methods, Results, Discussion — то есть Введение, Методы, Результаты, Обсуждение.",
      "IMRAD — ilmiy maqolaning klassik tuzilmasi: Introduction, Methods, Results, Discussion — ya’ni Kirish, Metodlar, Natijalar, Muhokama.",
      "IMRAD is the classic structure of a scientific article: Introduction, Methods, Results, Discussion."
    ),
    blocks: [
      {
        type: "paragraph",
        title: lt("Зачем нужен IMRAD", "IMRAD nima uchun kerak", "Why IMRAD is needed"),
        text: lt(
          "Эта структура помогает излагать исследование последовательно и понятно. Читатель сразу видит: зачем проводилась работа, как она выполнялась, что получилось и как автор объясняет результаты.",
          "Bu tuzilma tadqiqotni izchil va tushunarli bayon qilishga yordam beradi. O‘quvchi darhol quyidagilarni ko‘radi: ish nima uchun o‘tkazilgan, u qanday bajarilgan, nima natija olingan va muallif natijalarni qanday tushuntiradi.",
          "This structure helps present research in a consistent and understandable way. The reader immediately sees why the work was conducted, how it was performed, what was obtained, and how the author explains the results."
        ),
      },
      {
        type: "list",
        title: lt("Поэтому IMRAD удобен", "Shuning uchun IMRAD qulay", "Therefore IMRAD is convenient"),
        items: [
          lt("для автора — как каркас текста;", "muallif uchun — matn karkasi sifatida;", "for the author — as a text framework;"),
          lt("для рецензента — как понятная схема оценки;", "taqrizchi uchun — baholashning tushunarli sxemasi sifatida;", "for the reviewer — as a clear evaluation scheme;"),
          lt("для читателя — как логичный путь через статью.", "o‘quvchi uchun — maqola bo‘ylab mantiqiy yo‘l sifatida.", "for the reader — as a logical path through the article."),
        ],
      },
      {
        type: "paragraph",
        title: lt("Как устроен IMRAD", "IMRAD qanday tuzilgan", "How IMRAD is structured"),
        text: lt(
          "Introduction — Введение. Во введении автор показывает, какую проблему он рассматривает, почему тема важна и какова цель исследования. Здесь формулируется вопрос, задача или гипотеза.",
          "Introduction — Kirish. Kirishda muallif qanday muammoni ko‘rib chiqayotganini, mavzu nega muhimligini va tadqiqot maqsadi nimadan iboratligini ko‘rsatadi. Shu yerda savol, vazifa yoki gipoteza shakllantiriladi.",
          "Introduction — In the introduction, the author shows what problem is being considered, why the topic is important, and what the aim of the research is. The question, task, or hypothesis is formulated here."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Methods — Методы. В этом разделе объясняется, как именно проводилось исследование: какие материалы использовались, какие процедуры применялись, как собирались данные, как выполнялся анализ. Именно этот раздел показывает, насколько исследование прозрачно и воспроизводимо.",
          "Methods — Metodlar. Bu bo‘limda tadqiqot aynan qanday o‘tkazilgani tushuntiriladi: qanday materiallardan foydalanilgani, qanday protseduralar qo‘llangani, ma’lumotlar qanday yig‘ilgani va tahlil qanday bajarilgani. Aynan shu bo‘lim tadqiqot qanchalik shaffof va takrorlanuvchi ekanini ko‘rsatadi.",
          "Methods — This section explains exactly how the study was conducted: what materials were used, what procedures were applied, how data were collected, and how analysis was performed. This section shows how transparent and reproducible the research is."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Results — Результаты. Здесь приводятся фактические результаты исследования: численные данные, наблюдения, таблицы, графики, выявленные связи и различия. Это раздел о том, что получилось, а не о том, как это оценивать.",
          "Results — Natijalar. Bu yerda tadqiqotning faktik natijalari keltiriladi: sonli ma’lumotlar, kuzatishlar, jadvallar, grafiklar, aniqlangan bog‘lanishlar va farqlar. Bu bo‘lim nima olingani haqida, uni qanday baholash haqida emas.",
          "Results — Here the factual findings of the research are presented: numerical data, observations, tables, graphs, identified relationships, and differences. This section is about what was obtained, not how to interpret it."
        ),
      },
      {
        type: "paragraph",
        text: lt(
          "Discussion — Обсуждение. В обсуждении автор объясняет смысл полученных результатов: что они означают, насколько они важны, как соотносятся с другими работами, какие есть ограничения и какие выводы можно сделать. Именно здесь результаты превращаются в научное объяснение.",
          "Discussion — Muhokama. Muhokamada muallif olingan natijalarning ma’nosini tushuntiradi: ular nimani anglatadi, qanchalik muhim, boshqa ishlar bilan qanday bog‘lanadi, qanday cheklovlar bor va qanday xulosalar chiqarish mumkin. Aynan shu yerda natijalar ilmiy izohga aylanadi.",
          "Discussion — In the discussion, the author explains the meaning of the obtained results: what they mean, how important they are, how they relate to other works, what limitations exist, and what conclusions can be drawn. This is where results turn into scientific explanation."
        ),
      },
      {
        type: "list",
        title: lt("Почему эта структура считается стандартной", "Nega bu tuzilma standart hisoblanadi", "Why this structure is considered standard"),
        items: [
          lt("она делает статью логичной;", "u maqolani mantiqiy qiladi;", "it makes the article logical;"),
          lt("читаемой;", "o‘qishga qulay qiladi;", "readable;"),
          lt("удобной для рецензирования;", "taqriz qilish uchun qulay qiladi;", "convenient for peer review;"),
          lt("понятной для повторной проверки;", "qayta tekshirish uchun tushunarli qiladi;", "clear for re-checking;"),
          lt("пригодной для научной коммуникации.", "ilmiy kommunikatsiya uchun yaroqli qiladi.", "suitable for scholarly communication."),
        ],
      },
      {
        type: "paragraph",
        text: lt(
          "Он особенно характерен для оригинальных исследовательских статей. При этом не все жанры обязаны строго ему следовать. Например, обзоры, case reports, editorials и некоторые другие типы материалов могут строиться иначе.",
          "U ayniqsa original tadqiqot maqolalari uchun xosdir. Biroq barcha janrlar unga qat’iy rioya qilishi shart emas. Masalan, sharhlar, case reportlar, editorials va ayrim boshqa material turlari boshqacha tuzilishi mumkin.",
          "It is especially characteristic of original research articles. At the same time, not all genres must follow it strictly. For example, reviews, case reports, editorials, and some other types of materials may be structured differently."
        ),
      },
      {
        type: "paragraph",
        title: lt("Когда IMRAD особенно важен", "IMRAD qachon ayniqsa muhim", "When IMRAD is especially important"),
        text: lt(
          "IMRAD особенно полезен там, где статья описывает собственное исследование автора. В таком тексте важно не только сообщить вывод, но и показать путь, по которому к нему пришли.",
          "IMRAD ayniqsa maqola muallifning o‘z tadqiqotini tasvirlagan joyda foydalidir. Bunday matnda nafaqat xulosani bildirish, balki unga qanday yo‘l bilan kelinganini ham ko‘rsatish muhim.",
          "IMRAD is especially useful where the article describes the author’s own research. In such a text, it is important not only to report the conclusion, but also to show the path by which it was reached."
        ),
      },
      {
        type: "paragraph",
        title: lt("Что важно запомнить", "Eslab qolish muhim", "What is important to remember"),
        text: lt(
          "IMRAD — это не просто формальность, а удобная и устойчивая логика научной статьи: сначала проблема, потом методы, затем результаты и их объяснение.",
          "IMRAD — bu shunchaki rasmiylik emas, balki ilmiy maqolaning qulay va barqaror mantig‘idir: avval muammo, keyin metodlar, so‘ng natijalar va ularning izohi.",
          "IMRAD is not just a formality, but a convenient and stable logic of a scientific article: first the problem, then methods, then results and their explanation."
        ),
      },
    ],
    sourceIds: ["22", "33", "34"],
  },
];