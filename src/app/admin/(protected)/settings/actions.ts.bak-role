'use server';

import {revalidatePath} from 'next/cache';
import {
  saveSiteSettings,
  type SiteSettingsData
} from '@/lib/site-settings';

export type SettingsFormState = {
  success: boolean;
  message: string;
  errors: Partial<Record<keyof SiteSettingsData, string>>;
  values: SiteSettingsData;
};

const ALLOWED_LOCALES = new Set(['ru', 'uz', 'en']);

function getString(formData: FormData, key: keyof SiteSettingsData): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeInput(formData: FormData): SiteSettingsData {
  return {
    siteName: getString(formData, 'siteName'),
    siteUrl: getString(formData, 'siteUrl'),
    contactEmail: getString(formData, 'contactEmail'),
    telegramUsername: getString(formData, 'telegramUsername').replace(/^@+/, ''),
    whatsappNumber: getString(formData, 'whatsappNumber'),
    phoneNumber: getString(formData, 'phoneNumber'),
    instagramHandle: getString(formData, 'instagramHandle').replace(/^@+/, ''),
    instagramUrl: getString(formData, 'instagramUrl'),
    defaultLocale: getString(formData, 'defaultLocale')
  };
}

export async function updateSiteSettings(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const values = normalizeInput(formData);
  const errors: Partial<Record<keyof SiteSettingsData, string>> = {};

  if (values.siteName.length < 2) {
    errors.siteName = 'Site name must contain at least 2 characters.';
  }

  if (!values.siteUrl) {
    errors.siteUrl = 'Site URL is required.';
  } else if (!isValidUrl(values.siteUrl)) {
    errors.siteUrl = 'Enter a valid absolute URL.';
  }

  if (values.contactEmail && !isValidEmail(values.contactEmail)) {
    errors.contactEmail = 'Enter a valid email address.';
  }

  if (values.instagramUrl && !isValidUrl(values.instagramUrl)) {
    errors.instagramUrl = 'Enter a valid Instagram URL.';
  }

  if (!ALLOWED_LOCALES.has(values.defaultLocale)) {
    errors.defaultLocale = 'Default locale must be ru, uz, or en.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please fix the highlighted fields.',
      errors,
      values
    };
  }

  const saved = await saveSiteSettings(values);

  revalidatePath('/', 'layout');
  revalidatePath('/admin');
  revalidatePath('/admin/settings');
  revalidatePath('/ru');
  revalidatePath('/uz');
  revalidatePath('/en');
  revalidatePath('/ru/contacts');
  revalidatePath('/uz/contacts');
  revalidatePath('/en/contacts');

  return {
    success: true,
    message: 'Site settings saved successfully.',
    errors: {},
    values: saved
  };
}
