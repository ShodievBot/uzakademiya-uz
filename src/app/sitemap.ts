import type {MetadataRoute} from 'next';
import {getAllJournals} from '@/lib/journals';
import {getAllLegislation} from '@/lib/legislation';
import {getUsefulSlugs, siteLocales} from '@/lib/useful';

const baseUrl = process.env.SITE_URL || 'https://uzakademiya.uz';

const staticPaths = [
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
    [
      {
        url: `${baseUrl}/${locale}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 1
      },
      ...staticPaths.map((path) => ({
        url: `${baseUrl}/${locale}${path}`,
        lastModified,
        changeFrequency: path === '/journals' ? 'weekly' as const : 'monthly' as const,
        priority: path === '/journals' ? 0.9 : 0.7
      }))
    ]
  );

  const usefulPages: MetadataRoute.Sitemap = siteLocales.flatMap((locale) =>
    usefulSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/useful/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  );

  const legislationPages: MetadataRoute.Sitemap = siteLocales.flatMap((locale) =>
    legislation.map((doc) => ({
      url: `${baseUrl}/${locale}/legislation/${doc.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  );

  const journalPages: MetadataRoute.Sitemap = siteLocales.flatMap((locale) =>
    journals.map((journal) => ({
      url: `${baseUrl}/${locale}/journals/${journal.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  );

  return [
    ...localizedStaticPages,
    ...usefulPages,
    ...legislationPages,
    ...journalPages
  ];
}
