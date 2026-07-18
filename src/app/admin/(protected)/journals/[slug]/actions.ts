'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {getCurrentAdminUser} from '@/lib/admin-auth';
import {getJournalBySlug, updateJournalContent} from '@/lib/journals';
import type {Journal} from '@/types/journal';

export type JournalFormValues = {
  slug: string;
  title: string;
  titleRu: string;
  titleUz: string;
  shortDescription: string;
  shortDescriptionRu: string;
  shortDescriptionUz: string;
  shortDescriptionEn: string;
  publisher: string;
  website: string;
  coverImage: string;
  issn: string;
  eissn: string;
  country: string;
  languagesText: string;
  subjectAreasText: string;
  categoriesText: string;
  isScopusIndexed: boolean;
  isOakRecommended: boolean;
  scopusCoverageYears: string;
  citescore2025: string;
  citescore2026: string;
  percentile: string;
  quartile: '' | 'Q1' | 'Q2' | 'Q3' | 'Q4';
  verificationStatus: '' | 'verified' | 'partially_verified' | 'needs_manual_review';
  telegramUrl: string;
  submissionUrl: string;
  scopusContentJson: string;
};

export type JournalFormState = {
  success: boolean;
  message: string;
  errors: Partial<Record<keyof JournalFormValues, string>>;
  values: JournalFormValues;
};

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function readBoolean(formData: FormData, key: string): boolean {
  return formData.get(key) === 'on';
}

function splitLinesAndCommas(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function parseOptionalNumber(value: string): number | null {
  const normalized = value.trim();

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid number value: ${value}`);
  }

  return parsed;
}

function parseScopusContentJson(
  raw: string
): Array<{year: number; documentsCount: number}> {
  const input = raw.trim();

  if (!input) {
    return [];
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error('Scopus content JSON must be valid JSON.');
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Scopus content JSON must be an array.');
  }

  return parsed.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Scopus row #${index + 1} must be an object.`);
    }

    const record = item as Record<string, unknown>;
    const year = Number(record.year);
    const documentsCount = Number(record.documentsCount);

    if (Number.isNaN(year) || Number.isNaN(documentsCount)) {
      throw new Error(
        `Scopus row #${index + 1} must contain numeric year and documentsCount.`
      );
    }

    return {
      year,
      documentsCount
    };
  });
}

function journalToValues(journal: Journal): JournalFormValues {
  return {
    slug: journal.slug,
    title: journal.title ?? '',
    titleRu: journal.titleRu ?? '',
    titleUz: journal.titleUz ?? '',
    shortDescription: journal.shortDescription ?? '',
    shortDescriptionRu: journal.shortDescriptionRu ?? '',
    shortDescriptionUz: journal.shortDescriptionUz ?? '',
    shortDescriptionEn: journal.shortDescriptionEn ?? '',
    publisher: journal.publisher ?? '',
    website: journal.website ?? '',
    coverImage: journal.coverImage ?? '',
    issn: journal.issn ?? '',
    eissn: journal.eissn ?? '',
    country: journal.country ?? '',
    languagesText: (journal.languages ?? []).join('\n'),
    subjectAreasText: (journal.subjectAreas ?? []).join('\n'),
    categoriesText: (journal.categories ?? []).join('\n'),
    isScopusIndexed: journal.isScopusIndexed,
    isOakRecommended: journal.isOakRecommended,
    scopusCoverageYears: journal.scopusCoverageYears ?? '',
    citescore2025:
      journal.citescore2025 === null || journal.citescore2025 === undefined
        ? ''
        : String(journal.citescore2025),
    citescore2026:
      journal.citescore2026 === null || journal.citescore2026 === undefined
        ? ''
        : String(journal.citescore2026),
    percentile:
      journal.percentile === null || journal.percentile === undefined
        ? ''
        : String(journal.percentile),
    quartile: (journal.quartile ?? '') as JournalFormValues['quartile'],
    verificationStatus: (journal.verificationStatus ?? '') as JournalFormValues['verificationStatus'],
    telegramUrl: journal.telegramUrl ?? '',
    submissionUrl: journal.submissionUrl ?? '',
    scopusContentJson: JSON.stringify(journal.scopusContent ?? [], null, 2)
  };
}

function toValues(slug: string, formData: FormData): JournalFormValues {
  return {
    slug,
    title: readText(formData, 'title'),
    titleRu: readText(formData, 'titleRu'),
    titleUz: readText(formData, 'titleUz'),
    shortDescription: readText(formData, 'shortDescription'),
    shortDescriptionRu: readText(formData, 'shortDescriptionRu'),
    shortDescriptionUz: readText(formData, 'shortDescriptionUz'),
    shortDescriptionEn: readText(formData, 'shortDescriptionEn'),
    publisher: readText(formData, 'publisher'),
    website: readText(formData, 'website'),
    coverImage: readText(formData, 'coverImage'),
    issn: readText(formData, 'issn'),
    eissn: readText(formData, 'eissn'),
    country: readText(formData, 'country'),
    languagesText: readText(formData, 'languagesText'),
    subjectAreasText: readText(formData, 'subjectAreasText'),
    categoriesText: readText(formData, 'categoriesText'),
    isScopusIndexed: readBoolean(formData, 'isScopusIndexed'),
    isOakRecommended: readBoolean(formData, 'isOakRecommended'),
    scopusCoverageYears: readText(formData, 'scopusCoverageYears'),
    citescore2025: readText(formData, 'citescore2025'),
    citescore2026: readText(formData, 'citescore2026'),
    percentile: readText(formData, 'percentile'),
    quartile: readText(formData, 'quartile') as JournalFormValues['quartile'],
    verificationStatus: readText(formData, 'verificationStatus') as JournalFormValues['verificationStatus'],
    telegramUrl: readText(formData, 'telegramUrl'),
    submissionUrl: readText(formData, 'submissionUrl'),
    scopusContentJson: readText(formData, 'scopusContentJson')
  };
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export async function updateJournal(
  slug: string,
  _prevState: JournalFormState,
  formData: FormData
): Promise<JournalFormState> {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (user.role !== 'SUPERADMIN' && user.role !== 'EDITOR') {
    return {
      success: false,
      message: 'Only SUPERADMIN or EDITOR can update journals.',
      errors: {},
      values: toValues(slug, formData)
    };
  }

  const values = toValues(slug, formData);
  const errors: Partial<Record<keyof JournalFormValues, string>> = {};

  if (!values.title.trim()) errors.title = 'Required';
  if (!values.titleRu.trim()) errors.titleRu = 'Required';
  if (!values.titleUz.trim()) errors.titleUz = 'Required';
  if (!values.shortDescription.trim()) errors.shortDescription = 'Required';
  if (!values.publisher.trim()) errors.publisher = 'Required';

  if (!values.website.trim()) {
    errors.website = 'Required';
  } else if (!isValidUrl(values.website)) {
    errors.website = 'Enter a valid absolute URL.';
  }

  if (values.coverImage.trim() && !isValidUrl(values.coverImage)) {
    errors.coverImage = 'Enter a valid absolute URL.';
  }

  if (values.telegramUrl.trim() && !isValidUrl(values.telegramUrl)) {
    errors.telegramUrl = 'Enter a valid absolute URL.';
  }

  if (values.submissionUrl.trim() && !isValidUrl(values.submissionUrl)) {
    errors.submissionUrl = 'Enter a valid absolute URL.';
  }

  if (
    values.quartile &&
    !['Q1', 'Q2', 'Q3', 'Q4'].includes(values.quartile)
  ) {
    errors.quartile = 'Choose a valid quartile.';
  }

  if (
    values.verificationStatus &&
    !['verified', 'partially_verified', 'needs_manual_review'].includes(
      values.verificationStatus
    )
  ) {
    errors.verificationStatus = 'Choose a valid verification status.';
  }

  let citescore2025: number | null = null;
  let citescore2026: number | null = null;
  let percentile: number | null = null;
  let scopusContent: Array<{year: number; documentsCount: number}> = [];

  try {
    citescore2025 = parseOptionalNumber(values.citescore2025);
  } catch {
    errors.citescore2025 = 'Enter a valid number.';
  }

  try {
    citescore2026 = parseOptionalNumber(values.citescore2026);
  } catch {
    errors.citescore2026 = 'Enter a valid number.';
  }

  try {
    percentile = parseOptionalNumber(values.percentile);
  } catch {
    errors.percentile = 'Enter a valid number.';
  }

  try {
    scopusContent = parseScopusContentJson(values.scopusContentJson);
  } catch (error) {
    errors.scopusContentJson =
      error instanceof Error ? error.message : 'Invalid scopus content JSON.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please fix the highlighted fields.',
      errors,
      values
    };
  }

  try {
    await updateJournalContent(slug, {
      title: values.title.trim(),
      titleRu: values.titleRu.trim(),
      titleUz: values.titleUz.trim(),
      shortDescription: values.shortDescription.trim(),
      shortDescriptionRu: values.shortDescriptionRu.trim(),
      shortDescriptionUz: values.shortDescriptionUz.trim(),
      shortDescriptionEn: values.shortDescriptionEn.trim(),
      publisher: values.publisher.trim(),
      website: values.website.trim(),
      coverImage: values.coverImage.trim() || null,
      issn: values.issn.trim() || null,
      eissn: values.eissn.trim() || null,
      country: values.country.trim() || null,
      languages: splitLinesAndCommas(values.languagesText),
      subjectAreas: splitLinesAndCommas(values.subjectAreasText),
      categories: splitLinesAndCommas(values.categoriesText),
      isScopusIndexed: values.isScopusIndexed,
      isOakRecommended: values.isOakRecommended,
      scopusCoverageYears: values.scopusCoverageYears.trim() || null,
      citescore2025,
      citescore2026,
      percentile,
      quartile: values.quartile || null,
      verificationStatus: values.verificationStatus || undefined,
      telegramUrl: values.telegramUrl.trim() || null,
      submissionUrl: values.submissionUrl.trim() || null,
      scopusContent
    });

    const saved = await getJournalBySlug(slug);

    if (!saved) {
      throw new Error('Failed to reload updated journal.');
    }

    revalidatePath('/admin');
    revalidatePath('/admin/journals');
    revalidatePath(`/admin/journals/${slug}`);
    revalidatePath('/ru/journals');
    revalidatePath('/uz/journals');
    revalidatePath('/en/journals');
    revalidatePath(`/ru/journals/${slug}`);
    revalidatePath(`/uz/journals/${slug}`);
    revalidatePath(`/en/journals/${slug}`);

    return {
      success: true,
      message: 'Journal saved successfully.',
      errors: {},
      values: journalToValues(saved)
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to save journal.',
      errors: {},
      values
    };
  }
}
