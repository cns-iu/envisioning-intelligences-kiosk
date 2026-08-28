/** Suffix identifying the 600px-wide thumbnail variant of an asset URL. */
const SMALL_SIZE_SUFFIX = '-600';

/** Suffix identifying the 1000px-wide thumbnail variant of an asset URL. */
const LARGE_SIZE_SUFFIX = '-1000';

/**
 * Upscales a thumbnail URL by replacing its `-600` size suffix with `-1000`.
 *
 * URLs that do not contain the `-600` suffix are returned unchanged.
 *
 * @param url - The thumbnail URL to upscale.
 * @returns The upscaled URL, or the original URL if no `-600` suffix is present.
 */
export function upscaleThumbnailUrl(url: string): string {
  return url.replaceAll(SMALL_SIZE_SUFFIX, LARGE_SIZE_SUFFIX);
}
