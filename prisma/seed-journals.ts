import {loadEnvConfig} from '@next/env';
import fs from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {Quartile, VerificationStatus} from '@prisma/client';

loadEnvConfig(process.cwd());

type RawJournal = Record<string, unknown>;
type RawRecord = Record<string, unknown>;

function asRecord(value: unknown): RawRecord | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as RawRecord;
  }
  return null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function firstString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function firstNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  if (typeof value === 'string') {
    const normalized = value.replace(',', '.').trim();
    if (!normalized) return null;
    const parsed = Number(normalized);
    if (Number.isFinite(parsed)) return parsed;
  }

  return null;
}

function firstBoolean(value: unknown): boolean | null {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();

    if (['true', '1', 'yes', 'y', 'да', 'ha'].includes(normalized)) return true;
    if (['false', '0', 'no', 'n', 'нет', 'yo‘q', "yo'q"].includes(normalized)) return false;
  }

  return null;
}

function extractArray(payload: unknown): RawJournal[] {
  if (Array.isArray(payload)) return payload as RawJournal[];

  const record = asRecord(payload);
  if (!record) {
    throw new Error('Некорректный JSON journals.master.json');
  }

  const journals = record.journals;
  if (Array.isArray(journals)) {
    return journals as RawJournal[];
  }

  throw new Error('Не удалось найти массив journals в journals.master.json');
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

function normalizeQuartile(value: string | null): Quartile | null {
  if (!value) return null;

  const normalized = value.trim().toUpperCase();
  if (normalized === 'Q1') return Quartile.Q1;
  if (normalized === 'Q2') return Quartile.Q2;
  if (normalized === 'Q3') return Quartile.Q3;
  if (normalized === 'Q4') return Quartile.Q4;

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

function cleanPlaceholder(value: string | null): string | null {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();

  if (
    normalized === 'publisher_country' ||
    normalized === 'publication_languages'
  ) {
    return null;
  }

  return value.trim();
}

function extractSubjectNames(subjectAreasRaw: unknown): string[] {
  const items = asArray(subjectAreasRaw);

  const names = items
    .map((item) => asRecord(item))
    .filter(Boolean)
    .map((item) => firstString(item?.name))
    .filter((value): value is string => Boolean(value));

  return [...new Set(names)];
}

function extractCategoryGroups(subjectAreasRaw: unknown): string[] {
  const items = asArray(subjectAreasRaw);

  const groups = items
    .map((item) => asRecord(item))
    .filter(Boolean)
    .map((item) => firstString(item?.group))
    .filter((value): value is string => Boolean(value));

  return [...new Set(groups)];
}

function extractLanguages(presentationRaw: RawRecord | null): string[] {
  if (!presentationRaw) return [];

  const langs = asArray(presentationRaw.languages)
    .map((item) => firstString(item))
    .filter((value): value is string => Boolean(value))
    .map((value) => cleanPlaceholder(value))
    .filter((value): value is string => Boolean(value));

  return [...new Set(langs)];
}

function extractBestRanking(rankingsRaw: unknown): {
  percentile: number | null;
  quartile: Quartile | null;
} {
  const rankings = asArray(rankingsRaw)
    .map((item) => asRecord(item))
    .filter(Boolean);

  if (!rankings.length) {
    return {
      percentile: null,
      quartile: null
    };
  }

  let bestPercentile: number | null = null;
  let bestQuartile: Quartile | null = null;

  for (const ranking of rankings) {
    const percentile = firstNumber(ranking?.percentile);
    const quartile = normalizeQuartile(firstString(ranking?.quartile));

    if (percentile !== null && (bestPercentile === null || percentile > bestPercentile)) {
      bestPercentile = percentile;
      bestQuartile = quartile;
    }
  }

  return {
    percentile: bestPercentile,
    quartile: bestQuartile
  };
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
    const titles = asRecord(item.titles);
    const identifiers = asRecord(item.identifiers);
    const indexing = asRecord(item.indexing);
    const metrics = asRecord(item.metrics);
    const presentation = asRecord(item.presentation);
    const assets = asRecord(item.assets);
    const content = asRecord(item.content);
    const review = asRecord(item.review);

    const title =
      firstString(titles?.en) ||
      firstString(titles?.original) ||
      firstString(item.title) ||
      'Untitled';

    const titleRu =
      firstString(titles?.ru) ||
      firstString(titles?.original) ||
      title;

    const titleUz =
      firstString(titles?.uz) ||
      firstString(titles?.original) ||
      title;

    const shortDescriptionRu = firstString(content?.shortDescriptionRu);
    const shortDescriptionUz = firstString(content?.shortDescriptionUz);
    const shortDescriptionEn = firstString(content?.shortDescriptionEn);

    if (shortDescriptionRu) ruCount += 1;
    if (shortDescriptionUz) uzCount += 1;
    if (shortDescriptionEn) enCount += 1;

    const shortDescription =
      shortDescriptionRu ||
      shortDescriptionEn ||
      shortDescriptionUz ||
      '';

    const slugSource =
      firstString(item.slug) ||
      firstString(item.id) ||
      titleRu ||
      title ||
      randomUUID();

    const slug = slugify(slugSource) || randomUUID();

    const subjectAreas = extractSubjectNames(item.subjectAreas);
    const categories = extractCategoryGroups(item.subjectAreas);

    const rankingData = extractBestRanking(item.rankings);

    const country = cleanPlaceholder(firstString(presentation?.country));
    const languages = extractLanguages(presentation);

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

        publisher: firstString(item.publisher) || '',
        website: firstString(assets?.website) || '',
        coverImage: firstString(presentation?.coverImage),

        issn: firstString(identifiers?.issn),
        eissn: firstString(identifiers?.eissn),

        country,
        languages,
        subjectAreas,
        categories,

        isScopusIndexed: firstBoolean(indexing?.isScopusIndexed) ?? false,
        isOakRecommended: firstBoolean(indexing?.isOakRecommended) ?? false,

        scopusCoverageYears: firstString(indexing?.scopusCoverage),
        citescore2025: firstNumber(metrics?.citescore2025),
        citescore2026:
          firstNumber(metrics?.citescore2026) ??
          firstNumber(metrics?.citescoreTracker2026),
        percentile: rankingData.percentile,
        quartile: rankingData.quartile,
        verificationStatus: normalizeVerificationStatus(
          firstString(review?.verificationStatus)
        ),

        telegramUrl: null,
        submissionUrl: null
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
