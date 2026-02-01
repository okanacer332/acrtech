const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './public/portfolio';
const OUTPUT_DIR = './public/portfolio/optimized';

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image sizes for responsive images
const SIZES = [640, 750, 828, 1080, 1200, 1920];

async function optimizeImage(inputPath, filename) {
  const baseName = path.parse(filename).name;
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Processing: ${filename} (${metadata.width}x${metadata.height})`);
    
    // Generate AVIF (best compression)
    await image
      .clone()
      .avif({ quality: 80, effort: 4 })
      .toFile(path.join(OUTPUT_DIR, `${baseName}.avif`));
    
    // Generate WebP (fallback)
    await image
      .clone()
      .webp({ quality: 85, effort: 4 })
      .toFile(path.join(OUTPUT_DIR, `${baseName}.webp`));
    
    // Generate responsive sizes
    for (const width of SIZES) {
      if (metadata.width && metadata.width > width) {
        await image
          .clone()
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(path.join(OUTPUT_DIR, `${baseName}-${width}.webp`));
      }
    }
    
    // Generate blur placeholder (tiny)
    const blurBuffer = await image
      .clone()
      .resize(20, null, { withoutEnlargement: true })
      .blur()
      .webp({ quality: 20 })
      .toBuffer();
    
    const blurBase64 = `data:image/webp;base64,${blurBuffer.toString('base64')}`;
    
    console.log(`  ✓ Optimized: ${filename}`);
    
    return { 
      blurBase64, 
      sizes: SIZES.filter(s => metadata.width && metadata.width > s),
      originalWidth: metadata.width,
      originalHeight: metadata.height
    };
    
  } catch (error) {
    console.error(`  ✗ Failed: ${filename}`, error.message);
    return null;
  }
}

async function main() {
  // Check if sharp is installed
  try {
    require.resolve('sharp');
  } catch (e) {
    console.log('Installing sharp...');
    const { execSync } = require('child_process');
    execSync('npm install sharp --save-dev', { stdio: 'inherit' });
  }
  
  const files = fs.readdirSync(INPUT_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  
  console.log(`Found ${files.length} images to optimize...\n`);
  
  const results = {};
  
  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const result = await optimizeImage(inputPath, file);
    if (result) {
      results[file] = result;
    }
  }
  
  // Save metadata for Next.js Image component
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'image-manifest.json'),
    JSON.stringify(results, null, 2)
  );
  
  console.log('\n✓ Optimization complete!');
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  Manifest: ${OUTPUT_DIR}/image-manifest.json`);
  
  // Calculate savings
  let originalSize = 0;
  let optimizedSize = 0;
  
  for (const file of files) {
    const originalPath = path.join(INPUT_DIR, file);
    const stats = fs.statSync(originalPath);
    originalSize += stats.size;
  }
  
  const optimizedFiles = fs.readdirSync(OUTPUT_DIR)
    .filter(f => f !== 'image-manifest.json');
  
  for (const file of optimizedFiles) {
    const optimizedPath = path.join(OUTPUT_DIR, file);
    const stats = fs.statSync(optimizedPath);
    optimizedSize += stats.size;
  }
  
  const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
  console.log(`\nSize comparison:`);
  console.log(`  Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Optimized: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Savings: ${savings}%`);
}

main().catch(console.error);
