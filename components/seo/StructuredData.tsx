import { skillsHandbookConfig } from "@/data/skills";

const siteUrl = "https://book.do-seung.com";

export function StructuredData() {
  const totalItems = skillsHandbookConfig.items.length;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: skillsHandbookConfig.title,
    url: siteUrl,
    description: skillsHandbookConfig.description,
    logo: `${siteUrl}/dobook.png`,
    sameAs: [
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: skillsHandbookConfig.items.slice(0, 100).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
          .replace(/\n+/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .substring(0, 5000),
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: skillsHandbookConfig.title,
    description: skillsHandbookConfig.description,
    url: siteUrl,
    inLanguage: "ko-KR",
    isAccessibleForFree: true,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: skillsHandbookConfig.title,
      url: siteUrl,
    },
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: skillsHandbookConfig.title,
    description: skillsHandbookConfig.description,
    url: siteUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalItems,
      itemListElement: skillsHandbookConfig.items.slice(0, 50).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          "@id": `${siteUrl}/#${item.id}`,
          headline: item.question,
          description: item.answer.replace(/\n+/g, " ").substring(0, 200),
          datePublished: item.createdAt,
          dateModified: item.updatedAt,
          author: {
            "@type": "Organization",
            name: skillsHandbookConfig.title,
          },
          publisher: {
            "@type": "Organization",
            name: skillsHandbookConfig.title,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/dobook.png`,
            },
          },
          keywords: item.tags.join(", "),
          inLanguage: "ko-KR",
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: siteUrl,
      },
    ],
  };

  const educationalOccupationalCredentialSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "면접 준비 자료",
    educationalLevel: "cs지식",
    competencyRequired: skillsHandbookConfig.items
      .flatMap((item) => item.tags)
      .filter((tag, index, self) => self.indexOf(tag) === index)
      .slice(0, 20)
      .join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOccupationalCredentialSchema) }}
      />
    </>
  );
}
