/*
 * Structured data helpers.
 *
 * Two rules decide what goes in here:
 *
 *  1. The markup must describe something a visitor can actually see. Every
 *     Product, offer and FAQ entry below is built from the same content objects
 *     the page renders, so the schema cannot drift away from the copy.
 *  2. No invented facts. There are no prices, ratings, stock levels, MOQs or
 *     certification numbers in this file that are not already published on the
 *     page. Product markup without an `offers` block is intentional: a trade
 *     quotation depends on model, quantity and destination, and a fake price
 *     would be worse than no price at all.
 *
 * An ItemList of Products still tells Google what the page sells, in which
 * categories, with which key parameters, and which company supplies it.
 */

export const SITE_ORIGIN = "https://www.harvest.cn";

export type SchemaProperty = { label: string; value: string };

export type SchemaProduct = {
  name: string;
  description?: string;
  category?: string;
  url: string;
  image?: string;
  specs?: SchemaProperty[];
};

export type SchemaFaq = { question: string; answer: string };

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, `${SITE_ORIGIN}/`).href;
}

export function productItemList(name: string, products: readonly SchemaProduct[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        ...(product.description ? { description: product.description } : {}),
        ...(product.category ? { category: product.category } : {}),
        url: absoluteUrl(product.url),
        ...(product.image ? { image: absoluteUrl(product.image) } : {}),
        ...(product.specs?.length
          ? {
              additionalProperty: product.specs.map((spec) => ({
                "@type": "PropertyValue",
                name: spec.label,
                value: spec.value,
              })),
            }
          : {}),
        offeredBy: {
          "@type": "Organization",
          name: "Harvest Eco Solutions Limited",
          url: `${SITE_ORIGIN}/`,
        },
      },
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
