import * as z from 'zod';

export type IntelligenceType = z.infer<typeof IntelligenceTypeSchema>;

export const IntelligenceTypeSchema = z.enum([
  'artificial-machine',
  'animal',
  'fungal',
  'plant',
  'human',
  'extraterrestrial',
]);

export type Exhibit = z.infer<typeof ExhibitSchema>;

export const ExhibitSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  year: z.int().positive(),
  cardImageUrl: z.string(),
  intelligenceTypes: IntelligenceTypeSchema.array(),
  videoId: z.string().optional(),
  visualizationUrl: z.string().optional(),
});
