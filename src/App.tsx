import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CompareProvider } from './context/CompareContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export default function App() {
  return (
    <CartProvider>
      <CompareProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="produits" element={<ProductsPage />} />
              <Route path="produit/:id" element={<ProductDetailPage />} />
              {/* Redirection fallback */}
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </HashRouter>
      </CompareProvider>
    </CartProvider>
  );
}
