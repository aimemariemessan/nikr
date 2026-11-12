import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-surface bg-bg text-ink pt-16 pb-12 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Titre manifeste haut de pied de page */}
        <div className="pb-12 border-b border-surface mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase text-muted tracking-widest mb-2">
              // ÉDITION ATHLÉTIQUE 2026
            </p>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter max-w-2xl leading-[0.9]">
              L'Asphalte ne ment jamais. Chaque seconde se paie.
            </h2>
          </div>
          <Link
            to="/produits"
            className="inline-flex items-center gap-2 border border-ink px-5 py-3 font-sans text-xs uppercase tracking-widest font-bold hover:bg-ink hover:text-bg transition-colors w-fit"
          >
            Explorer le catalogue complet →
          </Link>
        </div>

        {/* Grille de navigation éditoriale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-surface text-sm">
          <div>
            <h3 className="font-mono text-xs uppercase font-bold text-muted tracking-wider mb-4">
              Catégories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produits?category=running" className="hover:text-alert font-medium">
                  Running Performance
                </Link>
              </li>
              <li>
                <Link to="/produits?category=homme" className="hover:text-alert font-medium">
                  Collection Homme
                </Link>
              </li>
              <li>
                <Link to="/produits?category=femme" className="hover:text-alert font-medium">
                  Collection Femme
                </Link>
              </li>
              <li>
                <Link to="/produits?category=lifestyle" className="hover:text-alert font-medium">
                  Urbain & Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase font-bold text-muted tracking-wider mb-4">
              Ingénierie
            </h3>
            <ul className="space-y-2 text-muted">
              <li>Technologie Mousse ZoomX</li>
              <li>Lame Carbone FlyPlate</li>
              <li>Membrane Shield All-Weather</li>
              <li>Tissu Microfibre Vaporweave</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase font-bold text-muted tracking-wider mb-4">
              Assistance & Suivi
            </h3>
            <ul className="space-y-2 text-muted">
              <li>Guide des pointures</li>
              <li>Retours sous 30 jours</li>
              <li>Entretien de tes chaussures</li>
              <li>Contact rédaction</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase font-bold text-muted tracking-wider mb-4">
              Bulletin de bord
            </h3>
            <p className="font-sans text-xs text-muted mb-3 leading-relaxed">
              Reçois les fiches techniques des lancements avant leur parution.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <input
                type="email"
                placeholder="Ton e-mail"
                aria-label="Ton e-mail pour le bulletin de bord"
                className="bg-surface/40 border border-ink px-3 py-2 text-xs font-mono w-full focus:outline-none"
              />
              <button
                type="submit"
                className="bg-ink text-bg font-mono font-bold text-xs px-4 py-2 hover:bg-alert hover:text-ink transition-colors shrink-0"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Mentions obligatoires non-négociables */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-muted">
          <p>
            Image générée par IA (StockCake, domaine public). Projet étudiant — non affilié à Nike.
          </p>
          <p className="tracking-wider">
            PARIS // 48.8566° N, 2.3522° E — PROJET REDESIGN
          </p>
        </div>
      </div>
    </footer>
  );
};
