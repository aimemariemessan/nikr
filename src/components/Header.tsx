import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  isSolid: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isSolid,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const { totalCount, openCart } = useCart();
  const location = useLocation();

  const navLinks = [
    { label: 'Homme', to: '/produits?category=homme' },
    { label: 'Femme', to: '/produits?category=femme' },
    { label: 'Running', to: '/produits?category=running' },
    { label: 'Lifestyle', to: '/produits?category=lifestyle' },
    { label: 'Toute la collection', to: '/produits' }
  ];

  return (
    <header
      id="site-header"
      className={`site-header fixed top-0 inset-x-0 z-40 px-4 md:px-8 py-3 md:py-4 border-b border-transparent ${
        isSolid ? 'is-solid' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Wordmark textuel éditorial (aucun logo officiel swoosh) */}
        <Link
          to="/"
          className="flex items-center gap-2 group focus:outline-none"
          aria-label="Accueil Nike Studio Éditorial"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase group-hover:text-alert transition-colors">
            NIKE{' '}
            <span className="font-sans font-light text-xs tracking-widest text-muted border-l border-current pl-2 ml-1">
              ÉDITORIAL
            </span>
          </span>
        </Link>

        {/* Navigation principale (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Navigation principale">
          {navLinks.map((item) => {
            const isActive = location.pathname + location.search === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`font-sans text-xs tracking-widest uppercase font-semibold transition-colors hover:text-alert ${
                  isActive ? 'text-signal underline underline-offset-4' : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions Header (Panier + Burger Mobile) */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Bouton Panier */}
          <button
            id="open-cart-btn"
            type="button"
            onClick={openCart}
            className="flex items-center gap-2 p-1.5 focus:outline-none relative group cursor-pointer"
            aria-label={`Ouvrir le panier (${totalCount} article${totalCount > 1 ? 's' : ''})`}
          >
            <ShoppingBag className="w-5 h-5 text-current group-hover:text-alert transition-colors" />
            <span
              id="cart-badge-count"
              className="font-mono text-xs font-bold tracking-tight bg-alert text-ink px-1.5 py-0.5 leading-none"
            >
              {totalCount}
            </span>
          </button>

          {/* Menu Burger Mobile */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 focus:outline-none text-current cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-current" />
            ) : (
              <Menu className="w-6 h-6 text-current" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile Drawer / Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-t border-surface mt-3 pt-4 pb-2 bg-bg text-ink"
          aria-hidden={!isMobileMenuOpen}
        >
          <nav className="flex flex-col space-y-3 px-2">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display font-extrabold text-2xl uppercase tracking-wider hover:text-alert"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
