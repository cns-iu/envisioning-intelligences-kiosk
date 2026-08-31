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

/** Human-readable labels for every supported intelligence category. */
export const IntelligenceTypeLabels: Readonly<Record<IntelligenceType, string>> = {
  'artificial-machine': 'Artificial/Machine',
  animal: 'Animal',
  fungal: 'Fungal',
  plant: 'Plant',
  human: 'Human',
  extraterrestrial: 'Extraterrestrial',
};

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
  loopVideo: z.boolean().optional(),
  visualizationUrl: z.string().optional(),
  hidden: z.boolean().optional(),
});

/** Runtime schema for the collection of exhibit records. */
export const ExhibitsSchema = ExhibitSchema.array();
