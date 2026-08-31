/** Regular expression to match the file extension of an image. */
const IMAGE_SUFFIX_REGEX = /(\.[^/.]+)$/;

/**
 * Append a width suffix to an image URL to request a thumbnail of that width.
 * If no width is provided, the original URL is returned.
 *
 * @param url The URL of the image for which to create a thumbnail.
 * @param width The width of the thumbnail to create.
 * @returns The URL of the thumbnail.
 */
export function createThumbnailUrl(url: string, width?: number): string {
  return width ? url.replace(IMAGE_SUFFIX_REGEX, `-${width}$1`) : url;
}
