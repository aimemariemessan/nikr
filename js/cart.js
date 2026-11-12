/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * NIKE REDESIGN — STUDIO ÉDITORIAL
 * Gestion du panier (localStorage, calculs, devise)
 */

const CURRENCY = 'EUR';
const CART_STORAGE_KEY = 'nike_editorial_cart';

const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: CURRENCY,
  maximumFractionDigits: 0
});

window.formatPrice = function(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '0 €';
  return priceFormatter.format(amount);
};

window.getCart = function() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Erreur lecture panier:', e);
    return [];
  }
};

window.saveCart = function(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
  } catch (e) {
    console.error('Erreur sauvegarde panier:', e);
  }
};

window.addToCart = function(productId, size, quantity = 1) {
  if (!productId || size === undefined || size === null || size === '') {
    return { success: false, error: 'Choisis ta taille avant d’ajouter' };
  }

  const product = window.getProductById ? window.getProductById(productId) : null;
  if (!product) {
    return { success: false, error: 'Produit introuvable' };
  }

  const cart = window.getCart();
  const existingIndex = cart.findIndex(item => item.id === productId && String(item.size) === String(size));

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      size: String(size),
      quantity: quantity,
      addedAt: Date.now()
    });
  }

  window.saveCart(cart);
  return { success: true, cart };
};

window.updateQuantity = function(productId, size, delta) {
  const cart = window.getCart();
  const index = cart.findIndex(item => item.id === productId && String(item.size) === String(size));

  if (index > -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    window.saveCart(cart);
  }
};

window.removeFromCart = function(productId, size) {
  let cart = window.getCart();
  cart = cart.filter(item => !(item.id === productId && String(item.size) === String(size)));
  window.saveCart(cart);
};

window.clearCart = function() {
  window.saveCart([]);
};

window.getCartCount = function() {
  const cart = window.getCart();
  return cart.reduce((total, item) => total + (item.quantity || 0), 0);
};

window.getCartTotal = function() {
  const cart = window.getCart();
  return cart.reduce((total, item) => {
    const product = window.getProductById ? window.getProductById(item.id) : null;
    const price = product ? product.price : 0;
    return total + price * (item.quantity || 0);
  }, 0);
};
