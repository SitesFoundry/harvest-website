/*
 * Structured data helpers.
 *
 * Three rules decide what goes in here:
 *
 *  1. The markup must describe something a visitor can actually see. Every list
 *     entry and FAQ below is built from the same content objects the page
 *     renders, so the schema cannot drift away from the copy.
 *  2. No invented facts. There are no prices, ratings, stock levels, MOQs or
 *     certification numbers in this file that are not already published on the
 *     page.
 *  3. Nothing that Google will reject. Product rich results require `offers`,
 *     `review` or `aggregateRating`. This is a B2B supplier whose price depends
 *     on model, quantity and destination, so there is no honest price to
 *     publish — and inventing one (or a rating) would mislead buyers and still
 *     be wrong in the index. The product pages therefore carry an ItemList of
 *     product PAGES, not Product objects: valid schema, no failed Product
 *     snippet, and the specifications remain visible on the page.
 */

export const SITE_ORIGIN = "https://www.harvest.cn";

export type SchemaProductPage = {
  name: string;
  description?: string;
  url: string;
  image?: string;
};

export type SchemaFaq = { question: string; answer: string };

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, `${SITE_ORIGIN}/`).href;
}

/*
 * A list of product detail pages.
 *
 * ListItem carries name/description/url/image directly. That is a valid Thing
 * description without claiming to be a Product, so Google does not run it
 * through the Product snippet requirements that need an offer or a rating.
 */
export function productPageList(name: string, pages: readonly SchemaProductPage[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: pages.length,
    itemListElement: pages.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.name,
      ...(page.description ? { description: page.description } : {}),
      url: absoluteUrl(page.url),
      ...(page.image ? { image: absoluteUrl(page.image) } : {}),
    })),
  };
}

export function faqPageSchema(faqs: readonly SchemaFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
