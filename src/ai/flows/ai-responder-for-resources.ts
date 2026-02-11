'use server';

/**
 * @fileOverview An AI agent that provides empathetic, personalized responses to user inquiries about suicide prevention,
 * directing them towards helpful resources and coping strategies.
 *
 * - aiResponderForResources - A function that handles user inquiries and provides appropriate responses.
 * - AIResponderForResourcesInput - The input type for the aiResponderForResources function.
 * - AIResponderForResourcesOutput - The return type for the aiResponderForResources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIResponderForResourcesInputSchema = z.object({
  query: z.string().describe('The user inquiry related to suicide prevention.'),
});
export type AIResponderForResourcesInput = z.infer<typeof AIResponderForResourcesInputSchema>;

const AIResponderForResourcesOutputSchema = z.object({
  response: z.string().describe('The empathetic, personalized response from the AI.'),
  resourceSuggestion: z
    .string()
    .describe('A suggested resource or coping strategy based on the query.'),
  isContentHelpful: z
    .boolean()
    .optional()
    .describe('Whether or not the response content is helpful for the user.'),
});
export type AIResponderForResourcesOutput = z.infer<typeof AIResponderForResourcesOutputSchema>;

export async function aiResponderForResources(input: AIResponderForResourcesInput): Promise<AIResponderForResourcesOutput> {
  return aiResponderForResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiResponderForResourcesPrompt',
  input: {schema: AIResponderForResourcesInputSchema},
  output: {schema: AIResponderForResourcesOutputSchema},
  prompt: `You are an AI assistant designed to provide empathetic and personalized responses to user inquiries related to suicide prevention.

  Your goal is to offer support, guidance, and direct users towards helpful resources and coping strategies.
  Consider the user's query and provide a thoughtful response, suggesting a relevant resource or coping strategy.

  Respond in a modern, professional, and elegant tone, using colors Lila and whites.

  User Query: {{{query}}}
  `,
  tools: [],
});

const aiResponderForResourcesFlow = ai.defineFlow(
  {
    name: 'aiResponderForResourcesFlow',
    inputSchema: AIResponderForResourcesInputSchema,
    outputSchema: AIResponderForResourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
