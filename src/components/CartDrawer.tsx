import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart, formatPrice } from '../context/CartContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    totalCount,
    subtotal,
    cartProducts,
    updateQuantity,
    removeFromCart
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Gestion de la touche Échap et du focus trap
  useEffect(() => {
    if (isCartOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.classList.add('overflow-hidden');

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeCart();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Mettre le focus sur le bouton de fermeture à l'ouverture
      const closeBtn = document.getElementById('close-cart-btn');
      if (closeBtn) {
        closeBtn.focus();
      }

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.classList.remove('overflow-hidden');
        if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isCartOpen, closeCart]);

  return (
    <div
      id="cart-overlay"
      className={`cart-overlay fixed inset-0 z-50 bg-ink/60 flex justify-end ${
        isCartOpen ? 'open' : ''
      }`}
      aria-hidden={!isCartOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeCart();
        }
      }}
    >
      <div
        id="cart-drawer-panel"
        ref={drawerRef}
        className="cart-drawer w-full max-w-md bg-bg text-ink h-full flex flex-col border-l border-surface shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* En-tête Panier */}
        <div className="px-6 py-5 border-b border-surface flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h2 id="cart-title" className="font-display font-black text-2xl tracking-tight uppercase">
              Ton Panier
            </h2>
            <span id="cart-drawer-count" className="font-mono text-xs text-muted font-bold">
              ({totalCount} {totalCount > 1 ? 'articles' : 'article'})
            </span>
          </div>
          <button
            id="close-cart-btn"
            type="button"
            onClick={closeCart}
            className="p-2 text-ink hover:text-alert focus:outline-none cursor-pointer"
            aria-label="Fermer le panier"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Liste des articles ou état vide */}
        <div id="cart-items-container" className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <ShoppingBag className="w-12 h-12 text-muted mb-4 opacity-50" />
              <p className="font-sans font-medium text-sm text-ink mb-2">Ton panier est vide.</p>
              <p className="font-sans text-xs text-muted mb-6">
                Explore notre sélection de performance pour débuter ta commande.
              </p>
              <Link
                to="/produits"
                onClick={closeCart}
                className="inline-block border border-ink text-ink hover:bg-ink hover:text-bg font-sans text-xs uppercase tracking-widest font-bold py-3 px-6 transition-colors"
              >
                Voir les nouveautés
              </Link>
            </div>
          ) : (
            cartProducts.map(({ item, product }) => {
              const itemImg = product.images && product.images[0] ? product.images[0] : '';
              const itemTotal = formatPrice(product.price * item.quantity);

              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 p-3 bg-surface/20 border border-surface relative group"
                >
                  {/* Miniature produit */}
                  <div className="w-20 h-24 bg-surface shrink-0 overflow-hidden relative">
                    {itemImg ? (
                      <img
                        src={itemImg}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-[9px] text-muted">
                        {product.ref}
                      </div>
                    )}
                    <span className="absolute top-1 left-1 font-mono text-[9px] font-bold px-1 bg-ink text-bg">
                      {product.ref}
                    </span>
                  </div>

                  {/* Détails & contrôles */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          to={`/produit/${product.id}`}
                          onClick={closeCart}
                          className="font-display font-extrabold text-lg leading-tight uppercase hover:text-alert"
                        >
                          {product.name}
                        </Link>
                        {/* Bouton supprimer */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id, item.size)}
                          className="text-muted hover:text-alert p-0.5 cursor-pointer"
                          aria-label={`Supprimer ${product.name} taille ${item.size} du panier`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-mono text-xs text-muted mt-1">
                        Taille : <span className="font-bold text-ink">{item.size}</span>
                      </p>
                    </div>

                    {/* Prix et Quantité modifiable */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-surface/50">
                      <div className="flex items-center border border-ink bg-bg">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, item.size, -1)}
                          className="px-2 py-0.5 text-xs font-mono font-bold hover:bg-surface focus:outline-none cursor-pointer"
                          aria-label="Diminuer la quantité"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, item.size, 1)}
                          className="px-2 py-0.5 text-xs font-mono font-bold hover:bg-surface focus:outline-none cursor-pointer"
                          aria-label="Augmenter la quantité"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-mono font-bold text-sm text-ink">{itemTotal}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pied du Panier (Total et Checkout) */}
        {cartProducts.length > 0 && (
          <div id="cart-footer" className="p-6 border-t border-surface bg-surface/30">
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-sans text-xs uppercase tracking-wider text-muted font-semibold">
                Sous-total
              </span>
              <span id="cart-total-amount" className="font-mono font-bold text-xl text-ink">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="font-sans text-xs text-muted mb-4">
              Expédition express offerte sur toutes les commandes étudiantes.
            </p>

            <button
              id="checkout-btn"
              type="button"
              onClick={() => {
                alert('Commande de démonstration : projet étudiant sans passerelle de paiement.');
              }}
              className="w-full bg-alert hover:opacity-95 text-ink font-sans font-bold text-sm tracking-wider uppercase py-3.5 px-4 transition-transform active:scale-[0.99] text-center block cursor-pointer"
            >
              Passer la commande
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
