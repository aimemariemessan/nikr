import { Product, ProductDiscipline } from '../types/product';

export type DisciplineFilter = 'all' | ProductDiscipline;
export type GenderFilter = 'all' | 'homme' | 'femme';
export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

export interface ProductFilterCriteria {
  discipline: DisciplineFilter;
  gender: GenderFilter;
  maxPrice: number;
  selectedSize: string | null;
  sort: SortOption;
}

const VALID_DISCIPLINES: readonly ProductDiscipline[] = ['running', 'training', 'lifestyle'];

export function isDisciplineFilter(value: string | null): value is ProductDiscipline {
  return value !== null && (VALID_DISCIPLINES as readonly string[]).includes(value);
}

export function parseFiltersFromSearchParams(params: URLSearchParams): {
  discipline: DisciplineFilter;
  gender: GenderFilter;
} {
  const rawDiscipline = params.get('discipline');
  const rawCategory = params.get('category');

  let discipline: DisciplineFilter = 'all';
  let gender: GenderFilter = 'all';

  if (isDisciplineFilter(rawDiscipline)) {
    discipline = rawDiscipline;
  } else if (isDisciplineFilter(rawCategory)) {
    discipline = rawCategory;
  }

  if (rawCategory === 'homme' || rawCategory === 'femme') {
    gender = rawCategory;
  }

  return { discipline, gender };
}

export function getDisciplineCounts(products: Product[]): Record<DisciplineFilter, number> {
  const counts: Record<DisciplineFilter, number> = {
    all: products.length,
    running: 0,
    training: 0,
    lifestyle: 0
  };

  for (const product of products) {
    if (product.discipline in counts) {
      counts[product.discipline] += 1;
    }
  }

  return counts;
}

export function filterAndSortProducts(
  products: Product[],
  criteria: ProductFilterCriteria
): Product[] {
  const { discipline, gender, maxPrice, selectedSize, sort } = criteria;

  return products
    .filter((product) => {
      if (discipline !== 'all' && product.discipline !== discipline) {
        return false;
      }

      if (gender === 'homme' && product.gender !== 'Homme' && product.category !== 'homme') {
        return false;
      }

      if (gender === 'femme' && product.gender !== 'Femme' && product.category !== 'femme') {
        return false;
      }

      if (product.price > maxPrice) {
        return false;
      }

      if (selectedSize && !product.sizes.includes(selectedSize)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sort === 'price-asc') {
        return a.price - b.price;
      }
      if (sort === 'price-desc') {
        return b.price - a.price;
      }
      if (sort === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (a.isNew === b.isNew) return 0;
      return a.isNew ? -1 : 1;
    });
}
