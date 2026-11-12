import React, { useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { CompareBar } from './CompareBar';
import { CompareModal } from './CompareModal';
import { useHeaderSolid } from '../hooks/useHeaderSolid';

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroSentryRef = useRef<HTMLDivElement | null>(null);
  const isSolid = useHeaderSolid(heroSentryRef, isMobileMenuOpen);
  const location = useLocation();

  // Scroll en haut lors des changements de page
  React.useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink relative antialiased selection:bg-alert selection:text-ink">
      {/* Lien d'évitement accessible pour la navigation au clavier */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-ink text-bg font-mono text-xs px-4 py-2 border-2 border-signal outline-none"
      >
        Aller au contenu principal
      </a>

      {/* Header global */}
      <Header
        isSolid={isSolid}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Tiroir Panier accessible sur toutes les routes */}
      <CartDrawer />

      {/* Barre flottante & Modale de comparaison technique */}
      <CompareBar />
      <CompareModal />

      {/* Contenu principal */}
      <main id="main-content" className="flex-1 flex flex-col">
        {/* Passer heroSentryRef via Outlet context */}
        <Outlet context={{ heroSentryRef }} />
      </main>

      {/* Footer global */}
      <Footer />
    </div>
  );
};
