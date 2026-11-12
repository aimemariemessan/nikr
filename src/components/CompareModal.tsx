import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { formatPrice } from '../context/CartContext';
import { buildComparisonRows } from '../utils/productCompare';

export const CompareModal: React.FC = () => {
  const {
    selectedProducts,
    isCompareModalOpen,
    closeCompareModal,
    clearCompare,
    removeProduct
  } = useCompare();

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isCompareModalOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.classList.add('overflow-hidden');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCompareModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const timer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 30);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overflow-hidden');
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isCompareModalOpen, closeCompareModal]);

  if (!isCompareModalOpen || selectedProducts.length !== 2 || typeof document === 'undefined') {
    return null;
  }

  const [productA, productB] = selectedProducts;
  const rows = buildComparisonRows(productA, productB);

  return createPortal(
    <div
      id="compare-modal-overlay"
      className="fixed inset-0 z-[100] bg-ink/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeCompareModal();
        }
      }}
    >
      <div className="w-full max-w-4xl bg-bg text-ink border border-ink max-h-[92vh] flex flex-col overflow-hidden">
        {/* En-tête Modale */}
        <div className="px-4 sm:px-6 py-4 border-b border-surface bg-surface/30 flex items-center justify-between gap-4 shrink-0">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-alert font-bold block mb-0.5">
              // LABORATOIRE — FICHE COMPARATIVE
            </span>
            <h2
              id="compare-modal-title"
              className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight leading-none"
            >
              Comparatif Technique
            </h2>
          </div>

          <button
            id="close-compare-modal-btn"
            ref={closeBtnRef}
            type="button"
            onClick={closeCompareModal}
            className="inline-flex items-center gap-2 bg-ink text-bg hover:bg-alert hover:text-ink font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-2 transition-colors cursor-pointer shrink-0"
            aria-label="Fermer le comparatif"
          >
            <span>Fermer</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corps scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* En-têtes des 2 produits côte à côte */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {[productA, productB].map((prod) => {
              const imgSrc = prod.images?.[0] || '';
              return (
                <div
                  key={prod.id}
                  className="border border-surface bg-surface/15 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-surface overflow-hidden border-b border-surface">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-muted">
                        {prod.ref}
                      </div>
                    )}
                    <span className="dossard-badge absolute top-2 left-2">
                      {prod.ref}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeProduct(prod.id)}
                      className="absolute top-2 right-2 bg-bg/95 border border-ink/40 hover:border-ink px-1.5 py-0.5 font-mono text-[10px] uppercase font-bold text-ink cursor-pointer"
                      aria-label={`Retirer ${prod.name}`}
                    >
                      Retirer
                    </button>
                  </div>

                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
                        {prod.discipline} // {prod.gender}
                      </p>
                      <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight leading-none text-ink">
                        {prod.name}
                      </h3>
                      <p className="font-sans text-xs text-muted mt-1 line-clamp-2">
                        {prod.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-surface/60 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-sm sm:text-base font-bold text-ink">
                        {formatPrice(prod.price)}
                      </span>
                      <Link
                        to={`/produit/${prod.id}`}
                        onClick={closeCompareModal}
                        className="inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wider text-signal hover:text-alert"
                      >
                        <span>Voir la fiche</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tableau comparatif des caractéristiques techniques */}
          <div className="border border-ink">
            <div className="bg-ink text-bg px-4 py-2.5 flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
                Spécifications comparées
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-surface/80">
                Poids • Technologie • Usage
              </span>
            </div>

            <div className="divide-y divide-surface">
              {rows.map((row) => {
                const isCore =
                  row.key === 'poids' || row.key === 'technologie' || row.key === 'usage';
                return (
                  <div
                    key={row.key}
                    data-compare-row={row.key}
                    className={`p-3 sm:p-4 ${isCore ? 'bg-surface/20' : 'bg-bg'}`}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-widest font-bold text-muted mb-2">
                      {row.label}
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-6">
                      <div className="font-mono text-xs sm:text-sm text-ink font-medium break-words">
                        <span>{row.valueA}</span>
                        {row.highlightSide === 'A' && row.highlightNote && (
                          <span className="ml-2 inline-block px-1.5 py-0.5 bg-alert text-ink text-[10px] font-bold uppercase">
                            {row.highlightNote}
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-xs sm:text-sm text-ink font-medium break-words border-l border-surface pl-3 sm:pl-6">
                        <span>{row.valueB}</span>
                        {row.highlightSide === 'B' && row.highlightNote && (
                          <span className="ml-2 inline-block px-1.5 py-0.5 bg-alert text-ink text-[10px] font-bold uppercase">
                            {row.highlightNote}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pied de modale */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-surface bg-surface/20 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={clearCompare}
            className="font-mono text-xs uppercase tracking-wider font-bold text-alert hover:underline cursor-pointer"
          >
            Vider la sélection
          </button>
          <button
            type="button"
            onClick={closeCompareModal}
            className="border border-ink bg-bg hover:bg-ink hover:text-bg font-sans text-xs uppercase tracking-widest font-bold px-5 py-2.5 transition-colors cursor-pointer"
          >
            Fermer le comparatif
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
