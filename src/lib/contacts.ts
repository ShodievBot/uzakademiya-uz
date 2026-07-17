import type {SiteSettingsData} from '@/lib/site-settings';

function normalizeLocale(locale?: string) {
  if (locale === 'uz' || locale === 'en') return locale;
  return 'ru';
}

function normalizePhoneLinkValue(value: string) {
  return value.replace(/\s+/g, '');
}

function normalizeDigits(value: string) {
  return value.replace(/\D+/g, '');
}

export function formatTelegramHandle(username: string) {
  const clean = username.trim().replace(/^@+/, '');
  return `@${clean}`;
}

export function formatWhatsappDisplay(value: string) {
  const trimmed = value.trim();

  if (trimmed.startsWith('+')) {
    return trimmed;
  }

  const digits = normalizeDigits(trimmed);
  return digits ? `+${digits}` : trimmed;
}

export function formatInstagramHandle(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return '';
  if (trimmed.startsWith('@')) return trimmed;

  return `@${trimmed}`;
}

export function getLocalizedLeadMessage(
  locale: string,
  journalTitle?: string | null
) {
  const safeTitle = journalTitle?.trim();
  const normalizedLocale = normalizeLocale(locale);

  if (normalizedLocale === 'uz') {
    return safeTitle
      ? `Assalomu alaykum, men “${safeTitle}” jurnalida maqola chop ettirmoqchiman.`
      : 'Assalomu alaykum, men maqola chop ettirmoqchiman.';
  }

  if (normalizedLocale === 'en') {
    return safeTitle
      ? `Hello, I would like to publish an article in the journal “${safeTitle}”.`
      : 'Hello, I would like to publish an article.';
  }

  return safeTitle
    ? `Здравствуйте, хочу опубликовать статью в журнале “${safeTitle}”.`
    : 'Здравствуйте, хочу опубликовать статью.';
}

export function getLocalizedLeadSubject(
  locale: string,
  journalTitle?: string | null
) {
  const normalizedLocale = normalizeLocale(locale);

  if (normalizedLocale === 'uz') {
    return journalTitle
      ? `Maqola chop etish — ${journalTitle}`
      : 'Maqola chop etish';
  }

  if (normalizedLocale === 'en') {
    return journalTitle
      ? `Article publication — ${journalTitle}`
      : 'Article publication';
  }

  return journalTitle
    ? `Публикация статьи — ${journalTitle}`
    : 'Публикация статьи';
}

export function getContactDisplayValues(settings: SiteSettingsData) {
  return {
    email: settings.contactEmail,
    telegramUsername: settings.telegramUsername.replace(/^@+/, ''),
    telegramHandle: formatTelegramHandle(settings.telegramUsername),
    whatsappDisplay: formatWhatsappDisplay(settings.whatsappNumber),
    whatsappDigits: normalizeDigits(settings.whatsappNumber),
    phoneDisplay: settings.phoneNumber,
    phoneLink: normalizePhoneLinkValue(settings.phoneNumber),
    instagramHandle: formatInstagramHandle(settings.instagramHandle),
    instagramUrl: settings.instagramUrl,
    siteName: settings.siteName,
    siteUrl: settings.siteUrl
  };
}

export function getContactLinks(
  settings: SiteSettingsData,
  locale: string,
  journalTitle?: string | null
) {
  const message = getLocalizedLeadMessage(locale, journalTitle);
  const subject = getLocalizedLeadSubject(locale, journalTitle);

  const encodedMessage = encodeURIComponent(message);
  const encodedSubject = encodeURIComponent(subject);
  const encodedSiteUrl = encodeURIComponent(settings.siteUrl);

  const display = getContactDisplayValues(settings);

  return {
    email: `mailto:${settings.contactEmail}?subject=${encodedSubject}&body=${encodedMessage}`,
    telegram: `https://t.me/share/url?url=${encodedSiteUrl}&text=${encodedMessage}`,
    whatsapp: `https://wa.me/${display.whatsappDigits}?text=${encodedMessage}`,
    phone: `tel:${display.phoneLink}`,
    instagram: settings.instagramUrl,
    message,
    subject
  };
}
