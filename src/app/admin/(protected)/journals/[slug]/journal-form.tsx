'use client';

import {
  useActionState,
  useEffect,
  useState,
  type ChangeEvent
} from 'react';
import {updateJournal, type JournalFormState, type JournalFormValues} from './actions';

type ImportedJournalPayload = {
  slug?: unknown;
  title?: unknown;
  titleRu?: unknown;
  titleUz?: unknown;
  shortDescription?: unknown;
  shortDescriptionRu?: unknown;
  shortDescriptionUz?: unknown;
  shortDescriptionEn?: unknown;
  publisher?: unknown;
  website?: unknown;
  coverImage?: unknown;
  issn?: unknown;
  eissn?: unknown;
  country?: unknown;
  languages?: unknown;
  subjectAreas?: unknown;
  categories?: unknown;
  isScopusIndexed?: unknown;
  isOakRecommended?: unknown;
  scopusCoverageYears?: unknown;
  citescore2025?: unknown;
  citescore2026?: unknown;
  percentile?: unknown;
  quartile?: unknown;
  verificationStatus?: unknown;
  telegramUrl?: unknown;
  submissionUrl?: unknown;
  scopusContent?: unknown;
};

function FieldError({message}: {message?: string}) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-red-600">{message}</p>;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function asStringArray(value: unknown, fieldName: string): string[] {
  if (value == null) return [];
  if (!Array.isArray(value)) {
    throw new Error(`${fieldName} must be an array of strings.`);
  }

  return Array.from(
    new Set(
      value
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean)
    )
  );
}

function asOptionalBoolean(value: unknown): boolean {
  return value === true;
}

function asOptionalNumberString(value: unknown): string {
  if (value == null || value === '') {
    return '';
  }

  if (typeof value !== 'number' && typeof value !== 'string') {
    throw new Error('Numeric field must be a number or numeric string.');
  }

  const numeric = Number(value);

  if (Number.isNaN(numeric)) {
    throw new Error(`Invalid numeric value: ${String(value)}`);
  }

  return String(numeric);
}

function parseImportedScopusContent(
  value: unknown
): Array<{year: number; documentsCount: number}> {
  if (value == null) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error('scopusContent must be an array.');
  }

  return value.map((item, index) => {
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

function mapImportedPayloadToFormValues(
  payload: ImportedJournalPayload,
  currentSlug: string
): JournalFormValues {
  if (
    payload.slug &&
    typeof payload.slug === 'string' &&
    payload.slug.trim() &&
    payload.slug !== currentSlug
  ) {
    console.warn(
      `Ignored imported slug "${payload.slug}" because current journal slug is "${currentSlug}".`
    );
  }

  const quartile = asString(payload.quartile);
  if (quartile && !['Q1', 'Q2', 'Q3', 'Q4'].includes(quartile)) {
    throw new Error('quartile must be Q1, Q2, Q3, or Q4.');
  }

  const verificationStatus = asString(payload.verificationStatus);
  if (
    verificationStatus &&
    !['verified', 'partially_verified', 'needs_manual_review'].includes(
      verificationStatus
    )
  ) {
    throw new Error(
      'verificationStatus must be verified, partially_verified, or needs_manual_review.'
    );
  }

  const scopusContent = parseImportedScopusContent(payload.scopusContent);

  return {
    slug: currentSlug,
    title: asString(payload.title),
    titleRu: asString(payload.titleRu),
    titleUz: asString(payload.titleUz),
    shortDescription: asString(payload.shortDescription),
    shortDescriptionRu: asString(payload.shortDescriptionRu),
    shortDescriptionUz: asString(payload.shortDescriptionUz),
    shortDescriptionEn: asString(payload.shortDescriptionEn),
    publisher: asString(payload.publisher),
    website: asString(payload.website),
    coverImage: asString(payload.coverImage),
    issn: asString(payload.issn),
    eissn: asString(payload.eissn),
    country: asString(payload.country),
    languagesText: asStringArray(payload.languages, 'languages').join('\n'),
    subjectAreasText: asStringArray(payload.subjectAreas, 'subjectAreas').join('\n'),
    categoriesText: asStringArray(payload.categories, 'categories').join('\n'),
    isScopusIndexed: asOptionalBoolean(payload.isScopusIndexed),
    isOakRecommended: asOptionalBoolean(payload.isOakRecommended),
    scopusCoverageYears: asString(payload.scopusCoverageYears),
    citescore2025: asOptionalNumberString(payload.citescore2025),
    citescore2026: asOptionalNumberString(payload.citescore2026),
    percentile: asOptionalNumberString(payload.percentile),
    quartile: (quartile || '') as JournalFormValues['quartile'],
    verificationStatus: (verificationStatus || '') as JournalFormValues['verificationStatus'],
    telegramUrl: asString(payload.telegramUrl),
    submissionUrl: asString(payload.submissionUrl),
    scopusContentJson: JSON.stringify(scopusContent, null, 2)
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
  name: keyof JournalFormValues;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: 'text' | 'url' | 'number';
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
  name: keyof JournalFormValues;
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

function CheckboxField({
  label,
  name,
  checked,
  onChange
}: {
  label: string;
  name: keyof JournalFormValues;
  checked: boolean;
  onChange: (nextChecked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-slate-300"
      />
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </label>
  );
}

export default function JournalForm({
  slug,
  initialValues
}: {
  slug: string;
  initialValues: JournalFormValues;
}) {
  const initialState: JournalFormState = {
    success: false,
    message: '',
    errors: {},
    values: initialValues
  };

  const action = updateJournal.bind(null, slug);
  const [state, formAction, pending] = useActionState(action, initialState);

  const [draft, setDraft] = useState<JournalFormValues>(initialValues);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonMessage, setJsonMessage] = useState('');
  const [jsonError, setJsonError] = useState('');

  useEffect(() => {
    setDraft(state.values);
  }, [state.values]);

  function updateInputField(name: keyof JournalFormValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === 'checkbox'
          ? String(event.target.checked)
          : event.target.value;

      setDraft((current) => ({
        ...current,
        [name]:
          event.target.type === 'checkbox'
            ? (event.target.checked as JournalFormValues[typeof name])
            : (value as JournalFormValues[typeof name])
      }));
    };
  }

  function updateTextareaField(name: keyof JournalFormValues) {
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

      const parsed = JSON.parse(jsonInput) as ImportedJournalPayload;
      const nextValues = mapImportedPayloadToFormValues(parsed, slug);

      setDraft(nextValues);
      setJsonMessage('JSON applied successfully. Review the fields and click Save journal.');
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
          Paste a prepared JSON object to auto-fill this journal form.
        </p>

        <div className="mt-4">
          <textarea
            value={jsonInput}
            onChange={(event) => setJsonInput(event.target.value)}
            rows={14}
            placeholder='{"title":"...","titleRu":"...","titleUz":"...","shortDescription":"...","publisher":"...","website":"https://...","languages":["English"],"subjectAreas":["Education"],"categories":["Scopus"],"isScopusIndexed":true,"isOakRecommended":false,"scopusContent":[]}'
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
          Journal identifier
        </div>
        <div className="mt-3 text-lg font-bold text-slate-900">/{draft.slug}</div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Main data</h2>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField label="Title" name="title" value={draft.title} onChange={updateInputField('title')} error={state.errors.title} />
          <InputField label="Title (RU)" name="titleRu" value={draft.titleRu} onChange={updateInputField('titleRu')} error={state.errors.titleRu} />
          <InputField label="Title (UZ)" name="titleUz" value={draft.titleUz} onChange={updateInputField('titleUz')} error={state.errors.titleUz} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <TextareaField label="Short description" name="shortDescription" value={draft.shortDescription} onChange={updateTextareaField('shortDescription')} error={state.errors.shortDescription} />
          <TextareaField label="Short description (RU)" name="shortDescriptionRu" value={draft.shortDescriptionRu} onChange={updateTextareaField('shortDescriptionRu')} error={state.errors.shortDescriptionRu} />
          <TextareaField label="Short description (UZ)" name="shortDescriptionUz" value={draft.shortDescriptionUz} onChange={updateTextareaField('shortDescriptionUz')} error={state.errors.shortDescriptionUz} />
          <TextareaField label="Short description (EN)" name="shortDescriptionEn" value={draft.shortDescriptionEn} onChange={updateTextareaField('shortDescriptionEn')} error={state.errors.shortDescriptionEn} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <InputField label="Publisher" name="publisher" value={draft.publisher} onChange={updateInputField('publisher')} error={state.errors.publisher} />
          <InputField label="Website" name="website" type="url" value={draft.website} onChange={updateInputField('website')} error={state.errors.website} />
          <InputField label="Cover image URL" name="coverImage" type="url" value={draft.coverImage} onChange={updateInputField('coverImage')} error={state.errors.coverImage} />
          <InputField label="Country" name="country" value={draft.country} onChange={updateInputField('country')} error={state.errors.country} />
          <InputField label="ISSN" name="issn" value={draft.issn} onChange={updateInputField('issn')} error={state.errors.issn} />
          <InputField label="eISSN" name="eissn" value={draft.eissn} onChange={updateInputField('eissn')} error={state.errors.eissn} />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Lists and flags</h2>

        <div className="grid gap-5 md:grid-cols-3">
          <TextareaField label="Languages" name="languagesText" value={draft.languagesText} onChange={updateTextareaField('languagesText')} error={state.errors.languagesText} rows={6} />
          <TextareaField label="Subject areas" name="subjectAreasText" value={draft.subjectAreasText} onChange={updateTextareaField('subjectAreasText')} error={state.errors.subjectAreasText} rows={6} />
          <TextareaField label="Categories" name="categoriesText" value={draft.categoriesText} onChange={updateTextareaField('categoriesText')} error={state.errors.categoriesText} rows={6} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CheckboxField
            label="Scopus indexed"
            name="isScopusIndexed"
            checked={draft.isScopusIndexed}
            onChange={(nextChecked) =>
              setDraft((current) => ({...current, isScopusIndexed: nextChecked}))
            }
          />
          <CheckboxField
            label="OAK recommended"
            name="isOakRecommended"
            checked={draft.isOakRecommended}
            onChange={(nextChecked) =>
              setDraft((current) => ({...current, isOakRecommended: nextChecked}))
            }
          />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Metrics and links</h2>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField label="Scopus coverage years" name="scopusCoverageYears" value={draft.scopusCoverageYears} onChange={updateInputField('scopusCoverageYears')} error={state.errors.scopusCoverageYears} />
          <InputField label="CiteScore 2025" name="citescore2025" type="number" value={draft.citescore2025} onChange={updateInputField('citescore2025')} error={state.errors.citescore2025} />
          <InputField label="CiteScore 2026" name="citescore2026" type="number" value={draft.citescore2026} onChange={updateInputField('citescore2026')} error={state.errors.citescore2026} />
          <InputField label="Percentile" name="percentile" type="number" value={draft.percentile} onChange={updateInputField('percentile')} error={state.errors.percentile} />
          <InputField label="Telegram URL" name="telegramUrl" type="url" value={draft.telegramUrl} onChange={updateInputField('telegramUrl')} error={state.errors.telegramUrl} />
          <InputField label="Submission URL" name="submissionUrl" type="url" value={draft.submissionUrl} onChange={updateInputField('submissionUrl')} error={state.errors.submissionUrl} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Quartile</span>
            <select
              name="quartile"
              value={draft.quartile}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  quartile: event.target.value as JournalFormValues['quartile']
                }))
              }
              className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
                state.errors.quartile
                  ? 'border-red-300 ring-2 ring-red-100'
                  : 'border-slate-200 focus:border-slate-400'
              }`}
            >
              <option value="">—</option>
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
            <FieldError message={state.errors.quartile} />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Verification status
            </span>
            <select
              name="verificationStatus"
              value={draft.verificationStatus}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  verificationStatus:
                    event.target.value as JournalFormValues['verificationStatus']
                }))
              }
              className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
                state.errors.verificationStatus
                  ? 'border-red-300 ring-2 ring-red-100'
                  : 'border-slate-200 focus:border-slate-400'
              }`}
            >
              <option value="">—</option>
              <option value="verified">verified</option>
              <option value="partially_verified">partially_verified</option>
              <option value="needs_manual_review">needs_manual_review</option>
            </select>
            <FieldError message={state.errors.verificationStatus} />
          </label>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Scopus content JSON</h2>

        <TextareaField
          label="Scopus content rows"
          name="scopusContentJson"
          value={draft.scopusContentJson}
          onChange={updateTextareaField('scopusContentJson')}
          error={state.errors.scopusContentJson}
          rows={14}
          mono
        />

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
          <div className="font-semibold text-slate-900">Expected format:</div>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-slate-600">
{`[
  {
    "year": 2024,
    "documentsCount": 12
  },
  {
    "year": 2025,
    "documentsCount": 18
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
              Save updates to refresh both admin and public journal pages.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Saving...' : 'Save journal'}
        </button>
      </div>
    </form>
  );
}
