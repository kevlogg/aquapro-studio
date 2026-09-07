import { z } from 'zod';

export const AddToCartSchema = z.object({
  productId: z.string().min(1, 'El ID de producto es requerido'),
  selectedSize: z.string().min(1, 'Por favor selecciona un talle'),
  selectedColor: z.string().min(1, 'Por favor selecciona un color'),
  quantity: z.number().int().min(1, 'La cantidad mínima es 1').max(10, 'La cantidad máxima es 10'),
});

export const UpdateCartItemSchema = z.object({
  productId: z.string().min(1),
  selectedSize: z.string().min(1),
  quantity: z.number().int().min(0).max(10),
});

export const NewsletterSchema = z.object({
  email: z.string().email('Por favor ingresa un correo electrónico válido'),
  swimRole: z.enum(['competidor', 'master', 'triatleta', 'recreativo']).optional(),
  consentAccepted: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar las políticas de privacidad',
  }),
});

export const CheckoutSchema = z.object({
  fullName: z.string().min(3, 'El nombre completo debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().min(8, 'Ingresa un número telefónico válido'),
  address: z.string().min(5, 'Ingresa la dirección completa'),
  city: z.string().min(2, 'Ingresa la ciudad'),
  postalCode: z.string().min(4, 'Código postal válido requerido'),
  paymentMethod: z.enum(['credit_card', 'mercadopago', 'transfer'], {
    message: 'Selecciona un método de pago válido',
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
});

export const FilterSchema = z.object({
  category: z.enum(['all', 'antiparras', 'mallas', 'gorros', 'accesorios']).optional(),
  search: z.string().optional(),
  sort: z.enum(['featured', 'price-asc', 'price-desc', 'rating']).optional(),
  finaOnly: z.boolean().optional(),
});
