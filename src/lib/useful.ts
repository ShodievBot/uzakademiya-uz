import {prisma} from '@/lib/prisma';
import type {
  LocalizedText,
  SiteLocale,
  UsefulBlock,
  UsefulPage
} from '@/types/useful-page';

export const siteLocales: SiteLocale[] = ['ru', 'uz', 'en'];

type UsefulSourceItem = {
  id: string;
  sourceKey: string;
  title: LocalizedText;
  url: string;
};

export type UsefulPageWithSources = UsefulPage & {
  sources: UsefulSourceItem[];
};

function lt(ru = '', uz = '', en = ''): LocalizedText {
  return {ru, uz, en};
}

export function normalizeLocale(input?: string): SiteLocale {
  const value = (input || 'ru').toLowerCase();

  if (value === 'ru' || value === 'uz' || value === 'en') {
    return value;
  }

  return 'ru';
}

export function pickLocale(
  value: LocalizedText | undefined,
  locale: SiteLocale
) {
  if (!value) return '';
  return value[locale] || value.ru || value.uz || value.en || '';
}

export function pickLocaleArray(
  values: LocalizedText[] | undefined,
  locale: SiteLocale
) {
  if (!values) return [];
  return values.map((item) => pickLocale(item, locale));
}

function mapBlockItems(
  itemsRu: string[],
  itemsUz: string[],
  itemsEn: string[]
): LocalizedText[] {
  const maxLength = Math.max(itemsRu.length, itemsUz.length, itemsEn.length);

  return Array.from({length: maxLength}, (_, index) =>
    lt(itemsRu[index] || '', itemsUz[index] || '', itemsEn[index] || '')
  );
}

function mapPageFromDb(page: {
  slug: string;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  cardTextRu: string;
  cardTextUz: string;
  cardTextEn: string;
  shortTitleRu: string | null;
  shortTitleUz: string | null;
  shortTitleEn: string | null;
  shortTextRu: string | null;
  shortTextUz: string | null;
  shortTextEn: string | null;
  fullTitleRu: string | null;
  fullTitleUz: string | null;
  fullTitleEn: string | null;
  blocks: Array<{
    type: 'PARAGRAPH' | 'LIST';
    titleRu: string | null;
    titleUz: string | null;
    titleEn: string | null;
    textRu: string | null;
    textUz: string | null;
    textEn: string | null;
    itemsRu: string[];
    itemsUz: string[];
    itemsEn: string[];
  }>;
  sources: Array<{
    source: {
      id: string;
      sourceKey: string;
      titleRu: string;
      titleUz: string;
      titleEn: string;
      url: string;
    };
  }>;
}): UsefulPageWithSources {
  const blocks: UsefulBlock[] = page.blocks.map((block) => ({
    type: block.type === 'LIST' ? 'list' : 'paragraph',
    title:
      block.titleRu || block.titleUz || block.titleEn
        ? lt(block.titleRu || '', block.titleUz || '', block.titleEn || '')
        : undefined,
    text:
      block.textRu || block.textUz || block.textEn
        ? lt(block.textRu || '', block.textUz || '', block.textEn || '')
        : undefined,
    items:
      block.itemsRu.length || block.itemsUz.length || block.itemsEn.length
        ? mapBlockItems(block.itemsRu, block.itemsUz, block.itemsEn)
        : undefined
  }));

  const sources: UsefulSourceItem[] = page.sources.map((item) => ({
    id: item.source.id,
    sourceKey: item.source.sourceKey,
    title: lt(item.source.titleRu, item.source.titleUz, item.source.titleEn),
    url: item.source.url
  }));

  return {
    slug: page.slug,
    title: lt(page.titleRu, page.titleUz, page.titleEn),
    cardText: lt(page.cardTextRu, page.cardTextUz, page.cardTextEn),
    shortTitle:
      page.shortTitleRu || page.shortTitleUz || page.shortTitleEn
        ? lt(
            page.shortTitleRu || '',
            page.shortTitleUz || '',
            page.shortTitleEn || ''
          )
        : undefined,
    shortText:
      page.shortTextRu || page.shortTextUz || page.shortTextEn
        ? lt(
            page.shortTextRu || '',
            page.shortTextUz || '',
            page.shortTextEn || ''
          )
        : undefined,
    fullTitle:
      page.fullTitleRu || page.fullTitleUz || page.fullTitleEn
        ? lt(page.fullTitleRu || '', page.fullTitleUz || '', page.fullTitleEn || '')
        : undefined,
    blocks,
    sourceIds: sources.map((item) => item.sourceKey),
    sources
  };
}

export async function getUsefulPages(): Promise<UsefulPageWithSources[]> {
  const pages = await prisma.usefulPage.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    include: {
      blocks: {
        orderBy: {
          sortOrder: 'asc'
        }
      },
      sources: {
        include: {
          source: true
        }
      }
    }
  });

  return pages.map(mapPageFromDb);
}

export async function getUsefulPageBySlug(
  slug: string
): Promise<UsefulPageWithSources | null> {
  const page = await prisma.usefulPage.findUnique({
    where: {slug},
    include: {
      blocks: {
        orderBy: {
          sortOrder: 'asc'
        }
      },
      sources: {
        include: {
          source: true
        }
      }
    }
  });

  if (!page) return null;

  return mapPageFromDb(page);
}

export async function getUsefulSlugs(): Promise<string[]> {
  const pages = await prisma.usefulPage.findMany({
    select: {
      slug: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return pages.map((page) => page.slug);
}

export async function getUsefulSourcesByKeys(keys: string[]) {
  if (!keys.length) return [];

  const sources = await prisma.usefulSource.findMany({
    where: {
      sourceKey: {
        in: keys
      }
    }
  });

  const map = new Map(sources.map((source) => [source.sourceKey, source]));

  return keys
    .map((key) => map.get(key))
    .filter(Boolean)
    .map((source) => ({
      sourceKey: source!.sourceKey,
      title: lt(source!.titleRu, source!.titleUz, source!.titleEn),
      url: source!.url
    }));
}
