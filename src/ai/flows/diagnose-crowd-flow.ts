'use server';
/**
 * @fileOverview A crowd diagnosis AI agent.
 *
 * - diagnoseCrowd - A function that handles the crowd diagnosis process.
 * - DiagnoseCrowdInput - The input type for the diagnoseCrowd function.
 * - DiagnoseCrowdOutput - The return type for the diagnoseCrowd function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnoseCrowdInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crowd, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DiagnoseCrowdInput = z.infer<typeof DiagnoseCrowdInputSchema>;

const DiagnoseCrowdOutputSchema = z.object({
  peopleCount: z.number().describe('The estimated number of people in the photo.'),
  crowdLevel: z.enum(['Low', 'Moderate', 'High', 'Critical']).describe('The estimated crowd level.'),
  estimatedWaitTime: z.number().describe('The estimated wait time in minutes based on the crowd level.'),
});
export type DiagnoseCrowdOutput = z.infer<typeof DiagnoseCrowdOutputSchema>;

export async function diagnoseCrowd(input: DiagnoseCrowdInput): Promise<DiagnoseCrowdOutput> {
  return diagnoseCrowdFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnoseCrowdPrompt',
  input: {schema: DiagnoseCrowdInputSchema},
  output: {schema: DiagnoseCrowdOutputSchema},
  prompt: `You are an expert at analyzing images to determine crowd density and estimate wait times.
  
  Analyze the provided image and perform the following tasks:
  1.  Estimate the number of people visible in the image.
  2.  Categorize the crowd level based on the number of people. Use the following criteria:
      - 0-10 people: Low
      - 11-30 people: Moderate
      - 31-50 people: High
      - 51+ people: Critical
  3.  Estimate the wait time in minutes based on the crowd level:
      - Low: 15 minutes
      - Moderate: 45 minutes
      - High: 75 minutes
      - Critical: 120 minutes

  Return the results in the specified JSON format.

  Image to analyze: {{media url=photoDataUri}}`,
});

const diagnoseCrowdFlow = ai.defineFlow(
  {
    name: 'diagnoseCrowdFlow',
    inputSchema: DiagnoseCrowdInputSchema,
    outputSchema: DiagnoseCrowdOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
