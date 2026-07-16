import type { MetadataRoute } from "next";
import { getAllJournals } from "@/lib/journals";

type JournalLike = {
  slug: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://uzakademiya.uz";
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/journals`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scopus`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/oak`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/legislation`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const journals = (await Promise.resolve(getAllJournals())) as JournalLike[];

  const journalPages: MetadataRoute.Sitemap = journals.map((journal) => ({
    url: `${baseUrl}/journals/${journal.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...journalPages];
}
