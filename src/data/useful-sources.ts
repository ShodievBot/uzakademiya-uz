type LocalizedText = {
  ru: string;
  uz: string;
  en: string;
};

export type UsefulSource = {
  id: string;
  title: LocalizedText;
  url: string;
};

export const usefulSources: UsefulSource[] = [
  {
    id: "1",
    title: {
      ru: "ORCID. What is ORCID?",
      uz: "ORCID. What is ORCID?",
      en: "ORCID. What is ORCID?",
    },
    url: "https://info.orcid.org/what-is-orcid/",
  },
  {
    id: "2",
    title: {
      ru: "DOI Foundation. What is a DOI?",
      uz: "DOI Foundation. What is a DOI?",
      en: "DOI Foundation. What is a DOI?",
    },
    url: "https://www.doi.org/the-identifier/what-is-a-doi/",
  },
  {
    id: "3",
    title: {
      ru: "Elsevier. Scopus.",
      uz: "Elsevier. Scopus.",
      en: "Elsevier. Scopus.",
    },
    url: "https://www.elsevier.com/products/scopus",
  },
  {
    id: "4",
    title: {
      ru: "Elsevier. Scopus Content Coverage Guide.",
      uz: "Elsevier. Scopus Content Coverage Guide.",
      en: "Elsevier. Scopus Content Coverage Guide.",
    },
    url: "https://supportcontent.elsevier.com/Support%20Hub/Scopus/Scopus_ContentCoverage_Guide_WEB.pdf",
  },
  {
    id: "5",
    title: {
      ru: "Scopus Interactive Tutorials. Using Scopus Sources.",
      uz: "Scopus Interactive Tutorials. Using Scopus Sources.",
      en: "Scopus Interactive Tutorials. Using Scopus Sources.",
    },
    url: "https://tutorials.scopus.com/EN/AnalyzeJournals/sc_AnalyzeJournals_textOnly.html",
  },
  {
    id: "6",
    title: {
      ru: "Scopus Interactive Tutorials. Author Details.",
      uz: "Scopus Interactive Tutorials. Author Details.",
      en: "Scopus Interactive Tutorials. Author Details.",
    },
    url: "https://tutorials.scopus.com/EN/AuthorDetails/sc_AuthorDetails_textOnly.html",
  },
  {
    id: "7",
    title: {
      ru: "Google Scholar. Google Scholar Profiles.",
      uz: "Google Scholar. Google Scholar Profiles.",
      en: "Google Scholar. Google Scholar Profiles.",
    },
    url: "https://scholar.google.com/intl/en/scholar/citations.html",
  },
  {
    id: "8",
    title: {
      ru: "Google Scholar. Google Scholar Metrics Help.",
      uz: "Google Scholar. Google Scholar Metrics Help.",
      en: "Google Scholar. Google Scholar Metrics Help.",
    },
    url: "https://scholar.google.com/intl/en/scholar/metrics.html",
  },
  {
    id: "9",
    title: {
      ru: "COPE. Authorship and AI tools.",
      uz: "COPE. Authorship and AI tools.",
      en: "COPE. Authorship and AI tools.",
    },
    url: "https://publicationethics.org/guidance/cope-position/authorship-and-ai-tools",
  },
  {
    id: "10",
    title: {
      ru: "COPE. Determining acceptable levels of plagiarism/duplication.",
      uz: "COPE. Determining acceptable levels of plagiarism/duplication.",
      en: "COPE. Determining acceptable levels of plagiarism/duplication.",
    },
    url: "https://publicationethics.org/guidance/cope-position/determining-acceptable-levels-plagiarismduplication",
  },
  {
    id: "11",
    title: {
      ru: "ICMJE. Responsibilities in the Submission and Peer-Review Process.",
      uz: "ICMJE. Responsibilities in the Submission and Peer-Review Process.",
      en: "ICMJE. Responsibilities in the Submission and Peer-Review Process.",
    },
    url: "https://www.icmje.org/recommendations/browse/roles-and-responsibilities/responsibilities-in-the-submission-and-peer-review-process.html",
  },
  {
    id: "12",
    title: {
      ru: "Crossref. Similarity Check.",
      uz: "Crossref. Similarity Check.",
      en: "Crossref. Similarity Check.",
    },
    url: "https://www.crossref.org/documentation/similarity-check/",
  },
  {
    id: "13",
    title: {
      ru: "Elsevier / ScienceDirect Support. What are journal pre-proofs?",
      uz: "Elsevier / ScienceDirect Support. What are journal pre-proofs?",
      en: "Elsevier / ScienceDirect Support. What are journal pre-proofs?",
    },
    url: "https://service.elsevier.com/app/answers/detail/a_id/22799/supporthub/sciencedirect/",
  },
  {
    id: "14",
    title: {
      ru: "Elsevier. What is peer review?",
      uz: "Elsevier. What is peer review?",
      en: "Elsevier. What is peer review?",
    },
    url: "https://www.elsevier.com/reviewer/what-is-peer-review",
  },
  {
    id: "15",
    title: {
      ru: "Elsevier. Scopus content policy and selection.",
      uz: "Elsevier. Scopus content policy and selection.",
      en: "Elsevier. Scopus content policy and selection.",
    },
    url: "https://www.elsevier.com/products/scopus/content/content-policy-and-selection",
  },
  {
    id: "16",
    title: {
      ru: "WAME. Chatbots, Generative AI, and Scholarly Manuscripts.",
      uz: "WAME. Chatbots, Generative AI, and Scholarly Manuscripts.",
      en: "WAME. Chatbots, Generative AI, and Scholarly Manuscripts.",
    },
    url: "https://wame.org/page3.php?id=106",
  },
  {
    id: "17",
    title: {
      ru: "Crossref. Posted content (includes preprints).",
      uz: "Crossref. Posted content (includes preprints).",
      en: "Crossref. Posted content (includes preprints).",
    },
    url: "https://www.crossref.org/documentation/research-nexus/posted-content-includes-preprints/",
  },
  {
    id: "18",
    title: {
      ru: "NISO. Journal Article Versions (JAV).",
      uz: "NISO. Journal Article Versions (JAV).",
      en: "NISO. Journal Article Versions (JAV).",
    },
    url: "https://www.niso.org/sites/default/files/2017-08/RP-8-2008.pdf",
  },
  {
    id: "19",
    title: {
      ru: "OAK / Supreme Attestation Commission of the Republic of Uzbekistan. List of recommended scientific editions for publication of basic scientific results of dissertations.",
      uz: "OAK / Supreme Attestation Commission of the Republic of Uzbekistan. List of recommended scientific editions for publication of basic scientific results of dissertations.",
      en: "OAK / Supreme Attestation Commission of the Republic of Uzbekistan. List of recommended scientific editions for publication of basic scientific results of dissertations.",
    },
    url: "https://oak.uz/userfiles/files/Perechen-2019.pdf",
  },
  {
    id: "20",
    title: {
      ru: "Springer Support. Editorial process after submission.",
      uz: "Springer Support. Editorial process after submission.",
      en: "Springer Support. Editorial process after submission.",
    },
    url: "https://support.springer.com/en/support/solutions/articles/6000251301-editorial-process-after-submission",
  },
  {
    id: "21",
    title: {
      ru: "Elsevier. Scopus APIs Getting Started Guide.",
      uz: "Elsevier. Scopus APIs Getting Started Guide.",
      en: "Elsevier. Scopus APIs Getting Started Guide.",
    },
    url: "https://dev.elsevier.com/guides/Scopus%20API%20Guide_V1_20230907.pdf",
  },
  {
    id: "22",
    title: {
      ru: "NCBI / StatPearls. How To Read A Scientific Manuscript.",
      uz: "NCBI / StatPearls. How To Read A Scientific Manuscript.",
      en: "NCBI / StatPearls. How To Read A Scientific Manuscript.",
    },
    url: "https://www.ncbi.nlm.nih.gov/books/NBK564411/",
  },
  {
    id: "23",
    title: {
      ru: "Springer Nature. References & Article Types.",
      uz: "Springer Nature. References & Article Types.",
      en: "Springer Nature. References & Article Types.",
    },
    url: "https://www.springernature.com/gp/authors/campaigns/writing-a-manuscript/references-article-types",
  },
  {
    id: "24",
    title: {
      ru: "APA Style. Abstract and Keywords Guide.",
      uz: "APA Style. Abstract and Keywords Guide.",
      en: "APA Style. Abstract and Keywords Guide.",
    },
    url: "https://apastyle.apa.org/instructional-aids/abstract-keywords-guide.pdf",
  },
  {
    id: "25",
    title: {
      ru: "Crossref. Journals and articles.",
      uz: "Crossref. Journals and articles.",
      en: "Crossref. Journals and articles.",
    },
    url: "https://www.crossref.org/documentation/principles-practices/journals/",
  },
  {
    id: "26",
    title: {
      ru: "APA. Publishing Policies.",
      uz: "APA. Publishing Policies.",
      en: "APA. Publishing Policies.",
    },
    url: "https://www.apa.org/pubs/journals/resources/publishing-policies",
  },
  {
    id: "27",
    title: {
      ru: "Cornell University Library. Distinguishing Scholarly from Non-Scholarly Periodicals.",
      uz: "Cornell University Library. Distinguishing Scholarly from Non-Scholarly Periodicals.",
      en: "Cornell University Library. Distinguishing Scholarly from Non-Scholarly Periodicals.",
    },
    url: "https://guides.library.cornell.edu/scholarlyjournals",
  },
  {
    id: "28",
    title: {
      ru: "APA. Peer Review.",
      uz: "APA. Peer Review.",
      en: "APA. Peer Review.",
    },
    url: "https://www.apa.org/pubs/journals/resources/peer-review",
  },
  {
    id: "29",
    title: {
      ru: "APA Style. Anatomy of a Journal Article.",
      uz: "APA Style. Anatomy of a Journal Article.",
      en: "APA Style. Anatomy of a Journal Article.",
    },
    url: "https://apastyle.apa.org/instructional-aids/anatomy-journal-article.pdf",
  },
  {
    id: "30",
    title: {
      ru: "IEEE Author Center. Types of IEEE Conference Papers.",
      uz: "IEEE Author Center. Types of IEEE Conference Papers.",
      en: "IEEE Author Center. Types of IEEE Conference Papers.",
    },
    url: "https://conferences.ieeeauthorcenter.ieee.org/become-an-ieee-conference-author/types-of-ieee-conference-papers/",
  },
  {
    id: "31",
    title: {
      ru: "ISSN. What is an ISSN?",
      uz: "ISSN. What is an ISSN?",
      en: "ISSN. What is an ISSN?",
    },
    url: "https://www.issn.org/understanding-the-issn/what-is-an-issn/",
  },
  {
    id: "32",
    title: {
      ru: "ISSN International Centre. ISSN Manual.",
      uz: "ISSN International Centre. ISSN Manual.",
      en: "ISSN International Centre. ISSN Manual.",
    },
    url: "https://www.issn.org/wp-content/uploads/2025/05/Manual-ISSN_ENG-marc21_May2025.pdf",
  },
  {
    id: "33",
    title: {
      ru: "ICMJE. Preparing a Manuscript for Submission to a Medical Journal.",
      uz: "ICMJE. Preparing a Manuscript for Submission to a Medical Journal.",
      en: "ICMJE. Preparing a Manuscript for Submission to a Medical Journal.",
    },
    url: "https://www.icmje.org/recommendations/browse/manuscript-preparation/preparing-for-submission.html",
  },
  {
    id: "34",
    title: {
      ru: "Springer Nature. Structuring your manuscript.",
      uz: "Springer Nature. Structuring your manuscript.",
      en: "Springer Nature. Structuring your manuscript.",
    },
    url: "https://www.springernature.com/gp/authors/campaigns/writing-a-manuscript/structuring-your-manuscript",
  },

  // Дополнительные 15 источников из конца документа

  {
    id: "35",
    title: {
      ru: "Elsevier Journal Finder — Find the right journal for your research",
      uz: "Elsevier Journal Finder — Find the right journal for your research",
      en: "Elsevier Journal Finder — Find the right journal for your research",
    },
    url: "https://journalfinder.elsevier.com/",
  },
  {
    id: "36",
    title: {
      ru: "Think. Check. Submit. — Identify trusted publishers for your research",
      uz: "Think. Check. Submit. — Identify trusted publishers for your research",
      en: "Think. Check. Submit. — Identify trusted publishers for your research",
    },
    url: "https://thinkchecksubmit.org/",
  },
  {
    id: "37",
    title: {
      ru: "DOAJ — Guide to applying",
      uz: "DOAJ — Guide to applying",
      en: "DOAJ — Guide to applying",
    },
    url: "https://doaj.org/apply/guide/",
  },
  {
    id: "38",
    title: {
      ru: "APA — Peer Review",
      uz: "APA — Peer Review",
      en: "APA — Peer Review",
    },
    url: "https://www.apa.org/pubs/journals/resources/peer-review",
  },
  {
    id: "39",
    title: {
      ru: "Elsevier — Choice of publishing options",
      uz: "Elsevier — Choice of publishing options",
      en: "Elsevier — Choice of publishing options",
    },
    url: "https://www.elsevier.com/researcher/author/open-access/choice",
  },
  {
    id: "40",
    title: {
      ru: "Springer Nature — Open access policies for journals",
      uz: "Springer Nature — Open access policies for journals",
      en: "Springer Nature — Open access policies for journals",
    },
    url: "https://www.springernature.com/gp/open-science/policies/journal-policies",
  },
  {
    id: "41",
    title: {
      ru: "Scopus Tutorials — Using Scopus Sources",
      uz: "Scopus Tutorials — Using Scopus Sources",
      en: "Scopus Tutorials — Using Scopus Sources",
    },
    url: "https://tutorials.scopus.com/EN/AnalyzeJournals/sc_AnalyzeJournals_textOnly.html",
  },
  {
    id: "42",
    title: {
      ru: "Elsevier — Scopus content",
      uz: "Elsevier — Scopus content",
      en: "Elsevier — Scopus content",
    },
    url: "https://www.elsevier.com/products/scopus/content",
  },
  {
    id: "43",
    title: {
      ru: "Elsevier — Scopus content policy and selection",
      uz: "Elsevier — Scopus content policy and selection",
      en: "Elsevier — Scopus content policy and selection",
    },
    url: "https://www.elsevier.com/products/scopus/content/content-policy-and-selection",
  },
  {
    id: "44",
    title: {
      ru: "Scopus Tutorials — Author details page",
      uz: "Scopus Tutorials — Author details page",
      en: "Scopus Tutorials — Author details page",
    },
    url: "https://tutorials.scopus.com/EN/AuthorDetails/sc_AuthorDetails_textOnly.html",
  },
  {
    id: "45",
    title: {
      ru: "Elsevier Support — What is the Scopus Author Identifier?",
      uz: "Elsevier Support — What is the Scopus Author Identifier?",
      en: "Elsevier Support — What is the Scopus Author Identifier?",
    },
    url: "https://service.elsevier.com/app/answers/detail/a_id/11212/supporthub/scopus/",
  },
  {
    id: "46",
    title: {
      ru: "Crossref — Introduction to posted content (includes preprints)",
      uz: "Crossref — Introduction to posted content (includes preprints)",
      en: "Crossref — Introduction to posted content (includes preprints)",
    },
    url: "https://www.crossref.org/documentation/research-nexus/posted-content-includes-preprints/",
  },
  {
    id: "47",
    title: {
      ru: "NISO — Journal Article Versions (JAV): Recommendations",
      uz: "NISO — Journal Article Versions (JAV): Recommendations",
      en: "NISO — Journal Article Versions (JAV): Recommendations",
    },
    url: "https://www.niso.org/sites/default/files/2017-08/RP-8-2008.pdf",
  },
  {
    id: "48",
    title: {
      ru: "Elsevier Support — Author guide to the publication process (post-acceptance)",
      uz: "Elsevier Support — Author guide to the publication process (post-acceptance)",
      en: "Elsevier Support — Author guide to the publication process (post-acceptance)",
    },
    url: "https://service.elsevier.com/app/answers/detail/a_id/34514/c/10532/supporthub/publishing/",
  },
  {
    id: "49",
    title: {
      ru: "Elsevier — Scopus",
      uz: "Elsevier — Scopus",
      en: "Elsevier — Scopus",
    },
    url: "https://www.elsevier.com/products/scopus",
  },
];
