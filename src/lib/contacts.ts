export const CONTACTS = {
  email: 'info@uzakademiya.uz',
  telegramUsername: 'scopus_nashri',
  whatsappNumber: '998901234567',
  phoneNumber: '+998901234567',
  instagramHandle: '@Scopus_nashri',
  instagramUrl: 'https://instagram.com/Scopus_nashri',
  siteUrl: 'https://uzakademiya.uz'
};

function normalizeLocale(locale?: string) {
  if (locale === 'uz' || locale === 'en') return locale;
  return 'ru';
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

export function getContactLinks(locale: string, journalTitle?: string | null) {
  const message = getLocalizedLeadMessage(locale, journalTitle);
  const subject = getLocalizedLeadSubject(locale, journalTitle);

  const encodedMessage = encodeURIComponent(message);
  const encodedSubject = encodeURIComponent(subject);
  const encodedSiteUrl = encodeURIComponent(CONTACTS.siteUrl);

  return {
    email: `mailto:${CONTACTS.email}?subject=${encodedSubject}&body=${encodedMessage}`,
    telegram: `https://t.me/share/url?url=${encodedSiteUrl}&text=${encodedMessage}`,
    whatsapp: `https://wa.me/${CONTACTS.whatsappNumber}?text=${encodedMessage}`,
    phone: `tel:${CONTACTS.phoneNumber.replace(/\s+/g, '')}`,
    instagram: CONTACTS.instagramUrl,
    message,
    subject
  };
}
