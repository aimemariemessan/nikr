import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { getProductById } from '../data/products';

export const CURRENCY = 'EUR';

export const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: CURRENCY,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

export interface CartItem {
  id: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, size: string | null, quantity?: number) => { success: boolean; error?: string };
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  totalCount: number;
  subtotal: number;
  cartProducts: { item: CartItem; product: Product }[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'nike_editorial_cart_v1';

// Initialisation sécurisée avec repli en mémoire si localStorage est indisponible
function getInitialCart(): CartItem[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch (err) {
    console.warn('[Cart] localStorage inaccessible, utilisation de la mémoire volatile :', err);
  }
  return [];
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(getInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sauvegarde persistance avec try/catch
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      }
    } catch (err) {
      console.warn('[Cart] Erreur écriture localStorage :', err);
    }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (productId: string, size: string | null, quantity = 1) => {
    if (!size || size.trim() === '') {
      return { success: false, error: "Choisis ta taille avant d'ajouter" };
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === productId && item.size === size);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [...prev, { id: productId, size, quantity }];
    });

    openCart();
    return { success: true };
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === productId && item.size === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calcul du nombre total d'articles
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Résolution des produits avec prix
  const cartProducts = cart
    .map(item => {
      const product = getProductById(item.id);
      return product ? { item, product } : null;
    })
    .filter((entry): entry is { item: CartItem; product: Product } => entry !== null);

  // Sous-total direct
  const subtotal = cartProducts.reduce((sum, { item, product }) => {
    return sum + product.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        totalCount,
        subtotal,
        cartProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé à l’intérieur d’un CartProvider');
  }
  return context;
}
