import {loadEnvConfig} from '@next/env';

loadEnvConfig(process.cwd());

async function main() {
  const {prisma} = await import('../src/lib/prisma');
  const {UsefulBlockType} = await import('@prisma/client');
  const {usefulPages} = await import('../src/data/useful-pages');
  const {usefulSources} = await import('../src/data/useful-sources');

  try {
    await prisma.usefulPageSource.deleteMany();
    await prisma.usefulBlock.deleteMany();
    await prisma.usefulPage.deleteMany();
    await prisma.usefulSource.deleteMany();

    const sourceMap = new Map<string, string>();

    for (const source of usefulSources) {
      const created = await prisma.usefulSource.create({
        data: {
          sourceKey: source.id,
          titleRu: source.title.ru,
          titleUz: source.title.uz,
          titleEn: source.title.en,
          url: source.url
        }
      });

      sourceMap.set(source.id, created.id);
    }

    for (const page of usefulPages) {
      const createdPage = await prisma.usefulPage.create({
        data: {
          slug: page.slug,
          titleRu: page.title.ru,
          titleUz: page.title.uz,
          titleEn: page.title.en,
          cardTextRu: page.cardText.ru,
          cardTextUz: page.cardText.uz,
          cardTextEn: page.cardText.en,
          shortTitleRu: page.shortTitle?.ru ?? null,
          shortTitleUz: page.shortTitle?.uz ?? null,
          shortTitleEn: page.shortTitle?.en ?? null,
          shortTextRu: page.shortText?.ru ?? null,
          shortTextUz: page.shortText?.uz ?? null,
          shortTextEn: page.shortText?.en ?? null,
          fullTitleRu: page.fullTitle?.ru ?? null,
          fullTitleUz: page.fullTitle?.uz ?? null,
          fullTitleEn: page.fullTitle?.en ?? null,
          blocks: {
            create: page.blocks.map((block, index) => ({
              sortOrder: index,
              type:
                block.type === 'list'
                  ? UsefulBlockType.LIST
                  : UsefulBlockType.PARAGRAPH,
              titleRu: block.title?.ru ?? null,
              titleUz: block.title?.uz ?? null,
              titleEn: block.title?.en ?? null,
              textRu: block.text?.ru ?? null,
              textUz: block.text?.uz ?? null,
              textEn: block.text?.en ?? null,
              itemsRu: block.items?.map((item) => item.ru) ?? [],
              itemsUz: block.items?.map((item) => item.uz) ?? [],
              itemsEn: block.items?.map((item) => item.en) ?? []
            }))
          }
        }
      });

      for (const sourceId of page.sourceIds) {
        const dbSourceId = sourceMap.get(sourceId);

        if (!dbSourceId) continue;

        await prisma.usefulPageSource.create({
          data: {
            pageId: createdPage.id,
            sourceId: dbSourceId
          }
        });
      }
    }

    console.log(`Seed completed:
- Useful sources: ${usefulSources.length}
- Useful pages: ${usefulPages.length}`);
  } finally {
    const {prisma} = await import('../src/lib/prisma');
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
