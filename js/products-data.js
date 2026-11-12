/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * NIKE REDESIGN — STUDIO ÉDITORIAL
 * Données produits (12 références sportives)
 */

window.PRODUCTS_DATA = [
  {
    id: 'nike-kinetic-racer-01',
    ref: '#0826',
    name: 'KINETIC RACER 01',
    subtitle: 'Chaussure de compétition sur route & marathon',
    category: 'running',
    gender: 'Unisexe',
    price: 210,
    originalPrice: null,
    isNew: true,
    isFeatured: true,
    isApparel: false,
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      'img/products/nike-kinetic-racer-01-1.webp',
      'img/products/nike-kinetic-racer-01-2.webp',
      'img/products/nike-kinetic-racer-01-3.webp',
      'img/products/nike-kinetic-racer-01-4.webp'
    ],
    description: 'Forgée pour battre ton record personnel. Lame en fibre de carbone intégrée et mousse ZoomX super-critique conçue pour restituer 88 % d’énergie cinétique à chaque foulée sur bitume froid.',
    specs: {
      poids: '194 g (taille 42)',
      drop: '8 mm (36 mm / 28 mm)',
      plaque: 'Carbone FlyPlate courbée',
      surface: 'Asphalte & Marathon',
      empeigne: 'Vaporweave déperlant'
    }
  },
  {
    id: 'nike-aero-stride-matrix',
    ref: '#0827',
    name: 'AERO STRIDE MATRIX',
    subtitle: 'Chaussure d’entraînement tempo rapide',
    category: 'running',
    gender: 'Homme',
    price: 160,
    originalPrice: 185,
    isNew: false,
    isFeatured: true,
    isApparel: false,
    sizes: [40, 41, 42, 43, 44, 45],
    images: [
      'img/products/nike-aero-stride-matrix-1.webp',
      'img/products/nike-aero-stride-matrix-2.webp',
      'img/products/nike-aero-stride-matrix-3.webp',
      'img/products/nike-aero-stride-matrix-4.webp'
    ],
    description: 'L’équilibre chirurgical entre rebond agressif et stabilité au kilomètre 30. Semelle externe nervurée en caoutchouc à haute traction pour les virages serrés sous la pluie.',
    specs: {
      poids: '228 g (taille 42)',
      drop: '10 mm (34 mm / 24 mm)',
      amorti: 'Double unité Air Zoom avant-pied',
      surface: 'Route & Piste',
      respirabilite: 'Mesh technique 3D à zones ouvertes'
    }
  },
  {
    id: 'nike-vanguard-windbreaker',
    ref: '#0828',
    name: 'VANGUARD WINDBREAKER',
    subtitle: 'Veste technique coupe-vent ultralégère',
    category: 'homme',
    gender: 'Homme',
    price: 135,
    originalPrice: null,
    isNew: true,
    isFeatured: true,
    isApparel: true,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'img/products/nike-vanguard-windbreaker-1.webp',
      'img/products/nike-vanguard-windbreaker-2.webp',
      'img/products/nike-vanguard-windbreaker-3.webp',
      'img/products/nike-vanguard-windbreaker-4.webp'
    ],
    description: 'Une barrière invisible contre les bourrasques urbaines. Tissu ripstop japonais 48 g/m² déperlant avec fentes de ventilation dorsales découpées au laser.',
    specs: {
      matiere: '100 % nylon recyclé ripstop',
      poids: '112 g',
      compactage: 'Repliable dans sa poche poitrine',
      visibilite: 'Liserés rétro-réfléchissants 360°',
      coupe: 'Athlétique ajustée'
    }
  },
  {
    id: 'nike-tempo-shield-pro',
    ref: '#0829',
    name: 'TEMPO SHIELD PRO',
    subtitle: 'Chaussure longue distance tout-temps',
    category: 'femme',
    gender: 'Femme',
    price: 175,
    originalPrice: null,
    isNew: true,
    isFeatured: true,
    isApparel: false,
    sizes: [36, 37, 38, 39, 40, 41, 42],
    images: [
      'img/products/nike-tempo-shield-pro-1.webp',
      'img/products/nike-tempo-shield-pro-2.webp',
      'img/products/nike-tempo-shield-pro-3.webp',
      'img/products/nike-tempo-shield-pro-4.webp'
    ],
    description: 'Pensée pour accumuler les kilomètres quand la météo se dégrade. Membrane Shield imperméable et semelle Storm-Tread inspirée des pneus de Formule 1 pluie.',
    specs: {
      poids: '215 g (taille 38)',
      drop: '9 mm',
      membrane: 'Waterproof Shield respirante',
      semelle: 'Gomme Storm-Tread lamellisée',
      isolation: 'Intérieur thermo-régulateur'
    }
  },
  {
    id: 'nike-terrain-blitz-tr',
    ref: '#0830',
    name: 'TERRAIN BLITZ TR',
    subtitle: 'Chaussure de trail running technique',
    category: 'running',
    gender: 'Unisexe',
    price: 155,
    originalPrice: null,
    isNew: false,
    isFeatured: true,
    isApparel: false,
    sizes: [39, 40, 41, 42, 43, 44, 45],
    images: [
      'img/products/nike-terrain-blitz-tr-1.webp',
      'img/products/nike-terrain-blitz-tr-2.webp',
      'img/products/nike-terrain-blitz-tr-3.webp',
      'img/products/nike-terrain-blitz-tr-4.webp'
    ],
    description: 'Du béton aux crêtes rocheuses sans ralentir. Crampons multidirectionnels de 4,5 mm et plaque anti-roche rigide protégeant l’arche médiale.',
    specs: {
      crampons: '4,5 mm caoutchouc Vibram Megagrip',
      protection: 'Plaque Rock Plate segmentée',
      pare_pierre: 'Renfort TPU injecté pointe',
      poids: '280 g (taille 42)',
      drop: '6 mm'
    }
  },
  {
    id: 'nike-velocity-core-tank',
    ref: '#0831',
    name: 'VELOCITY CORE TANK',
    subtitle: 'Débardeur de course sans coutures',
    category: 'femme',
    gender: 'Femme',
    price: 55,
    originalPrice: 65,
    isNew: false,
    isFeatured: true,
    isApparel: true,
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'img/products/nike-velocity-core-tank-1.webp',
      'img/products/nike-velocity-core-tank-2.webp',
      'img/products/nike-velocity-core-tank-3.webp',
      'img/products/nike-velocity-core-tank-4.webp'
    ],
    description: 'Zéro frottement. Microfibre thermocollée avec trame jacquard aérée sur la colonne vertébrale pour une évacuation thermique continue.',
    specs: {
      poids: '68 g',
      coutures: 'Thermocollées ultrasons',
      technologie: 'Dri-FIT ADV à séchage rapide',
      entretien: 'Lavage froid cycle court'
    }
  },
  {
    id: 'nike-street-archive-low',
    ref: '#0832',
    name: 'STREET ARCHIVE LOW',
    subtitle: 'Sneaker d’inspiration athlétique 1984',
    category: 'lifestyle',
    gender: 'Unisexe',
    price: 120,
    originalPrice: null,
    isNew: true,
    isFeatured: true,
    isApparel: false,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      'img/products/nike-street-archive-low-1.webp',
      'img/products/nike-street-archive-low-2.webp',
      'img/products/nike-street-archive-low-3.webp',
      'img/products/nike-street-archive-low-4.webp'
    ],
    description: 'L’épure brute des pistes de Tokyo transposée au bitume parisien. Cuir pleine fleur mat, languette en mousse brute apparente et semelle vulcanisée rigide.',
    specs: {
      cuir: 'Pleine fleur tannage végétal',
      languette: 'Mousse brute découpée',
      semelle: 'Caoutchouc naturel résistant',
      usage: 'Quotidien urbain & marche active'
    }
  },
  {
    id: 'nike-asphalt-draft-track',
    ref: '#0833',
    name: 'ASPHALT DRAFT TRACK',
    subtitle: 'Pantalon de survêtement fuselé technique',
    category: 'homme',
    gender: 'Homme',
    price: 95,
    originalPrice: null,
    isNew: false,
    isFeatured: true,
    isApparel: true,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'img/products/nike-asphalt-draft-track-1.webp',
      'img/products/nike-asphalt-draft-track-2.webp',
      'img/products/nike-asphalt-draft-track-3.webp',
      'img/products/nike-asphalt-draft-track-4.webp'
    ],
    description: 'Coupe fuselée préformée pour la foulée. Zips étanches aux chevilles pour un enfilage instantané par-dessus les pointes de piste.',
    specs: {
      matiere: 'Polyester stretch 4 directions',
      chevilles: 'Zips étanches inversés YKK',
      poches: 'Deux zippées dont une compartimentée pour téléphone'
    }
  },
  {
    id: 'nike-cadence-carbon-fly',
    ref: '#0834',
    name: 'CADENCE CARBON FLY',
    subtitle: 'Chaussure de semi-marathon ultra-propulsive',
    category: 'running',
    gender: 'Homme',
    price: 240,
    originalPrice: null,
    isNew: true,
    isFeatured: false,
    isApparel: false,
    sizes: [40, 41, 42, 43, 44, 45],
    images: [
      'img/products/nike-cadence-carbon-fly-1.webp',
      'img/products/nike-cadence-carbon-fly-2.webp',
      'img/products/nike-cadence-carbon-fly-3.webp',
      'img/products/nike-cadence-carbon-fly-4.webp'
    ],
    description: 'Le summum de l’ingénierie sportive. Géométrie rocker accentuée qui projette le centre de gravité vers l’avant dès l’amorce de l’impact talon.',
    specs: {
      poids: '188 g',
      drop: '7 mm',
      dynamisme: 'Mousse PEBA expansée ultra-résiliente',
      usage: 'Compétitions 10k à Marathon'
    }
  },
  {
    id: 'nike-endurance-split-short',
    ref: '#0835',
    name: 'ENDURANCE SPLIT SHORT',
    subtitle: 'Short fendu d’athlétisme 3 pouces',
    category: 'homme',
    gender: 'Homme',
    price: 65,
    originalPrice: null,
    isNew: false,
    isFeatured: false,
    isApparel: true,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'img/products/nike-endurance-split-short-1.webp',
      'img/products/nike-endurance-split-short-2.webp',
      'img/products/nike-endurance-split-short-3.webp',
      'img/products/nike-endurance-split-short-4.webp'
    ],
    description: 'Liberté d’amplitude intégrale. Fente latérale profonde avec slip intégré en maille antibactérienne et passants pour gels énergétiques.',
    specs: {
      longueur: 'Entrejambe 7,5 cm (3")',
      slip: 'Maille aérée intégrée sans frottement',
      rangement: 'Poche arrière zippée anti-transpiration'
    }
  },
  {
    id: 'nike-stratum-cushion-max',
    ref: '#0836',
    name: 'STRATUM CUSHION MAX',
    subtitle: 'Chaussure de récupération & régénération',
    category: 'femme',
    gender: 'Femme',
    price: 170,
    originalPrice: 190,
    isNew: false,
    isFeatured: false,
    isApparel: false,
    sizes: [36, 37, 38, 39, 40, 41, 42],
    images: [
      'img/products/nike-stratum-cushion-max-1.webp',
      'img/products/nike-stratum-cushion-max-2.webp',
      'img/products/nike-stratum-cushion-max-3.webp',
      'img/products/nike-stratum-cushion-max-4.webp'
    ],
    description: 'Le lendemain d’une grosse séance. Semelle géante amortissante de 40 mm absorbant les ondes de choc pour soulager genoux et périostes.',
    specs: {
      epaisseur_semelle: '40 mm au talon',
      mousse: 'Dual-density plush foam',
      drop: '6 mm',
      usage: 'Footing de récupération & longues sorties douces'
    }
  },
  {
    id: 'nike-pulse-merino-layer',
    ref: '#0837',
    name: 'PULSE MERINO LAYER',
    subtitle: 'Haut première couche en laine mérinos technique',
    category: 'lifestyle',
    gender: 'Unisexe',
    price: 90,
    originalPrice: null,
    isNew: true,
    isFeatured: false,
    isApparel: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'img/products/nike-pulse-merino-layer-1.webp',
      'img/products/nike-pulse-merino-layer-2.webp',
      'img/products/nike-pulse-merino-layer-3.webp',
      'img/products/nike-pulse-merino-layer-4.webp'
    ],
    description: 'Régulation thermique naturelle par tous les temps. 65 % mérinos traçable et 35 % polyamide pour la résistance aux frottements du sac d’hydratation.',
    specs: {
      grammage: '160 g/m²',
      proprietes: 'Anti-odeurs naturel & hypoallergénique',
      passe_pouces: 'Manchons intégrés aux poignets'
    }
  }
];

// Helper pour retrouver un produit par son ID
window.getProductById = function(id) {
  if (!id) return null;
  return window.PRODUCTS_DATA.find(p => p.id === id) || null;
};
