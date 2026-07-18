'use client';

import {
  useActionState,
  useState,
  type ChangeEvent
} from 'react';
import {
  createUsefulPage,
  type NewUsefulPageFormState,
  type NewUsefulPageFormValues
} from './actions';
import type {LocalizedText, UsefulBlock} from '@/types/useful-page';

type ImportedUsefulPayload = {
  slug?: unknown;
  title?: unknown;
  cardText?: unknown;
  shortTitle?: unknown;
  shortText?: unknown;
  fullTitle?: unknown;
  sourceKeys?: unknown;
  blocks?: unknown;
};

const EMPTY_VALUES: NewUsefulPageFormValues = {
  slug: '',
  titleRu: '',
  titleUz: '',
  titleEn: '',
  cardTextRu: '',
  cardTextUz: '',
  cardTextEn: '',
  shortTitleRu: '',
  shortTitleUz: '',
  shortTitleEn: '',
  shortTextRu: '',
  shortTextUz: '',
  shortTextEn: '',
  fullTitleRu: '',
  fullTitleUz: '',
  fullTitleEn: '',
  sourceKeysText: '',
  blocksJson: '[]'
};

function FieldError({message}: {message?: string}) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-red-600">{message}</p>;
}

function normalizeLocalizedText(
  value: unknown,
  fieldName: string,
  required = false
): LocalizedText {
  if (value == null) {
    if (required) {
      throw new Error(`${fieldName} is required.`);
    }

    return {ru: '', uz: '', en: ''};
  }

  if (typeof value !== 'object') {
    throw new Error(`${fieldName} must be an object with ru/uz/en.`);
  }

  const record = value as Record<string, unknown>;

  const result: LocalizedText = {
    ru: typeof record.ru === 'string' ? record.ru : '',
    uz: typeof record.uz === 'string' ? record.uz : '',
    en: typeof record.en === 'string' ? record.en : ''
  };

  if (required && !result.ru.trim() && !result.uz.trim() && !result.en.trim()) {
    throw new Error(`${fieldName} must contain at least one localized value.`);
  }

  return {
    ru: result.ru.trim(),
    uz: result.uz.trim(),
    en: result.en.trim()
  };
}

function hasLocalizedText(value: LocalizedText) {
  return Boolean(value.ru || value.uz || value.en);
}

function parseImportedBlocks(value: unknown): UsefulBlock[] {
  if (value == null) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error('blocks must be an array.');
  }

  return value.map((item, index) => {
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

    const title = normalizeLocalizedText(
      record.title,
      `Block #${index + 1} title`
    );
    const text = normalizeLocalizedText(
      record.text,
      `Block #${index + 1} text`
    );

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
      if (!Array.isArray(record.items)) {
        throw new Error(`List block #${index + 1} must contain items array.`);
      }

      const items = record.items
        .map((entry, itemIndex) =>
          normalizeLocalizedText(
            entry,
            `Block #${index + 1} item #${itemIndex + 1}`,
            true
          )
        )
        .filter((entry) => hasLocalizedText(entry));

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

function parseSourceKeys(value: unknown): string[] {
  if (value == null) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error('sourceKeys must be an array of strings.');
  }

  return Array.from(
    new Set(
      value
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean)
    )
  );
}

function normalizeSlug(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function mapImportedPayloadToFormValues(
  payload: ImportedUsefulPayload
): NewUsefulPageFormValues {
  const title = normalizeLocalizedText(payload.title, 'title', true);
  const cardText = normalizeLocalizedText(payload.cardText, 'cardText', true);
  const shortTitle = normalizeLocalizedText(payload.shortTitle, 'shortTitle');
  const shortText = normalizeLocalizedText(payload.shortText, 'shortText');
  const fullTitle = normalizeLocalizedText(payload.fullTitle, 'fullTitle');
  const sourceKeys = parseSourceKeys(payload.sourceKeys);
  const blocks = parseImportedBlocks(payload.blocks);

  return {
    slug: normalizeSlug(payload.slug),
    titleRu: title.ru,
    titleUz: title.uz,
    titleEn: title.en,
    cardTextRu: cardText.ru,
    cardTextUz: cardText.uz,
    cardTextEn: cardText.en,
    shortTitleRu: shortTitle.ru,
    shortTitleUz: shortTitle.uz,
    shortTitleEn: shortTitle.en,
    shortTextRu: shortText.ru,
    shortTextUz: shortText.uz,
    shortTextEn: shortText.en,
    fullTitleRu: fullTitle.ru,
    fullTitleUz: fullTitle.uz,
    fullTitleEn: fullTitle.en,
    sourceKeysText: sourceKeys.join('\n'),
    blocksJson: JSON.stringify(blocks, null, 2)
  };
}

function InputField({
  label,
  name,
  value,
  onChange,
  error
}: {
  label: string;
  name: keyof NewUsefulPageFormValues;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
          error
            ? 'border-red-300 ring-2 ring-red-100'
            : 'border-slate-200 focus:border-slate-400'
        }`}
      />
      <FieldError message={error} />
    </label>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  error,
  rows = 5,
  mono = false
}: {
  label: string;
  name: keyof NewUsefulPageFormValues;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  mono?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
          mono ? 'font-mono' : ''
        } ${
          error
            ? 'border-red-300 ring-2 ring-red-100'
            : 'border-slate-200 focus:border-slate-400'
        }`}
      />
      <FieldError message={error} />
    </label>
  );
}

export default function NewUsefulPageForm() {
  const initialState: NewUsefulPageFormState = {
    success: false,
    message: '',
    errors: {},
    values: EMPTY_VALUES
  };

  const [state, formAction, pending] = useActionState(
    createUsefulPage,
    initialState
  );

  const [draft, setDraft] = useState<NewUsefulPageFormValues>(EMPTY_VALUES);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonMessage, setJsonMessage] = useState('');
  const [jsonError, setJsonError] = useState('');

  const values = state.values.slug ? state.values : draft;

  function updateInputField(name: keyof NewUsefulPageFormValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setDraft((current) => ({
        ...current,
        [name]: event.target.value
      }));
    };
  }

  function updateTextareaField(name: keyof NewUsefulPageFormValues) {
    return (event: ChangeEvent<HTMLTextAreaElement>) => {
      setDraft((current) => ({
        ...current,
        [name]: event.target.value
      }));
    };
  }

  function applyJson() {
    try {
      setJsonError('');
      setJsonMessage('');

      if (!jsonInput.trim()) {
        throw new Error('Paste JSON before applying.');
      }

      const parsed = JSON.parse(jsonInput) as ImportedUsefulPayload;
      const nextValues = mapImportedPayloadToFormValues(parsed);

      setDraft(nextValues);
      setJsonMessage(
        'JSON applied successfully. Review the fields and click Create useful page.'
      );
    } catch (error) {
      setJsonError(
        error instanceof Error ? error.message : 'Failed to apply JSON.'
      );
    }
  }

  return (
    <form action={formAction} className="space-y-8">
      <section className="rounded-[28px] border border-orange-100 bg-orange-50/40 p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
          Import JSON
        </div>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Paste a prepared JSON object to auto-fill this new useful page form.
        </p>

        <div className="mt-4">
          <textarea
            value={jsonInput}
            onChange={(event) => setJsonInput(event.target.value)}
            rows={14}
            placeholder='{"slug":"what-is-orcid","title":{"ru":"...","uz":"...","en":"..."},"cardText":{"ru":"...","uz":"...","en":"..."},"sourceKeys":["orcid"],"blocks":[]}'
            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-orange-300"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={applyJson}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Apply JSON
          </button>

          <button
            type="button"
            onClick={() => {
              setJsonInput('');
              setJsonError('');
              setJsonMessage('');
            }}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Clear JSON
          </button>
        </div>

        {jsonMessage ? (
          <p className="mt-3 text-sm text-emerald-700">{jsonMessage}</p>
        ) : null}

        {jsonError ? (
          <p className="mt-3 text-sm text-red-600">{jsonError}</p>
        ) : null}
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          New page identifier
        </div>
        <div className="mt-4">
          <InputField
            label="Slug"
            name="slug"
            value={values.slug}
            onChange={updateInputField('slug')}
            error={state.errors.slug}
          />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Main titles
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField label="Title (RU)" name="titleRu" value={values.titleRu} onChange={updateInputField('titleRu')} error={state.errors.titleRu} />
          <InputField label="Title (UZ)" name="titleUz" value={values.titleUz} onChange={updateInputField('titleUz')} error={state.errors.titleUz} />
          <InputField label="Title (EN)" name="titleEn" value={values.titleEn} onChange={updateInputField('titleEn')} error={state.errors.titleEn} />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <TextareaField label="Card text (RU)" name="cardTextRu" value={values.cardTextRu} onChange={updateTextareaField('cardTextRu')} error={state.errors.cardTextRu} />
          <TextareaField label="Card text (UZ)" name="cardTextUz" value={values.cardTextUz} onChange={updateTextareaField('cardTextUz')} error={state.errors.cardTextUz} />
          <TextareaField label="Card text (EN)" name="cardTextEn" value={values.cardTextEn} onChange={updateTextareaField('cardTextEn')} error={state.errors.cardTextEn} />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Optional short/full texts
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField label="Short title (RU)" name="shortTitleRu" value={values.shortTitleRu} onChange={updateInputField('shortTitleRu')} error={state.errors.shortTitleRu} />
          <InputField label="Short title (UZ)" name="shortTitleUz" value={values.shortTitleUz} onChange={updateInputField('shortTitleUz')} error={state.errors.shortTitleUz} />
          <InputField label="Short title (EN)" name="shortTitleEn" value={values.shortTitleEn} onChange={updateInputField('shortTitleEn')} error={state.errors.shortTitleEn} />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <TextareaField label="Short text (RU)" name="shortTextRu" value={values.shortTextRu} onChange={updateTextareaField('shortTextRu')} error={state.errors.shortTextRu} />
          <TextareaField label="Short text (UZ)" name="shortTextUz" value={values.shortTextUz} onChange={updateTextareaField('shortTextUz')} error={state.errors.shortTextUz} />
          <TextareaField label="Short text (EN)" name="shortTextEn" value={values.shortTextEn} onChange={updateTextareaField('shortTextEn')} error={state.errors.shortTextEn} />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField label="Full title (RU)" name="fullTitleRu" value={values.fullTitleRu} onChange={updateInputField('fullTitleRu')} error={state.errors.fullTitleRu} />
          <InputField label="Full title (UZ)" name="fullTitleUz" value={values.fullTitleUz} onChange={updateInputField('fullTitleUz')} error={state.errors.fullTitleUz} />
          <InputField label="Full title (EN)" name="fullTitleEn" value={values.fullTitleEn} onChange={updateInputField('fullTitleEn')} error={state.errors.fullTitleEn} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Sources
          </h2>

          <TextareaField
            label="Source keys"
            name="sourceKeysText"
            value={values.sourceKeysText}
            onChange={updateTextareaField('sourceKeysText')}
            error={state.errors.sourceKeysText}
            rows={10}
            mono
          />
        </div>

        <div className="space-y-5">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Blocks JSON
          </h2>

          <TextareaField
            label="Structured blocks"
            name="blocksJson"
            value={values.blocksJson}
            onChange={updateTextareaField('blocksJson')}
            error={state.errors.blocksJson}
            rows={22}
            mono
          />
        </div>
      </section>

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {state.message ? (
            <p
              className={`text-sm ${
                state.success ? 'text-emerald-700' : 'text-red-600'
              }`}
            >
              {state.message}
            </p>
          ) : (
            <p className="text-sm text-slate-500">
              Create a new useful page and redirect straight to its editor.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Creating...' : 'Create useful page'}
        </button>
      </div>
    </form>
  );
}
