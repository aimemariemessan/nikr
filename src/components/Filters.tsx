import React from 'react';
import {
  DisciplineFilter,
  GenderFilter,
  SortOption
} from '../utils/productFilters';

export type { DisciplineFilter, GenderFilter, SortOption };

interface FiltersProps {
  discipline: DisciplineFilter;
  onDisciplineChange: (discipline: DisciplineFilter) => void;
  disciplineCounts: Record<DisciplineFilter, number>;
  gender: GenderFilter;
  onGenderChange: (gender: GenderFilter) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  selectedSize: string | null;
  onSizeChange: (size: string | null) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const AVAILABLE_SIZES = ['38', '39', '40', '41', '42', '43', '44', 'S', 'M', 'L', 'XL'];

const DISCIPLINE_OPTIONS: { id: DisciplineFilter; label: string; tag: string }[] = [
  { id: 'all', label: 'Tous', tag: 'INDEX' },
  { id: 'running', label: 'Running', tag: 'ROUTE & TRAIL' },
  { id: 'training', label: 'Training', tag: 'PISTE & SÉANCE' },
  { id: 'lifestyle', label: 'Lifestyle', tag: 'URBAIN' }
];

const GENDER_OPTIONS: { id: GenderFilter; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'homme', label: 'Homme' },
  { id: 'femme', label: 'Femme' }
];

export const Filters: React.FC<FiltersProps> = ({
  discipline,
  onDisciplineChange,
  disciplineCounts,
  gender,
  onGenderChange,
  maxPrice,
  onMaxPriceChange,
  selectedSize,
  onSizeChange,
  sort,
  onSortChange
}) => {
  return (
    <div className="mb-10 space-y-4">
      {/* Barre supérieure dédiée aux disciplines : Tous / Running / Training / Lifestyle */}
      <nav
        aria-label="Filtrer par discipline"
        className="border border-ink bg-surface"
      >
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-surface"
          role="group"
          aria-label="Barre de filtres par discipline"
        >
          {DISCIPLINE_OPTIONS.map((item) => {
            const isActive = discipline === item.id;
            const count = String(disciplineCounts[item.id] ?? 0).padStart(2, '0');
            return (
              <button
                key={item.id}
                type="button"
                data-discipline-filter={item.id}
                aria-pressed={isActive}
                onClick={() => onDisciplineChange(item.id)}
                className={`group flex items-center justify-between gap-2 px-4 py-3.5 text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-ink text-bg'
                    : 'bg-bg text-ink hover:bg-surface/40'
                }`}
              >
                <div className="min-w-0">
                  <span
                    className={`block font-mono text-[10px] uppercase tracking-widest leading-none mb-1 ${
                      isActive ? 'text-alert' : 'text-muted'
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className="block font-display font-black text-xl sm:text-2xl uppercase tracking-tight leading-none">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs font-bold px-1.5 py-0.5 border leading-none shrink-0 ${
                    isActive
                      ? 'border-alert bg-alert text-ink'
                      : 'border-surface bg-surface/50 text-ink group-hover:border-ink'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Barre secondaire : Genre, Tri, Budget & Pointures */}
      <div className="border border-surface bg-surface/20 p-5 space-y-5">
        {/* Ligne 1 : Genre & Tri */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Genre */}
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtrer par genre">
            <span className="font-mono text-xs uppercase text-muted tracking-wider mr-2 font-bold">
              Genre :
            </span>
            {GENDER_OPTIONS.map((item) => {
              const isActive = gender === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onGenderChange(item.id)}
                  className={`font-sans text-xs uppercase tracking-wider font-bold py-2 px-3.5 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-ink text-bg'
                      : 'bg-surface text-ink hover:bg-ink hover:text-bg'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Sélecteur de tri */}
          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="font-mono text-xs uppercase text-muted tracking-wider font-bold shrink-0">
              Trier par :
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-bg border border-ink text-ink font-sans text-xs font-semibold uppercase tracking-wider py-2 px-3 focus:outline-none cursor-pointer"
            >
              <option value="newest">Nouveautés en premier</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="name">Ordre alphabétique</option>
            </select>
          </div>
        </div>

        {/* Ligne 2 : Slider de budget & Tailles */}
        <div className="pt-4 border-t border-surface/50 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Slider Budget max */}
          <div className="flex items-center gap-4">
            <label htmlFor="price-range-slider" className="font-mono text-xs uppercase text-muted tracking-wider font-bold shrink-0">
              Budget max :
            </label>
            <input
              id="price-range-slider"
              type="range"
              min={50}
              max={260}
              step={10}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="w-full accent-ink cursor-pointer"
            />
            <span className="font-mono text-xs font-bold text-ink shrink-0 min-w-[55px] text-right">
              {maxPrice} €
            </span>
          </div>

          {/* Filtre de pointures et tailles rapides */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="font-mono text-xs uppercase text-muted tracking-wider font-bold shrink-0">
              Pointure :
            </span>
            <div className="flex items-center gap-1">
              {AVAILABLE_SIZES.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onSizeChange(isSelected ? null : size)}
                    className={`font-mono text-xs font-bold px-2 py-1 border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-signal text-white border-signal'
                        : 'bg-surface text-ink border-surface hover:border-ink'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
