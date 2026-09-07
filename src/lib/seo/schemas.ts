import { Product } from '@/lib/types';
import { FAQS } from '@/components/sections/FAQSection';

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AQUAPRO Studio',
    url: 'https://aquapro-studio.com',
    description: 'Equipamiento de natación técnica y recreativa homologado por World Aquatics (FINA).',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://aquapro-studio.com/?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getProductsJsonLd(products: Product[]) {
  return products.map((product) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image, product.secondaryImage],
    description: product.description,
    sku: product.id,
    mpn: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'AQUAPRO Studio',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: product.rating.toString(),
        bestRating: '5',
      },
      author: {
        '@type': 'Organization',
        name: 'AQUAPRO Verificator',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewsCount.toString(),
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: product.price.toString(),
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://aquapro-studio.com/#product-${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'AQUAPRO Studio',
      },
    },
  }));
}

export function getFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
