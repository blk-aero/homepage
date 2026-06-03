const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const tmpDir = path.join(__dirname, '../../../../tmp/logos');
const prodDir = __dirname;

const mapping = {
  'unicamp.png': 'unicamp.png',
  'enredes.png': 'enredes.png',
  'aconvap.png': 'aconvap.png',
  'ministerio-defesa.png': 'ministerio-defesa.png',
  'crea-sp.svg': 'crea-sp.svg',                 // Kept as SVG
  'br-utm.svg': 'br-utm.png',                   // SVG -> PNG (due to 1MB size)
  'incra.png': 'incra.png',
  'sergio-nogueira.jpg': 'sergio-nogueira.png', // JPG -> PNG
  'oliveira-roxo.jpg': 'oliveira-roxo.png',     // JPG -> PNG
  'sahyoun-properties.svg': 'sahyoun-properties.svg', // Kept as SVG
  'polimix-ambiental.png': 'polimix-ambiental.png',
  'six-engenharia.avif': 'six-engenharia.png',   // AVIF -> PNG
  'macaw-studio.png': 'macaw-studio.png',
  'lucas-diniz.jpg': 'lucas-diniz.png',         // JPG -> PNG
  'sergio-porto.png': 'sergio-porto.png',
  'montante.png': 'montante.png',
  'urbam.svg': 'urbam.png',                     // SVG -> PNG
  'pmsjc.png': 'pmsjc.png'
};

const invertLogos = [
  'macaw-studio.png',
  'montante.png'
];

async function normalizeLogos() {
  console.log('Starting logo normalization in color...');
  
  if (!fs.existsSync(tmpDir)) {
    throw new Error(`Input directory not found: ${tmpDir}`);
  }
  
  for (const [srcName, destName] of Object.entries(mapping)) {
    const srcPath = path.join(tmpDir, srcName);
    const destPath = path.join(prodDir, destName);
    
    if (!fs.existsSync(srcPath)) {
      console.warn(`WARNING: Source file not found: ${srcPath}`);
      continue;
    }
    
    if (destName.endsWith('.svg')) {
      // Copy SVG files directly to maintain vector format for clean small marks
      fs.copyFileSync(srcPath, destPath);
      console.log(`✓ Copied vector SVG: ${srcName} -> ${destName}`);
    } else {
      // Process raster assets and convert large SVGs using sharp
      // Trims transparent margins, resizes to fit inside 420x140 without enlargement,
      // and exports as optimized transparent PNG while preserving original color channels.
      try {
        let pipeline = sharp(srcPath).trim();
        
        if (invertLogos.includes(srcName)) {
          pipeline = pipeline.negate({ alpha: false });
        }

        await pipeline
          .resize({
            width: 420,
            height: 140,
            fit: 'inside',
            withoutEnlargement: true
          })
          .png({
            compressionLevel: 9,
            quality: 90
          })
          .toFile(destPath);
        
        const meta = await sharp(destPath).metadata();
        console.log(`✓ Normalized: ${srcName} -> ${destName} (${meta.width}x${meta.height})`);
      } catch (err) {
        console.error(`✗ Failed to normalize ${srcName}:`, err.message);
      }
    }
  }
  
  console.log('Logo normalization completed successfully.');
}

normalizeLogos().catch(err => {
  console.error('Fatal error during logo normalization:', err);
  process.exit(1);
});
