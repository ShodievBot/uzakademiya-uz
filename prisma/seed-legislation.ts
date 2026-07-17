import {loadEnvConfig} from '@next/env';

loadEnvConfig(process.cwd());

async function main() {
  const {prisma} = await import('../src/lib/prisma');
  const {legislationDocuments} = await import('../src/data/legislation');

  try {
    await prisma.legislationDocument.deleteMany();

    for (const doc of legislationDocuments) {
      await prisma.legislationDocument.create({
        data: {
          slug: doc.slug,
          titleRu: doc.title.ru,
          titleUz: doc.title.uz,
          titleEn: doc.title.en,
          summaryRu: doc.summary.ru,
          summaryUz: doc.summary.uz,
          summaryEn: doc.summary.en,
          bodyRu: doc.body.map((item) => item.ru),
          bodyUz: doc.body.map((item) => item.uz),
          bodyEn: doc.body.map((item) => item.en),
          sourceUrl: doc.sourceUrl,
          sourceLabelRu: doc.sourceLabel.ru,
          sourceLabelUz: doc.sourceLabel.uz,
          sourceLabelEn: doc.sourceLabel.en,
          category: doc.category,
          publishedAt: new Date(doc.publishedAt),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date(doc.publishedAt)
        }
      });
    }

    console.log(`Seed completed:
- Legislation documents: ${legislationDocuments.length}`);
  } finally {
    const {prisma} = await import('../src/lib/prisma');
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
