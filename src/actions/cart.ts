'use server';

import { AddToCartSchema } from '@/lib/schemas';
import { getProductBySlug } from '@/lib/dal/products';
import { ActionResponse, CartItem } from '@/lib/types';

export async function addToCartAction(
  prevState: ActionResponse<CartItem> | null,
  formData: FormData
): Promise<ActionResponse<CartItem>> {
  try {
    const rawData = {
      productId: formData.get('productId') as string,
      selectedSize: formData.get('selectedSize') as string,
      selectedColor: formData.get('selectedColor') as string,
      quantity: Number(formData.get('quantity') || 1),
    };

    const validated = AddToCartSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: 'Por favor verifica los datos ingresados',
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { productId, selectedSize, selectedColor, quantity } = validated.data;

    const product = await getProductBySlug(productId);
    if (!product) {
      return {
        success: false,
        message: 'El producto seleccionado no existe o no se encuentra disponible',
      };
    }

    if (!product.inStock) {
      return {
        success: false,
        message: 'El producto se encuentra agotado momentáneamente',
      };
    }

    const cartItem: CartItem = {
      product,
      selectedSize,
      selectedColor,
      quantity,
    };

    return {
      success: true,
      message: `¡${product.name} (${selectedSize}) añadido al carrito de compras!`,
      data: cartItem,
    };
  } catch (error) {
    console.error('Error en addToCartAction:', error);
    return {
      success: false,
      message: 'Ocurrió un error inesperado al procesar la solicitud.',
    };
  }
}
