/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * NIKE REDESIGN — STUDIO ÉDITORIAL
 * Layout global : Header, Tiroir Panier et Footer injectés dynamiquement
 */

(function () {
  'use strict';

  // Template HTML du Header
  function renderHeader() {
    return `
      <header id="site-header" class="site-header fixed top-0 inset-x-0 z-40 px-4 md:px-8 py-3 md:py-4 border-b border-transparent">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          
          <!-- Wordmark / Marque textuelle éditoriale (aucun swoosh officiel) -->
          <a href="index.html" class="flex items-center gap-2 group focus:outline-none" aria-label="Accueil Nike Studio Éditorial">
            <span class="font-display font-black text-2xl md:text-3xl tracking-tight uppercase group-hover:text-alert transition-colors">
              NIKE <span class="font-sans font-light text-xs tracking-widest text-muted border-l border-current pl-2 ml-1">ÉDITORIAL</span>
            </span>
          </a>

          <!-- Navigation principale (Desktop) -->
          <nav class="hidden md:flex items-center space-x-8" aria-label="Navigation principale">
            <a href="products.html?category=homme" class="font-sans text-xs tracking-widest uppercase font-semibold hover:text-alert transition-colors">Homme</a>
            <a href="products.html?category=femme" class="font-sans text-xs tracking-widest uppercase font-semibold hover:text-alert transition-colors">Femme</a>
            <a href="products.html?category=running" class="font-sans text-xs tracking-widest uppercase font-semibold hover:text-alert transition-colors">Running</a>
            <a href="products.html?category=lifestyle" class="font-sans text-xs tracking-widest uppercase font-semibold hover:text-alert transition-colors">Lifestyle</a>
            <a href="products.html" class="font-sans text-xs tracking-widest uppercase font-semibold hover:text-alert transition-colors">Toute la collection</a>
          </nav>

          <!-- Actions Header (Panier + Burger Mobile) -->
          <div class="flex items-center space-x-3 md:space-x-4">
            
            <!-- Bouton Panier -->
            <button id="open-cart-btn" class="flex items-center gap-2 p-1.5 focus:outline-none relative group" aria-label="Ouvrir le panier">
              <!-- Icône sac shopping SVG avec currentColor -->
              <svg class="w-5 h-5 text-current group-hover:text-alert transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span class="font-mono text-xs font-bold tracking-tight bg-alert text-ink px-1.5 py-0.5 leading-none" id="cart-badge-count">
                0
              </span>
            </button>

            <!-- Burger Menu Mobile -->
            <button id="mobile-menu-toggle" class="md:hidden p-1.5 focus:outline-none text-current" aria-label="Menu" aria-expanded="false" aria-controls="mobile-nav-drawer">
              <svg id="burger-icon" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>

        </div>

        <!-- Menu Mobile Drawer / Dropdown -->
        <div id="mobile-nav-drawer" class="hidden md:hidden border-t border-surface mt-3 pt-4 pb-2 bg-white text-ink shadow-lg" aria-hidden="true">
          <nav class="flex flex-col space-y-3 px-2">
            <a href="products.html?category=homme" class="font-display font-extrabold text-2xl uppercase tracking-wider hover:text-alert">Homme</a>
            <a href="products.html?category=femme" class="font-display font-extrabold text-2xl uppercase tracking-wider hover:text-alert">Femme</a>
            <a href="products.html?category=running" class="font-display font-extrabold text-2xl uppercase tracking-wider hover:text-alert">Running</a>
            <a href="products.html?category=lifestyle" class="font-display font-extrabold text-2xl uppercase tracking-wider hover:text-alert">Lifestyle</a>
            <a href="products.html" class="font-display font-extrabold text-2xl uppercase tracking-wider hover:text-alert text-muted pt-2 border-t border-surface">Toute la collection (12 réf.)</a>
          </nav>
        </div>
      </header>
    `;
  }

  // Template HTML du Tiroir Panier (Cart Drawer)
  function renderCartDrawer() {
    return `
      <!-- Overlay Panier -->
      <div id="cart-overlay" class="cart-overlay fixed inset-0 z-50 bg-ink/60 flex justify-end pointer-events-none" aria-hidden="true">
        <!-- Boîte de dialogue Panier -->
        <div id="cart-drawer-panel" class="cart-drawer w-full max-w-md bg-white text-ink h-full flex flex-col pointer-events-auto border-l border-surface shadow-2xl relative" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          
          <!-- En-tête Panier -->
          <div class="px-6 py-5 border-b border-surface flex items-center justify-between bg-white">
            <div class="flex items-baseline gap-3">
              <h2 id="cart-title" class="font-display font-black text-2xl tracking-tight uppercase">Ton Panier</h2>
              <span id="cart-drawer-count" class="font-mono text-xs text-muted font-bold">(0 article)</span>
            </div>
            <button id="close-cart-btn" class="p-2 text-ink hover:text-alert focus:outline-none" aria-label="Fermer le panier">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Liste des articles -->
          <div id="cart-items-container" class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <!-- Injecté dynamiquement par updateCartUI() -->
          </div>

          <!-- Pied du Panier (Total et Checkout) -->
          <div id="cart-footer" class="p-6 border-t border-surface bg-surface/30">
            <div class="flex justify-between items-baseline mb-2">
              <span class="font-sans text-xs uppercase tracking-wider text-muted font-semibold">Sous-total</span>
              <span id="cart-total-amount" class="font-mono font-bold text-xl text-ink">0 €</span>
            </div>
            <p class="font-sans text-xs text-muted mb-4">Expédition express offerte sur toutes les commandes étudiantes.</p>
            
            <button id="checkout-btn" class="w-full bg-alert hover:opacity-95 text-ink font-sans font-bold text-sm tracking-wider uppercase py-3.5 px-4 transition-transform active:scale-[0.99] text-center block">
              Passer la commande
            </button>
          </div>

        </div>
      </div>
    `;
  }

  // Template HTML du Footer
  function renderFooter() {
    return `
      <footer class="border-t border-surface bg-bg text-ink pt-16 pb-12 px-4 md:px-8">
        <div class="max-w-7xl mx-auto">
          
          <!-- Titre manifeste haut de page -->
          <div class="pb-12 border-b border-surface mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p class="font-mono text-xs uppercase text-muted tracking-widest mb-2">// ÉDITION ATHLÉTIQUE 2026</p>
              <h2 class="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter max-w-2xl leading-[0.9]">
                L'Asphalte ne ment jamais. Chaque seconde se paie.
              </h2>
            </div>
            <a href="products.html" class="inline-flex items-center gap-2 border border-ink px-5 py-3 font-sans text-xs uppercase tracking-widest font-bold hover:bg-ink hover:text-bg transition-colors w-fit">
              Explorer le catalogue complet →
            </a>
          </div>

          <!-- Grille de navigation éditoriale -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-surface text-sm">
            <div>
              <h3 class="font-mono text-xs uppercase font-bold text-muted tracking-wider mb-4">Catégories</h3>
              <ul class="space-y-2">
                <li><a href="products.html?category=running" class="hover:text-alert font-medium">Running Performance</a></li>
                <li><a href="products.html?category=homme" class="hover:text-alert font-medium">Collection Homme</a></li>
                <li><a href="products.html?category=femme" class="hover:text-alert font-medium">Collection Femme</a></li>
                <li><a href="products.html?category=lifestyle" class="hover:text-alert font-medium">Urbain & Lifestyle</a></li>
              </ul>
            </div>

            <div>
              <h3 class="font-mono text-xs uppercase font-bold text-muted tracking-wider mb-4">Ingénierie</h3>
              <ul class="space-y-2 text-muted">
                <li>Technologie Mousse ZoomX</li>
                <li>Lame Carbone FlyPlate</li>
                <li>Membrane Shield All-Weather</li>
                <li>Tissu Microfibre Vaporweave</li>
              </ul>
            </div>

            <div>
              <h3 class="font-mono text-xs uppercase font-bold text-muted tracking-wider mb-4">Assistance & Suivi</h3>
              <ul class="space-y-2">
                <li><a href="#" class="hover:text-alert">Guide des pointures</a></li>
                <li><a href="#" class="hover:text-alert">Retours sous 30 jours</a></li>
                <li><a href="#" class="hover:text-alert">Entretien de tes chaussures</a></li>
                <li><a href="#" class="hover:text-alert">Contact rédaction</a></li>
              </ul>
            </div>

            <div>
              <h3 class="font-mono text-xs uppercase font-bold text-muted tracking-wider mb-4">Bulletin de bord</h3>
              <p class="text-xs text-muted mb-3">Reçois les fiches techniques des lancements avant leur parution.</p>
              <form class="flex" onsubmit="event.preventDefault(); alert('Merci pour ton inscription au bulletin !');">
                <input type="email" placeholder="Ton e-mail" required class="bg-surface px-3 py-2 text-xs w-full text-ink border border-surface focus:outline-none focus:border-ink placeholder-muted" />
                <button type="submit" class="bg-ink text-bg font-sans text-xs uppercase font-bold px-3 py-2 hover:bg-alert hover:text-ink transition-colors">
                  OK
                </button>
              </form>
            </div>
          </div>

          <!-- Mentions légales obligatoires & crédits -->
          <div class="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-muted gap-4">
            <p>
              Image générée par IA (StockCake, domaine public). Projet étudiant — non affilié à Nike.
            </p>
            <p class="font-mono">
              PARIS // 48.8566° N, 2.3522° E — PROJET REDESIGN
            </p>
          </div>

        </div>
      </footer>
    `;
  }

  // Initialisation du layout et des écouteurs
  function initLayout() {
    // 1. Injection du Header
    const headerPlaceholder = document.getElementById('header-mount') || document.body;
    if (!document.getElementById('site-header')) {
      const headerElem = document.createElement('div');
      headerElem.innerHTML = renderHeader();
      if (document.getElementById('header-mount')) {
        headerPlaceholder.appendChild(headerElem.firstElementChild);
      } else {
        document.body.insertAdjacentElement('afterbegin', headerElem.firstElementChild);
      }
    }

    // 2. Injection du Cart Drawer
    if (!document.getElementById('cart-overlay')) {
      const drawerElem = document.createElement('div');
      drawerElem.innerHTML = renderCartDrawer();
      document.body.appendChild(drawerElem.firstElementChild);
    }

    // 3. Injection du Footer
    const footerMount = document.getElementById('footer-mount');
    if (footerMount) {
      footerMount.innerHTML = renderFooter();
    } else if (!document.querySelector('footer')) {
      const footerElem = document.createElement('div');
      footerElem.innerHTML = renderFooter();
      document.body.appendChild(footerElem.firstElementChild);
    }

    // 4. Observer sentinelle pour le Header (IntersectionObserver)
    setupHeaderScrollObserver();

    // 5. Écouteurs Panier (ouverture / fermeture / piège de focus)
    setupCartDrawerEvents();

    // 6. Menu burger mobile
    setupMobileMenu();

    // 7. Mise à jour de l'UI du panier
    updateCartUI();

    // Écoute de l'événement global de mise à jour du panier
    window.addEventListener('cart:updated', () => {
      updateCartUI();
    });
  }

  // Configuration de l'IntersectionObserver pour le header
  function setupHeaderScrollObserver() {
    const header = document.getElementById('site-header');
    if (!header) return;

    // Si la page impose l'état solide dès le départ (pages sans hero comme catalogue ou détail)
    if (document.body.dataset.header === 'solid') {
      header.classList.add('is-solid');
      return;
    }

    // Sur index.html : cherche la sentinelle en haut du hero
    const sentry = document.getElementById('hero-sentry');
    if (sentry) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            header.classList.add('is-solid');
          } else {
            // Uniquement si le menu mobile n'est pas ouvert
            if (!header.classList.contains('menu-open')) {
              header.classList.remove('is-solid');
            }
          }
        });
      }, {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px 0px 0px'
      });

      observer.observe(sentry);
    } else {
      // S'il n'y a pas de sentinelle trouvée, passer en solide
      header.classList.add('is-solid');
    }
  }

  // Événements du tiroir panier
  let previousFocusedElement = null;

  function openCart() {
    const overlay = document.getElementById('cart-overlay');
    if (!overlay) return;
    previousFocusedElement = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    updateCartUI();

    const closeBtn = document.getElementById('close-cart-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeCart() {
    const overlay = document.getElementById('cart-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
    if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
      previousFocusedElement.focus();
    }
  }

  window.openCartDrawer = openCart;
  window.closeCartDrawer = closeCart;

  function setupCartDrawerEvents() {
    const openBtn = document.getElementById('open-cart-btn');
    const closeBtn = document.getElementById('close-cart-btn');
    const overlay = document.getElementById('cart-overlay');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeCart();
      });
    }

    if (overlay) {
      // Fermer en cliquant sur le voile noir à côté du tiroir
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeCart();
        }
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        const count = window.getCartCount ? window.getCartCount() : 0;
        if (count === 0) {
          alert('Ton panier est vide. Découvre nos nouveautés !');
          return;
        }
        alert('Validation de commande : cette boutique est un projet étudiant de démonstration.');
      });
    }

    // Touche Echap pour fermer
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
        closeCart();
      }
    });
  }

  // Menu mobile
  function setupMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const header = document.getElementById('site-header');
    if (!toggle || !drawer || !header) return;

    toggle.addEventListener('click', () => {
      const isOpen = !drawer.classList.contains('hidden');
      if (isOpen) {
        drawer.classList.add('hidden');
        drawer.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        header.classList.remove('menu-open');
        // Rétablir état sentinelle si présent
        const sentry = document.getElementById('hero-sentry');
        if (sentry && document.body.dataset.header !== 'solid') {
          const rect = sentry.getBoundingClientRect();
          if (rect.top >= -50) {
            header.classList.remove('is-solid');
          }
        }
      } else {
        drawer.classList.remove('hidden');
        drawer.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        header.classList.add('menu-open', 'is-solid');
      }
    });
  }

  // Rendu des articles dans le panier
  function updateCartUI() {
    const count = window.getCartCount ? window.getCartCount() : 0;
    const total = window.getCartTotal ? window.getCartTotal() : 0;
    const cart = window.getCart ? window.getCart() : [];

    // Badges compteurs
    const badgeCount = document.getElementById('cart-badge-count');
    if (badgeCount) badgeCount.textContent = count;

    const drawerCount = document.getElementById('cart-drawer-count');
    if (drawerCount) {
      drawerCount.textContent = `(${count} ${count > 1 ? 'articles' : 'article'})`;
    }

    const totalElem = document.getElementById('cart-total-amount');
    if (totalElem) {
      totalElem.textContent = window.formatPrice ? window.formatPrice(total) : `${total} €`;
    }

    const container = document.getElementById('cart-items-container');
    const footer = document.getElementById('cart-footer');
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-center py-12 px-4">
          <svg class="w-12 h-12 text-muted mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
          </svg>
          <p class="font-sans font-medium text-sm text-ink mb-2">Ton panier est vide.</p>
          <p class="font-sans text-xs text-muted mb-6">Explore notre sélection de performance pour débuter ta commande.</p>
          <a href="products.html" onclick="window.closeCartDrawer && window.closeCartDrawer();" class="inline-block border border-ink text-ink hover:bg-ink hover:text-bg font-sans text-xs uppercase tracking-widest font-bold py-3 px-6 transition-colors">
            Voir les nouveautés
          </a>
        </div>
      `;
      if (footer) footer.classList.add('opacity-50');
      return;
    }

    if (footer) footer.classList.remove('opacity-50');

    // Génération de la liste des articles
    let html = '';
    cart.forEach(item => {
      const product = window.getProductById ? window.getProductById(item.id) : null;
      if (!product) return;

      const itemImg = product.images && product.images[0] ? product.images[0] : '';
      const unitPrice = window.formatPrice ? window.formatPrice(product.price) : `${product.price} €`;
      const itemTotal = window.formatPrice ? window.formatPrice(product.price * item.quantity) : `${product.price * item.quantity} €`;

      html += `
        <div class="flex gap-4 p-3 bg-white border border-surface shadow-xs relative group">
          
          <!-- Image miniature lumineuse -->
          <div class="w-20 h-24 bg-[#F5F5F0] shrink-0 overflow-hidden relative border border-surface/50">
            <img src="${itemImg}" alt="${product.name}" class="w-full h-full object-cover" onerror="this.src=''; this.parentElement.style.backgroundColor='var(--surface-light)';" />
            <span class="absolute top-1 left-1 font-mono text-[9px] font-bold px-1 bg-ink text-white">
              ${product.ref}
            </span>
          </div>

          <!-- Détails & contrôles -->
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start gap-2">
                <a href="product.html?id=${product.id}" class="font-display font-extrabold text-lg leading-tight uppercase hover:text-alert">
                  ${product.name}
                </a>
                <!-- Bouton supprimer -->
                <button onclick="window.removeFromCart('${product.id}', '${item.size}');" class="text-muted hover:text-alert p-0.5" aria-label="Supprimer cet article">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <p class="font-mono text-xs text-muted mt-1">Taille : <span class="font-bold text-ink">${item.size}</span></p>
            </div>

            <!-- Prix et Quantité -->
            <div class="flex items-center justify-between mt-3 pt-2 border-t border-surface/50">
              <div class="flex items-center border border-ink bg-white">
                <button onclick="window.updateQuantity('${product.id}', '${item.size}', -1);" class="px-2 py-0.5 text-xs font-mono font-bold hover:bg-surface focus:outline-none" aria-label="Diminuer la quantité">-</button>
                <span class="px-2.5 py-0.5 text-xs font-mono font-bold">${item.quantity}</span>
                <button onclick="window.updateQuantity('${product.id}', '${item.size}', 1);" class="px-2 py-0.5 text-xs font-mono font-bold hover:bg-surface focus:outline-none" aria-label="Augmenter la quantité">+</button>
              </div>
              <span class="font-mono font-bold text-sm text-ink">${itemTotal}</span>
            </div>

          </div>

        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Exposition globale pour tests et exécution DOMContentLoaded
  window.updateCartUI = updateCartUI;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }

})();
