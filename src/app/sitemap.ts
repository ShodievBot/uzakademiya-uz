import type {MetadataRoute} from 'next';
import {getAllLegislation} from '@/lib/legislation';
import {getUsefulPageSlugs} from '@/lib/useful';

const baseUrl = 'https://uzakademiya.uz';
const locales = ['ru', 'uz', 'en'] as const;

function withLocale(locale: string, path: string) {
  if (!path || path === '/') {
    return `${baseUrl}/${locale}`;
  }

  return `${baseUrl}/${locale}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPaths = [
    '/',
    '/scopus',
    '/oak',
    '/legislation',
    '/useful',
    '/contacts'
  ];

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: withLocale(locale, path),
      lastModified,
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority:
        path === '/'
          ? 1
          : path === '/scopus' || path === '/oak'
            ? 0.8
            : path === '/legislation' || path === '/useful'
              ? 0.7
              : 0.6
    }))
  );

  const legislation = await getAllLegislation();
  const usefulSlugs = await getUsefulPageSlugs();

  const legislationPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    legislation.map((doc) => ({
      url: withLocale(locale, `/legislation/${doc.slug}`),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    }))
  );

  const usefulPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    usefulSlugs.map((slug) => ({
      url: withLocale(locale, `/useful/${slug}`),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    }))
  );

  return [...staticPages, ...legislationPages, ...usefulPages];
}
