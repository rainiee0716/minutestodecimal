import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

type ArticleSchemaInput = {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
};

export function articleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: OG_IMAGE,
    mainEntityOfPage: `${SITE_URL}${path}`,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    datePublished,
    dateModified: dateModified ?? datePublished,
  };
}
