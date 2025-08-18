'use server';

import { 
  generatePersonalizedNotifications, 
  type GeneratePersonalizedNotificationsInput 
} from '@/ai/flows/generate-notification';

export async function generateNotificationAction(input: GeneratePersonalizedNotificationsInput) {
  try {
    const result = await generatePersonalizedNotifications(input);
    return result;
  } catch (error) {
    console.error("Error in generateNotificationAction:", error);
    throw new Error("Failed to generate notification.");
  }
}
