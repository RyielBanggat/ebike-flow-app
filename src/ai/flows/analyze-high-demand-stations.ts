'use server';

/**
 * @fileOverview Analyzes rental data to identify high-demand e-bike stations.
 *
 * - analyzeHighDemandStations - A function that analyzes rental data and identifies high-demand e-bike stations.
 * - AnalyzeHighDemandStationsInput - The input type for the analyzeHighDemandStations function.
 * - AnalyzeHighDemandStationsOutput - The return type for the analyzeHighDemandStations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeHighDemandStationsInputSchema = z.object({
  rentalData: z.string().describe('A JSON string containing rental data.  The rental data should contain station ID, date, day of the week, and time of day.'),
});
export type AnalyzeHighDemandStationsInput = z.infer<typeof AnalyzeHighDemandStationsInputSchema>;

const AnalyzeHighDemandStationsOutputSchema = z.object({
  recommendations: z.string().describe('A string containing recommendations for optimizing bike deployment based on rental data.'),
});
export type AnalyzeHighDemandStationsOutput = z.infer<typeof AnalyzeHighDemandStationsOutputSchema>;

export async function analyzeHighDemandStations(input: AnalyzeHighDemandStationsInput): Promise<AnalyzeHighDemandStationsOutput> {
  return analyzeHighDemandStationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeHighDemandStationsPrompt',
  input: {schema: AnalyzeHighDemandStationsInputSchema},
  output: {schema: AnalyzeHighDemandStationsOutputSchema},
  prompt: `You are an expert in urban e-bike rental optimization. Analyze the following rental data to identify high-demand e-bike stations and provide recommendations for optimizing bike deployment to increase rental revenue.\n\nRental Data: {{{rentalData}}}\n\nConsider factors such as station ID, date, day of the week, and time of day in your analysis. Your recommendations should be clear, concise, and actionable.\n`,
});

const analyzeHighDemandStationsFlow = ai.defineFlow(
  {
    name: 'analyzeHighDemandStationsFlow',
    inputSchema: AnalyzeHighDemandStationsInputSchema,
    outputSchema: AnalyzeHighDemandStationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
