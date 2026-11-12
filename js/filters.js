/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * NIKE REDESIGN — STUDIO ÉDITORIAL
 * Système de filtres et tri du catalogue produits
 */

(function () {
  'use strict';

  // État actuel des filtres
  const state = {
    category: 'all',
    priceMax: 300,
    size: null,
    gender: null,
    sort: 'newest'
  };

  // Lecture des paramètres de l'URL au chargement
  function readUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('category')) {
      const cat = params.get('category').toLowerCase();
      if (['homme', 'femme', 'running', 'lifestyle'].includes(cat)) {
        state.category = cat;
      }
    }
    if (params.has('sort')) {
      state.sort = params.get('sort');
    }
  }

  // Filtrage et tri de la liste de produits
  function getFilteredProducts() {
    const products = window.PRODUCTS_DATA || [];

    return products.filter(product => {
      // 1. Filtre Catégorie
      if (state.category !== 'all') {
        const matchesCategory = product.category === state.category;
        const matchesGender = product.gender.toLowerCase() === state.category;
        if (!matchesCategory && !matchesGender) return false;
      }

      // 2. Filtre Prix Max
      if (product.price > state.priceMax) {
        return false;
      }

      // 3. Filtre Taille
      if (state.size !== null && state.size !== '') {
        const hasSize = product.sizes.some(s => String(s) === String(state.size));
        if (!hasSize) return false;
      }

      return true;
    }).sort((a, b) => {
      // Tri
      if (state.sort === 'price-asc') {
        return a.price - b.price;
      } else if (state.sort === 'price-desc') {
        return b.price - a.price;
      } else if (state.sort === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        // 'newest' par défaut
        if (a.isNew === b.isNew) return 0;
        return a.isNew ? -1 : 1;
      }
    });
  }

  // Rendu des cartes produits
  function renderProductCard(product) {
    const mainImg = product.images && product.images[0] ? product.images[0] : '';
    const formattedPrice = window.formatPrice ? window.formatPrice(product.price) : `${product.price} €`;
    const formattedOrigPrice = product.originalPrice ? (window.formatPrice ? window.formatPrice(product.originalPrice) : `${product.originalPrice} €`) : null;

    return `
      <article class="product-card group relative flex flex-col justify-between bg-white text-ink border border-surface shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-ink transition-all">
        
        <!-- Dossard Signature en haut à gauche -->
        <div class="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
          <span class="dossard-badge shadow-xs">
            ${product.ref}
          </span>
          ${product.isNew ? '<span class="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-alert text-ink uppercase tracking-wider">Nouveau</span>' : ''}
          ${product.originalPrice ? '<span class="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-ink text-white uppercase tracking-wider">Soldé</span>' : ''}
        </div>

        <!-- Image produit avec ratio 4:5 et container lumineux -->
        <a href="product.html?id=${product.id}" class="card-img-container block w-full aspect-[4/5] bg-[#F5F5F0] overflow-hidden relative" tabindex="-1">
          <img 
            src="${mainImg}" 
            alt="${product.name} — ${product.subtitle}"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onerror="this.src=''; this.parentElement.style.backgroundColor='var(--surface-light)';"
          />
        </a>

        <!-- Informations éditoriales de la carte -->
        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-surface/70 bg-white">
          <div>
            <div class="flex items-baseline justify-between gap-2 mb-1">
              <span class="font-mono text-xs uppercase tracking-wider text-muted font-medium">${product.category} // ${product.gender}</span>
              <div class="font-mono text-sm font-bold text-ink text-right">
                ${formattedOrigPrice ? `<span class="line-through text-muted text-xs mr-1">${formattedOrigPrice}</span>` : ''}
                <span class="${formattedOrigPrice ? 'text-alert' : ''}">${formattedPrice}</span>
              </div>
            </div>

            <h3 class="font-display font-black text-2xl md:text-3xl uppercase tracking-tight leading-none group-hover:text-alert transition-colors">
              <a href="product.html?id=${product.id}">
                ${product.name}
              </a>
            </h3>

            <p class="font-sans text-xs text-muted mt-2 line-clamp-2">
              ${product.subtitle}
            </p>
          </div>

          <!-- Tailles disponibles & CTA rapide -->
          <div class="mt-4 pt-3 border-t border-surface/40 flex items-center justify-between text-xs font-mono">
            <span class="text-muted truncate max-w-[140px] sm:max-w-[160px]">
              Tailles : ${product.sizes.slice(0, 4).join(', ')}${product.sizes.length > 4 ? '...' : ''}
            </span>
            <a href="product.html?id=${product.id}" class="inline-flex items-center gap-1 font-bold text-ink hover:text-alert uppercase tracking-wider" aria-label="Voir la fiche de ${product.name}">
              Fiche →
            </a>
          </div>

        </div>

      </article>
    `;
  }

  // Actualisation de l'affichage de la grille
  function updateGrid() {
    const container = document.getElementById('products-grid');
    const countElem = document.getElementById('products-count');
    if (!container) return;

    const filtered = getFilteredProducts();

    if (countElem) {
      countElem.textContent = `${filtered.length} ${filtered.length > 1 ? 'références trouvées' : 'référence trouvée'}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-20 px-6 text-center border border-dashed border-surface bg-surface/10">
          <p class="font-display font-black text-3xl uppercase tracking-tight text-ink mb-2">Aucun résultat trouvé</p>
          <p class="font-sans text-sm text-muted mb-6 max-w-md mx-auto">Aucun équipement ne correspond aux critères sélectionnés. Modifie tes filtres pour relancer la sélection.</p>
          <button id="reset-filters-btn" class="border border-ink font-sans text-xs uppercase tracking-widest font-bold px-6 py-3 hover:bg-ink hover:text-bg transition-colors">
            Réinitialiser les filtres
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
      }
      return;
    }

    container.innerHTML = filtered.map(renderProductCard).join('');
  }

  function resetFilters() {
    state.category = 'all';
    state.priceMax = 300;
    state.size = null;
    state.sort = 'newest';

    // Mise à jour de l'UI des contrôles
    syncControlsWithState();
    updateGrid();
  }

  function syncControlsWithState() {
    // Boutons de catégorie
    const catButtons = document.querySelectorAll('[data-filter-category]');
    catButtons.forEach(btn => {
      const cat = btn.getAttribute('data-filter-category');
      if (cat === state.category) {
        btn.classList.add('bg-ink', 'text-bg');
        btn.classList.remove('bg-surface', 'text-ink');
      } else {
        btn.classList.remove('bg-ink', 'text-bg');
        btn.classList.add('bg-surface', 'text-ink');
      }
    });

    // Slider de prix
    const priceSlider = document.getElementById('price-range-slider');
    const priceDisplay = document.getElementById('price-range-display');
    if (priceSlider) priceSlider.value = state.priceMax;
    if (priceDisplay) priceDisplay.textContent = `${state.priceMax} €`;

    // Dropdown de tri
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = state.sort;

    // Filtres de pointures
    const sizeButtons = document.querySelectorAll('[data-filter-size]');
    sizeButtons.forEach(btn => {
      const s = btn.getAttribute('data-filter-size');
      if (state.size && s === String(state.size)) {
        btn.classList.add('bg-signal', 'text-white', 'border-signal');
        btn.classList.remove('bg-surface', 'text-ink', 'border-surface');
      } else {
        btn.classList.remove('bg-signal', 'text-white', 'border-signal');
        btn.classList.add('bg-surface', 'text-ink', 'border-surface');
      }
    });
  }

  // Initialisation des écouteurs pour la page products.html
  function initFilters() {
    readUrlParams();
    syncControlsWithState();

    // Catégories
    const catButtons = document.querySelectorAll('[data-filter-category]');
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        state.category = btn.getAttribute('data-filter-category');
        syncControlsWithState();
        updateGrid();
      });
    });

    // Prix Max
    const priceSlider = document.getElementById('price-range-slider');
    const priceDisplay = document.getElementById('price-range-display');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        state.priceMax = parseInt(e.target.value, 10);
        if (priceDisplay) priceDisplay.textContent = `${state.priceMax} €`;
        updateGrid();
      });
    }

    // Tailles
    const sizeButtons = document.querySelectorAll('[data-filter-size]');
    sizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-filter-size');
        if (state.size === val) {
          state.size = null; // Toggle off
        } else {
          state.size = val;
        }
        syncControlsWithState();
        updateGrid();
      });
    });

    // Tri
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        updateGrid();
      });
    }

    // Bouton de réinitialisation global
    const resetTrigger = document.getElementById('global-reset-filters');
    if (resetTrigger) {
      resetTrigger.addEventListener('click', resetFilters);
    }

    // Premier rendu
    updateGrid();
  }

  window.initCatalogFilters = initFilters;

  // Auto-init si on est sur la page catalogue
  if (document.getElementById('products-grid')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initFilters);
    } else {
      initFilters();
    }
  }

})();
