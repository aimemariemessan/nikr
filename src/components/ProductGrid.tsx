import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  enableAsymmetric?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  enableAsymmetric = true
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${
        enableAsymmetric ? 'grid-asymmetric' : ''
      }`}
    >
      {products.map((product, idx) => {
        // En mode asymétrique sur desktop, 1 carte sur 5 est plus large
        const isLarge = enableAsymmetric && idx % 5 === 0;
        return (
          <ProductCard
            key={product.id}
            product={product}
            isLarge={isLarge}
            revealIndex={idx}
          />
        );
      })}
    </div>
  );
};
