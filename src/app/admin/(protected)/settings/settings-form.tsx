'use client';

import {useActionState} from 'react';
import {
  updateSiteSettings,
  type SettingsFormState
} from './actions';
import type {SiteSettingsData} from '@/lib/site-settings';

function FieldError({message}: {message?: string}) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-red-600">{message}</p>;
}

function TextInput({
  label,
  name,
  defaultValue,
  placeholder,
  error,
  type = 'text'
}: {
  label: string;
  name: keyof SiteSettingsData;
  defaultValue: string;
  placeholder?: string;
  error?: string;
  type?: 'text' | 'email' | 'url';
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
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

export default function SettingsForm({
  initialValues
}: {
  initialValues: SiteSettingsData;
}) {
  const initialState: SettingsFormState = {
    success: false,
    message: '',
    errors: {},
    values: initialValues
  };

  const [state, formAction, pending] = useActionState(
    updateSiteSettings,
    initialState
  );

  const values = state.values;
  const formKey = JSON.stringify(values);

  return (
    <form key={formKey} action={formAction} className="space-y-8">
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput
          label="Site name"
          name="siteName"
          defaultValue={values.siteName}
          error={state.errors.siteName}
        />

        <TextInput
          label="Site URL"
          name="siteUrl"
          type="url"
          defaultValue={values.siteUrl}
          placeholder="https://example.com"
          error={state.errors.siteUrl}
        />

        <TextInput
          label="Contact email"
          name="contactEmail"
          type="email"
          defaultValue={values.contactEmail}
          placeholder="info@example.com"
          error={state.errors.contactEmail}
        />

        <TextInput
          label="Telegram username"
          name="telegramUsername"
          defaultValue={values.telegramUsername}
          placeholder="journalplatformuz"
          error={state.errors.telegramUsername}
        />

        <TextInput
          label="WhatsApp number"
          name="whatsappNumber"
          defaultValue={values.whatsappNumber}
          placeholder="+998900000000"
          error={state.errors.whatsappNumber}
        />

        <TextInput
          label="Phone number"
          name="phoneNumber"
          defaultValue={values.phoneNumber}
          placeholder="+998900000000"
          error={state.errors.phoneNumber}
        />

        <TextInput
          label="Instagram handle"
          name="instagramHandle"
          defaultValue={values.instagramHandle}
          placeholder="uzakademiya.uz"
          error={state.errors.instagramHandle}
        />

        <TextInput
          label="Instagram URL"
          name="instagramUrl"
          type="url"
          defaultValue={values.instagramUrl}
          placeholder="https://instagram.com/uzakademiya.uz"
          error={state.errors.instagramUrl}
        />

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Default locale
          </span>
          <select
            name="defaultLocale"
            defaultValue={values.defaultLocale}
            aria-invalid={Boolean(state.errors.defaultLocale)}
            className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition ${
              state.errors.defaultLocale
                ? 'border-red-300 ring-2 ring-red-100'
                : 'border-slate-200 focus:border-slate-400'
            }`}
          >
            <option value="ru">ru</option>
            <option value="uz">uz</option>
            <option value="en">en</option>
          </select>
          <FieldError message={state.errors.defaultLocale} />
        </label>
      </div>

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
              These values are used across the public website and contacts page.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Saving...' : 'Save settings'}
        </button>
      </div>
    </form>
  );
}
