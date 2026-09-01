import { dump } from 'js-yaml';

/**
 * Updates visualization availability on parsed exhibits and serializes them as YAML.
 *
 * @param {unknown[]} exhibits Parsed exhibits from the YAML data file.
 * @param {ReadonlyMap<string, boolean>} availabilityById Availability keyed by exhibit ID.
 * @returns {string} Serialized YAML document containing the updated exhibits.
 */
export function updateAvailabilityInYaml(exhibits, availabilityById) {
  const updatedIds = new Set();

  for (const exhibit of exhibits) {
    if (!exhibit || typeof exhibit !== 'object' || !('id' in exhibit) || !availabilityById.has(exhibit.id)) {
      continue;
    }

    exhibit.visualizationAvailable = availabilityById.get(exhibit.id);
    updatedIds.add(exhibit.id);
  }

  const missingIds = [...availabilityById.keys()].filter((id) => !updatedIds.has(id));
  if (missingIds.length > 0) {
    throw new Error(`Could not update visualization availability for: ${missingIds.join(', ')}`);
  }

  return dump(exhibits, { lineWidth: -1, noRefs: true });
}
