import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftRight, Check } from 'lucide-react';
import { Product } from '../types/product';
import { formatPrice } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getRevealDelayClass } from '../utils/scrollReveal';

interface ProductCardProps {
  product: Product;
  isLarge?: boolean;
  revealIndex?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLarge = false,
  revealIndex = 0
}) => {
  const [imageError, setImageError] = useState(false);
  const { isSelected, toggleProduct } = useCompare();
  const isCompared = isSelected(product.id);
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const revealDelayClass = getRevealDelayClass(revealIndex);
  const mainImg = product.images && product.images[0] ? product.images[0] : '';
  const formattedPrice = formatPrice(product.price);
  const formattedOrigPrice = product.originalPrice ? formatPrice(product.originalPrice) : null;

  return (
    <article
      ref={ref}
      className={`product-card product-card-asym product-reveal ${revealDelayClass} ${
        isVisible ? 'is-revealed' : ''
      } group relative flex flex-col justify-between bg-surface/20 border border-surface hover:border-ink ${
        isLarge ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Dossard signature en coin supérieur gauche */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="dossard-badge shadow-none">
          {product.ref}
        </span>
        {product.isNew && (
          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-alert text-ink uppercase tracking-wider">
            Nouveau
          </span>
        )}
        {product.originalPrice && (
          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-ink text-bg uppercase tracking-wider">
            Soldé
          </span>
        )}
      </div>

      {/* Sélecteur de comparaison en coin supérieur droit */}
      <button
        type="button"
        data-compare-toggle={product.id}
        aria-pressed={isCompared}
        aria-label={
          isCompared
            ? `Retirer ${product.name} de la comparaison`
            : `Sélectionner ${product.name} pour comparaison`
        }
        onClick={() => toggleProduct(product.id)}
        className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-10 inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
          isCompared
            ? 'bg-signal text-white border-signal'
            : 'bg-bg/95 text-ink border-ink/40 hover:border-ink hover:bg-ink hover:text-bg'
        }`}
      >
        {isCompared ? (
          <>
            <Check className="w-3 h-3" />
            <span>Comparé</span>
          </>
        ) : (
          <>
            <ArrowLeftRight className="w-3 h-3" />
            <span>Comparer</span>
          </>
        )}
      </button>

      {/* Image produit au ratio 4/5 (ou 16/10 pour les grandes cartes) */}
      <Link
        to={`/produit/${product.id}`}
        className={`card-img-container block w-full aspect-[4/5] ${
          isLarge ? 'lg:aspect-[16/10]' : ''
        } bg-surface overflow-hidden relative cursor-pointer`}
        tabIndex={-1}
        aria-hidden="true"
      >
        {!imageError && mainImg ? (
          <img
            src={mainImg}
            alt={`${product.name} — ${product.subtitle}`}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] will-change-transform"
          />
        ) : (
          /* Placeholder de repli obligatoire en couleur surface avec nom en JetBrains Mono */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-surface select-none">
            <span className="dossard-badge mb-3">{product.ref}</span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold">
              {product.name}
            </span>
            <span className="font-mono text-[10px] text-muted/70 mt-1">Équipement Athlétique</span>
          </div>
        )}
      </Link>

      {/* Bloc éditorial sous l'image */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between border-t border-surface">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted font-medium">
              {product.discipline} // {product.gender}
            </span>
            <div className="font-mono text-sm sm:text-base font-bold text-ink text-right">
              {formattedOrigPrice && (
                <span className="line-through text-muted text-xs mr-1.5 font-normal">
                  {formattedOrigPrice}
                </span>
              )}
              <span className={formattedOrigPrice ? 'text-alert' : ''}>{formattedPrice}</span>
            </div>
          </div>

          <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight leading-none group-hover:text-alert transition-colors">
            <Link to={`/produit/${product.id}`} className="hover:text-alert">
              {product.name}
            </Link>
          </h3>

          <p className="font-sans text-xs text-muted mt-2 line-clamp-2">
            {product.subtitle}
          </p>
        </div>

        {/* Pied de carte avec tailles disponibles et lien fiche */}
        <div className="mt-5 pt-3 border-t border-surface/50 flex items-center justify-between text-xs font-mono">
          <span className="text-muted truncate max-w-[150px]">
            Tailles : {product.sizes.slice(0, 4).join(', ')}
            {product.sizes.length > 4 ? '...' : ''}
          </span>
          <Link
            to={`/produit/${product.id}`}
            className="inline-flex items-center gap-1 font-bold text-ink hover:text-alert uppercase tracking-wider"
            aria-label={`Consulter la fiche détaillée de ${product.name}`}
          >
            Fiche →
          </Link>
        </div>
      </div>
    </article>
  );
};
