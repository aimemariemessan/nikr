import React, { forwardRef } from 'react';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero = forwardRef<HTMLDivElement, HeroProps>(({ onExploreClick }, ref) => {
  const handleScrollToNouveautes = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('nouveautes');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (onExploreClick) {
      onExploreClick();
    }
  };

  return (
    <section className="relative min-h-screen min-h-[100svh] flex flex-col justify-between overflow-hidden z-0">
      {/* Sentinelle pour l'IntersectionObserver du header (attachée via ref) */}
      <div
        ref={ref}
        id="hero-sentry"
        className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Image du Hero responsive (sources locales /img/hero-*.webp) */}
      <img
        src="/img/hero-1280.webp"
        srcSet="/img/hero-768.webp 768w, /img/hero-1280.webp 1280w, /img/hero-1920.webp 1920w"
        sizes="100vw"
        width={1920}
        height={1080}
        fetchPriority="high"
        loading="eager"
        decoding="async"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: 'var(--hero-pos)' }}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.parentElement) {
            target.parentElement.style.backgroundColor = 'var(--surface)';
          }
        }}
      />

      {/* Voiles de contraste pour lisibilité garantie (WCAG AA) */}
      {/* 1. Voile noir 20% uniforme */}
      <div className="absolute inset-0 bg-black/20 z-[1] pointer-events-none" aria-hidden="true" />
      {/* 2. Dégradé noir 0 à 50% sur les 160 premiers pixels pour la barre transparente */}
      <div
        className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-[2] pointer-events-none"
        aria-hidden="true"
      />
      {/* 3. Dégradé noir 0 à 55% sur le tiers inférieur pour le titre et CTA */}
      <div
        className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent z-[2] pointer-events-none"
        aria-hidden="true"
      />

      {/* Contenu Hero Haut (ligne méta technique sous la barre) */}
      <div className="relative z-10 pt-28 md:pt-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-white/90 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-alert animate-pulse" />
          <span>Collection automne 2026 — 12 références</span>
        </p>
      </div>

      {/* Contenu Hero Bas (Titre en 3 lignes orchestrées + CTA unique obligatoire) */}
      <div className="relative z-10 pb-12 md:pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full [padding-bottom:calc(3rem+env(safe-area-inset-bottom,0))]">
        <h1 className="font-display font-black text-white uppercase tracking-tighter leading-[0.85] text-[clamp(3.5rem,min(18vw,22svh),12rem)] select-none mb-6">
          <span className="hero-title-line">
            <span>L'ASPHALTE</span>
          </span>
          <span className="hero-title-line">
            <span>NE MENT</span>
          </span>
          <span className="hero-title-line">
            <span>JAMAIS.</span>
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* CTA Principal unique (fond --cta-bg #FF3B1F avec texte noir #101010 pour contraste 5.8:1) */}
          <a
            href="#nouveautes"
            onClick={handleScrollToNouveautes}
            className="inline-flex items-center gap-3 bg-alert hover:opacity-95 text-ink font-sans font-black text-sm tracking-widest uppercase px-8 py-4 transition-transform active:scale-95 text-center cursor-pointer shadow-none"
            style={{ backgroundColor: 'var(--cta-bg)' }}
          >
            <span>Voir les nouveautés</span>
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
