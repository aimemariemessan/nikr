import test from 'node:test';
import assert from 'node:assert/strict';

// Mock minimal DOM et localStorage pour node:test
const store = new Map();
global.localStorage = {
  getItem: (key) => store.get(key) || null,
  setItem: (key, val) => store.set(key, String(val)),
  removeItem: (key) => store.delete(key),
  clear: () => store.clear()
};
global.window = {
  dispatchEvent: () => {}
};
global.CustomEvent = class {
  constructor(name, detail) {
    this.name = name;
    this.detail = detail;
  }
};

// Mock getProductById
global.window.getProductById = (id) => {
  if (id === 'nike-kinetic-racer-01') {
    return { id, name: 'KINETIC RACER 01', price: 210 };
  }
  return null;
};

// Import code cart
await import('../js/cart.js');

test('formatPrice formate en EUR avec le symbole euro', () => {
  const formatted = global.window.formatPrice(210);
  assert.match(formatted, /210.*€/);
});

test('addToCart échoue sans taille avec le message exact', () => {
  const result = global.window.addToCart('nike-kinetic-racer-01', null);
  assert.equal(result.success, false);
  assert.equal(result.error, 'Choisis ta taille avant d’ajouter');
});

test('addToCart ajoute un article avec succès quand la taille est fournie', () => {
  global.localStorage.clear();
  const result = global.window.addToCart('nike-kinetic-racer-01', '42', 1);
  assert.equal(result.success, true);
  assert.equal(global.window.getCartCount(), 1);
  assert.equal(global.window.getCartTotal(), 210);
});

test('updateQuantity met à jour la quantité et supprime quand quantité <= 0', () => {
  global.window.updateQuantity('nike-kinetic-racer-01', '42', 1);
  assert.equal(global.window.getCartCount(), 2);
  assert.equal(global.window.getCartTotal(), 420);

  global.window.updateQuantity('nike-kinetic-racer-01', '42', -2);
  assert.equal(global.window.getCartCount(), 0);
  assert.equal(global.window.getCartTotal(), 0);
});
