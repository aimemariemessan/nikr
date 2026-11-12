import test from 'node:test';
import assert from 'node:assert/strict';
import { getRevealDelayIndex, getRevealDelayClass } from './scrollReveal';

test('getRevealDelayIndex cycles cleanly across grid columns', () => {
  assert.equal(getRevealDelayIndex(0, 3), 0);
  assert.equal(getRevealDelayIndex(1, 3), 1);
  assert.equal(getRevealDelayIndex(2, 3), 2);
  assert.equal(getRevealDelayIndex(3, 3), 0);
  assert.equal(getRevealDelayIndex(-2, 3), 0);
});

test('getRevealDelayClass maps product index to stagger delay class', () => {
  assert.equal(getRevealDelayClass(0), 'reveal-delay-0');
  assert.equal(getRevealDelayClass(1), 'reveal-delay-1');
  assert.equal(getRevealDelayClass(2), 'reveal-delay-2');
  assert.equal(getRevealDelayClass(5), 'reveal-delay-2');
});
