import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, PRODUCTS } from '../data/products';
import { ProductGallery } from '../components/ProductGallery';
import { SizeSelector } from '../components/SizeSelector';
import { useCart, formatPrice } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { ShareButtons } from '../components/ShareButtons';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto py-28 px-6 text-center">
        <span className="dossard-badge inline-block mb-4">RÉF. INTROUVABLE</span>
        <h1 className="font-display font-black text-4xl uppercase tracking-tight text-ink mb-3">
          Produit non répertorié
        </h1>
        <p className="font-sans text-sm text-muted mb-8">
          La référence demandée n'existe pas ou n'est plus active dans le catalogue de cette saison.
        </p>
        <Link
          to="/produits"
          className="border border-ink font-sans text-xs uppercase tracking-widest font-bold px-6 py-3.5 hover:bg-ink hover:text-bg transition-colors inline-block"
        >
          Retourner au catalogue
        </Link>
      </div>
    );
  }

  const formattedPrice = formatPrice(product.price);
  const formattedOrigPrice = product.originalPrice ? formatPrice(product.originalPrice) : null;

  // 3 produits recommandés de la même catégorie (ou autres si insuffisants)
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage("Choisis ta taille avant d'ajouter");
      const sizeGrid = document.getElementById('sizes-selector-grid');
      if (sizeGrid) {
        sizeGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setErrorMessage(null);
    addToCart(product.id, selectedSize, 1);
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <div className="relative overflow-hidden pt-24 md:pt-28 pb-20">
      {/* SIGNATURE DOSSARD : Chiffre monumental rogné en arrière-plan (overflow caché) */}
      <div className="dossard-watermark absolute -top-12 -right-8 pointer-events-none select-none z-0">
        {product.ref}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Fil d'Ariane & Dossard badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-surface mb-8 text-xs font-mono">
          <div className="flex items-center gap-2 text-muted">
            <Link to="/" className="hover:text-ink">
              Accueil
            </Link>
            <span>/</span>
            <Link to={`/produits?discipline=${product.discipline}`} className="hover:text-ink capitalize">
              {product.discipline}
            </Link>
            <span>/</span>
            <span className="text-ink font-bold truncate max-w-[200px]">{product.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="dossard-badge">{product.ref}</span>
            {product.isNew && (
              <span className="bg-alert text-ink font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider">
                Nouveau
              </span>
            )}
          </div>
        </div>

        {/* Grille Détail Produit : Galerie (Gauche) + Achat & Specs (Droite) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* GALERIE D'IMAGES (7 colonnes) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              productName={product.name}
              dossard={product.ref}
            />
          </div>

          {/* FICHE D'ACHAT & DÉTAILS ÉDITORIAUX (5 colonnes) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                {product.gender} // {product.discipline}
              </p>

              <h1 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight leading-[0.9] text-ink mb-3">
                {product.name}
              </h1>

              <p className="font-sans text-sm text-muted font-medium mb-6">
                {product.subtitle}
              </p>

              {/* Prix */}
              <div className="font-mono text-2xl font-bold text-ink mb-8 flex items-baseline gap-3">
                <span className={formattedOrigPrice ? 'text-alert' : ''}>{formattedPrice}</span>
                {formattedOrigPrice && (
                  <span className="line-through text-muted text-base font-normal">
                    {formattedOrigPrice}
                  </span>
                )}
                <span className="text-xs font-normal text-muted">TVA incluse</span>
              </div>

              {/* Sélecteur de pointures obligatoire */}
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelectSize={handleSelectSize}
                errorMessage={errorMessage}
                isApparel={product.isApparel}
              />

              {/* CTA Principal : AJOUTER AU PANIER */}
              <div className="mb-8">
                <button
                  id="add-to-cart-submit-btn"
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-alert hover:opacity-95 text-ink font-sans font-black text-sm tracking-widest uppercase py-4 px-6 transition-transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-none"
                >
                  <span>Ajouter au panier</span>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <p className="font-mono text-[11px] text-muted text-center mt-2.5">
                  Expédition 24/48h • Retours offerts sous 30 jours
                </p>
              </div>

              {/* Description éditoriale */}
              <div className="border-t border-surface pt-6 mb-6">
                <h2 className="font-sans font-bold text-xs uppercase tracking-wider text-ink mb-2">
                  Note de rédaction
                </h2>
                <p className="font-sans text-sm text-ink/90 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Partage social minimaliste (X/Twitter, LinkedIn, Pinterest) */}
              <ShareButtons
                productName={product.name}
                productSubtitle={product.subtitle}
                productRef={product.ref}
                imageUrl={product.images?.[0]}
              />

              {/* Spécifications techniques */}
              {product.specs && (
                <div className="border-t border-surface pt-6">
                  <h2 className="font-sans font-bold text-xs uppercase tracking-wider text-ink mb-3">
                    Fiche technique de laboratoire
                  </h2>
                  <div className="space-y-1">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-surface/60 text-xs">
                        <span className="font-mono text-muted uppercase tracking-wider">
                          {key.replace('_', ' ')}
                        </span>
                        <span className="font-mono font-bold text-ink text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION : TU AIMERAS AUSSI (3 PRODUITS RECOMMANDÉS) */}
        <div className="mt-24 pt-12 border-t border-surface">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="font-mono text-xs uppercase text-muted tracking-widest">
                // COMPLÉTER TON ÉQUIPEMENT
              </p>
              <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight">
                Tu aimeras aussi
              </h2>
            </div>
            <Link
              to="/produits"
              className="font-mono text-xs uppercase tracking-wider font-bold text-ink hover:text-alert"
            >
              Voir tout →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel, idx) => (
              <ProductCard key={rel.id} product={rel} isLarge={false} revealIndex={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
