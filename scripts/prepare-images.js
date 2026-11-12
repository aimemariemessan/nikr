import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const HERO_SRC = path.resolve('src/assets/images/hero_runner_asphalt_1793954945212.jpg');
const SNEAKER_LIGHT_SRC = path.resolve('src/assets/images/sneaker_light_studio_1793957868274.jpg');
const APPAREL_LIGHT_SRC = path.resolve('src/assets/images/apparel_light_studio_1793957889931.jpg');

const IMG_DIR = path.resolve('img');
const PRODUCTS_DIR = path.resolve('img/products');

if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });
if (!fs.existsSync(PRODUCTS_DIR)) fs.mkdirSync(PRODUCTS_DIR, { recursive: true });

async function processImages() {
  console.log('Generating hero webp files...');
  // Hero 1920w
  await sharp(HERO_SRC)
    .resize(1920, 1080, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(IMG_DIR, 'hero-1920.webp'));

  // Hero 1280w
  await sharp(HERO_SRC)
    .resize(1280, 720, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(IMG_DIR, 'hero-1280.webp'));

  // Hero 768w
  await sharp(HERO_SRC)
    .resize(768, 860, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(IMG_DIR, 'hero-768.webp'));

  console.log('Generating bright, luminous product assets...');
  const productIds = [
    'nike-kinetic-racer-01',
    'nike-aero-stride-matrix',
    'nike-tempo-shield-pro',
    'nike-terrain-blitz-tr',
    'nike-asphalt-draft-track',
    'nike-velocity-core-tank',
    'nike-cadence-carbon-fly',
    'nike-street-archive-low',
    'nike-endurance-split-short',
    'nike-pulse-merino-layer',
    'nike-stratum-cushion-max',
    'nike-vanguard-windbreaker'
  ];

  for (let i = 0; i < productIds.length; i++) {
    const id = productIds[i];
    const isApparel = id.includes('tank') || id.includes('short') || id.includes('layer') || id.includes('windbreaker') || id.includes('track');
    const baseSource = isApparel ? APPAREL_LIGHT_SRC : SNEAKER_LIGHT_SRC;

    // View 1 (main bright studio view)
    await sharp(baseSource)
      .resize(800, 1000, { fit: 'cover', position: 'center' })
      .modulate({ brightness: 1.02 })
      .webp({ quality: 85 })
      .toFile(path.join(PRODUCTS_DIR, `${id}-1.webp`));

    // View 2 (bright angle close-up)
    await sharp(baseSource)
      .resize(800, 1000, { fit: 'cover', position: 'top' })
      .modulate({ brightness: 1.05, contrast: 1.05 })
      .webp({ quality: 82 })
      .toFile(path.join(PRODUCTS_DIR, `${id}-2.webp`));

    // View 3 (detail texture)
    await sharp(baseSource)
      .resize(800, 1000, { fit: 'cover', position: 'bottom' })
      .modulate({ brightness: 1.03, contrast: 1.08 })
      .webp({ quality: 82 })
      .toFile(path.join(PRODUCTS_DIR, `${id}-3.webp`));

    // View 4 (profile perspective)
    await sharp(baseSource)
      .resize(800, 1000, { fit: 'cover', position: 'center' })
      .modulate({ brightness: 1.04 })
      .webp({ quality: 82 })
      .toFile(path.join(PRODUCTS_DIR, `${id}-4.webp`));
  }

  console.log('All bright product image assets successfully prepared.');
}

processImages().catch(err => {
  console.error(err);
  process.exit(1);
});
