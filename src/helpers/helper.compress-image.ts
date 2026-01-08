// compress-image.ts
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function safeUnlink(filePath: string, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      await fs.unlink(filePath);
      return;
    } catch (err: any) {
      if (err.code !== 'EPERM') throw err;
      await new Promise((r) => setTimeout(r, 100));
    }
  }
}

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

  // 🧠 Windows needs time to release the file handle
  await safeUnlink(inputPath);

  return outputPath;
}
