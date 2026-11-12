import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products';
import {
  buildComparisonRows,
  extractProductTechnology,
  extractProductUsage,
  parseWeightGrams,
  toggleCompareSelection
} from './productCompare';

test('toggleCompareSelection adds, removes and enforces max 2 products via FIFO replacement', () => {
  let selection: string[] = [];
  selection = toggleCompareSelection(selection, 'a');
  assert.deepEqual(selection, ['a']);

  selection = toggleCompareSelection(selection, 'b');
  assert.deepEqual(selection, ['a', 'b']);

  // Selecting a 3rd replaces the oldest slot ('a') with ('b', 'c')
  selection = toggleCompareSelection(selection, 'c');
  assert.deepEqual(selection, ['b', 'c']);

  // Clicking an already selected product removes it
  selection = toggleCompareSelection(selection, 'b');
  assert.deepEqual(selection, ['c']);
});

test('parseWeightGrams extracts numeric grams cleanly', () => {
  assert.equal(parseWeightGrams('194 g (taille 42)'), 194);
  assert.equal(parseWeightGrams('98 g (taille M)'), 98);
  assert.equal(parseWeightGrams(undefined), null);
});

test('buildComparisonRows exposes poids, technologie and usage rows with weight delta', () => {
  const racer = PRODUCTS.find((p) => p.id === 'nike-kinetic-racer-01')!;
  const matrix = PRODUCTS.find((p) => p.id === 'nike-aero-stride-matrix')!;

  const rows = buildComparisonRows(racer, matrix);
  const poidsRow = rows.find((r) => r.key === 'poids');
  const techRow = rows.find((r) => r.key === 'technologie');
  const usageRow = rows.find((r) => r.key === 'usage');

  assert.ok(poidsRow);
  assert.equal(poidsRow.highlightSide, 'A');
  assert.equal(poidsRow.highlightNote, '-44 g');

  assert.ok(techRow);
  assert.match(techRow.valueA, /FlyPlate/);
  assert.match(techRow.valueB, /Nylon composite/);

  assert.ok(usageRow);
  assert.match(usageRow.valueA, /Asphalte & Marathon/);
  assert.match(usageRow.valueB, /Route & Piste/);
  assert.ok(extractProductTechnology(racer).length > 0);
  assert.ok(extractProductUsage(matrix).length > 0);
});
