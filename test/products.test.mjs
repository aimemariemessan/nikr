import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('dataset contains 12 products with valid required fields', () => {
  const content = readFileSync('./src/data/products.ts', 'utf-8');
  // Check that all 12 items are defined
  const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
  assert.equal(idMatches.length, 12, 'Must have exactly 12 products');

  // Check unique IDs
  const ids = idMatches.map(m => m[1]);
  const uniqueIds = new Set(ids);
  assert.equal(uniqueIds.size, 12, 'All 12 product IDs must be unique');

  // Check dossier/dossard numbers
  const refMatches = [...content.matchAll(/ref:\s*['"](#[^'"]+)['"]/g)];
  assert.equal(refMatches.length, 12, 'All products must have a dossard reference');
  const refs = refMatches.map(m => m[1]);
  const uniqueRefs = new Set(refs);
  assert.equal(uniqueRefs.size, 12, 'All dossard references must be unique');
});
