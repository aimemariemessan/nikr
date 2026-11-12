import test from 'node:test';
import assert from 'node:assert/strict';
import { buildShareLinks, resolveAbsoluteUrl } from './share';

test('resolveAbsoluteUrl resolves relative paths against origin', () => {
  assert.equal(
    resolveAbsoluteUrl('/img/products/racer.webp', 'https://example.com/'),
    'https://example.com/img/products/racer.webp'
  );
  assert.equal(
    resolveAbsoluteUrl('https://cdn.example.com/shoe.webp', 'https://example.com'),
    'https://cdn.example.com/shoe.webp'
  );
});

test('buildShareLinks generates properly encoded URLs for X/Twitter, LinkedIn and Pinterest', () => {
  const links = buildShareLinks({
    url: 'https://studio.example.com/#/produit/nike-kinetic-racer-01',
    title: 'KINETIC RACER 01',
    description: 'Chaussure de compétition sur route & marathon',
    imageUrl: '/img/products/kinetic.webp',
    origin: 'https://studio.example.com'
  });

  const tw = new URL(links.twitter);
  assert.equal(tw.origin + tw.pathname, 'https://twitter.com/intent/tweet');
  assert.equal(tw.searchParams.get('url'), 'https://studio.example.com/#/produit/nike-kinetic-racer-01');
  assert.match(tw.searchParams.get('text') || '', /KINETIC RACER 01/);

  const li = new URL(links.linkedin);
  assert.equal(li.origin + li.pathname, 'https://www.linkedin.com/sharing/share-offsite/');
  assert.equal(li.searchParams.get('url'), 'https://studio.example.com/#/produit/nike-kinetic-racer-01');

  const pin = new URL(links.pinterest);
  assert.equal(pin.origin + pin.pathname, 'https://pinterest.com/pin/create/button/');
  assert.equal(pin.searchParams.get('url'), 'https://studio.example.com/#/produit/nike-kinetic-racer-01');
  assert.equal(pin.searchParams.get('media'), 'https://studio.example.com/img/products/kinetic.webp');
  assert.match(pin.searchParams.get('description') || '', /KINETIC RACER 01/);
});
