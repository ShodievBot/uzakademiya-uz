import { journals } from "@/data/journals";
import { getQuartileFromPercentile } from "@/lib/scopus";

type JournalFilters = {
  q?: string;
  scopus?: string;
  oak?: string;
  subject?: string;
  quartile?: string;
};

export function getAllJournals() {
  return journals.map((journal) => ({
    ...journal,
    quartile:
      journal.quartile ?? getQuartileFromPercentile(journal.percentile),
  }));
}

export function getJournalBySlug(slug: string) {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();

  return getAllJournals().find(
    (journal) => journal.slug.trim().toLowerCase() === normalizedSlug
  );
}

export function getFilteredJournals(filters: JournalFilters) {
  const { q, scopus, oak, subject, quartile } = filters;

  return getAllJournals().filter((journal) => {
    const matchesQuery =
      !q ||
      journal.title.toLowerCase().includes(q.toLowerCase()) ||
      journal.titleRu.toLowerCase().includes(q.toLowerCase()) ||
      journal.titleUz.toLowerCase().includes(q.toLowerCase()) ||
      journal.publisher.toLowerCase().includes(q.toLowerCase());

    const matchesScopus =
      !scopus ||
      (scopus === "yes" && journal.isScopusIndexed) ||
      (scopus === "no" && !journal.isScopusIndexed);

    const matchesOak =
      !oak ||
      (oak === "yes" && journal.isOakRecommended) ||
      (oak === "no" && !journal.isOakRecommended);

    const matchesSubject =
      !subject ||
      journal.subjectAreas?.some((item) =>
        item.toLowerCase().includes(subject.toLowerCase())
      );

    const matchesQuartile =
      !quartile || journal.quartile?.toLowerCase() === quartile.toLowerCase();

    return (
      matchesQuery &&
      matchesScopus &&
      matchesOak &&
      matchesSubject &&
      matchesQuartile
    );
  });
}

export function getUniqueSubjects() {
  const allSubjects = journals.flatMap((journal) => journal.subjectAreas || []);
  return [...new Set(allSubjects)].sort();
}
