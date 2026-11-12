/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * NIKE REDESIGN — STUDIO ÉDITORIAL
 * Contrôleur principal pour les pages Accueil et Fiche Produit
 */

(function () {
  'use strict';

  // Détection de la page active
  function initPage() {
    if (document.getElementById('home-featured-products')) {
      initHomePage();
    } else if (document.getElementById('product-detail-view')) {
      initProductDetailPage();
    }
  }

  /* ==========================================================================
     PAGE ACCUEIL (index.html)
     ========================================================================== */
  function initHomePage() {
    // Rendu des 8 produits phares dans #nouveautes
    const container = document.getElementById('home-featured-products');
    if (!container) return;

    const products = (window.PRODUCTS_DATA || []).slice(0, 8);

    container.innerHTML = products.map((product, idx) => {
      const mainImg = product.images && product.images[0] ? product.images[0] : '';
      const formattedPrice = window.formatPrice ? window.formatPrice(product.price) : `${product.price} €`;
      const isLargeCard = idx % 5 === 0;

      return `
        <article class="product-card group relative flex flex-col justify-between bg-white text-ink border border-surface shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-ink transition-all ${isLargeCard ? 'lg:col-span-2' : ''}">
          
          <!-- Dossard signature en coin -->
          <div class="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex items-center gap-2 pointer-events-none">
            <span class="dossard-badge shadow-sm">
              ${product.ref}
            </span>
            ${product.isNew ? '<span class="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-alert text-ink uppercase tracking-wider">Nouveau</span>' : ''}
          </div>

          <!-- Image du produit lumineuse (Clic ouvre le Quick Shop) -->
          <div class="card-img-container block w-full aspect-[4/5] ${isLargeCard ? 'lg:aspect-[16/10]' : ''} bg-[#F5F5F0] overflow-hidden relative cursor-pointer" data-quick-shop="${product.id}" role="button" tabindex="0" aria-label="Achat rapide : ${product.name}">
            <img 
              src="${mainImg}" 
              alt="${product.name} — ${product.subtitle}"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
              onerror="this.src=''; this.parentElement.style.backgroundColor='var(--surface-light)';"
            />
            
            <!-- Bouton Achat Rapide en survol (visible en continu sur tactile) -->
            <button 
              type="button" 
              data-quick-shop="${product.id}"
              class="quick-shop-card-trigger absolute bottom-3 inset-x-3 bg-ink/90 hover:bg-alert text-bg hover:text-ink font-sans text-xs uppercase font-bold py-2.5 px-3 flex items-center justify-center gap-2 transition-colors z-20 shadow-md"
              aria-label="Achat rapide pour ${product.name}"
            >
              <span>Achat rapide +</span>
            </button>
          </div>

          <!-- Bloc éditorial -->
          <div class="p-4 sm:p-6 flex-1 flex flex-col justify-between border-t border-surface/70 bg-white">
            <div>
              <div class="flex items-baseline justify-between gap-2 mb-2">
                <span class="font-mono text-xs uppercase tracking-wider text-muted font-medium">${product.category} // ${product.gender}</span>
                <span class="font-mono font-bold text-base text-ink">${formattedPrice}</span>
              </div>

              <!-- Titre produit (Clic ouvre le Quick Shop) -->
              <h3 class="font-display font-black text-2xl md:text-3xl uppercase tracking-tight leading-tight group-hover:text-alert transition-colors">
                <button type="button" data-quick-shop="${product.id}" class="text-left w-full hover:text-alert focus:outline-none">
                  ${product.name}
                </button>
              </h3>

              <p class="font-sans text-xs text-muted mt-2 line-clamp-2">
                ${product.subtitle}
              </p>
            </div>

            <!-- Footer de la carte avec Achat Rapide & Fiche complète -->
            <div class="mt-5 pt-3 border-t border-surface/50 flex items-center justify-between text-xs font-mono">
              <button 
                type="button" 
                data-quick-shop="${product.id}" 
                class="font-bold text-ink hover:text-alert uppercase tracking-wider flex items-center gap-1 focus:outline-none"
                aria-label="Ouvrir l'achat rapide pour ${product.name}"
              >
                <span>Achat rapide +</span>
              </button>
              <a href="product.html?id=${product.id}" class="text-muted hover:text-ink uppercase tracking-wider inline-flex items-center gap-1">
                Fiche complète →
              </a>
            </div>

          </div>

        </article>
      `;
    }).join('');

    // Attachement des écouteurs pour ouvrir le Quick Shop
    container.querySelectorAll('[data-quick-shop]').forEach(trigger => {
      const handler = (e) => {
        // Ne pas déclencher si l'événement provient d'un clic enfant spécifique
        e.stopPropagation();
        const pid = trigger.getAttribute('data-quick-shop');
        if (pid) {
          openQuickShopModal(pid);
        }
      };

      trigger.addEventListener('click', handler);

      // Support clavier (Entrée / Espace sur conteneur cliquable)
      if (trigger.getAttribute('role') === 'button') {
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handler(e);
          }
        });
      }
    });
  }

  /* ==========================================================================
     PAGE PRODUIT (product.html?id=...)
     ========================================================================== */
  function initProductDetailPage() {
    const container = document.getElementById('product-detail-view');
    if (!container) return;

    // Récupération de l'ID depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = window.getProductById ? window.getProductById(productId) : null;

    if (!product) {
      container.innerHTML = `
        <div class="max-w-xl mx-auto py-24 px-6 text-center">
          <span class="dossard-badge inline-block mb-4">RÉF. INTROUVABLE</span>
          <h1 class="font-display font-black text-4xl uppercase tracking-tight text-ink mb-3">Produit non répertorié</h1>
          <p class="font-sans text-sm text-muted mb-8">La référence demandée n'existe pas ou n'est plus active dans le catalogue de cette saison.</p>
          <a href="products.html" class="border border-ink font-sans text-xs uppercase tracking-widest font-bold px-6 py-3.5 hover:bg-ink hover:text-bg transition-colors inline-block">
            Retourner au catalogue
          </a>
        </div>
      `;
      return;
    }

    // Mise à jour du titre de la page pour le SEO/titre d'onglet
    document.title = `${product.name} — Nike Studio Éditorial`;

    const formattedPrice = window.formatPrice ? window.formatPrice(product.price) : `${product.price} €`;
    const formattedOrigPrice = product.originalPrice ? (window.formatPrice ? window.formatPrice(product.originalPrice) : `${product.originalPrice} €`) : null;
    const images = product.images && product.images.length > 0 ? product.images : [''];

    // Construction des spécifications techniques
    let specsHtml = '';
    if (product.specs) {
      specsHtml = Object.entries(product.specs).map(([key, val]) => `
        <div class="flex justify-between py-2 border-b border-surface/60 text-xs">
          <span class="font-mono text-muted uppercase tracking-wider">${key.replace('_', ' ')}</span>
          <span class="font-mono font-bold text-ink text-right">${val}</span>
        </div>
      `).join('');
    }

    // Construction du sélecteur de pointures
    const sizesHtml = product.sizes.map(size => `
      <button 
        type="button" 
        data-product-size="${size}" 
        class="size-choice-btn border border-surface bg-white hover:border-ink font-mono text-xs font-bold py-2.5 sm:py-3 px-3 text-center transition-all focus:outline-none shadow-xs"
        aria-label="Sélectionner la taille ${size}"
      >
        ${size}
      </button>
    `).join('');

    // Rendu principal de la fiche produit avec DOSSARD MONUMENTAL ROGNÉ EN ARRIÈRE-PLAN
    container.innerHTML = `
      <div class="relative overflow-hidden pt-6 pb-16">
        
        <!-- SIGNATURE DOSSARD : Chiffre monumental rogné en arrière-plan -->
        <div class="dossard-watermark absolute -top-12 -right-8 pointer-events-none select-none z-0">
          ${product.ref}
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          
          <!-- Fil d'Ariane & Dossard badge (responsive) -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-surface mb-6 sm:mb-8 text-xs font-mono">
            <div class="flex items-center gap-1.5 sm:gap-2 text-muted">
              <a href="index.html" class="hover:text-ink">Accueil</a>
              <span>/</span>
              <a href="products.html?category=${product.category}" class="hover:text-ink capitalize">${product.category}</a>
              <span>/</span>
              <span class="text-ink font-bold truncate max-w-[120px] sm:max-w-[220px]">${product.name}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="dossard-badge">${product.ref}</span>
              ${product.isNew ? '<span class="bg-alert text-ink font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider">Nouveau</span>' : ''}
            </div>
          </div>

          <!-- Grille Détail Produit : Galerie (Gauche) + Achat & Specs (Droite) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            <!-- GALERIE D'IMAGES (7 cols) -->
            <div class="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
              
              <!-- Miniatures (Thumbnails) -->
              <div class="flex md:flex-col gap-3 shrink-0 overflow-x-auto no-scrollbar md:w-24 py-1 md:py-0">
                ${images.map((img, idx) => `
                  <button 
                    type="button" 
                    data-gallery-thumb="${idx}" 
                    class="thumb-btn w-16 md:w-24 aspect-[4/5] bg-[#F5F5F0] border ${idx === 0 ? 'border-ink opacity-100 ring-2 ring-ink ring-offset-2' : 'border-surface opacity-70'} overflow-hidden focus:outline-none transition-all shrink-0"
                    aria-label="Afficher la vue ${idx + 1}"
                  >
                    <img src="${img}" alt="" class="w-full h-full object-cover" onerror="this.src=''; this.parentElement.style.backgroundColor='var(--surface-light)';" />
                  </button>
                `).join('')}
              </div>

              <!-- Grande image principale lumineuse -->
              <div class="flex-1 aspect-[4/5] bg-[#F5F5F0] border border-surface overflow-hidden relative shadow-sm">
                <img 
                  id="main-product-image" 
                  src="${images[0]}" 
                  alt="${product.name}" 
                  class="w-full h-full object-cover transition-opacity duration-300"
                  onerror="this.src=''; this.parentElement.style.backgroundColor='var(--surface-light)';"
                />
              </div>

            </div>

            <!-- FICHE D'ACHAT & DÉTAILS ÉDITORIAUX (5 cols) -->
            <div class="lg:col-span-5 flex flex-col justify-between">
              
              <div>
                <p class="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                  ${product.gender} // ${product.category}
                </p>

                <h1 class="font-display font-black text-4xl md:text-5xl uppercase tracking-tight leading-[0.9] text-ink mb-3">
                  ${product.name}
                </h1>

                <p class="font-sans text-sm text-muted font-medium mb-6">
                  ${product.subtitle}
                </p>

                <!-- Prix -->
                <div class="font-mono text-2xl font-bold text-ink mb-8 flex items-baseline gap-3">
                  <span class="${formattedOrigPrice ? 'text-alert' : ''}">${formattedPrice}</span>
                  ${formattedOrigPrice ? `<span class="line-through text-muted text-base">${formattedOrigPrice}</span>` : ''}
                  <span class="text-xs font-normal text-muted">TVA incluse</span>
                </div>

                <!-- Sélecteur de pointures -->
                <div class="mb-8">
                  <div class="flex justify-between items-baseline mb-2">
                    <label class="font-sans text-xs uppercase tracking-wider font-bold text-ink">
                      ${product.isApparel ? 'Choisis ta taille' : 'Choisis ta pointure'}
                    </label>
                    <a href="#" class="font-mono text-[11px] text-muted hover:text-alert underline">Guide des tailles</a>
                  </div>

                  <!-- Grille de pointures -->
                  <div id="sizes-selector-grid" class="grid grid-cols-4 gap-2">
                    ${sizesHtml}
                  </div>

                  <!-- Message d'erreur de sélection -->
                  <p id="size-validation-msg" class="hidden text-alert font-sans font-bold text-xs mt-2.5 flex items-center gap-1.5" role="alert">
                    <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>Choisis ta taille avant d'ajouter</span>
                  </p>
                </div>

                <!-- CTA Principal AJOUTER AU PANIER -->
                <div class="mb-8">
                  <button 
                    id="add-to-cart-submit-btn" 
                    type="button" 
                    class="w-full bg-alert hover:opacity-95 text-ink font-sans font-black text-sm tracking-widest uppercase py-4 px-6 transition-transform active:scale-[0.99] flex items-center justify-center gap-2 border border-transparent shadow-none"
                  >
                    <span>Ajouter au panier</span>
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                  <p class="font-mono text-[11px] text-muted text-center mt-2.5">Expédition 24/48h • Retours offerts sous 30 jours</p>
                </div>

                <!-- Description éditoriale -->
                <div class="border-t border-surface pt-6 mb-6">
                  <h2 class="font-sans font-bold text-xs uppercase tracking-wider text-ink mb-2">Note de rédaction</h2>
                  <p class="font-sans text-sm text-ink/90 leading-relaxed">
                    ${product.description}
                  </p>
                </div>

                <!-- Spécifications techniques -->
                <div class="border-t border-surface pt-6">
                  <h2 class="font-sans font-bold text-xs uppercase tracking-wider text-ink mb-3">Fiche technique de laboratoire</h2>
                  <div class="space-y-1">
                    ${specsHtml}
                  </div>
                </div>

              </div>

            </div>

          </div>

          <!-- SECTION : TU AIMERAS AUSSI (3 PRODUITS RECOMMANDÉS) -->
          <div class="mt-24 pt-12 border-t border-surface">
            <div class="flex justify-between items-end mb-8">
              <div>
                <p class="font-mono text-xs uppercase text-muted tracking-widest">// COMPLÉTER TON ÉQUIPEMENT</p>
                <h2 class="font-display font-black text-3xl md:text-4xl uppercase tracking-tight">Tu aimeras aussi</h2>
              </div>
              <a href="products.html" class="font-mono text-xs uppercase tracking-wider font-bold text-ink hover:text-alert">
                Voir tout →
              </a>
            </div>

            <div id="related-products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Injecté ci-dessous -->
            </div>
          </div>

        </div>
      </div>
    `;

    // Écouteurs de la galerie de miniatures
    const thumbButtons = container.querySelectorAll('[data-gallery-thumb]');
    const mainImgElem = document.getElementById('main-product-image');

    thumbButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-gallery-thumb'), 10);
        if (images[idx] && mainImgElem) {
          mainImgElem.src = images[idx];
          // Mise à jour de l'état visuel actif
          thumbButtons.forEach(b => {
            b.classList.remove('border-ink', 'opacity-100', 'ring-2', 'ring-ink', 'ring-offset-2');
            b.classList.add('border-surface', 'opacity-70');
          });
          btn.classList.add('border-ink', 'opacity-100', 'ring-2', 'ring-ink', 'ring-offset-2');
          btn.classList.remove('border-surface', 'opacity-70');
        }
      });
    });

    // Gestion de la sélection de taille
    let selectedSize = null;
    const sizeButtons = container.querySelectorAll('.size-choice-btn');
    const errorMsg = document.getElementById('size-validation-msg');
    const sizesGrid = document.getElementById('sizes-selector-grid');

    sizeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedSize = btn.getAttribute('data-product-size');
        // Masquer message d'erreur
        if (errorMsg) errorMsg.classList.add('hidden');
        if (sizesGrid) sizesGrid.classList.remove('border', 'border-alert', 'p-1');

        sizeButtons.forEach(b => {
          b.classList.remove('bg-ink', 'text-white', 'border-ink');
          b.classList.add('bg-white', 'text-ink', 'border-surface');
        });

        btn.classList.add('bg-ink', 'text-white', 'border-ink');
        btn.classList.remove('bg-white', 'text-ink', 'border-surface');
      });
    });

    // Clic sur "Ajouter au panier"
    const addBtn = document.getElementById('add-to-cart-submit-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (!selectedSize) {
          // Erreur demandée : "Choisis ta taille avant d'ajouter"
          if (errorMsg) errorMsg.classList.remove('hidden');
          if (sizesGrid) {
            sizesGrid.classList.add('border', 'border-alert', 'p-1');
            sizesGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }

        // Ajout au panier
        if (window.addToCart) {
          const res = window.addToCart(product.id, selectedSize, 1);
          if (res.success) {
            // Ouvrir le tiroir panier pour feedback immédiat
            if (window.openCartDrawer) {
              window.openCartDrawer();
            }
          }
        }
      });
    }

    // Rendu des 3 produits recommandés
    const relatedContainer = document.getElementById('related-products-grid');
    if (relatedContainer) {
      const allProducts = window.PRODUCTS_DATA || [];
      const related = allProducts.filter(p => p.id !== product.id).slice(0, 3);

      relatedContainer.innerHTML = related.map(rel => {
        const relImg = rel.images && rel.images[0] ? rel.images[0] : '';
        const relPrice = window.formatPrice ? window.formatPrice(rel.price) : `${rel.price} €`;

        return `
          <article class="group bg-white text-ink border border-surface shadow-sm flex flex-col justify-between hover:border-ink hover:shadow-md transition-all">
            <div class="relative">
              <span class="dossard-badge absolute top-3 left-3 z-10 shadow-xs">${rel.ref}</span>
              <a href="product.html?id=${rel.id}" class="block aspect-[4/5] bg-[#F5F5F0] overflow-hidden">
                <img src="${relImg}" alt="${rel.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src=''; this.parentElement.style.backgroundColor='var(--surface-light)';" />
              </a>
            </div>
            <div class="p-4 border-t border-surface/70 flex-1 flex flex-col justify-between bg-white">
              <div>
                <span class="font-mono text-[10px] uppercase text-muted">${rel.category}</span>
                <h3 class="font-display font-black text-xl uppercase tracking-tight group-hover:text-alert">
                  <a href="product.html?id=${rel.id}">${rel.name}</a>
                </h3>
              </div>
              <div class="mt-3 pt-2 border-t border-surface/50 flex justify-between items-center text-xs font-mono">
                <span class="font-bold text-ink">${relPrice}</span>
                <a href="product.html?id=${rel.id}" class="text-ink hover:text-alert uppercase font-bold">Fiche →</a>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }
  }

  /* ==========================================================================
     MODAL ACHAT RAPIDE (QUICK SHOP)
     ========================================================================== */
  let quickShopPreviousFocus = null;
  let quickShopSelectedSize = null;

  function ensureQuickShopModalInDOM() {
    let overlay = document.getElementById('quick-shop-overlay');
    if (overlay) return overlay;

    const div = document.createElement('div');
    div.innerHTML = `
      <div id="quick-shop-overlay" class="quickshop-overlay fixed inset-0 z-50 bg-ink/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="quick-shop-title">
        <div id="quick-shop-dialog" class="quickshop-modal relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white text-ink border-2 border-ink shadow-2xl my-auto" onclick="event.stopPropagation()">
          
          <!-- Dossard Signature en filigrane d'arrière-plan -->
          <div id="quick-shop-watermark" class="dossard-watermark absolute -top-10 -right-6 pointer-events-none select-none z-0 opacity-15">
            #0826
          </div>

          <!-- Bouton Fermer (touch-friendly) -->
          <button id="close-quick-shop-btn" class="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 text-ink hover:text-alert focus:outline-none bg-surface/40 hover:bg-surface border border-surface transition-colors" aria-label="Fermer l'achat rapide">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div class="relative z-10 p-4 sm:p-6 md:p-8">
            
            <!-- Dossard & En-tête -->
            <div class="flex items-center gap-2 mb-3 sm:mb-4">
              <span id="quick-shop-dossard" class="dossard-badge">#0826</span>
              <span id="quick-shop-badge-new" class="hidden font-mono text-[10px] font-bold px-1.5 py-0.5 bg-alert text-ink uppercase tracking-wider">Nouveau</span>
              <span id="quick-shop-category" class="font-mono text-xs uppercase tracking-wider text-muted font-medium">Running // Unisexe</span>
            </div>

            <!-- Grille produit responsive -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
              
              <!-- Visuel & miniatures (5 cols sur desktop, aspect optimisé mobile) -->
              <div class="md:col-span-5 flex flex-col gap-2.5 sm:gap-3">
                <div class="aspect-[16/10] sm:aspect-[4/5] max-h-44 sm:max-h-none bg-[#F5F5F0] border border-surface overflow-hidden relative p-2 sm:p-0 flex items-center justify-center">
                  <img id="quick-shop-img" src="" alt="" class="w-full h-full object-contain sm:object-cover" onerror="this.src=''; this.parentElement.style.backgroundColor='var(--surface-light)';" />
                </div>
                <div id="quick-shop-thumbs" class="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                  <!-- Thumbnails -->
                </div>
              </div>

              <!-- Fiche d'achat rapide (7 cols) -->
              <div class="md:col-span-7 flex flex-col justify-between">
                <div>
                  <h2 id="quick-shop-title" class="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-[0.9] text-ink mb-1">
                    Nom Produit
                  </h2>
                  <p id="quick-shop-subtitle" class="font-sans text-xs text-muted font-medium mb-3 sm:mb-4">
                    Sous-titre
                  </p>

                  <!-- Prix -->
                  <div class="font-mono text-xl sm:text-2xl font-bold text-ink mb-3 sm:mb-4 flex items-baseline gap-2">
                    <span id="quick-shop-price">0 €</span>
                    <span id="quick-shop-orig-price" class="hidden line-through text-muted text-sm"></span>
                    <span class="text-[11px] font-normal text-muted">TVA incluse</span>
                  </div>

                  <!-- Résumé technique -->
                  <p id="quick-shop-desc" class="font-sans text-xs text-ink/80 leading-relaxed mb-4 sm:mb-6 border-y border-surface/70 py-2.5 sm:py-3">
                    Description
                  </p>

                  <!-- Sélecteur de pointures -->
                  <div class="mb-6">
                    <div class="flex justify-between items-baseline mb-2">
                      <span id="quick-shop-size-heading" class="font-sans text-xs uppercase tracking-wider font-bold text-ink">
                        Choisis ta pointure
                      </span>
                      <span id="quick-shop-size-status" class="font-mono text-[11px] text-muted">
                        Aucune sélection
                      </span>
                    </div>

                    <!-- Grille des tailles -->
                    <div id="quick-shop-sizes-grid" class="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                      <!-- Boutons tailles -->
                    </div>

                    <!-- Erreur taille -->
                    <p id="quick-shop-error-msg" class="hidden text-alert font-sans font-bold text-xs mt-2.5 flex items-center gap-1.5" role="alert">
                      <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <span>Choisis ta taille avant d'ajouter</span>
                    </p>
                  </div>
                </div>

                <!-- CTA et lien fiche complète -->
                <div>
                  <button 
                    id="quick-shop-add-btn" 
                    type="button" 
                    class="w-full bg-alert hover:opacity-95 text-ink font-sans font-black text-sm tracking-widest uppercase py-3.5 px-4 transition-transform active:scale-[0.99] flex items-center justify-center gap-2 mb-3"
                  >
                    <span>Ajouter au panier</span>
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>

                  <div class="flex items-center justify-between text-xs font-mono text-muted pt-2 border-t border-surface/50">
                    <span>Livraison 24/48h offerte</span>
                    <a id="quick-shop-full-link" href="#" class="text-ink hover:text-alert font-bold uppercase tracking-wider inline-flex items-center gap-1">
                      Fiche complète & télémétrie →
                    </a>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    `;

    document.body.appendChild(div.firstElementChild);
    overlay = document.getElementById('quick-shop-overlay');

    // Écouteurs de fermeture
    const closeBtn = document.getElementById('close-quick-shop-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeQuickShopModal);
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeQuickShopModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeQuickShopModal();
      }
    });

    return overlay;
  }

  function openQuickShopModal(productId) {
    const product = window.getProductById ? window.getProductById(productId) : null;
    if (!product) return;

    quickShopPreviousFocus = document.activeElement;
    quickShopSelectedSize = null;

    const overlay = ensureQuickShopModalInDOM();

    // Remplissage des données
    const watermark = document.getElementById('quick-shop-watermark');
    const dossard = document.getElementById('quick-shop-dossard');
    const badgeNew = document.getElementById('quick-shop-badge-new');
    const category = document.getElementById('quick-shop-category');
    const title = document.getElementById('quick-shop-title');
    const subtitle = document.getElementById('quick-shop-subtitle');
    const price = document.getElementById('quick-shop-price');
    const origPrice = document.getElementById('quick-shop-orig-price');
    const desc = document.getElementById('quick-shop-desc');
    const mainImg = document.getElementById('quick-shop-img');
    const thumbsContainer = document.getElementById('quick-shop-thumbs');
    const sizesGrid = document.getElementById('quick-shop-sizes-grid');
    const sizeHeading = document.getElementById('quick-shop-size-heading');
    const sizeStatus = document.getElementById('quick-shop-size-status');
    const errorMsg = document.getElementById('quick-shop-error-msg');
    const addBtn = document.getElementById('quick-shop-add-btn');
    const fullLink = document.getElementById('quick-shop-full-link');

    if (watermark) watermark.textContent = product.ref;
    if (dossard) dossard.textContent = product.ref;
    if (badgeNew) {
      if (product.isNew) badgeNew.classList.remove('hidden');
      else badgeNew.classList.add('hidden');
    }
    if (category) category.textContent = `${product.category} // ${product.gender}`;
    if (title) title.textContent = product.name;
    if (subtitle) subtitle.textContent = product.subtitle;
    if (desc) desc.textContent = product.description;

    const formattedPrice = window.formatPrice ? window.formatPrice(product.price) : `${product.price} €`;
    if (price) price.textContent = formattedPrice;

    if (origPrice) {
      if (product.originalPrice) {
        origPrice.textContent = window.formatPrice ? window.formatPrice(product.originalPrice) : `${product.originalPrice} €`;
        origPrice.classList.remove('hidden');
      } else {
        origPrice.classList.add('hidden');
      }
    }

    if (fullLink) {
      fullLink.href = `product.html?id=${product.id}`;
    }

    if (errorMsg) errorMsg.classList.add('hidden');
    if (sizeStatus) sizeStatus.textContent = 'Aucune sélection';
    if (sizeHeading) sizeHeading.textContent = product.isApparel ? 'Choisis ta taille' : 'Choisis ta pointure';

    // Images & Miniatures
    const images = product.images && product.images.length > 0 ? product.images : [''];
    if (mainImg) mainImg.src = images[0];

    if (thumbsContainer) {
      thumbsContainer.innerHTML = images.map((img, idx) => `
        <button 
          type="button" 
          data-qs-thumb="${idx}" 
          class="w-12 h-14 bg-[#F5F5F0] border ${idx === 0 ? 'border-ink opacity-100 ring-2 ring-ink ring-offset-1' : 'border-surface opacity-70'} overflow-hidden focus:outline-none shrink-0 transition-all"
          aria-label="Vue ${idx + 1}"
        >
          <img src="${img}" alt="" class="w-full h-full object-cover" onerror="this.src=''; this.parentElement.style.backgroundColor='var(--surface-light)';" />
        </button>
      `).join('');

      thumbsContainer.querySelectorAll('[data-qs-thumb]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-qs-thumb'), 10);
          if (images[idx] && mainImg) {
            mainImg.src = images[idx];
            thumbsContainer.querySelectorAll('[data-qs-thumb]').forEach(b => {
              b.classList.remove('border-ink', 'opacity-100', 'ring-2', 'ring-ink', 'ring-offset-1');
              b.classList.add('border-surface', 'opacity-70');
            });
            btn.classList.add('border-ink', 'opacity-100', 'ring-2', 'ring-ink', 'ring-offset-1');
            btn.classList.remove('border-surface', 'opacity-70');
          }
        });
      });
    }

    // Tailles (touch targets optimisés)
    if (sizesGrid) {
      sizesGrid.innerHTML = product.sizes.map(size => `
        <button 
          type="button" 
          data-qs-size="${size}" 
          class="qs-size-btn border border-surface bg-white hover:border-ink font-mono text-xs font-bold py-2 sm:py-2.5 px-1 text-center transition-all focus:outline-none shadow-xs"
          aria-label="Taille ${size}"
        >
          ${size}
        </button>
      `).join('');

      sizesGrid.querySelectorAll('[data-qs-size]').forEach(btn => {
        btn.addEventListener('click', () => {
          quickShopSelectedSize = btn.getAttribute('data-qs-size');
          if (errorMsg) errorMsg.classList.add('hidden');
          if (sizesGrid) sizesGrid.classList.remove('border', 'border-alert', 'p-1');
          if (sizeStatus) sizeStatus.textContent = `Taille choisie : ${quickShopSelectedSize}`;

          sizesGrid.querySelectorAll('[data-qs-size]').forEach(b => {
            b.classList.remove('bg-ink', 'text-white', 'border-ink');
            b.classList.add('bg-white', 'text-ink', 'border-surface');
          });

          btn.classList.add('bg-ink', 'text-white', 'border-ink');
          btn.classList.remove('bg-white', 'text-ink', 'border-surface');
        });
      });
    }

    // Gestion du bouton Ajouter au panier
    if (addBtn) {
      // Cloner pour purger les anciens écouteurs
      const newAddBtn = addBtn.cloneNode(true);
      addBtn.parentNode.replaceChild(newAddBtn, addBtn);

      newAddBtn.addEventListener('click', () => {
        if (!quickShopSelectedSize) {
          if (errorMsg) errorMsg.classList.remove('hidden');
          if (sizesGrid) {
            sizesGrid.classList.add('border', 'border-alert', 'p-1');
          }
          return;
        }

        if (window.addToCart) {
          const res = window.addToCart(product.id, quickShopSelectedSize, 1);
          if (res.success) {
            closeQuickShopModal();
            if (window.openCartDrawer) {
              window.openCartDrawer();
            }
          }
        }
      });
    }

    // Affichage du modal
    overlay.classList.add('open');
    document.body.classList.add('overflow-hidden');

    const closeBtn = document.getElementById('close-quick-shop-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeQuickShopModal() {
    const overlay = document.getElementById('quick-shop-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
    if (quickShopPreviousFocus && typeof quickShopPreviousFocus.focus === 'function') {
      quickShopPreviousFocus.focus();
    }
  }

  window.openQuickShop = openQuickShopModal;
  window.closeQuickShop = closeQuickShopModal;

  // Initialisation au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
  } else {
    initPage();
  }

})();
