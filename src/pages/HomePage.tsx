import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';

interface OutletContextType {
  heroSentryRef: React.RefObject<HTMLDivElement | null>;
}

export const HomePage: React.FC = () => {
  const { heroSentryRef } = useOutletContext<OutletContextType>();

  // 8 premiers produits pour la section Nouveautés
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <div>
      {/* Hero plein écran avec référence sentinelle pour le header */}
      <Hero ref={heroSentryRef} />

      {/* ======================================================================
          SECTION 1 : LES 3 AXES DE RECHERCHE (Mise en avant éditoriale)
          ====================================================================== */}
      <section className="border-b border-surface py-16 px-4 md:px-8 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-baseline mb-8 pb-4 border-b border-surface">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              // ÉDITORIAL SPORT
            </span>
            <span className="font-mono text-xs text-muted">TROIS AXES DE RECHERCHE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Axe 01 */}
            <div className="border border-surface p-6 bg-surface/20 flex flex-col justify-between group hover:border-ink transition-colors">
              <div>
                <span className="font-mono text-xs font-bold text-alert tracking-wider block mb-2">
                  AXE 01
                </span>
                <h2 className="font-display font-black text-3xl uppercase tracking-tight mb-2 group-hover:text-alert transition-colors">
                  Vitesse Carbone
                </h2>
                <p className="font-sans text-xs text-muted leading-relaxed">
                  Des mousses ultra-réactives et des lames en fibre de carbone rigides calibrées pour maintenir la vitesse cible sur les 12 derniers kilomètres.
                </p>
              </div>
              <Link
                to="/produits?category=running"
                className="mt-6 inline-block font-mono text-xs uppercase tracking-wider font-bold text-ink hover:text-alert"
              >
                Découvrir les modèles course →
              </Link>
            </div>

            {/* Axe 02 */}
            <div className="border border-surface p-6 bg-surface/20 flex flex-col justify-between group hover:border-ink transition-colors">
              <div>
                <span className="font-mono text-xs font-bold text-alert tracking-wider block mb-2">
                  AXE 02
                </span>
                <h2 className="font-display font-black text-3xl uppercase tracking-tight mb-2 group-hover:text-alert transition-colors">
                  Intempéries & Shield
                </h2>
                <p className="font-sans text-xs text-muted leading-relaxed">
                  Tissus déperlants respirants et semelles à lamelles Storm-Tread conçus pour affronter la pluie battante et le froid du béton matinal.
                </p>
              </div>
              <Link
                to="/produits?category=running"
                className="mt-6 inline-block font-mono text-xs uppercase tracking-wider font-bold text-ink hover:text-alert"
              >
                Équipement tout-temps →
              </Link>
            </div>

            {/* Axe 03 */}
            <div className="border border-surface p-6 bg-surface/20 flex flex-col justify-between group hover:border-ink transition-colors">
              <div>
                <span className="font-mono text-xs font-bold text-alert tracking-wider block mb-2">
                  AXE 03
                </span>
                <h2 className="font-display font-black text-3xl uppercase tracking-tight mb-2 group-hover:text-alert transition-colors">
                  Minimalisme Brut
                </h2>
                <p className="font-sans text-xs text-muted leading-relaxed">
                  Silhouettes épurées inspirées des archives d'athlétisme. Cuirs bruts, coupes franches et finitions sans fioriture pour la ville.
                </p>
              </div>
              <Link
                to="/produits?category=lifestyle"
                className="mt-6 inline-block font-mono text-xs uppercase tracking-wider font-bold text-ink hover:text-alert"
              >
                Collection lifestyle →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 : LES NOUVEAUTÉS (#nouveautes) — 8 produits asymétriques
          ====================================================================== */}
      <section id="nouveautes" className="py-20 px-4 md:px-8 border-b border-surface bg-bg scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* En-tête de section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-surface">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="dossard-badge">SÉLECTION #08</span>
                <span className="font-mono text-xs uppercase text-muted tracking-widest">
                  // ARRIVAGES DE SAISON
                </span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter leading-[0.9]">
                Les dernières sorties du bitume
              </h2>
            </div>

            <p className="font-sans text-xs md:text-sm text-muted max-w-sm">
              8 modèles taillés pour la vitesse et la répétition des impacts sur sol dur. Choisis ta paire en trois clics.
            </p>
          </div>

          {/* Grille asymétrique des 8 produits */}
          <ProductGrid products={featuredProducts} enableAsymmetric={true} />

          {/* Lien catalogue complet */}
          <div className="mt-16 text-center">
            <Link
              to="/produits"
              className="inline-flex items-center gap-3 border border-ink text-ink hover:bg-ink hover:text-bg font-sans font-bold text-xs uppercase tracking-widest px-8 py-4 transition-colors"
            >
              <span>Consulter l'intégralité du catalogue (12 références)</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 : CITATION MANIFESTE ÉDITORIALE (PULL QUOTE)
          ====================================================================== */}
      <section className="py-24 px-4 md:px-8 bg-surface/30 border-b border-surface">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-alert font-bold block mb-4">
            // MANIFESTE TECHNIQUE
          </span>
          <blockquote className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight text-ink leading-[0.95] mb-6">
            « Le chrono ne négocie pas avec la fatigue. Seule compte la force que tu transmets au sol à chaque impact. »
          </blockquote>
          <p className="font-mono text-xs text-muted uppercase tracking-wider">
            Laboratoire de biomécanique appliquée — Athlètes en résidence
          </p>
        </div>
      </section>
    </div>
  );
};
