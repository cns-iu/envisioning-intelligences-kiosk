import { createThumbnailUrl } from './thumbnail-url';

describe('createThumbnailUrl', () => {
  it('adds the requested width before the image extension', () => {
    expect(createThumbnailUrl('assets/images/example.webp', 720)).toBe('assets/images/example-720.webp');
  });

  it('preserves query parameters and fragments', () => {
    expect(createThumbnailUrl('assets/images/example.png?version=2#preview', 320)).toBe(
      'assets/images/example-320.png?version=2#preview',
    );
  });

  it('returns the original URL when no width is provided', () => {
    expect(createThumbnailUrl('assets/images/example.webp')).toBe('assets/images/example.webp');
  });

  it('returns the original URL when it has no image extension', () => {
    expect(createThumbnailUrl('assets/images/example', 720)).toBe('assets/images/example');
  });
});
