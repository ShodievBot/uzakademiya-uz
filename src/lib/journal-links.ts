import {Journal} from '@/types/journal';

export function getJournalPublishHref(journal: Journal, locale = 'ru') {
  return `/${locale}/contacts?journal=${encodeURIComponent(journal.slug)}`;
}

export function getJournalPublishLabel(_journal: Journal, locale = 'ru') {
  if (locale === 'uz') return 'Maqola chop etish';
  if (locale === 'en') return 'Publish article';
  return 'Опубликовать статью';
}
