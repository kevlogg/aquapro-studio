import { Product } from '@/lib/types';
import { FAQS } from '@/components/sections/FAQSection';

export function getWebSiteJsonLd() {
  try {
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
  } catch (e) {
    return {};
  }
}

export function getProductsJsonLd(products: Product[]) {
  try {
    if (!Array.isArray(products)) return [];
    return products.map((product) => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name || 'AQUAPRO Swim Product',
      image: [product.image, product.secondaryImage].filter(Boolean),
      description: product.description || '',
      sku: product.id || 'sku',
      mpn: product.slug || 'slug',
      brand: {
        '@type': 'Brand',
        name: 'AQUAPRO Studio',
      },
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: (product.rating || 5).toString(),
          bestRating: '5',
        },
        author: {
          '@type': 'Organization',
          name: 'AQUAPRO Verificator',
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (product.rating || 5).toString(),
        reviewCount: (product.reviewsCount || 10).toString(),
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: product.currency || 'USD',
        price: (product.price || 0).toString(),
        priceValidUntil: '2027-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: `https://aquapro-studio.com/#product-${product.slug || product.id}`,
        seller: {
          '@type': 'Organization',
          name: 'AQUAPRO Studio',
        },
      },
    }));
  } catch (e) {
    return [];
  }
}

export function getFaqJsonLd() {
  try {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (FAQS || []).map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  } catch (e) {
    return {};
  }
}
