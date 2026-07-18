'use client';

import {useActionState} from 'react';
import {
  updateUsefulPage,
  type UsefulPageFormState,
  type UsefulPageFormValues
} from './actions';

function FieldError({message}: {message?: string}) {
  if (!message) return null;
  return <p className="mt-2 text-sm text-red-600">{message}</p>;
}

function InputField({
  label,
  name,
  defaultValue,
  error
}: {
  label: string;
  name: keyof UsefulPageFormValues;
  defaultValue: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        name={name}
        defaultValue={defaultValue}
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
  defaultValue,
  error,
  rows = 5,
  mono = false
}: {
  label: string;
  name: keyof UsefulPageFormValues;
  defaultValue: string;
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
        defaultValue={defaultValue}
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

export default function UsefulPageForm({
  slug,
  initialValues
}: {
  slug: string;
  initialValues: UsefulPageFormValues;
}) {
  const initialState: UsefulPageFormState = {
    success: false,
    message: '',
    errors: {},
    values: initialValues
  };

  const action = updateUsefulPage.bind(null, slug);
  const [state, formAction, pending] = useActionState(action, initialState);

  const values = state.values;

  return (
    <form
      key={JSON.stringify(values)}
      action={formAction}
      className="space-y-8"
    >
      <section className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Page identifier
        </div>
        <div className="mt-3 text-lg font-bold text-slate-900">/{values.slug}</div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Main titles
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField
            label="Title (RU)"
            name="titleRu"
            defaultValue={values.titleRu}
            error={state.errors.titleRu}
          />
          <InputField
            label="Title (UZ)"
            name="titleUz"
            defaultValue={values.titleUz}
            error={state.errors.titleUz}
          />
          <InputField
            label="Title (EN)"
            name="titleEn"
            defaultValue={values.titleEn}
            error={state.errors.titleEn}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <TextareaField
            label="Card text (RU)"
            name="cardTextRu"
            defaultValue={values.cardTextRu}
            error={state.errors.cardTextRu}
          />
          <TextareaField
            label="Card text (UZ)"
            name="cardTextUz"
            defaultValue={values.cardTextUz}
            error={state.errors.cardTextUz}
          />
          <TextareaField
            label="Card text (EN)"
            name="cardTextEn"
            defaultValue={values.cardTextEn}
            error={state.errors.cardTextEn}
          />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Optional short/full texts
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField
            label="Short title (RU)"
            name="shortTitleRu"
            defaultValue={values.shortTitleRu}
            error={state.errors.shortTitleRu}
          />
          <InputField
            label="Short title (UZ)"
            name="shortTitleUz"
            defaultValue={values.shortTitleUz}
            error={state.errors.shortTitleUz}
          />
          <InputField
            label="Short title (EN)"
            name="shortTitleEn"
            defaultValue={values.shortTitleEn}
            error={state.errors.shortTitleEn}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <TextareaField
            label="Short text (RU)"
            name="shortTextRu"
            defaultValue={values.shortTextRu}
            error={state.errors.shortTextRu}
          />
          <TextareaField
            label="Short text (UZ)"
            name="shortTextUz"
            defaultValue={values.shortTextUz}
            error={state.errors.shortTextUz}
          />
          <TextareaField
            label="Short text (EN)"
            name="shortTextEn"
            defaultValue={values.shortTextEn}
            error={state.errors.shortTextEn}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <InputField
            label="Full title (RU)"
            name="fullTitleRu"
            defaultValue={values.fullTitleRu}
            error={state.errors.fullTitleRu}
          />
          <InputField
            label="Full title (UZ)"
            name="fullTitleUz"
            defaultValue={values.fullTitleUz}
            error={state.errors.fullTitleUz}
          />
          <InputField
            label="Full title (EN)"
            name="fullTitleEn"
            defaultValue={values.fullTitleEn}
            error={state.errors.fullTitleEn}
          />
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
            defaultValue={values.sourceKeysText}
            error={state.errors.sourceKeysText}
            rows={10}
            mono
          />

          <p className="text-sm leading-7 text-slate-500">
            Enter one source key per line. Example:
            <br />
            <code className="rounded bg-slate-100 px-2 py-1 text-xs">
              orcid
            </code>
            <br />
            <code className="rounded bg-slate-100 px-2 py-1 text-xs">
              doi
            </code>
          </p>
        </div>

        <div className="space-y-5">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Blocks JSON
          </h2>

          <TextareaField
            label="Structured blocks"
            name="blocksJson"
            defaultValue={values.blocksJson}
            error={state.errors.blocksJson}
            rows={22}
            mono
          />

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            <div className="font-semibold text-slate-900">Expected format:</div>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-slate-600">
{`[
  {
    "type": "paragraph",
    "title": {"ru": "Заголовок", "uz": "Sarlavha", "en": "Title"},
    "text": {"ru": "Текст", "uz": "Matn", "en": "Text"}
  },
  {
    "type": "list",
    "title": {"ru": "Список", "uz": "Ro'yxat", "en": "List"},
    "items": [
      {"ru": "Пункт 1", "uz": "1-band", "en": "Item 1"}
    ]
  }
]`}
            </pre>
          </div>
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
              Save updates to refresh both admin and public useful pages.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Saving...' : 'Save useful page'}
        </button>
      </div>
    </form>
  );
}
