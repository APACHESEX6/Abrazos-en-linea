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
  isCrisis: z.boolean().describe('Whether the user input indicates an immediate risk or crisis.'),
});
export type AIResponderForResourcesOutput = z.infer<typeof AIResponderForResourcesOutputSchema>;

export async function aiResponderForResources(input: AIResponderForResourcesInput): Promise<AIResponderForResourcesOutput> {
  return aiResponderForResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiResponderForResourcesPrompt',
  input: {schema: AIResponderForResourcesInputSchema},
  output: {schema: AIResponderForResourcesOutputSchema},
  prompt: `Eres un asistente de IA especializado en apoyo emocional y prevención del suicidio para adolescentes. Tu tono debe ser extremadamente empático, cálido y no juicioso.

  NORMAS DE SEGURIDAD CRÍTICAS:
  1. Si detectas palabras como "suicidio", "matarme", "hacerme daño", "plan", "adiós" o desesperanza extrema, activa el campo isCrisis como true.
  2. En caso de crisis, tu respuesta DEBE comenzar priorizando que el usuario busque ayuda humana inmediata y proporcionar el número 717 003 717 (España) o el 911.
  3. NUNCA intentes dar un diagnóstico médico o psicológico.
  4. Valida siempre los sentimientos del usuario ("Siento que estés pasando por esto", "Es válido sentirse así").

  Responde de forma concisa pero profunda.

  Consulta del Usuario: {{{query}}}
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
