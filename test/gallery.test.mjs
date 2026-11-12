import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('all 12 products have multiple gallery images for detail magnification', () => {
  const content = readFileSync('./src/data/products.ts', 'utf-8');
  // Check image arrays exist
  const galleryMatches = [...content.matchAll(/images:\s*\[([^\]]+)\]/g)];
  assert.equal(galleryMatches.length, 12, 'All 12 products must define an images array');

  for (const match of galleryMatches) {
    const rawItems = match[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
    assert.ok(rawItems.length >= 1, 'Each product must have at least 1 image in the gallery');
    for (const imgPath of rawItems) {
      assert.ok(imgPath.startsWith('/img/products/') || imgPath.startsWith('/img/hero-'), `Image path must be valid: ${imgPath}`);
    }
  }
});
