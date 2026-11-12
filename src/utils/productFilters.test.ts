import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products';
import {
  filterAndSortProducts,
  getDisciplineCounts,
  parseFiltersFromSearchParams
} from './productFilters';

test('getDisciplineCounts accurately tallies Running, Training and Lifestyle products', () => {
  const counts = getDisciplineCounts(PRODUCTS);
  assert.equal(counts.all, 12);
  assert.equal(counts.running + counts.training + counts.lifestyle, 12);
  assert.ok(counts.running >= 4, 'Expected at least 4 Running products');
  assert.ok(counts.training >= 4, 'Expected at least 4 Training products');
  assert.ok(counts.lifestyle >= 2, 'Expected at least 2 Lifestyle products');
});

test('filterAndSortProducts filters dynamically by discipline and preserves other constraints', () => {
  const trainingProducts = filterAndSortProducts(PRODUCTS, {
    discipline: 'training',
    gender: 'all',
    maxPrice: 260,
    selectedSize: null,
    sort: 'newest'
  });

  assert.ok(trainingProducts.length > 0);
  assert.ok(trainingProducts.every((p) => p.discipline === 'training'));

  const runningShoesPriceAsc = filterAndSortProducts(PRODUCTS, {
    discipline: 'running',
    gender: 'all',
    maxPrice: 260,
    selectedSize: '42',
    sort: 'price-asc'
  });

  assert.ok(runningShoesPriceAsc.length > 0);
  assert.ok(runningShoesPriceAsc.every((p) => p.discipline === 'running' && p.sizes.includes('42')));
  for (let i = 1; i < runningShoesPriceAsc.length; i++) {
    assert.ok(runningShoesPriceAsc[i].price >= runningShoesPriceAsc[i - 1].price);
  }
});

test('parseFiltersFromSearchParams supports discipline and legacy header category URLs', () => {
  assert.deepEqual(
    parseFiltersFromSearchParams(new URLSearchParams('discipline=training')),
    { discipline: 'training', gender: 'all' }
  );
  assert.deepEqual(
    parseFiltersFromSearchParams(new URLSearchParams('category=running')),
    { discipline: 'running', gender: 'all' }
  );
  assert.deepEqual(
    parseFiltersFromSearchParams(new URLSearchParams('category=femme')),
    { discipline: 'all', gender: 'femme' }
  );
  assert.deepEqual(
    parseFiltersFromSearchParams(new URLSearchParams('category=homme&discipline=training')),
    { discipline: 'training', gender: 'homme' }
  );
});
