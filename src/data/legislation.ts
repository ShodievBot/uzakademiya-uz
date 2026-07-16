import type {LegislationDocument, LocalizedText} from '@/types/legislation';

const lt = (ru: string, uz: string, en: string): LocalizedText => ({
  ru,
  uz,
  en
});

export const legislationDocuments: LegislationDocument[] = [
  {
    slug: 'law-on-science-and-scientific-activity',
    title: lt(
      'Закон «О науке и научной деятельности»',
      '“Ilm-fan va ilmiy faoliyat to‘g‘risida”gi Qonun',
      'Law on Science and Scientific Activity'
    ),
    summary: lt(
      'Базовый документ для понимания принципов научной деятельности, роли исследователей, организаций и государства.',
      'Ilmiy faoliyat tamoyillari, tadqiqotchilar, tashkilotlar va davlatning roli bo‘yicha asosiy hujjat.',
      'A core legal document explaining the principles of scientific activity and the roles of researchers, institutions, and the state.'
    ),
    body: [
      lt(
        'Этот документ помогает понять общие правовые основы науки, научных организаций, государственной поддержки и взаимодействия науки, образования и производства.',
        'Ushbu hujjat ilm-fan, ilmiy tashkilotlar, davlat ko‘magi hamda fan, ta’lim va ishlab chiqarish o‘rtasidagi hamkorlikning umumiy huquqiy asoslarini tushunishga yordam beradi.',
        'This document outlines the general legal foundations of science, scientific organizations, state support, and the interaction between science, education, and industry.'
      ),
      lt(
        'Для пользователя платформы это важный ориентир: он показывает, что при публикационной деятельности нужно учитывать не только требования журнала, но и общий нормативный контекст научной работы.',
        'Platforma foydalanuvchisi uchun bu muhim yo‘riqnoma: u nashr jarayonida faqat jurnal talablarini emas, balki ilmiy faoliyatning umumiy me’yoriy kontekstini ham hisobga olish kerakligini ko‘rsatadi.',
        'For a platform user, this is an important reference point: publication work should be aligned not only with journal requirements but also with the broader regulatory framework of research activity.'
      ),
      lt(
        'Финальную юридическую проверку всегда нужно выполнять по официальному тексту документа и актуальной редакции.',
        'Yakuniy yuridik tekshiruv doimo hujjatning rasmiy matni va uning amaldagi tahriri asosida bajarilishi kerak.',
        'Final legal verification should always be performed against the official text and the current version of the document.'
      )
    ],
    sourceUrl: 'https://lex.uz/acts/4825305',
    sourceLabel: lt(
      'Открыть документ на Lex.uz',
      'Lex.uz da hujjatni ochish',
      'Open the document on Lex.uz'
    ),
    publishedAt: '2020-10-29',
    updatedAt: '2024-01-10',
    category: 'science'
  },
  {
    slug: 'oak-official-sources-and-attestation-requirements',
    title: lt(
      'Официальные источники ВАК / OAK и требования к аттестации',
      'OAK / VAK rasmiy manbalari va attestatsiya talablari',
      'Official SAC/OAK sources and attestation requirements'
    ),
    summary: lt(
      'Краткий навигатор по официальным ресурсам и проверке актуальных требований к научным степеням и аттестации.',
      'Ilmiy darajalar va attestatsiya bo‘yicha amaldagi talablarni tekshirish uchun rasmiy manbalar bo‘yicha qisqa yo‘riqnoma.',
      'A short guide to official resources and the verification of current requirements related to academic degrees and attestation.'
    ),
    body: [
      lt(
        'При работе с требованиями ВАК / OAK важно ориентироваться на официальные ресурсы уполномоченного органа, а не только на пересказы или рекламные материалы.',
        'OAK / VAK talablari bilan ishlashda faqat sharhlar yoki reklama materiallariga emas, balki vakolatli organning rasmiy resurslariga tayanish muhim.',
        'When working with SAC/OAK requirements, it is important to rely on the official resources of the authorized body rather than summaries or marketing materials alone.'
      ),
      lt(
        'Пользователю следует проверять: действующие перечни, требования к публикациям, правила по специальностям, а также обновления, влияющие на диссертационные и аттестационные процедуры.',
        'Foydalanuvchi quyidagilarni tekshirishi kerak: amaldagi ro‘yxatlar, nashr talablari, ixtisosliklar bo‘yicha qoidalar va dissertatsiya hamda attestatsiya tartiblariga ta’sir qiluvchi yangilanishlar.',
        'Users should verify current lists, publication requirements, subject-specific rules, and updates that affect dissertation and attestation procedures.'
      ),
      lt(
        'Платформа может служить удобной навигацией, но финальная верификация должна идти через официальный сайт и первоисточники.',
        'Platforma qulay yo‘riqnoma bo‘lishi mumkin, ammo yakuniy verifikatsiya rasmiy sayt va birlamchi manbalar orqali amalga oshirilishi kerak.',
        'The platform can serve as a convenient navigation layer, but final verification should always be done through the official website and primary sources.'
      )
    ],
    sourceUrl: 'https://oak.uz/',
    sourceLabel: lt(
      'Открыть официальный сайт OAK',
      'OAK rasmiy saytini ochish',
      'Open the official OAK website'
    ),
    publishedAt: '2024-03-15',
    updatedAt: '2025-02-01',
    category: 'attestation'
  },
  {
    slug: 'publication-ethics-and-plagiarism-check',
    title: lt(
      'Публикационная этика и проверка на плагиат',
      'Nashr etikasi va plagiat tekshiruvi',
      'Publication ethics and plagiarism checks'
    ),
    summary: lt(
      'Справочный материал о том, почему редакционная этика, авторство и антиплагиат важны до подачи статьи.',
      'Maqola yuborishdan oldin tahririy etika, mualliflik va antiplagiat nima uchun muhimligi haqida ma’lumot.',
      'A reference note on why editorial ethics, authorship, and plagiarism checks matter before article submission.'
    ),
    body: [
      lt(
        'Перед подачей статьи автору важно проверить оригинальность текста, корректность авторства, корректность ссылок и соответствие редакционной политике журнала.',
        'Maqolani yuborishdan oldin muallif matnning originalligini, mualliflikning to‘g‘riligini, havolalarning aniqligini va jurnal tahririy siyosatiga mosligini tekshirishi muhim.',
        'Before submitting an article, authors should verify originality, authorship accuracy, citation accuracy, and compliance with the journal’s editorial policy.'
      ),
      lt(
        'Даже если журнал не описывает все процедуры подробно, пользователю стоит ориентироваться на международные этические практики и официальные рекомендации профильных организаций.',
        'Agar jurnal barcha tartiblarni batafsil yozmagan bo‘lsa ham, foydalanuvchi xalqaro etik amaliyotlar va tegishli tashkilotlarning rasmiy tavsiyalariga tayanishi kerak.',
        'Even if a journal does not describe every procedure in detail, users should rely on international ethical practices and official guidance from relevant organizations.'
      ),
      lt(
        'Этот раздел платформы помогает сориентироваться, но не заменяет редакционную экспертизу и официальные требования конкретного издания.',
        'Platformaning ushbu bo‘limi yo‘nalish beradi, ammo u tahririy ekspertiza va muayyan jurnalning rasmiy talablarini almashtirmaydi.',
        'This section of the platform is intended for orientation and does not replace editorial review or the official requirements of a specific journal.'
      )
    ],
    sourceUrl: 'https://publicationethics.org/',
    sourceLabel: lt(
      'Открыть COPE',
      'COPE saytini ochish',
      'Open COPE'
    ),
    publishedAt: '2025-01-20',
    updatedAt: '2025-05-15',
    category: 'ethics'
  }
];
