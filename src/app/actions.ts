'use server';

import { analyzeHighDemandStations, AnalyzeHighDemandStationsOutput } from '@/ai/flows/analyze-high-demand-stations';

// Sample rental data. In a real application, this would be fetched from Firestore.
const sampleRentalData = [
  { stationId: 'SM_Lanang_01', date: '2024-07-15', dayOfWeek: 'Monday', timeOfDay: '18:30', rentals: 25 },
  { stationId: 'Gaisano_Mall_01', date: '2024-07-15', dayOfWeek: 'Monday', timeOfDay: '19:00', rentals: 15 },
  { stationId: 'Ateneo_de_Davao_01', date: '2024-07-16', dayOfWeek: 'Tuesday', timeOfDay: '08:00', rentals: 30 },
  { stationId: 'SM_Ecoland_01', date: '2024-07-17', dayOfWeek: 'Wednesday', timeOfDay: '12:00', rentals: 20 },
  { stationId: 'SM_Lanang_01', date: '2024-07-19', dayOfWeek: 'Friday', timeOfDay: '17:00', rentals: 40 },
  { stationId: 'Gaisano_Mall_01', date: '2024-07-20', dayOfWeek: 'Saturday', timeOfDay: '14:00', rentals: 35 },
  { stationId: 'SM_Ecoland_01', date: '2024-07-20', dayOfWeek: 'Saturday', timeOfDay: '15:00', rentals: 38 },
];

export async function getDemandAnalysis(): Promise<{ output: AnalyzeHighDemandStationsOutput | null; error?: string }> {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency
  try {
    const output = await analyzeHighDemandStations({ rentalData: JSON.stringify(sampleRentalData, null, 2) });
    return { output };
  } catch (e: any) {
    console.error(e);
    return { output: null, error: e.message || 'An unknown error occurred during analysis.' };
  }
}
