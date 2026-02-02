import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = 'src/tools/input-images';
const outputDir = 'src/tools/output-images';
const widths = [1100];

fs.mkdirSync(outputDir, { recursive: true });

for (const file of fs.readdirSync(inputDir)) {
  if (!file.match(/\.(jpg|jpeg|png)$/i)) {
    continue;
  }

  const inputPath = path.join(inputDir, file);
  const baseName = path.parse(file).name;

  for (const width of widths) {
    let outputPath = path.join(outputDir, `${baseName}`);
    if (widths.length > 1) {
      outputPath += `-${width}`;
    }
    outputPath += `.avif`;

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

    console.log(`✓ ${baseName}-${width}.avif`);
  }
}
