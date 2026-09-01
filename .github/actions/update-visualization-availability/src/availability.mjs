import { DEFAULT_RETRIES, DEFAULT_TIMEOUT_MS } from './constants.mjs';
import { findEmbeddingBlockReason } from './embedding.mjs';

const TRANSIENT_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);
const INITIAL_RETRY_DELAY_MS = 1_000;

/**
 * Waits before retrying a transient visualization request failure.
 *
 * @param {number} delayMs Delay in milliseconds.
 * @returns {Promise<void>} Promise that resolves after the delay.
 */
function wait(delayMs) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

/**
 * Fetches a visualization and evaluates the response as an iframe navigation.
 *
 * @param {string} visualizationUrl URL to check.
 * @param {string} embedOrigin Origin of the deployed kiosk.
 * @param {{ fetchImplementation?: typeof fetch, retries?: number, timeoutMs?: number, waitImplementation?: typeof wait }} [options]
 *   Optional dependencies and retry configuration.
 * @returns {Promise<{ available: boolean | undefined, reason: string }>} Availability and diagnostic reason.
 */
export async function checkVisualizationAvailability(visualizationUrl, embedOrigin, options = {}) {
  const fetchImplementation = options.fetchImplementation ?? fetch;
  const retries = options.retries ?? DEFAULT_RETRIES;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const waitImplementation = options.waitImplementation ?? wait;
  let lastError;

  /** Waits with exponential backoff before the next request. */
  async function waitBeforeRetry(attempt) {
    await waitImplementation(INITIAL_RETRY_DELAY_MS * 2 ** attempt);
  }

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchImplementation(visualizationUrl, {
        headers: {
          accept: 'text/html,application/xhtml+xml',
          'user-agent': 'envisioning-intelligences-kiosk-availability-check/1.0',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(timeoutMs),
      });
      await response.body?.cancel();

      if (TRANSIENT_STATUS_CODES.has(response.status)) {
        if (attempt < retries) {
          await waitBeforeRetry(attempt);
          continue;
        }

        return {
          available: undefined,
          reason: `Indeterminate after ${retries + 1} attempts: HTTP ${response.status}`,
        };
      }

      if (!response.ok) {
        return { available: false, reason: `HTTP ${response.status}` };
      }

      const blockReason = findEmbeddingBlockReason(response.headers, response.url, embedOrigin);
      return blockReason
        ? { available: false, reason: blockReason }
        : { available: true, reason: `HTTP ${response.status}; iframe headers allow embedding` };
    } catch (error) {
      lastError = error;

      if (attempt < retries) {
        await waitBeforeRetry(attempt);
      }
    }
  }

  const message = lastError instanceof Error ? lastError.message : String(lastError);
  return { available: undefined, reason: `Indeterminate after ${retries + 1} attempts: ${message}` };
}
