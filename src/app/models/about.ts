import * as z from 'zod';
import { IntelligenceTypeSchema } from './exhibit';

/** Intelligence types enum */
export enum Intelligence {
  'artificial-machine' = 'Artificial/Machine',
  animal = 'Animal',
  fungal = 'Fungal',
  plant = 'Plant',
  human = 'Human',
  extraterrestrial = 'Extraterrestrial',
}

export type About = z.infer<typeof AboutSchema>;

export const AboutSchema = z.object({
  id: z.string(),
  intelligenceTypes: IntelligenceTypeSchema.array(),
  title: z.string().optional(),
  year: z.int().positive().optional(),
  description: z.string(),
});
