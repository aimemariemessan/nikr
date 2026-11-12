import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Product } from '../types/product';
import { getProductById } from '../data/products';
import { toggleCompareSelection, MAX_COMPARE_ITEMS } from '../utils/productCompare';

interface CompareContextValue {
  selectedIds: string[];
  selectedProducts: Product[];
  isCompareModalOpen: boolean;
  isSelected: (productId: string) => boolean;
  toggleProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCompare: () => void;
  openCompareModal: () => void;
  closeCompareModal: () => void;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const selectedProducts = useMemo(() => {
    return selectedIds
      .map((id) => getProductById(id))
      .filter((p): p is Product => Boolean(p));
  }, [selectedIds]);

  const isSelected = useCallback(
    (productId: string) => selectedIds.includes(productId),
    [selectedIds]
  );

  const toggleProduct = useCallback((productId: string) => {
    setSelectedIds((prev) => toggleCompareSelection(prev, productId));
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setSelectedIds((prev) => {
      const next = prev.filter((id) => id !== productId);
      if (next.length < MAX_COMPARE_ITEMS) {
        setIsCompareModalOpen(false);
      }
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setSelectedIds([]);
    setIsCompareModalOpen(false);
  }, []);

  const openCompareModal = useCallback(() => {
    if (selectedIds.length === MAX_COMPARE_ITEMS) {
      setIsCompareModalOpen(true);
    }
  }, [selectedIds.length]);

  const closeCompareModal = useCallback(() => {
    setIsCompareModalOpen(false);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        selectedIds,
        selectedProducts,
        isCompareModalOpen,
        isSelected,
        toggleProduct,
        removeProduct,
        clearCompare,
        openCompareModal,
        closeCompareModal
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('useCompare doit être utilisé dans un CompareProvider');
  }
  return ctx;
}
