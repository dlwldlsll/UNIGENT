// src/ai/flows/generate-notification.ts
'use server';

/**
 * @fileOverview A personalized notification generation AI agent.
 *
 * - generatePersonalizedNotifications - A function that handles the generation of personalized notifications.
 * - GeneratePersonalizedNotificationsInput - The input type for the generatePersonalizedNotifications function.
 * - GeneratePersonalizedNotificationsOutput - The return type for the generatePersonalizedNotifications function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedNotificationsInputSchema = z.object({
  userName: z.string().describe('The name of the student.'),
  courseName: z.string().describe('The name of the course.'),
  deadline: z.string().describe('The deadline for the assignment/event (e.g., date and time).'),
  taskDescription: z.string().describe('Description of the task/assignment/event.'),
  notificationPreferences: z.string().describe('Preferred notification method (e.g., email, text).'),
});
export type GeneratePersonalizedNotificationsInput = z.infer<typeof GeneratePersonalizedNotificationsInputSchema>;

const GeneratePersonalizedNotificationsOutputSchema = z.object({
  notificationMessage: z.string().describe('The personalized notification message.'),
});
export type GeneratePersonalizedNotificationsOutput = z.infer<typeof GeneratePersonalizedNotificationsOutputSchema>;

export async function generatePersonalizedNotifications(input: GeneratePersonalizedNotificationsInput): Promise<GeneratePersonalizedNotificationsOutput> {
  return generatePersonalizedNotificationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedNotificationsPrompt',
  input: {schema: GeneratePersonalizedNotificationsInputSchema},
  output: {schema: GeneratePersonalizedNotificationsOutputSchema},
  prompt: `You are a personalized notification generator for students. Your job is to create friendly, helpful and personalized notification messages for students, reminding them of upcoming deadlines and events.

  Use the following information to generate the notification:

  Student Name: {{{userName}}}
  Course Name: {{{courseName}}}
  Deadline: {{{deadline}}}
  Task Description: {{{taskDescription}}}
  Notification Preferences: {{{notificationPreferences}}}

  Create a personalized and friendly notification message that reminds the student about the upcoming deadline/event. The message should be concise, clear, and encouraging.

  Example:
  "Hey {{{userName}}}, this is a reminder about the upcoming deadline for your {{{taskDescription}}} in {{{courseName}}} due on {{{deadline}}}. Make sure you complete the work."
  `,
});

const generatePersonalizedNotificationsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedNotificationsFlow',
    inputSchema: GeneratePersonalizedNotificationsInputSchema,
    outputSchema: GeneratePersonalizedNotificationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
