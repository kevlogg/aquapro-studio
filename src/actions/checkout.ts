'use server';

import { CheckoutSchema } from '@/lib/schemas';
import { ActionResponse } from '@/lib/types';

export interface CheckoutResult {
  orderId: string;
  totalPaid: number;
  estimatedDelivery: string;
}

export async function processCheckoutAction(
  prevState: ActionResponse<CheckoutResult> | null,
  formData: FormData
): Promise<ActionResponse<CheckoutResult>> {
  try {
    const rawData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      postalCode: formData.get('postalCode') as string,
      paymentMethod: formData.get('paymentMethod') as string,
      acceptTerms: formData.get('acceptTerms') === 'true' || formData.get('acceptTerms') === 'on',
    };

    const validated = CheckoutSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: 'Revisa los campos requeridos en el formulario de envío',
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { fullName, email } = validated.data;
    const mockOrderId = `AQP-${Math.floor(100000 + Math.random() * 900000)}`;

    // Simulación de respuesta exitosa de pasarela de pago empresarial
    return {
      success: true,
      message: `¡Gracias por tu compra, ${fullName}! Tu pedido #${mockOrderId} ha sido procesado con éxito. Enviaremos la confirmación a ${email}.`,
      data: {
        orderId: mockOrderId,
        totalPaid: 157.50,
        estimatedDelivery: '24 a 48 horas hábiles con seguimiento express',
      },
    };
  } catch (error) {
    console.error('Error en processCheckoutAction:', error);
    return {
      success: false,
      message: 'No se pudo completar la transacción. Por favor reintenta.',
    };
  }
}
