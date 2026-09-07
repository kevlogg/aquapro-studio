export type CategoryId = 'all' | 'antiparras' | 'mallas' | 'gorros' | 'accesorios';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  badge?: string;
}

export interface SizeOption {
  code: string;
  label: string;
  inStock: boolean;
  chestCm?: string;
  waistCm?: string;
  hipsCm?: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  categoryId: CategoryId;
  categoryName: string;
  price: number;
  currency: 'USD' | 'EUR' | 'ARS';
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImage: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  finaApproved?: boolean;
  hydrodynamicGrade: string; // e.g. "Pro Elite A+"
  sizes: SizeOption[];
  colors: { name: string; hex: string }[];
  description: string;
  features: ProductFeature[];
  specifications: Record<string, string>;
  inStock: boolean;
  stockQuantity: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface FilterOptions {
  category?: CategoryId;
  search?: string;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  finaOnly?: boolean;
}

export interface ConsentState {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
  hasChoiceBeenMade: boolean;
}

export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: T;
}
