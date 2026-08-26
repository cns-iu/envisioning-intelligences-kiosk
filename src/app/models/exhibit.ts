import * as z from 'zod';

/** Intelligence category associated with an exhibit. */
export type IntelligenceType = z.infer<typeof IntelligenceTypeSchema>;

/** Runtime schema for the supported intelligence categories. */
export const IntelligenceTypeSchema = z.enum([
  'artificial-machine',
  'animal',
  'fungal',
  'plant',
  'human',
  'extraterrestrial',
]);

/** Validated content and media metadata for one exhibit. */
export type Exhibit = z.infer<typeof ExhibitSchema>;

/** Runtime schema for exhibit records loaded from the content data source. */
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
