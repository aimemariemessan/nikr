import { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'nike-kinetic-racer-01',
    name: 'KINETIC RACER 01',
    subtitle: 'Chaussure de compétition sur route & marathon',
    category: 'running',
    discipline: 'running',
    gender: 'Unisexe',
    price: 210,
    sizes: ['39', '40', '41', '42', '43', '44', '45', '46'],
    images: [
      '/img/products/nike-kinetic-racer-01-1.webp',
      '/img/products/nike-kinetic-racer-01-2.webp',
      '/img/products/nike-kinetic-racer-01-3.webp',
      '/img/products/nike-kinetic-racer-01-4.webp'
    ],
    description: 'Forgée pour battre ton record personnel. Lame en fibre de carbone intégrée et mousse ZoomX super-critique conçue pour restituer 88 % d’énergie cinétique à chaque foulée sur bitume froid.',
    isNew: true,
    isApparel: false,
    ref: '#0826',
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
    name: 'AERO STRIDE MATRIX',
    subtitle: 'Chaussure d’entraînement tempo rapide',
    category: 'running',
    discipline: 'running',
    gender: 'Homme',
    price: 160,
    originalPrice: 185,
    sizes: ['40', '41', '42', '43', '44', '45'],
    images: [
      '/img/products/nike-aero-stride-matrix-1.webp',
      '/img/products/nike-aero-stride-matrix-2.webp',
      '/img/products/nike-aero-stride-matrix-3.webp',
      '/img/products/nike-aero-stride-matrix-4.webp'
    ],
    description: 'Le compromis parfait entre amorti protecteur et dynamisme pour tes blocs au seuil. Double unité Air Zoom à l’avant-pied sur semelle intermédiaire ReactX durable.',
    isNew: false,
    isApparel: false,
    ref: '#0827',
    specs: {
      poids: '238 g (taille 42)',
      drop: '10 mm (33 mm / 23 mm)',
      plaque: 'Nylon composite',
      surface: 'Route & Piste',
      empeigne: 'Engineered Mesh respirant'
    }
  },
  {
    id: 'nike-vanguard-windbreaker',
    name: 'VANGUARD WINDBREAKER',
    subtitle: 'Veste technique coupe-vent ultralégère',
    category: 'homme',
    discipline: 'training',
    gender: 'Homme',
    price: 135,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/img/products/nike-vanguard-windbreaker-1.webp',
      '/img/products/nike-vanguard-windbreaker-2.webp',
      '/img/products/nike-vanguard-windbreaker-3.webp',
      '/img/products/nike-vanguard-windbreaker-4.webp'
    ],
    description: 'Une barrière invisible contre les bourrasques. Tissu micro-ripstop japonais 15 deniers avec traitement déperlant DWR sans PFC et aérations dorsales découpées au laser.',
    isNew: true,
    isApparel: true,
    ref: '#0828',
    specs: {
      poids: '98 g (taille M)',
      matière: '100 % Polyamide ripstop',
      respirabilité: '15 000 g/m²/24h',
      coupe: 'Athlétique ajustée'
    }
  },
  {
    id: 'nike-tempo-shield-pro',
    name: 'TEMPO SHIELD PRO',
    subtitle: 'Chaussure longue distance tout-temps',
    category: 'femme',
    discipline: 'running',
    gender: 'Femme',
    price: 175,
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    images: [
      '/img/products/nike-tempo-shield-pro-1.webp',
      '/img/products/nike-tempo-shield-pro-2.webp',
      '/img/products/nike-tempo-shield-pro-3.webp',
      '/img/products/nike-tempo-shield-pro-4.webp'
    ],
    description: 'Conçue pour ne jamais annuler une sortie à cause de la pluie. Semelle d’usure Storm-Tread inspirée des pneus d’hiver et membrane protectrice montante à la cheville.',
    isNew: true,
    isApparel: false,
    ref: '#0829',
    specs: {
      poids: '225 g (taille 38)',
      drop: '9 mm (35 mm / 26 mm)',
      surface: 'Béton mouillé & Feuilles',
      empeigne: 'Shield déperlant 360°'
    }
  },
  {
    id: 'nike-terrain-blitz-tr',
    name: 'TERRAIN BLITZ TR',
    subtitle: 'Chaussure de trail running technique',
    category: 'running',
    discipline: 'running',
    gender: 'Unisexe',
    price: 155,
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    images: [
      '/img/products/nike-terrain-blitz-tr-1.webp',
      '/img/products/nike-terrain-blitz-tr-2.webp',
      '/img/products/nike-terrain-blitz-tr-3.webp',
      '/img/products/nike-terrain-blitz-tr-4.webp'
    ],
    description: 'Adhérence maximale sur sentiers instables et sous-bois humides. Crampons multidirectionnels en caoutchouc haute abrasion Vibram Megagrip et plaque anti-roches sous la voûte.',
    isNew: false,
    isApparel: false,
    ref: '#0830',
    specs: {
      poids: '280 g (taille 42)',
      drop: '4 mm (30 mm / 26 mm)',
      crampons: '5 mm chevrons',
      surface: 'Sentiers techniques & Boue'
    }
  },
  {
    id: 'nike-velocity-core-tank',
    name: 'VELOCITY CORE TANK',
    subtitle: 'Débardeur de course sans coutures',
    category: 'femme',
    discipline: 'training',
    gender: 'Femme',
    price: 55,
    originalPrice: 65,
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      '/img/products/nike-velocity-core-tank-1.webp',
      '/img/products/nike-velocity-core-tank-2.webp',
      '/img/products/nike-velocity-core-tank-3.webp',
      '/img/products/nike-velocity-core-tank-4.webp'
    ],
    description: 'Léger comme l’air. Tricotage circulaire d’un seul tenant éliminant tout frottement sur les longues distances estivales. Séchage ultra-rapide par capillarité active.',
    isNew: false,
    isApparel: true,
    ref: '#0831',
    specs: {
      poids: '52 g (taille S)',
      matière: '85 % Polyester recyclé, 15 % Élasthanne',
      coupe: 'Dos nageur ergonomique'
    }
  },
  {
    id: 'nike-street-archive-low',
    name: 'STREET ARCHIVE LOW',
    subtitle: 'Sneaker d’inspiration athlétique 1984',
    category: 'lifestyle',
    discipline: 'lifestyle',
    gender: 'Unisexe',
    price: 120,
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    images: [
      '/img/products/nike-street-archive-low-1.webp',
      '/img/products/nike-street-archive-low-2.webp',
      '/img/products/nike-street-archive-low-3.webp',
      '/img/products/nike-street-archive-low-4.webp'
    ],
    description: 'L’héritage de la piste transposé pour la vie quotidienne. Cuir pleine fleur à grain naturel, semelle cupsole en caoutchouc cousue et languette en mousse brute apparente.',
    isNew: true,
    isApparel: false,
    ref: '#0832',
    specs: {
      poids: '340 g (taille 42)',
      tige: 'Cuir suédé & cuir lisse',
      semelle: 'Caoutchouc naturel gomme'
    }
  },
  {
    id: 'nike-asphalt-draft-track',
    name: 'ASPHALT DRAFT TRACK',
    subtitle: 'Pantalon de survêtement fuselé technique',
    category: 'homme',
    discipline: 'training',
    gender: 'Homme',
    price: 95,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/img/products/nike-asphalt-draft-track-1.webp',
      '/img/products/nike-asphalt-draft-track-2.webp',
      '/img/products/nike-asphalt-draft-track-3.webp',
      '/img/products/nike-asphalt-draft-track-4.webp'
    ],
    description: 'Une coupe fuselée moderne pensée pour l’échauffement sur piste et les déplacements urbains. Zips étanches aux chevilles permettant de l’enfiler par-dessus les chaussures.',
    isNew: false,
    isApparel: true,
    ref: '#0833',
    specs: {
      poids: '295 g (taille M)',
      matière: 'Tissu stretch quadri-directionnel',
      poches: '3 poches zippées discrètes',
      taille: 'Cordon de serrage plat technique'
    }
  },
  {
    id: 'nike-cadence-carbon-fly',
    name: 'CADENCE CARBON FLY',
    subtitle: 'Chaussure de semi-marathon ultra-propulsive',
    category: 'running',
    discipline: 'running',
    gender: 'Homme',
    price: 240,
    sizes: ['40', '41', '42', '43', '44', '45'],
    images: [
      '/img/products/nike-cadence-carbon-fly-1.webp',
      '/img/products/nike-cadence-carbon-fly-2.webp',
      '/img/products/nike-cadence-carbon-fly-3.webp',
      '/img/products/nike-cadence-carbon-fly-4.webp'
    ],
    description: 'L’arme absolue pour écraser les 21,097 km. Rigidité longitudinale maximale et géométrie rocker agressive qui projette le bassin vers l’avant sans déperdition d’énergie.',
    isNew: true,
    isApparel: false,
    ref: '#0834',
    specs: {
      poids: '185 g (taille 42)',
      drop: '8 mm (38 mm / 30 mm)',
      plaque: 'Full Carbon 3D Shape'
    }
  },
  {
    id: 'nike-endurance-split-short',
    name: 'ENDURANCE SPLIT SHORT',
    subtitle: 'Short fendu d’athlétisme 3 pouces',
    category: 'homme',
    discipline: 'training',
    gender: 'Homme',
    price: 65,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/img/products/nike-endurance-split-short-1.webp',
      '/img/products/nike-endurance-split-short-2.webp',
      '/img/products/nike-endurance-split-short-3.webp',
      '/img/products/nike-endurance-split-short-4.webp'
    ],
    description: 'Liberté totale de foulée. Fente latérale profonde sur 3 pouces, slip intégré en maille respirante anti-irritations et poche arrière sécurisée pour gels énergétiques.',
    isNew: false,
    isApparel: true,
    ref: '#0835',
    specs: {
      longueur: '7,6 cm (3 pouces)',
      poids: '68 g (taille M)',
      détails: 'Passants pour dossard intégrés'
    }
  },
  {
    id: 'nike-stratum-cushion-max',
    name: 'STRATUM CUSHION MAX',
    subtitle: 'Chaussure de récupération & régénération',
    category: 'femme',
    discipline: 'training',
    gender: 'Femme',
    price: 170,
    originalPrice: 190,
    sizes: ['36', '37', '38', '39', '40', '41'],
    images: [
      '/img/products/nike-stratum-cushion-max-1.webp',
      '/img/products/nike-stratum-cushion-max-2.webp',
      '/img/products/nike-stratum-cushion-max-3.webp',
      '/img/products/nike-stratum-cushion-max-4.webp'
    ],
    description: 'Le soulagement des articulations après les semaines à plus de 80 km. Semelle intermédiaire surdimensionnée avec 40 mm de mousse ultra-moelleuse absorbant 94 % des chocs.',
    isNew: false,
    isApparel: false,
    ref: '#0836',
    specs: {
      poids: '260 g (taille 38)',
      drop: '6 mm (40 mm / 34 mm)',
      géométrie: 'Maximaliste rocker doux'
    }
  },
  {
    id: 'nike-pulse-merino-layer',
    name: 'PULSE MERINO LAYER',
    subtitle: 'Haut première couche en laine mérinos technique',
    category: 'lifestyle',
    discipline: 'lifestyle',
    gender: 'Unisexe',
    price: 90,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/img/products/nike-pulse-merino-layer-1.webp',
      '/img/products/nike-pulse-merino-layer-2.webp',
      '/img/products/nike-pulse-merino-layer-3.webp',
      '/img/products/nike-pulse-merino-layer-4.webp'
    ],
    description: 'Thermorégulation naturelle par excellence. Laine mérinos 18,5 microns ultra-douce associée à un fil de polyamide pour une durabilité accrue. Ne retient aucune odeur.',
    isNew: true,
    isApparel: true,
    ref: '#0837',
    specs: {
      poids: '165 g (taille M)',
      grammage: '150 g/m²',
      matière: '87 % Laine mérinos, 13 % Polyamide',
      usage: '4 saisons — running & quotidien'
    }
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}
