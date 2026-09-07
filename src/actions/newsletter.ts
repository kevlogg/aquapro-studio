'use server';

import { NewsletterSchema } from '@/lib/schemas';
import { ActionResponse } from '@/lib/types';

export async function subscribeNewsletterAction(
  prevState: ActionResponse<{ subscribedEmail: string }> | null,
  formData: FormData
): Promise<ActionResponse<{ subscribedEmail: string }>> {
  try {
    const rawData = {
      email: formData.get('email') as string,
      swimRole: (formData.get('swimRole') as string) || undefined,
      consentAccepted: formData.get('consentAccepted') === 'true' || formData.get('consentAccepted') === 'on',
    };

    const validated = NewsletterSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: 'Por favor verifica la dirección de correo y la aceptación de privacidad',
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { email } = validated.data;

    return {
      success: true,
      message: '¡Te has suscrito exitosamente al AQUAPRO Performance Club! Revisa tu bandeja de entrada para recibir tu cupón de bienvenida.',
      data: {
        subscribedEmail: email,
      },
    };
  } catch (error) {
    console.error('Error en subscribeNewsletterAction:', error);
    return {
      success: false,
      message: 'Error al procesar la suscripción. Intenta nuevamente.',
    };
  }
}
