import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticDir = path.join(__dirname, '../static');
const thumbDir = path.join(staticDir, 'thumbs');

async function main() {
    try {
        await fs.mkdir(thumbDir, { recursive: true });
    } catch (e) {
        if (e.code !== 'EEXIST') {
            console.error(e);
        }
    }

    const imagesJsonPath = path.join(staticDir, 'images.json');
    const imagesData = JSON.parse(await fs.readFile(imagesJsonPath, 'utf-8'));

    for (const img of imagesData) {
        // Remove leading slash to get correct relative path
        const filename = img.src.startsWith('/') ? img.src.substring(1) : img.src;
        const srcPath = path.join(staticDir, filename);
        const thumbPath = path.join(thumbDir, path.basename(filename));

        try {
            await sharp(srcPath)
                .resize({ width: 600 }) // 600px width should be enough for masonry thumbnail
                .jpeg({ quality: 80 })
                .toFile(thumbPath);
            console.log(`Generated thumb for ${img.src}`);
            img.thumbSrc = `/thumbs/${path.basename(filename)}`;
        } catch (e) {
            console.error(`Error processing ${img.src}:`, e.message);
        }
    }

    await fs.writeFile(imagesJsonPath, JSON.stringify(imagesData, null, 2));
    console.log("Done updating images.json!");
}

main();
