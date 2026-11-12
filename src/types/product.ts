/**
 * Types de données pour les produits et spécifications de laboratoire
 */

export interface ProductSpecs {
  poids?: string;
  drop?: string;
  plaque?: string;
  surface?: string;
  empeigne?: string;
  coupe?: string;
  matière?: string;
  respirabilité?: string;
  [key: string]: string | undefined;
}

export type ProductDiscipline = 'running' | 'training' | 'lifestyle';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'running' | 'homme' | 'femme' | 'lifestyle';
  discipline: ProductDiscipline;
  gender: 'Homme' | 'Femme' | 'Unisexe';
  price: number;
  originalPrice?: number;
  sizes: string[];
  images: string[];
  description: string;
  isNew?: boolean;
  isApparel?: boolean;
  ref: string;
  specs: ProductSpecs;
}
