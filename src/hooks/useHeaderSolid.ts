import { useEffect, useState, RefObject } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook useHeaderSolid
 * Observe une sentinelle placée tout en haut du hero via IntersectionObserver.
 * Sur les routes sans hero (/produits, /produit/:id), force immédiatement l'état solide.
 */
export function useHeaderSolid(
  sentryRef: RefObject<HTMLElement | null>,
  isMobileMenuOpen = false
): boolean {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    // Sur toute route sans hero, l'état solide est immédiat
    if (!isHomePage) {
      setIsScrolledPastHero(true);
      return;
    }

    const sentryEl = sentryRef.current;
    if (!sentryEl) {
      // Si la sentinelle n'est pas encore montée, attendre son attachement
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si la sentinelle est visible en haut, fond transparent
        // Quand elle sort de la vue (défilement vers le bas), passer à l'état solide
        setIsScrolledPastHero(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px 0px 0px'
      }
    );

    observer.observe(sentryEl);

    return () => {
      observer.disconnect();
    };
  }, [isHomePage, sentryRef]);

  // Si on n'est pas sur la home, ou si on a défilé, ou si le menu mobile est ouvert -> solide
  return !isHomePage || isScrolledPastHero || isMobileMenuOpen;
}
