import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
  errorMessage?: string | null;
  isApparel?: boolean;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
  errorMessage,
  isApparel = false
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-baseline mb-2">
        <label className="font-sans text-xs uppercase tracking-wider font-bold text-ink">
          {isApparel ? 'Choisis ta taille' : 'Choisis ta pointure'}
        </label>
        <button
          type="button"
          onClick={() => alert("Guide des tailles : Pour les chaussures de course à plaque carbone, nous conseillons une demi-pointure au-dessus pour laisser de l'espace aux orteils lors des impacts prolongés.")}
          className="font-mono text-[11px] text-muted hover:text-alert underline cursor-pointer"
        >
          Guide des tailles
        </button>
      </div>

      {/* Grille de tailles */}
      <div
        id="sizes-selector-grid"
        className={`grid grid-cols-4 gap-2 ${
          errorMessage ? 'border border-alert p-1' : ''
        }`}
      >
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`size-choice-btn border font-mono text-xs font-bold py-2.5 px-3 text-center transition-all focus:outline-none cursor-pointer ${
                isSelected
                  ? 'bg-ink text-bg border-ink'
                  : 'bg-bg text-ink border-surface hover:border-ink'
              }`}
              aria-label={`Sélectionner la taille ${size}`}
              aria-pressed={isSelected}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* Message d'erreur obligatoire */}
      {errorMessage && (
        <p
          id="size-validation-msg"
          className="text-alert font-sans font-bold text-xs mt-2.5 flex items-center gap-1.5"
          role="alert"
        >
          <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
};
