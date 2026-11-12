import { Product } from '../types/product';

export const MAX_COMPARE_ITEMS = 2;

export interface ComparisonRow {
  key: string;
  label: string;
  valueA: string;
  valueB: string;
  highlightSide?: 'A' | 'B' | null;
  highlightNote?: string | null;
}

/**
 * Ajoute ou retire un produit de la sélection de comparaison (2 max, file FIFO).
 */
export function toggleCompareSelection(currentIds: string[], productId: string): string[] {
  if (currentIds.includes(productId)) {
    return currentIds.filter((id) => id !== productId);
  }
  if (currentIds.length >= MAX_COMPARE_ITEMS) {
    return [currentIds[currentIds.length - 1], productId];
  }
  return [...currentIds, productId];
}

/**
 * Extrait le poids en grammes depuis une chaîne de spécification (ex: "194 g (taille 42)" -> 194).
 */
export function parseWeightGrams(rawWeight?: string): number | null {
  if (!rawWeight) return null;
  const match = rawWeight.match(/(\d+(?:[.,]\d+)?)\s*g\b/i);
  if (!match) return null;
  const parsed = Number(match[1].replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Synthétise les technologies principales d'un produit à partir de ses specs.
 */
export function extractProductTechnology(product: Product): string {
  const techKeys = ['plaque', 'empeigne', 'matière', 'tige', 'semelle', 'géométrie', 'crampons', 'respirabilité'];
  const parts: string[] = [];

  for (const key of techKeys) {
    const val = product.specs?.[key];
    if (val && !parts.includes(val)) {
      parts.push(val);
    }
  }

  return parts.length > 0 ? parts.slice(0, 2).join(' • ') : 'Construction technique éditoriale';
}

/**
 * Synthétise l'usage principal d'un produit (surface, distance, contexte).
 */
export function extractProductUsage(product: Product): string {
  const disciplineLabel =
    product.discipline.charAt(0).toUpperCase() + product.discipline.slice(1);
  const surfaceOrUsage = product.specs?.usage || product.specs?.surface;

  if (surfaceOrUsage) {
    return `${disciplineLabel} — ${surfaceOrUsage}`;
  }
  return `${disciplineLabel} — ${product.subtitle}`;
}

const SPEC_LABELS: Record<string, string> = {
  drop: 'Drop',
  plaque: 'Plaque / Stabilité',
  empeigne: 'Empeigne',
  matière: 'Matière',
  respirabilité: 'Respirabilité',
  coupe: 'Coupe',
  crampons: 'Crampons',
  tige: 'Tige',
  semelle: 'Semelle',
  poches: 'Rangements',
  taille: 'Maintien taille',
  longueur: 'Longueur',
  détails: 'Détails techniques',
  géométrie: 'Géométrie',
  grammage: 'Grammage'
};

/**
 * Construit les lignes comparatives normalisées (Poids, Technologie, Usage + specs complémentaires).
 */
export function buildComparisonRows(productA: Product, productB: Product): ComparisonRow[] {
  const weightTextA = productA.specs?.poids || '—';
  const weightTextB = productB.specs?.poids || '—';
  const gramsA = parseWeightGrams(productA.specs?.poids);
  const gramsB = parseWeightGrams(productB.specs?.poids);

  let weightHighlightSide: 'A' | 'B' | null = null;
  let weightHighlightNote: string | null = null;

  if (gramsA !== null && gramsB !== null && gramsA !== gramsB) {
    const diff = Math.abs(gramsA - gramsB);
    weightHighlightSide = gramsA < gramsB ? 'A' : 'B';
    weightHighlightNote = `-${diff} g`;
  }

  const rows: ComparisonRow[] = [
    {
      key: 'poids',
      label: 'Poids',
      valueA: weightTextA,
      valueB: weightTextB,
      highlightSide: weightHighlightSide,
      highlightNote: weightHighlightNote
    },
    {
      key: 'technologie',
      label: 'Technologie',
      valueA: extractProductTechnology(productA),
      valueB: extractProductTechnology(productB)
    },
    {
      key: 'usage',
      label: 'Usage',
      valueA: extractProductUsage(productA),
      valueB: extractProductUsage(productB)
    }
  ];

  // Ajouter les caractéristiques techniques complémentaires présentes sur au moins un des 2 produits
  const extraKeys = new Set<string>();
  const excludedKeys = new Set(['poids', 'surface', 'usage']);

  for (const key of Object.keys(productA.specs || {})) {
    if (!excludedKeys.has(key) && productA.specs[key]) extraKeys.add(key);
  }
  for (const key of Object.keys(productB.specs || {})) {
    if (!excludedKeys.has(key) && productB.specs[key]) extraKeys.add(key);
  }

  for (const key of extraKeys) {
    const label = SPEC_LABELS[key] || key.replace('_', ' ');
    rows.push({
      key,
      label,
      valueA: productA.specs?.[key] || '—',
      valueB: productB.specs?.[key] || '—'
    });
  }

  rows.push({
    key: 'tailles',
    label: 'Tailles disponibles',
    valueA: productA.sizes.join(', '),
    valueB: productB.sizes.join(', ')
  });

  return rows;
}
