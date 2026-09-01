import { load } from 'js-yaml';
import { readFile, writeFile } from 'node:fs/promises';
import { parseArguments } from './src/arguments.mjs';
import { checkVisualizationAvailability } from './src/availability.mjs';
import { updateAvailabilityInYaml } from './src/exhibits.mjs';

/** Runs the action's availability checks and updates the exhibit data file. */
async function main() {
  const { dataFile, embedOrigin, retries, timeoutMs } = parseArguments(process.argv.slice(2));
  const document = await readFile(dataFile, 'utf8');
  const exhibits = load(document);

  if (!Array.isArray(exhibits)) {
    throw new TypeError(`${dataFile} must contain a top-level exhibit array`);
  }

  const visualizations = exhibits.filter(
    (exhibit) => typeof exhibit?.id === 'string' && typeof exhibit.visualizationUrl === 'string',
  );
  const duplicateIds = visualizations.filter(
    (exhibit, index) => visualizations.findIndex(({ id }) => id === exhibit.id) !== index,
  );

  if (duplicateIds.length > 0) {
    throw new Error(`Duplicate visualization exhibit IDs: ${duplicateIds.map(({ id }) => id).join(', ')}`);
  }

  const checks = await Promise.all(
    visualizations.map(async (exhibit) => ({
      exhibit,
      result: await checkVisualizationAvailability(exhibit.visualizationUrl, embedOrigin, { retries, timeoutMs }),
    })),
  );
  const availabilityById = new Map(
    checks
      .filter(({ result }) => typeof result.available === 'boolean')
      .map(({ exhibit, result }) => [exhibit.id, result.available]),
  );
  const updatedDocument = updateAvailabilityInYaml(exhibits, availabilityById);

  await writeFile(dataFile, updatedDocument);

  for (const { exhibit, result } of checks) {
    const status =
      result.available === undefined
        ? 'indeterminate; preserving existing availability'
        : result.available
          ? 'available'
          : 'unavailable';
    // eslint-disable-next-line no-console
    console.log(`${exhibit.id}: ${status} (${result.reason})`);
  }
}

await main();
