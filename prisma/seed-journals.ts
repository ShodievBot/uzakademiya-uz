import {loadEnvConfig} from '@next/env';
import fs from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {Quartile, VerificationStatus} from '@prisma/client';

loadEnvConfig(process.cwd());

type RawScopusContent = {
  year?: unknown;
  documentsCount?: unknown;
};

type RawJournal = Record<string, unknown>;
function getNestedRecord(
  obj: RawJournal,
  key: string
): Record<string, unknown> | null {
  const value = obj[key];
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function firstString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function pickString(obj: RawJournal, keys: string[]): string | null {
  for (const key of keys) {
    const value = firstString(obj[key]);
    if (value) return value;
  }
  return null;
}

function pickNumber(obj: RawJournal, keys: string[]): number | null {
  for (const key of keys) {
    const raw = obj[key];

    if (typeof raw === 'number' && Number.isFinite(raw)) {
      return raw;
    }

    if (typeof raw === 'string') {
      const normalized = raw.replace(',', '.').trim();
      if (!normalized) continue;

      const parsed = Number(normalized);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return null;
}

function pickBoolean(obj: RawJournal, keys: string[]): boolean {
  for (const key of keys) {
    const raw = obj[key];

    if (typeof raw === 'boolean') return raw;

    if (typeof raw === 'number') return raw === 1;

    if (typeof raw === 'string') {
      const normalized = raw.trim().toLowerCase();

      if (['true', '1', 'yes', 'y', 'да', 'ha'].includes(normalized)) return true;
      if (['false', '0', 'no', 'n', 'нет', 'yo‘q', "yo'q"].includes(normalized)) return false;
    }
  }

  return false;
}

function pickStringArray(obj: RawJournal, keys: string[]): string[] {
  for (const key of keys) {
    const raw = obj[key];

    if (Array.isArray(raw)) {
      const items = raw
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean);

      if (items.length) return items;
    }

    if (typeof raw === 'string') {
      const items = raw
        .split(/[,;|]/g)
        .map((item) => item.trim())
        .filter(Boolean);

      if (items.length) return items;
    }
  }

  return [];
}

function normalizeQuartile(value: string | null): Quartile | null {
  if (!value) return null;

  const normalized = value.trim().toUpperCase();

  if (
    normalized === 'Q1' ||
    normalized === 'Q2' ||
    normalized === 'Q3' ||
    normalized === 'Q4'
  ) {
    return normalized as Quartile;
  }

  return null;
}

function normalizeVerificationStatus(
  value: string | null
): VerificationStatus | null {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();

  if (normalized === 'verified') return VerificationStatus.VERIFIED;
  if (normalized === 'partially_verified') {
    return VerificationStatus.PARTIALLY_VERIFIED;
  }
  if (normalized === 'needs_manual_review') {
    return VerificationStatus.NEEDS_MANUAL_REVIEW;
  }

  return null;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9а-яёўқғҳ\-_\\s]/gi, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractArray(payload: unknown): RawJournal[] {
  if (Array.isArray(payload)) return payload as RawJournal[];

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;

    const candidates = [
      record.journals,
      record.items,
      record.data,
      record.rows,
      record.results
    ];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) return candidate as RawJournal[];
    }
  }

  throw new Error(
    'Не удалось найти массив журналов в src/data/journals.master.json'
  );
}

function normalizeScopusContent(raw: unknown) {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => item as RawScopusContent)
    .map((item) => {
      const year =
        typeof item.year === 'number'
          ? item.year
          : typeof item.year === 'string'
            ? Number(item.year)
            : NaN;

      const documentsCount =
        typeof item.documentsCount === 'number'
          ? item.documentsCount
          : typeof item.documentsCount === 'string'
            ? Number(item.documentsCount)
            : NaN;

      return {year, documentsCount};
    })
    .filter(
      (item) =>
        Number.isFinite(item.year) && Number.isFinite(item.documentsCount)
    );
}

async function main() {
  const {prisma} = await import('../src/lib/prisma');

  const filePath = path.join(process.cwd(), 'src/data/journals.master.json');
  const fileText = await fs.readFile(filePath, 'utf8');
  const parsed = JSON.parse(fileText.replace(/^\uFEFF/, ''));
  const rawJournals = extractArray(parsed);

  console.log(`Найдено записей в JSON: ${rawJournals.length}`);

  await prisma.scopusContent.deleteMany();
  await prisma.journal.deleteMany();

  let ruCount = 0;
  let uzCount = 0;
  let enCount = 0;

  for (const item of rawJournals) {
    const content = getNestedRecord(item, 'content') ?? {};
    const title = pickString(item, ['title', 'titleEn', 'name']) || 'Untitled';
    const titleRu = pickString(item, ['titleRu', 'nameRu']) || title;
    const titleUz = pickString(item, ['titleUz', 'nameUz']) || title;

    const shortDescription = pickString(item, [
      'shortDescription',
      'description',
      'summary'
    ]) || pickString(content, [
      'shortDescriptionRu',
      'shortDescriptionEn',
      'shortDescriptionUz',
      'descriptionRu',
      'descriptionEn',
      'descriptionUz',
      'summaryRu',
      'summaryEn',
      'summaryUz'
    ]) || '';

    const shortDescriptionRu =
      pickString(item, ['shortDescriptionRu', 'descriptionRu', 'summaryRu']) ||
      pickString(content, ['shortDescriptionRu', 'descriptionRu', 'summaryRu']);

    const shortDescriptionUz =
      pickString(item, ['shortDescriptionUz', 'descriptionUz', 'summaryUz']) ||
      pickString(content, ['shortDescriptionUz', 'descriptionUz', 'summaryUz']);

    const shortDescriptionEn =
      pickString(item, ['shortDescriptionEn', 'descriptionEn', 'summaryEn']) ||
      pickString(content, ['shortDescriptionEn', 'descriptionEn', 'summaryEn']);

    if (shortDescriptionRu) ruCount += 1;
    if (shortDescriptionUz) uzCount += 1;
    if (shortDescriptionEn) enCount += 1;

    const slugSource =
      pickString(item, ['slug']) || titleRu || titleUz || title || randomUUID();

    const slug = slugify(slugSource) || randomUUID();

    const quartile = normalizeQuartile(
      pickString(item, ['quartile'])
    );

    const verificationStatus = normalizeVerificationStatus(
      pickString(item, ['verificationStatus'])
    );

    const scopusContent = normalizeScopusContent(
      item.scopusContent ?? item.scopus_content
    );

    await prisma.journal.create({
      data: {
        slug,
        title,
        titleRu,
        titleUz,

        shortDescription,
        shortDescriptionRu,
        shortDescriptionUz,
        shortDescriptionEn,

        publisher: pickString(item, ['publisher']) || '',
        website: pickString(item, ['website', 'site', 'url']) || '',
        coverImage: pickString(item, ['coverImage', 'cover', 'image']),

        issn: pickString(item, ['issn']),
        eissn: pickString(item, ['eissn', 'eIssn']),

        country: pickString(item, ['country']),
        languages: pickStringArray(item, ['languages']),
        subjectAreas: pickStringArray(item, ['subjectAreas', 'subjects']),
        categories: pickStringArray(item, ['categories']),

        isScopusIndexed: pickBoolean(item, ['isScopusIndexed']),
        isOakRecommended: pickBoolean(item, ['isOakRecommended']),

        scopusCoverageYears: pickString(item, ['scopusCoverageYears']),
        citescore2025: pickNumber(item, ['citescore2025']),
        citescore2026: pickNumber(item, ['citescore2026']),
        percentile: pickNumber(item, ['percentile']),
        quartile,
        verificationStatus,

        telegramUrl: pickString(item, ['telegramUrl', 'telegram']),
        submissionUrl: pickString(item, ['submissionUrl', 'submissionLink']),

        ...(scopusContent.length
          ? {
              scopusContent: {
                create: scopusContent
              }
            }
          : {})
      }
    });
  }

  const total = await prisma.journal.count();

  console.log(`Импорт завершён. Журналов в БД: ${total}`);
  console.log(`shortDescriptionRu заполнено: ${ruCount}`);
  console.log(`shortDescriptionUz заполнено: ${uzCount}`);
  console.log(`shortDescriptionEn заполнено: ${enCount}`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('Ошибка seed-journals.ts');
  console.error(error);
  process.exit(1);
});
