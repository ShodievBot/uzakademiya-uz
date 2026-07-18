import {prisma} from '@/lib/prisma';

export type SiteSettingsData = {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  telegramUsername: string;
  whatsappNumber: string;
  phoneNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  defaultLocale: string;
};

const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  siteName: 'UzAkademiya.uz',
  siteUrl: 'https://uzakademiya.uz',
  contactEmail: 'info@uzakademiya.uz',
  telegramUsername: 'journalplatformuz',
  whatsappNumber: '+998900000000',
  phoneNumber: '+998900000000',
  instagramHandle: 'uzakademiya.uz',
  instagramUrl: 'https://instagram.com/uzakademiya.uz',
  defaultLocale: 'ru'
};

function toOptionalString(value: string | undefined): string | null {
  const normalized = value?.trim() ?? '';
  return normalized.length > 0 ? normalized : null;
}

function mapSettings(settings: {
  siteName: string;
  siteUrl: string;
  contactEmail: string | null;
  telegramUsername: string | null;
  whatsappNumber: string | null;
  phoneNumber: string | null;
  instagramHandle: string | null;
  instagramUrl: string | null;
  defaultLocale: string;
}): SiteSettingsData {
  return {
    siteName: settings.siteName || DEFAULT_SITE_SETTINGS.siteName,
    siteUrl: settings.siteUrl || DEFAULT_SITE_SETTINGS.siteUrl,
    contactEmail:
      settings.contactEmail || DEFAULT_SITE_SETTINGS.contactEmail,
    telegramUsername:
      settings.telegramUsername || DEFAULT_SITE_SETTINGS.telegramUsername,
    whatsappNumber:
      settings.whatsappNumber || DEFAULT_SITE_SETTINGS.whatsappNumber,
    phoneNumber: settings.phoneNumber || DEFAULT_SITE_SETTINGS.phoneNumber,
    instagramHandle:
      settings.instagramHandle || DEFAULT_SITE_SETTINGS.instagramHandle,
    instagramUrl: settings.instagramUrl || DEFAULT_SITE_SETTINGS.instagramUrl,
    defaultLocale:
      settings.defaultLocale || DEFAULT_SITE_SETTINGS.defaultLocale
  };
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const settings = await prisma.siteSettings.findFirst({
    orderBy: {
      createdAt: 'asc'
    }
  });

  if (!settings) {
    return DEFAULT_SITE_SETTINGS;
  }

  return mapSettings(settings);
}

export async function saveSiteSettings(
  input: SiteSettingsData
): Promise<SiteSettingsData> {
  const payload = {
    siteName: input.siteName.trim() || DEFAULT_SITE_SETTINGS.siteName,
    siteUrl: input.siteUrl.trim() || DEFAULT_SITE_SETTINGS.siteUrl,
    contactEmail: toOptionalString(input.contactEmail),
    telegramUsername: toOptionalString(input.telegramUsername),
    whatsappNumber: toOptionalString(input.whatsappNumber),
    phoneNumber: toOptionalString(input.phoneNumber),
    instagramHandle: toOptionalString(input.instagramHandle),
    instagramUrl: toOptionalString(input.instagramUrl),
    defaultLocale: input.defaultLocale.trim() || DEFAULT_SITE_SETTINGS.defaultLocale
  };

  const existing = await prisma.siteSettings.findFirst({
    orderBy: {
      createdAt: 'asc'
    },
    select: {
      id: true
    }
  });

  const saved = existing
    ? await prisma.siteSettings.update({
        where: {
          id: existing.id
        },
        data: payload
      })
    : await prisma.siteSettings.create({
        data: payload
      });

  return mapSettings(saved);
}

export {DEFAULT_SITE_SETTINGS};
