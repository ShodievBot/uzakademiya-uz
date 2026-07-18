'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {getCurrentAdminUser} from '@/lib/admin-auth';
import {createUsefulPageContent} from '@/lib/useful';
import type {LocalizedText, UsefulBlock} from '@/types/useful-page';

export type NewUsefulPageFormValues = {
  slug: string;
  titleRu: string;
  titleUz: string;
  titleEn: string;
  cardTextRu: string;
  cardTextUz: string;
  cardTextEn: string;
  shortTitleRu: string;
  shortTitleUz: string;
  shortTitleEn: string;
  shortTextRu: string;
  shortTextUz: string;
  shortTextEn: string;
  fullTitleRu: string;
  fullTitleUz: string;
  fullTitleEn: string;
  sourceKeysText: string;
  blocksJson: string;
};

export type NewUsefulPageFormState = {
  success: boolean;
  message: string;
  errors: Partial<Record<keyof NewUsefulPageFormValues, string>>;
  values: NewUsefulPageFormValues;
};

function readText(formData: FormData, key: keyof NewUsefulPageFormValues): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function toLocalizedText(ru: string, uz: string, en: string): LocalizedText {
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

function parseSourceKeys(text: string): string[] {
  return Array.from(
    new Set(
      text
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function parseBlocksJson(raw: string): UsefulBlock[] {
  const input = raw.trim();

  if (!input) {
    return [];
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error('Blocks JSON must be valid JSON.');
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Blocks JSON must be an array.');
  }

  return parsed.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Block #${index + 1} must be an object.`);
    }

    const record = item as Record<string, unknown>;
    const type = record.type;

    if (type !== 'paragraph' && type !== 'list') {
      throw new Error(
        `Block #${index + 1} must have type "paragraph" or "list".`
      );
    }

    const title = normalizeLocalizedText(record.title);
    const text = normalizeLocalizedText(record.text);

    const items = Array.isArray(record.items)
      ? record.items
          .map((entry) => normalizeLocalizedText(entry))
          .filter((entry) => hasLocalizedText(entry))
      : [];

    const block: UsefulBlock = {type};

    if (hasLocalizedText(title)) {
      block.title = title;
    }

    if (type === 'paragraph') {
      if (!hasLocalizedText(text)) {
        throw new Error(
          `Paragraph block #${index + 1} must contain localized text.`
        );
      }

      block.text = text;
    }

    if (type === 'list') {
      if (items.length === 0) {
        throw new Error(
          `List block #${index + 1} must contain at least one item.`
        );
      }

      block.items = items;
    }

    return block;
  });
}

function toValues(formData: FormData): NewUsefulPageFormValues {
  return {
    slug: readText(formData, 'slug'),
    titleRu: readText(formData, 'titleRu'),
    titleUz: readText(formData, 'titleUz'),
    titleEn: readText(formData, 'titleEn'),
    cardTextRu: readText(formData, 'cardTextRu'),
    cardTextUz: readText(formData, 'cardTextUz'),
    cardTextEn: readText(formData, 'cardTextEn'),
    shortTitleRu: readText(formData, 'shortTitleRu'),
    shortTitleUz: readText(formData, 'shortTitleUz'),
    shortTitleEn: readText(formData, 'shortTitleEn'),
    shortTextRu: readText(formData, 'shortTextRu'),
    shortTextUz: readText(formData, 'shortTextUz'),
    shortTextEn: readText(formData, 'shortTextEn'),
    fullTitleRu: readText(formData, 'fullTitleRu'),
    fullTitleUz: readText(formData, 'fullTitleUz'),
    fullTitleEn: readText(formData, 'fullTitleEn'),
    sourceKeysText: readText(formData, 'sourceKeysText'),
    blocksJson: readText(formData, 'blocksJson')
  };
}

export async function createUsefulPage(
  _prevState: NewUsefulPageFormState,
  formData: FormData
): Promise<NewUsefulPageFormState> {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (user.role !== 'SUPERADMIN' && user.role !== 'EDITOR') {
    return {
      success: false,
      message: 'Only SUPERADMIN or EDITOR can create useful pages.',
      errors: {},
      values: toValues(formData)
    };
  }

  const values = toValues(formData);
  const errors: Partial<Record<keyof NewUsefulPageFormValues, string>> = {};

  if (!values.slug.trim()) {
    errors.slug = 'Required';
  } else if (!/^[a-z0-9-_\s]+$/i.test(values.slug.trim())) {
    errors.slug = 'Use letters, numbers, spaces, hyphens or underscores.';
  }

  if (!values.titleRu.trim()) errors.titleRu = 'Required';
  if (!values.titleUz.trim()) errors.titleUz = 'Required';
  if (!values.titleEn.trim()) errors.titleEn = 'Required';

  if (!values.cardTextRu.trim()) errors.cardTextRu = 'Required';
  if (!values.cardTextUz.trim()) errors.cardTextUz = 'Required';
  if (!values.cardTextEn.trim()) errors.cardTextEn = 'Required';

  let blocks: UsefulBlock[] = [];

  try {
    blocks = parseBlocksJson(values.blocksJson);
  } catch (error) {
    errors.blocksJson =
      error instanceof Error ? error.message : 'Invalid blocks JSON.';
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
    const created = await createUsefulPageContent({
      slug: values.slug,
      title: toLocalizedText(values.titleRu, values.titleUz, values.titleEn),
      cardText: toLocalizedText(
        values.cardTextRu,
        values.cardTextUz,
        values.cardTextEn
      ),
      shortTitle: toLocalizedText(
        values.shortTitleRu,
        values.shortTitleUz,
        values.shortTitleEn
      ),
      shortText: toLocalizedText(
        values.shortTextRu,
        values.shortTextUz,
        values.shortTextEn
      ),
      fullTitle: toLocalizedText(
        values.fullTitleRu,
        values.fullTitleUz,
        values.fullTitleEn
      ),
      sourceKeys: parseSourceKeys(values.sourceKeysText),
      blocks
    });

    revalidatePath('/admin');
    revalidatePath('/admin/useful');
    revalidatePath('/ru/useful');
    revalidatePath('/uz/useful');
    revalidatePath('/en/useful');

    redirect(`/admin/useful/${created.slug}`);
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to create useful page.',
      errors: {},
      values
    };
  }
}
