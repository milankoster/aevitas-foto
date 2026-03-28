import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { IMAGE_EXTENSIONS, IMAGE_INPUT_ROOT, IMAGE_OUTPUT_ROOT } from '../config';
import { GALLERY_WIDTHS } from '../../../app/pages/gallery/images/gallery-images';

fs.mkdirSync(IMAGE_OUTPUT_ROOT, { recursive: true });

async function processImage(category: string, file: string): Promise<void> {
  const ext = path.extname(file).toLowerCase();
  if (!IMAGE_EXTENSIONS.includes(ext as (typeof IMAGE_EXTENSIONS)[number])) {
    throw new Error(`Unsupported image extension in file: '${file}'`);
  }

  const inputPath = path.join(IMAGE_INPUT_ROOT, category, file);
  const baseName = path.parse(file).name;

  const outputDir = path.join(IMAGE_OUTPUT_ROOT, category);
  const allOutputsExist = GALLERY_WIDTHS.every((width) => {
    const outputPath = path.join(outputDir, `${baseName}-${width}.avif`);
    return fs.existsSync(outputPath);
  });

  if (allOutputsExist) {
    console.log(`Skipping ${category}/${file} (all sizes already exist).`);
    return;
  }

  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`Processing ${category}/${file}...`);
  for (const width of GALLERY_WIDTHS) {
    const outputPath = path.join(outputDir, `${baseName}-${width}.avif`);

    await sharp(inputPath)
      .resize({
        width,
        withoutEnlargement: true,
      })
      .avif({
        quality: 50,
        effort: 4,
      })
      .toFile(outputPath);
  }
}

async function main(): Promise<void> {
  const categories = fs.readdirSync(IMAGE_INPUT_ROOT, { withFileTypes: true }).filter((d) => d.isDirectory());

  for (const dirent of categories) {
    const category = dirent.name;
    const categoryDir = path.join(IMAGE_INPUT_ROOT, category);
    const files = fs.readdirSync(categoryDir);

    for (const file of files) {
      await processImage(category, file);
    }
  }
}

void main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
