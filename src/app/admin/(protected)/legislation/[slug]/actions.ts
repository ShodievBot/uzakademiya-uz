'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {getCurrentAdminUser} from '@/lib/admin-auth';
import {
  updateLegislationDocumentContent,
  type LegislationEditorInput
} from '@/lib/legislation';
import type {
  LegislationCategory,
  LegislationDocument,
  LocalizedText
} from '@/types/legislation';

export type LegislationFormValues = {
  slug: string;
  category: LegislationCategory;
  publishedAt: string;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  summaryRu: string;
  summaryUz: string;
  summaryEn: string;
  sourceUrl: string;
  sourceLabelRu: string;
  sourceLabelUz: string;
  sourceLabelEn: string;
  bodyJson: string;
};

export type LegislationFormState = {
  success: boolean;
  message: string;
  errors: Partial<Record<keyof LegislationFormValues, string>>;
  values: LegislationFormValues;
};

const ALLOWED_CATEGORIES = new Set<LegislationCategory>([
  'science',
  'attestation',
  'ethics'
]);

function readText(
  formData: FormData,
  key: keyof LegislationFormValues
): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function toLocalizedText(
  ru: string,
  uz: string,
  en: string
): LocalizedText {
  return {
    ru: ru.trim(),
    uz: uz.trim(),
    en: en.trim()
  };
}

function hasLocalizedText(value: LocalizedText): boolean {
  return Boolean(value.ru || value.uz || value.en);
}

function normalizeLocalizedText(value: unknown): LocalizedText {
  if (!value || typeof value !== 'object') {
    return {ru: '', uz: '', en: ''};
  }

  const record = value as Record<string, unknown>;

  return {
    ru: typeof record.ru === 'string' ? record.ru.trim() : '',
    uz: typeof record.uz === 'string' ? record.uz.trim() : '',
    en: typeof record.en === 'string' ? record.en.trim() : ''
  };
}

function parseBodyJson(raw: string): LocalizedText[] {
  const input = raw.trim();

  if (!input) {
    throw new Error('Body JSON is required.');
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error('Body JSON must be valid JSON.');
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Body JSON must be an array.');
  }

  const items = parsed.map((item, index) => {
    const value = normalizeLocalizedText(item);

    if (!hasLocalizedText(value)) {
      throw new Error(
        `Body paragraph #${index + 1} must contain ru, uz, or en text.`
      );
    }

    return value;
  });

  if (items.length === 0) {
    throw new Error('Body JSON must contain at least one paragraph.');
  }

  return items;
}

function toValues(
  slug: string,
  formData: FormData
): LegislationFormValues {
  return {
    slug,
    category: readText(formData, 'category') as LegislationCategory,
    publishedAt: readText(formData, 'publishedAt'),
    titleRu: readText(formData, 'titleRu'),
    titleUz: readText(formData, 'titleUz'),
    titleEn: readText(formData, 'titleEn'),
    summaryRu: readText(formData, 'summaryRu'),
    summaryUz: readText(formData, 'summaryUz'),
    summaryEn: readText(formData, 'summaryEn'),
    sourceUrl: readText(formData, 'sourceUrl'),
    sourceLabelRu: readText(formData, 'sourceLabelRu'),
    sourceLabelUz: readText(formData, 'sourceLabelUz'),
    sourceLabelEn: readText(formData, 'sourceLabelEn'),
    bodyJson: readText(formData, 'bodyJson')
  };
}

function documentToValues(
  document: LegislationDocument
): LegislationFormValues {
  return {
    slug: document.slug,
    category: document.category,
    publishedAt: document.publishedAt.slice(0, 10),
    titleRu: document.title.ru,
    titleUz: document.title.uz,
    titleEn: document.title.en,
    summaryRu: document.summary.ru,
    summaryUz: document.summary.uz,
    summaryEn: document.summary.en,
    sourceUrl: document.sourceUrl,
    sourceLabelRu: document.sourceLabel.ru,
    sourceLabelUz: document.sourceLabel.uz,
    sourceLabelEn: document.sourceLabel.en,
    bodyJson: JSON.stringify(document.body, null, 2)
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

export async function updateLegislationDocument(
  slug: string,
  _prevState: LegislationFormState,
  formData: FormData
): Promise<LegislationFormState> {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (user.role !== 'SUPERADMIN' && user.role !== 'EDITOR') {
    return {
      success: false,
      message: 'Only SUPERADMIN or EDITOR can update legislation documents.',
      errors: {},
      values: toValues(slug, formData)
    };
  }

  const values = toValues(slug, formData);
  const errors: Partial<Record<keyof LegislationFormValues, string>> = {};

  if (!ALLOWED_CATEGORIES.has(values.category)) {
    errors.category = 'Choose a valid category.';
  }

  if (!values.publishedAt.trim()) {
    errors.publishedAt = 'Published date is required.';
  } else if (Number.isNaN(new Date(values.publishedAt).getTime())) {
    errors.publishedAt = 'Enter a valid date.';
  }

  if (!values.titleRu.trim()) errors.titleRu = 'Required';
  if (!values.titleUz.trim()) errors.titleUz = 'Required';
  if (!values.titleEn.trim()) errors.titleEn = 'Required';

  if (!values.summaryRu.trim()) errors.summaryRu = 'Required';
  if (!values.summaryUz.trim()) errors.summaryUz = 'Required';
  if (!values.summaryEn.trim()) errors.summaryEn = 'Required';

  if (!values.sourceUrl.trim()) {
    errors.sourceUrl = 'Required';
  } else if (!isValidUrl(values.sourceUrl)) {
    errors.sourceUrl = 'Enter a valid absolute URL.';
  }

  if (!values.sourceLabelRu.trim()) errors.sourceLabelRu = 'Required';
  if (!values.sourceLabelUz.trim()) errors.sourceLabelUz = 'Required';
  if (!values.sourceLabelEn.trim()) errors.sourceLabelEn = 'Required';

  let body: LocalizedText[] = [];

  try {
    body = parseBodyJson(values.bodyJson);
  } catch (error) {
    errors.bodyJson =
      error instanceof Error ? error.message : 'Invalid body JSON.';
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
    const saved = await updateLegislationDocumentContent(slug, {
      category: values.category,
      publishedAt: values.publishedAt,
      title: toLocalizedText(values.titleRu, values.titleUz, values.titleEn),
      summary: toLocalizedText(
        values.summaryRu,
        values.summaryUz,
        values.summaryEn
      ),
      sourceUrl: values.sourceUrl.trim(),
      sourceLabel: toLocalizedText(
        values.sourceLabelRu,
        values.sourceLabelUz,
        values.sourceLabelEn
      ),
      body
    } satisfies LegislationEditorInput);

    revalidatePath('/admin');
    revalidatePath('/admin/legislation');
    revalidatePath(`/admin/legislation/${slug}`);
    revalidatePath('/ru/legislation');
    revalidatePath('/uz/legislation');
    revalidatePath('/en/legislation');
    revalidatePath(`/ru/legislation/${slug}`);
    revalidatePath(`/uz/legislation/${slug}`);
    revalidatePath(`/en/legislation/${slug}`);

    return {
      success: true,
      message: 'Legislation document saved successfully.',
      errors: {},
      values: documentToValues(saved)
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to save legislation document.',
      errors: {},
      values
    };
  }
}
