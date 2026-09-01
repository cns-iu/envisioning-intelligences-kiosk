import { DEFAULT_RETRIES, DEFAULT_TIMEOUT_MS } from './constants.mjs';
import { findEmbeddingBlockReason } from './embedding.mjs';

const TRANSIENT_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);

/**
 * Fetches a visualization and evaluates the response as an iframe navigation.
 *
 * @param {string} visualizationUrl URL to check.
 * @param {string} embedOrigin Origin of the deployed kiosk.
 * @param {{ fetchImplementation?: typeof fetch, retries?: number, timeoutMs?: number }} [options]
 *   Optional dependencies and retry configuration.
 * @returns {Promise<{ available: boolean, reason: string }>} Availability and diagnostic reason.
 */
export async function checkVisualizationAvailability(visualizationUrl, embedOrigin, options = {}) {
  const fetchImplementation = options.fetchImplementation ?? fetch;
  const retries = options.retries ?? DEFAULT_RETRIES;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  let lastError;

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

      if (TRANSIENT_STATUS_CODES.has(response.status) && attempt < retries) {
        continue;
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
    }
  }

  const message = lastError instanceof Error ? lastError.message : String(lastError);
  return { available: false, reason: `Request failed after ${retries + 1} attempts: ${message}` };
}
