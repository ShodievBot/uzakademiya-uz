'use client';

import {
  useActionState,
  useEffect,
  useState,
  type ChangeEvent
} from 'react';
import {
  updateLegislationDocument,
  type LegislationFormState,
  type LegislationFormValues
} from './actions';
import type {LegislationCategory, LocalizedText} from '@/types/legislation';

type ImportedLegislationPayload = {
  slug?: unknown;
  category?: unknown;
  publishedAt?: unknown;
  title?: unknown;
  summary?: unknown;
  sourceUrl?: unknown;
  sourceLabel?: unknown;
  body?: unknown;
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
    ru: typeof record.ru === 'string' ? record.ru.trim() : '',
    uz: typeof record.uz === 'string' ? record.uz.trim() : '',
    en: typeof record.en === 'string' ? record.en.trim() : ''
  };

  if (required && !result.ru && !result.uz && !result.en) {
    throw new Error(`${fieldName} must contain at least one localized value.`);
  }

  return result;
}

function hasLocalizedText(value: LocalizedText) {
  return Boolean(value.ru || value.uz || value.en);
}

function normalizeDateInput(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const date = new Date(trimmed);

  if (Number.isNaN(date.getTime())) {
    throw new Error('publishedAt must be a valid date string.');
  }

  return date.toISOString().slice(0, 10);
}

function parseBody(value: unknown): LocalizedText[] {
  if (!Array.isArray(value)) {
    throw new Error('body must be an array.');
  }

  const items = value.map((item, index) => {
    const paragraph = normalizeLocalizedText(
      item,
      `Body paragraph #${index + 1}`,
      true
    );

    if (!hasLocalizedText(paragraph)) {
      throw new Error(
        `Body paragraph #${index + 1} must contain localized text.`
      );
    }

    return paragraph;
  });

  if (items.length === 0) {
    throw new Error('body must contain at least one paragraph.');
  }

  return items;
}

function mapImportedPayloadToFormValues(
  payload: ImportedLegislationPayload,
  currentSlug: string
): LegislationFormValues {
  if (payload.slug && payload.slug !== currentSlug) {
    throw new Error(
      `Imported slug "${String(payload.slug)}" does not match current document slug "${currentSlug}".`
    );
  }

  const category = payload.category;
  if (
    category !== 'science' &&
    category !== 'attestation' &&
    category !== 'ethics'
  ) {
    throw new Error('category must be science, attestation, or ethics.');
  }

  const title = normalizeLocalizedText(payload.title, 'title', true);
  const summary = normalizeLocalizedText(payload.summary, 'summary', true);
  const sourceLabel = normalizeLocalizedText(
    payload.sourceLabel,
    'sourceLabel',
    true
  );

  if (typeof payload.sourceUrl !== 'string' || !payload.sourceUrl.trim()) {
    throw new Error('sourceUrl is required.');
  }

  const body = parseBody(payload.body);
  const publishedAt = normalizeDateInput(payload.publishedAt);

  if (!publishedAt) {
    throw new Error('publishedAt is required.');
  }

  return {
    slug: currentSlug,
    category,
    publishedAt,
    titleRu: title.ru,
    titleUz: title.uz,
    titleEn: title.en,
    summaryRu: summary.ru,
    summaryUz: summary.uz,
    summaryEn: summary.en,
    sourceUrl: payload.sourceUrl.trim(),
    sourceLabelRu: sourceLabel.ru,
    sourceLabelUz: sourceLabel.uz,
    sourceLabelEn: sourceLabel.en,
    bodyJson: JSON.stringify(body, null, 2)
  };
}

function InputField({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text'
}: {
  label: string;
  name: keyof LegislationFormValues;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: 'text' | 'url' | 'date';
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        name={name}
        type={type}
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
  name: keyof LegislationFormValues;
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

export default function LegislationForm({
  slug,
  initialValues
}: {
  slug: string;
  initialValues: LegislationFormValues;
}) {
  const initialState: LegislationFormState = {
    success: false,
    message: '',
    errors: {},
    values: initialValues
  };

  const action = updateLegislationDocument.bind(null, slug);
  const [state, formAction, pending] = useActionState(action, initialState);

  const [draft, setDraft] = useState<LegislationFormValues>(initialValues);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonMessage, setJsonMessage] = useState('');
  const [jsonError, setJsonError] = useState('');

  useEffect(() => {
    setDraft(state.values);
  }, [state.values]);

  function updateInputField(name: keyof LegislationFormValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setDraft((current) => ({
        ...current,
        [name]: event.target.value
      }));
    };
  }

  function updateTextareaField(name: keyof LegislationFormValues) {
    return (event: ChangeEvent<HTMLTextAreaElement>) => {
      setDraft((current) => ({
        ...current,
        [name]: event.target.value
      }));
    };
  }

  function updateCategory(value: LegislationCategory) {
    setDraft((current) => ({
      ...current,
      category: value
    }));
  }

  function applyJson() {
    try {
      setJsonError('');
      setJsonMessage('');

      if (!jsonInput.trim()) {
        throw new Error('Paste JSON before applying.');
      }

      const parsed = JSON.parse(jsonInput) as ImportedLegislationPayload;
      const nextValues = mapImportedPayloadToFormValues(parsed, slug);

      setDraft(nextValues);
      setJsonMessage(
        'JSON applied successfully. Review the fields and click Save legislation document.'
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
          Paste a prepared JSON object to auto-fill this legislation form.
        </p>

        <div className="mt-4">
          <textarea
            value={jsonInput}
            onChange={(event) => setJsonInput(event.target.value)}
            rows={14}
            placeholder='{"category":"science","publishedAt":"2024-01-15","title":{"ru":"...","uz":"...","en":"..."},"summary":{"ru":"...","uz":"...","en":"..."},"sourceUrl":"https://...","sourceLabel":{"ru":"...","uz":"...","en":"..."},"body":[]}'
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
          Document identifier
        </div>
        <div className="mt-3 text-lg font-bold text-slate-900">/{draft.slug}</div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Meta
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Category
            </span>
            <select
              name="category"
              value={draft.category}
              onChange={(event) =>
                updateCategory(event.target.value as LegislationCategory)
              }
              aria-invalid={Boolean(state.errors.category)}
              className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
                state.errors.category
                  ? 'border-red-300 ring-2 ring-red-100'
                  : 'border-slate-200 focus:border-slate-400'
              }`}
            >
              <option value="science">science</option>
              <option value="attestation">attestation</option>
              <option value="ethics">ethics</option>
            </select>
            <FieldError message={state.errors.category} />
          </label>

          <InputField
            label="Published at"
            name="publishedAt"
            type="date"
            value={draft.publishedAt}
            onChange={updateInputField('publishedAt')}
            error={state.errors.publishedAt}
          />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Titles and summaries
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField
            label="Title (RU)"
            name="titleRu"
            value={draft.titleRu}
            onChange={updateInputField('titleRu')}
            error={state.errors.titleRu}
          />
          <InputField
            label="Title (UZ)"
            name="titleUz"
            value={draft.titleUz}
            onChange={updateInputField('titleUz')}
            error={state.errors.titleUz}
          />
          <InputField
            label="Title (EN)"
            name="titleEn"
            value={draft.titleEn}
            onChange={updateInputField('titleEn')}
            error={state.errors.titleEn}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <TextareaField
            label="Summary (RU)"
            name="summaryRu"
            value={draft.summaryRu}
            onChange={updateTextareaField('summaryRu')}
            error={state.errors.summaryRu}
          />
          <TextareaField
            label="Summary (UZ)"
            name="summaryUz"
            value={draft.summaryUz}
            onChange={updateTextareaField('summaryUz')}
            error={state.errors.summaryUz}
          />
          <TextareaField
            label="Summary (EN)"
            name="summaryEn"
            value={draft.summaryEn}
            onChange={updateTextareaField('summaryEn')}
            error={state.errors.summaryEn}
          />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Source
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <InputField
            label="Source URL"
            name="sourceUrl"
            type="url"
            value={draft.sourceUrl}
            onChange={updateInputField('sourceUrl')}
            error={state.errors.sourceUrl}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField
            label="Source label (RU)"
            name="sourceLabelRu"
            value={draft.sourceLabelRu}
            onChange={updateInputField('sourceLabelRu')}
            error={state.errors.sourceLabelRu}
          />
          <InputField
            label="Source label (UZ)"
            name="sourceLabelUz"
            value={draft.sourceLabelUz}
            onChange={updateInputField('sourceLabelUz')}
            error={state.errors.sourceLabelUz}
          />
          <InputField
            label="Source label (EN)"
            name="sourceLabelEn"
            value={draft.sourceLabelEn}
            onChange={updateInputField('sourceLabelEn')}
            error={state.errors.sourceLabelEn}
          />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Body JSON
        </h2>

        <TextareaField
          label="Document paragraphs"
          name="bodyJson"
          value={draft.bodyJson}
          onChange={updateTextareaField('bodyJson')}
          error={state.errors.bodyJson}
          rows={20}
          mono
        />

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
          <div className="font-semibold text-slate-900">Expected format:</div>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-slate-600">
{`[
  {
    "ru": "Первый абзац",
    "uz": "Birinchi paragraf",
    "en": "First paragraph"
  },
  {
    "ru": "Второй абзац",
    "uz": "Ikkinchi paragraf",
    "en": "Second paragraph"
  }
]`}
          </pre>
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
              Save updates to refresh both admin and public legislation pages.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Saving...' : 'Save legislation document'}
        </button>
      </div>
    </form>
  );
}
