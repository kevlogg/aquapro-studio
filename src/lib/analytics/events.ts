import { ConsentState, Product } from '@/lib/types';

// Tipado estricto para dataLayer de Google Tag Manager / Analytics
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_STORAGE_KEY = 'aquapro_consent_v2';

/**
 * Estado por defecto de Consent Mode v2
 */
export const DEFAULT_CONSENT: ConsentState = {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  hasChoiceBeenMade: false,
};

/**
 * Obtener consentimiento guardado en localStorage
 */
export function getSavedConsent(): ConsentState {
  if (typeof window === 'undefined') return DEFAULT_CONSENT;
  try {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as ConsentState;
    }
  } catch (e) {
    console.error('Error al leer consentimiento:', e);
  }
  return DEFAULT_CONSENT;
}

/**
 * Guardar consentimiento y notificar al Consent Mode v2 de Google
 */
export function updateConsentState(newConsent: Partial<ConsentState>): ConsentState {
  const current = getSavedConsent();
  const updated: ConsentState = {
    ...current,
    ...newConsent,
    hasChoiceBeenMade: true,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updated));

      // Actualizar Google Consent Mode v2 mediante gtag si está activo
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          ad_storage: updated.ad_storage,
          analytics_storage: updated.analytics_storage,
          functionality_storage: updated.functionality_storage,
        });
      }
    } catch (e) {
      console.error('Error al guardar consentimiento:', e);
    }
  }

  return updated;
}

/**
 * Emitir evento al dataLayer únicamente si se ha otorgado consentimiento de analítica
 */
export function trackEvent(eventName: string, payload: Record<string, unknown> = {}): boolean {
  if (typeof window === 'undefined') return false;

  const consent = getSavedConsent();

  // Verificación estricta de consentimiento previo
  if (consent.analytics_storage !== 'granted') {
    console.warn(`[Analytics Blocked] El evento "${eventName}" no se envió debido a que analytics_storage está 'denied'.`);
    return false;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload,
  });

  console.log(`[Analytics Event Tracked] ${eventName}:`, payload);
  return true;
}

/**
 * Eventos Ecommerce estandarizados en snake_case
 */

export function trackViewItemList(categoryName: string, itemsCount: number) {
  trackEvent('view_item_list', {
    item_list_id: categoryName.toLowerCase().replace(/\s+/g, '_'),
    item_list_name: categoryName,
    items_count: itemsCount,
  });
}

export function trackSelectItem(product: Product) {
  trackEvent('select_item', {
    item_id: product.id,
    item_name: product.name,
    item_category: product.categoryName,
    price: product.price,
    currency: product.currency,
  });
}

export function trackAddToCart(product: Product, size: string, color: string, quantity: number) {
  trackEvent('add_to_cart', {
    currency: product.currency,
    value: product.price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.categoryName,
        price: product.price,
        quantity,
        variant_size: size,
        variant_color: color,
      },
    ],
  });
}

export function trackBeginCheckout(cartItemsCount: number, totalValue: number) {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: totalValue,
    items_count: cartItemsCount,
  });
}

export function trackSubscribeNewsletter(email: string, role?: string) {
  trackEvent('subscribe_newsletter', {
    method: 'footer_form',
    user_role: role || 'general',
  });
}
