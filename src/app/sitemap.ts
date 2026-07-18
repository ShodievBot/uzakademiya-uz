import type {MetadataRoute} from 'next';
import {getAllJournals} from '@/lib/journals';
import {getAllLegislation} from '@/lib/legislation';
import {getUsefulSlugs, siteLocales} from '@/lib/useful';

const baseUrl = 'https://uzakademiya.uz';

const staticPaths = [
  '',
  '/journals',
  '/scopus',
  '/oak',
  '/useful',
  '/legislation',
  '/contacts'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const [usefulSlugs, journals, legislation] = await Promise.all([
    getUsefulSlugs(),
    getAllJournals(),
    getAllLegislation()
  ]);

  const localizedStaticPages: MetadataRoute.Sitemap = siteLocales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: path === '' || path === '/journals' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path === '/journals' ? 0.9 : 0.7
    }))
  );

  const usefulPages: MetadataRoute.Sitemap = siteLocales.flatMap((locale) =>
    usefulSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/useful/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    }))
  );

  const legislationPages: MetadataRoute.Sitemap = siteLocales.flatMap((locale) =>
    legislation.map((doc) => ({
      url: `${baseUrl}/${locale}/legislation/${doc.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    }))
  );

  const journalPages: MetadataRoute.Sitemap = siteLocales.flatMap((locale) =>
    journals.map((journal) => ({
      url: `${baseUrl}/${locale}/journals/${journal.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8
    }))
  );

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1
    },
    ...localizedStaticPages,
    ...usefulPages,
    ...legislationPages,
    ...journalPages
  ];
}