import { Command, InvalidArgumentError } from 'commander';
import { DEFAULT_DATA_FILE, DEFAULT_EMBED_ORIGIN, DEFAULT_RETRIES, DEFAULT_TIMEOUT_MS } from './constants.mjs';

/**
 * Parses a non-negative integer command-line option.
 *
 * @param {string} value Raw option value.
 * @returns {number} Parsed integer.
 * @throws {InvalidArgumentError} When the value is not a non-negative integer.
 */
function parseNonNegativeInteger(value) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new InvalidArgumentError('must be a non-negative integer');
  }

  return parsed;
}

/**
 * Parses a positive integer command-line option.
 *
 * @param {string} value Raw option value.
 * @returns {number} Parsed integer.
 * @throws {InvalidArgumentError} When the value is not a positive integer.
 */
function parsePositiveInteger(value) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new InvalidArgumentError('must be a positive integer');
  }

  return parsed;
}

/**
 * Parses the supported command-line options.
 *
 * @param {string[]} args Command-line arguments without the Node executable and script path.
 * @returns {{ dataFile: string, embedOrigin: string, retries: number, timeoutMs: number }} Resolved checker configuration.
 */
export function parseArguments(args) {
  const program = new Command()
    .name('update-visualization-availability')
    .description('Check visualization embedding availability and update the exhibit data')
    .option('--data-file <path>', 'path to the exhibits YAML file', DEFAULT_DATA_FILE)
    .option('--embed-origin <origin>', 'origin that will embed the visualizations', DEFAULT_EMBED_ORIGIN)
    .option('--retries <count>', 'number of retries after a failed request', parseNonNegativeInteger, DEFAULT_RETRIES)
    .option('--timeout-ms <milliseconds>', 'request timeout in milliseconds', parsePositiveInteger, DEFAULT_TIMEOUT_MS);

  program.parse(args, { from: 'user' });
  const options = program.opts();

  options.embedOrigin = new URL(options.embedOrigin).origin;
  return options;
}
