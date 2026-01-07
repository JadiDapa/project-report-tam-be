// compress-image.ts
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export async function compressImage(inputPath: string, outputFilename: string) {
  const outputPath = path.join('uploads/images', outputFilename);

  await sharp(inputPath)
    .rotate()
    .resize({
      width: 1920,
      withoutEnlargement: true
    })
    .jpeg({
      quality: 80,
      mozjpeg: true
    })
    .toFile(outputPath);

  fs.unlinkSync(inputPath);

  return outputPath;
}
