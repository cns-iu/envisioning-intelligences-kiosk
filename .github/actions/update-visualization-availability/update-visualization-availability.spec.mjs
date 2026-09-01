import assert from 'node:assert/strict';
import { test } from 'node:test';
import { load } from 'js-yaml';
import { parseArguments } from './src/arguments.mjs';
import { checkVisualizationAvailability } from './src/availability.mjs';
import { findEmbeddingBlockReason } from './src/embedding.mjs';
import { updateAvailabilityInYaml } from './src/exhibits.mjs';

test('parses command-line options with Commander', () => {
  assert.deepEqual(
    parseArguments([
      '--data-file',
      'fixtures/exhibits.yaml',
      '--embed-origin=https://example.com/kiosk/path',
      '--retries=4',
      '--timeout-ms',
      '2500',
    ]),
    {
      dataFile: 'fixtures/exhibits.yaml',
      embedOrigin: 'https://example.com',
      retries: 4,
      timeoutMs: 2500,
    },
  );
});

test('uses the default retry and timeout configuration', () => {
  assert.deepEqual(parseArguments([]), {
    dataFile: 'public/data/exhibits.yaml',
    embedOrigin: 'https://cns-iu.github.io',
    retries: 2,
    timeoutMs: 10_000,
  });
});

test('allows a response that has no restrictive iframe headers', () => {
  const reason = findEmbeddingBlockReason(
    new Headers(),
    'https://visualization.example/work',
    'https://cns-iu.github.io',
  );

  assert.equal(reason, undefined);
});

test('honors frame-ancestors source lists and all supplied CSP policies', () => {
  const allowedHeaders = new Headers({
    'content-security-policy': "default-src 'self'; frame-ancestors 'self' https://*.github.io",
  });
  const blockedHeaders = new Headers({
    'content-security-policy': "frame-ancestors https://cns-iu.github.io, frame-ancestors 'none'",
  });

  assert.equal(
    findEmbeddingBlockReason(allowedHeaders, 'https://visualization.example/work', 'https://cns-iu.github.io'),
    undefined,
  );
  assert.match(
    findEmbeddingBlockReason(blockedHeaders, 'https://visualization.example/work', 'https://cns-iu.github.io'),
    /frame-ancestors/,
  );
});

test('blocks cross-origin SAMEORIGIN and DENY X-Frame-Options responses', () => {
  assert.match(
    findEmbeddingBlockReason(
      new Headers({ 'x-frame-options': 'SAMEORIGIN' }),
      'https://visualization.example/work',
      'https://cns-iu.github.io',
    ),
    /SAMEORIGIN/,
  );
  assert.match(
    findEmbeddingBlockReason(
      new Headers({ 'x-frame-options': 'DENY' }),
      'https://visualization.example/work',
      'https://visualization.example',
    ),
    /DENY/,
  );
});

test('gives an enforced frame-ancestors directive precedence over X-Frame-Options', () => {
  const headers = new Headers({
    'content-security-policy': 'frame-ancestors https://cns-iu.github.io',
    'x-frame-options': 'DENY',
  });

  assert.equal(
    findEmbeddingBlockReason(headers, 'https://visualization.example/work', 'https://cns-iu.github.io'),
    undefined,
  );
});

test('reports HTTP failures and retries transient responses', async () => {
  let requests = 0;
  const fetchImplementation = async () => {
    requests += 1;
    return new Response(null, {
      status: requests === 1 ? 503 : 404,
    });
  };

  const result = await checkVisualizationAvailability(
    'https://visualization.example/work',
    'https://cns-iu.github.io',
    { fetchImplementation, retries: 1 },
  );

  assert.deepEqual(result, { available: false, reason: 'HTTP 404' });
  assert.equal(requests, 2);
});

test('updates parsed exhibits and serializes the result as YAML', () => {
  const exhibits = [
    {
      id: 'first',
      title: 'First',
      visualizationUrl: 'https://first.example/',
    },
    {
      id: 'second',
      title: 'Second',
      visualizationUrl: 'https://second.example/',
      visualizationAvailable: true,
    },
  ];

  const updatedDocument = updateAvailabilityInYaml(
    exhibits,
    new Map([
      ['first', true],
      ['second', false],
    ]),
  );

  assert.deepEqual(
    exhibits.map(({ visualizationAvailable }) => visualizationAvailable),
    [true, false],
  );
  assert.deepEqual(load(updatedDocument), exhibits);
});

test('fails when an exhibit cannot be updated safely', () => {
  assert.throws(
    () => updateAvailabilityInYaml([{ id: 'first', title: 'First' }], new Map([['missing', true]])),
    /Could not update/,
  );
});
