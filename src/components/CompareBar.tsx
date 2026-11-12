import React from 'react';
import { X, ArrowLeftRight } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

export const CompareBar: React.FC = () => {
  const {
    selectedProducts,
    removeProduct,
    clearCompare,
    openCompareModal,
    isCompareModalOpen
  } = useCompare();

  if (selectedProducts.length === 0 || isCompareModalOpen) {
    return null;
  }

  const canCompare = selectedProducts.length === 2;
  const slotA = selectedProducts[0];
  const slotB = selectedProducts[1];

  return (
    <aside
      id="compare-dock"
      aria-label="Sélection pour comparaison technique"
      className="fixed bottom-0 inset-x-0 z-30 bg-ink text-bg border-t-2 border-alert px-4 md:px-8 py-3"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Emplacements des 2 produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 min-w-0">
          {/* Emplacement 1 */}
          <div className="flex items-center justify-between gap-2 bg-bg/10 border border-surface/30 px-3 py-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-alert text-ink shrink-0">
                {slotA.ref}
              </span>
              <span className="font-display font-bold text-base uppercase tracking-wide truncate">
                {slotA.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeProduct(slotA.id)}
              className="p-1 text-surface/80 hover:text-alert transition-colors shrink-0 cursor-pointer"
              aria-label={`Retirer ${slotA.name} de la comparaison`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Emplacement 2 */}
          {slotB ? (
            <div className="flex items-center justify-between gap-2 bg-bg/10 border border-surface/30 px-3 py-2 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-alert text-ink shrink-0">
                  {slotB.ref}
                </span>
                <span className="font-display font-bold text-base uppercase tracking-wide truncate">
                  {slotB.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeProduct(slotB.id)}
                className="p-1 text-surface/80 hover:text-alert transition-colors shrink-0 cursor-pointer"
                aria-label={`Retirer ${slotB.name} de la comparaison`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 border border-dashed border-surface/40 px-3 py-2 text-surface/70 min-w-0">
              <span className="font-mono text-[11px] uppercase tracking-wider truncate">
                Sélectionne un 2e produit dans la grille
              </span>
              <span className="font-mono text-[10px] font-bold shrink-0">1 / 2</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={clearCompare}
            className="font-mono text-[11px] uppercase tracking-wider text-surface/80 hover:text-bg px-2.5 py-2 border border-surface/30 hover:border-surface transition-colors cursor-pointer"
          >
            Vider
          </button>

          <button
            id="open-compare-modal-btn"
            type="button"
            disabled={!canCompare}
            onClick={openCompareModal}
            className={`inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-black px-5 py-2.5 transition-colors ${
              canCompare
                ? 'bg-alert text-ink hover:opacity-95 cursor-pointer'
                : 'bg-surface/20 text-surface/50 border border-surface/30 cursor-not-allowed'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Comparer ({selectedProducts.length}/2)</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
