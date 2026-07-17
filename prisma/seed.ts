import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  Quartile,
  VerificationStatus,
  UsefulBlockType,
} from "@prisma/client";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.siteSettings.upsert({
    where: { id: "main-site-settings" },
    update: {
      siteName: "UzAkademiya.uz",
      siteUrl: "https://uzakademiya.uz",
      contactEmail: "info@uzakademiya.uz",
      telegramUsername: "journalplatformuz",
      whatsappNumber: "+998900000000",
      phoneNumber: "+998900000000",
      instagramHandle: "uzakademiya.uz",
      instagramUrl: "https://instagram.com/uzakademiya.uz",
      defaultLocale: "ru",
    },
    create: {
      id: "main-site-settings",
      siteName: "UzAkademiya.uz",
      siteUrl: "https://uzakademiya.uz",
      contactEmail: "info@uzakademiya.uz",
      telegramUsername: "journalplatformuz",
      whatsappNumber: "+998900000000",
      phoneNumber: "+998900000000",
      instagramHandle: "uzakademiya.uz",
      instagramUrl: "https://instagram.com/uzakademiya.uz",
      defaultLocale: "ru",
    },
  });

  const journal = await prisma.journal.upsert({
    where: { slug: "international-journal-of-innovative-technologies" },
    update: {
      title: "International Journal of Innovative Technologies",
      titleRu: "Международный журнал инновационных технологий",
      titleUz: "Innovatsion texnologiyalar xalqaro jurnali",
      shortDescription:
        "Научный журнал по технологиям, инженерии и прикладным исследованиям.",
      publisher: "Innovative Research Publishing",
      website: "https://example.com/journal-1",
      issn: "1234-5678",
      eissn: "8765-4321",
      country: "Uzbekistan",
      languages: ["English", "Russian"],
      subjectAreas: ["Engineering", "Technology"],
      categories: ["Computer Science", "Engineering"],
      isScopusIndexed: true,
      isOakRecommended: true,
      scopusCoverageYears: "2020-present",
      citescore2025: 4.2,
      citescore2026: 4.8,
      percentile: 78,
      quartile: Quartile.Q1,
      verificationStatus: VerificationStatus.VERIFIED,
      telegramUrl: "https://t.me/journalplatformuz",
      submissionUrl: "https://example.com/journal-1/submit",
    },
    create: {
      slug: "international-journal-of-innovative-technologies",
      title: "International Journal of Innovative Technologies",
      titleRu: "Международный журнал инновационных технологий",
      titleUz: "Innovatsion texnologiyalar xalqaro jurnali",
      shortDescription:
        "Научный журнал по технологиям, инженерии и прикладным исследованиям.",
      publisher: "Innovative Research Publishing",
      website: "https://example.com/journal-1",
      issn: "1234-5678",
      eissn: "8765-4321",
      country: "Uzbekistan",
      languages: ["English", "Russian"],
      subjectAreas: ["Engineering", "Technology"],
      categories: ["Computer Science", "Engineering"],
      isScopusIndexed: true,
      isOakRecommended: true,
      scopusCoverageYears: "2020-present",
      citescore2025: 4.2,
      citescore2026: 4.8,
      percentile: 78,
      quartile: Quartile.Q1,
      verificationStatus: VerificationStatus.VERIFIED,
      telegramUrl: "https://t.me/journalplatformuz",
      submissionUrl: "https://example.com/journal-1/submit",
    },
  });

  await prisma.scopusContent.deleteMany({
    where: { journalId: journal.id },
  });

  await prisma.scopusContent.createMany({
    data: [
      { journalId: journal.id, year: 2022, documentsCount: 45 },
      { journalId: journal.id, year: 2023, documentsCount: 51 },
      { journalId: journal.id, year: 2024, documentsCount: 49 },
    ],
  });

  await prisma.legislationDocument.upsert({
    where: { slug: "law-on-science-and-scientific-activity" },
    update: {
      titleRu: "Закон «О науке и научной деятельности»",
      titleUz: "“Ilm-fan va ilmiy faoliyat to‘g‘risida”gi Qonun",
      titleEn: "Law on Science and Scientific Activity",
      summaryRu:
        "Базовый документ для понимания принципов научной деятельности, роли исследователей, организаций и государства.",
      summaryUz:
        "Ilmiy faoliyat tamoyillari, tadqiqotchilar, tashkilotlar va davlatning roli bo‘yicha asosiy hujjat.",
      summaryEn:
        "A core legal document explaining the principles of scientific activity and the roles of researchers, institutions, and the state.",
      bodyRu: [
        "Этот документ помогает понять общие правовые основы науки.",
        "Проверяйте актуальную редакцию официального документа.",
      ],
      bodyUz: [
        "Ushbu hujjat ilm-fanning umumiy huquqiy asoslarini tushuntiradi.",
        "Hujjatning amaldagi rasmiy tahririni tekshiring.",
      ],
      bodyEn: [
        "This document outlines the general legal foundations of science.",
        "Always verify the current official version of the document.",
      ],
      sourceUrl: "https://lex.uz/acts/4825305",
      sourceLabelRu: "Открыть документ на Lex.uz",
      sourceLabelUz: "Lex.uz da hujjatni ochish",
      sourceLabelEn: "Open the document on Lex.uz",
      category: "science",
      publishedAt: new Date("2020-10-29"),
      updatedAt: new Date("2024-01-10"),
    },
    create: {
      slug: "law-on-science-and-scientific-activity",
      titleRu: "Закон «О науке и научной деятельности»",
      titleUz: "“Ilm-fan va ilmiy faoliyat to‘g‘risida”gi Qonun",
      titleEn: "Law on Science and Scientific Activity",
      summaryRu:
        "Базовый документ для понимания принципов научной деятельности, роли исследователей, организаций и государства.",
      summaryUz:
        "Ilmiy faoliyat tamoyillari, tadqiqotchilar, tashkilotlar va davlatning roli bo‘yicha asosiy hujjat.",
      summaryEn:
        "A core legal document explaining the principles of scientific activity and the roles of researchers, institutions, and the state.",
      bodyRu: [
        "Этот документ помогает понять общие правовые основы науки.",
        "Проверяйте актуальную редакцию официального документа.",
      ],
      bodyUz: [
        "Ushbu hujjat ilm-fanning umumiy huquqiy asoslarini tushuntiradi.",
        "Hujjatning amaldagi rasmiy tahririni tekshiring.",
      ],
      bodyEn: [
        "This document outlines the general legal foundations of science.",
        "Always verify the current official version of the document.",
      ],
      sourceUrl: "https://lex.uz/acts/4825305",
      sourceLabelRu: "Открыть документ на Lex.uz",
      sourceLabelUz: "Lex.uz da hujjatni ochish",
      sourceLabelEn: "Open the document on Lex.uz",
      category: "science",
      publishedAt: new Date("2020-10-29"),
      updatedAt: new Date("2024-01-10"),
    },
  });

  const source = await prisma.usefulSource.upsert({
    where: { sourceKey: "elsevier-scopus" },
    update: {
      titleRu: "Elsevier. Scopus.",
      titleUz: "Elsevier. Scopus.",
      titleEn: "Elsevier. Scopus.",
      url: "https://www.elsevier.com/products/scopus",
    },
    create: {
      sourceKey: "elsevier-scopus",
      titleRu: "Elsevier. Scopus.",
      titleUz: "Elsevier. Scopus.",
      titleEn: "Elsevier. Scopus.",
      url: "https://www.elsevier.com/products/scopus",
    },
  });

  const page = await prisma.usefulPage.upsert({
    where: { slug: "scopus-basics" },
    update: {
      titleRu: "Что такое Scopus и как им пользоваться",
      titleUz: "Scopus nima va undan qanday foydalaniladi",
      titleEn: "What Scopus is and how to use it",
      cardTextRu: "Краткое введение в базу Scopus, метрики и проверку журналов.",
      cardTextUz:
        "Scopus bazasi, metrikalar va jurnallarni tekshirish bo‘yicha qisqacha kirish.",
      cardTextEn:
        "A short introduction to Scopus, metrics, and journal verification.",
      shortTitleRu: "Scopus",
      shortTitleUz: "Scopus",
      shortTitleEn: "Scopus",
      shortTextRu: "Базовый навигатор по индексированию и проверке журналов.",
      shortTextUz:
        "Indekslash va jurnallarni tekshirish bo‘yicha boshlang‘ich yo‘riqnoma.",
      shortTextEn: "A starter guide to indexing and journal verification.",
      fullTitleRu: "Scopus: базовая навигация для автора",
      fullTitleUz: "Scopus: muallif uchun asosiy yo‘riqnoma",
      fullTitleEn: "Scopus: a practical starting guide for authors",
    },
    create: {
      slug: "scopus-basics",
      titleRu: "Что такое Scopus и как им пользоваться",
      titleUz: "Scopus nima va undan qanday foydalaniladi",
      titleEn: "What Scopus is and how to use it",
      cardTextRu: "Краткое введение в базу Scopus, метрики и проверку журналов.",
      cardTextUz:
        "Scopus bazasi, metrikalar va jurnallarni tekshirish bo‘yicha qisqacha kirish.",
      cardTextEn:
        "A short introduction to Scopus, metrics, and journal verification.",
      shortTitleRu: "Scopus",
      shortTitleUz: "Scopus",
      shortTitleEn: "Scopus",
      shortTextRu: "Базовый навигатор по индексированию и проверке журналов.",
      shortTextUz:
        "Indekslash va jurnallarni tekshirish bo‘yicha boshlang‘ich yo‘riqnoma.",
      shortTextEn: "A starter guide to indexing and journal verification.",
      fullTitleRu: "Scopus: базовая навигация для автора",
      fullTitleUz: "Scopus: muallif uchun asosiy yo‘riqnoma",
      fullTitleEn: "Scopus: a practical starting guide for authors",
    },
  });

  await prisma.usefulBlock.deleteMany({
    where: { pageId: page.id },
  });

  await prisma.usefulBlock.createMany({
    data: [
      {
        pageId: page.id,
        sortOrder: 1,
        type: UsefulBlockType.PARAGRAPH,
        titleRu: "Что важно понимать",
        titleUz: "Nimani tushunish muhim",
        titleEn: "What matters first",
        textRu:
          "Scopus — это международная библиографическая и аналитическая база данных.",
        textUz:
          "Scopus — xalqaro bibliografik va analitik ma’lumotlar bazasi.",
        textEn:
          "Scopus is an international bibliographic and analytics database.",
        itemsRu: [],
        itemsUz: [],
        itemsEn: [],
      },
      {
        pageId: page.id,
        sortOrder: 2,
        type: UsefulBlockType.LIST,
        titleRu: "Что проверить перед подачей статьи",
        titleUz: "Maqola yuborishdan oldin nimalarni tekshirish kerak",
        titleEn: "What to verify before submission",
        textRu: null,
        textUz: null,
        textEn: null,
        itemsRu: [
          "Индексируется ли журнал сейчас",
          "Есть ли официальный сайт журнала",
        ],
        itemsUz: [
          "Jurnal hozir indekslanadimi",
          "Jurnalning rasmiy sayti bormi",
        ],
        itemsEn: [
          "Whether the journal is currently indexed",
          "Whether the journal has an official website",
        ],
      },
    ],
  });

  await prisma.usefulPageSource.deleteMany({
    where: { pageId: page.id },
  });

  await prisma.usefulPageSource.create({
    data: {
      pageId: page.id,
      sourceId: source.id,
    },
  });

  console.log("✅ Seed completed successfully");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
