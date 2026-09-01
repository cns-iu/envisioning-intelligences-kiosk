/**
 * Determines whether a CSP source expression permits the kiosk origin.
 *
 * @param {string} source A source expression from a frame-ancestors directive.
 * @param {URL} embedUrl The origin that will contain the iframe.
 * @param {URL} resourceUrl The final URL returned by the visualization server.
 * @returns {boolean} Whether the source expression matches the kiosk origin.
 */
function matchesFrameAncestor(source, embedUrl, resourceUrl) {
  const normalizedSource = source.toLowerCase();

  if (normalizedSource === "'none'") {
    return false;
  }

  if (normalizedSource === "'self'") {
    return embedUrl.origin === resourceUrl.origin;
  }

  if (normalizedSource === '*') {
    return true;
  }

  if (/^[a-z][a-z\d+.-]*:$/.test(normalizedSource)) {
    return embedUrl.protocol === normalizedSource;
  }

  const hostSource = normalizedSource.match(/^(?:(https?):\/\/)?(\*\.)?(\[[^\]]+\]|[^/:]+)(?::(\*|\d+))?(?:\/.*)?$/);

  if (!hostSource) {
    return false;
  }

  const [, scheme, wildcard, hostname, port] = hostSource;
  if (scheme && embedUrl.protocol !== `${scheme}:`) {
    return false;
  }

  const normalizedHostname = hostname.replace(/^\[|\]$/g, '');
  const hostnameMatches = wildcard
    ? embedUrl.hostname.endsWith(`.${normalizedHostname}`)
    : embedUrl.hostname === normalizedHostname;

  if (!hostnameMatches) {
    return false;
  }

  return !port || port === '*' || embedUrl.port === port;
}

/**
 * Finds an iframe-related response header that prevents the kiosk from embedding a URL.
 *
 * @param {Headers} headers Response headers returned for the visualization.
 * @param {string} finalUrl Final URL after redirects.
 * @param {string} embedOrigin Origin of the deployed kiosk.
 * @returns {string | undefined} A reason when embedding is blocked, otherwise undefined.
 */
export function findEmbeddingBlockReason(headers, finalUrl, embedOrigin) {
  const embedUrl = new URL(embedOrigin);
  const resourceUrl = new URL(finalUrl);
  const contentSecurityPolicy = headers.get('content-security-policy');
  let hasFrameAncestors = false;

  if (contentSecurityPolicy) {
    for (const policy of contentSecurityPolicy.split(',')) {
      const frameAncestors = policy
        .split(';')
        .map((directive) => directive.trim().split(/\s+/))
        .find(([name]) => name.toLowerCase() === 'frame-ancestors');

      if (!frameAncestors) {
        continue;
      }

      hasFrameAncestors = true;
      if (!frameAncestors.slice(1).some((source) => matchesFrameAncestor(source, embedUrl, resourceUrl))) {
        return `Content-Security-Policy frame-ancestors does not allow ${embedUrl.origin}`;
      }
    }
  }

  // Enforced frame-ancestors takes precedence over X-Frame-Options in modern browsers.
  if (hasFrameAncestors) {
    return undefined;
  }

  const frameOptions = headers.get('x-frame-options')?.toLowerCase();
  if (frameOptions?.split(',').some((value) => value.trim() === 'deny')) {
    return 'X-Frame-Options is DENY';
  }

  if (
    frameOptions?.split(',').some((value) => value.trim() === 'sameorigin') &&
    embedUrl.origin !== resourceUrl.origin
  ) {
    return 'X-Frame-Options is SAMEORIGIN';
  }

  return undefined;
}
