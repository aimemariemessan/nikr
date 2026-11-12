import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/ProductGrid';
import {
  Filters,
  DisciplineFilter,
  GenderFilter,
  SortOption
} from '../components/Filters';
import {
  filterAndSortProducts,
  getDisciplineCounts,
  parseFiltersFromSearchParams
} from '../utils/productFilters';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFromUrl = parseFiltersFromSearchParams(searchParams);

  const [discipline, setDiscipline] = useState<DisciplineFilter>(initialFromUrl.discipline);
  const [gender, setGender] = useState<GenderFilter>(initialFromUrl.gender);
  const [maxPrice, setMaxPrice] = useState<number>(260);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('newest');

  // Synchronisation avec les paramètres d'URL quand on navigue depuis le header ou le footer
  useEffect(() => {
    const parsed = parseFiltersFromSearchParams(searchParams);
    setDiscipline(parsed.discipline);
    setGender(parsed.gender);
  }, [searchParams]);

  const handleDisciplineChange = (newDiscipline: DisciplineFilter) => {
    setDiscipline(newDiscipline);
    const nextParams = new URLSearchParams(searchParams);
    const legacyCategory = nextParams.get('category');
    if (legacyCategory === 'running' || legacyCategory === 'lifestyle') {
      nextParams.delete('category');
    }
    if (newDiscipline === 'all') {
      nextParams.delete('discipline');
    } else {
      nextParams.set('discipline', newDiscipline);
    }
    setSearchParams(nextParams);
  };

  const handleGenderChange = (newGender: GenderFilter) => {
    setGender(newGender);
    const nextParams = new URLSearchParams(searchParams);
    if (newGender === 'all') {
      if (nextParams.get('category') === 'homme' || nextParams.get('category') === 'femme') {
        nextParams.delete('category');
      }
    } else {
      nextParams.set('category', newGender);
    }
    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    setDiscipline('all');
    setGender('all');
    setMaxPrice(260);
    setSelectedSize(null);
    setSort('newest');
    setSearchParams({});
  };

  // Comptage par discipline (avec les filtres secondaires appliqués)
  const disciplineCounts = useMemo(() => {
    const preFiltered = filterAndSortProducts(PRODUCTS, {
      discipline: 'all',
      gender,
      maxPrice,
      selectedSize,
      sort
    });
    return getDisciplineCounts(preFiltered);
  }, [gender, maxPrice, selectedSize, sort]);

  // Filtrage et tri des 12 produits
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(PRODUCTS, {
      discipline,
      gender,
      maxPrice,
      selectedSize,
      sort
    });
  }, [discipline, gender, maxPrice, selectedSize, sort]);

  return (
    <div className="pt-24 md:pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* En-tête Catalogue avec Dossard Signature */}
      <div className="border-b border-surface pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="dossard-badge">INDEX #2026</span>
            <span className="font-mono text-xs uppercase text-muted tracking-widest">
              // CATALOGUE TECHNIQUE
            </span>
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter leading-[0.9]">
            Toute la collection
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span id="products-count" className="font-mono text-xs font-bold text-muted uppercase tracking-wider">
            {filteredProducts.length} référence{filteredProducts.length > 1 ? 's trouvées' : ' trouvée'}
          </span>
          <button
            type="button"
            onClick={handleResetFilters}
            className="font-mono text-xs text-alert hover:underline uppercase tracking-wider font-semibold cursor-pointer"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Barre de filtres et de tri */}
      <Filters
        discipline={discipline}
        onDisciplineChange={handleDisciplineChange}
        disciplineCounts={disciplineCounts}
        gender={gender}
        onGenderChange={handleGenderChange}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        sort={sort}
        onSortChange={setSort}
      />

      {/* Grille des produits ou état vide */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 px-6 text-center border border-dashed border-surface bg-surface/10">
          <p className="font-display font-black text-3xl uppercase tracking-tight text-ink mb-2">
            Aucun résultat trouvé
          </p>
          <p className="font-sans text-sm text-muted mb-6 max-w-md mx-auto">
            Aucun équipement ne correspond aux critères sélectionnés. Modifie tes filtres pour relancer la sélection.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="border border-ink font-sans text-xs uppercase tracking-widest font-bold px-6 py-3 hover:bg-ink hover:text-bg transition-colors cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} enableAsymmetric={false} />
      )}
    </div>
  );
};
