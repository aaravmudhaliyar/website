import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const staticDir = './static';
const thumbsDir = path.join(staticDir, 'thumbnails');

if (!fs.existsSync(thumbsDir)) {
  fs.mkdirSync(thumbsDir);
}

const files = fs.readdirSync(staticDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));
const imagesData = [];

async function processImages() {
  console.log(`Processing ${files.length} images...`);
  
  for (const file of files) {
    const inputPath = path.join(staticDir, file);
    const parsed = path.parse(file);
    const outputFilename = `${parsed.name}.webp`;
    const outputPath = path.join(thumbsDir, outputFilename);
    
    console.log(`Resizing ${file}...`);
    await sharp(inputPath)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    imagesData.push({
      src: `/thumbnails/${outputFilename}`,
      fullSrc: `/${file}`,
      alt: parsed.name
    });
  }

  // Rewrite images.json to point to thumbnails
  fs.writeFileSync(path.join(staticDir, 'images.json'), JSON.stringify(imagesData, null, 2));
  console.log('Done! Updated images.json');
}

processImages().catch(console.error);
