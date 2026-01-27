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
  // ✅ Make input absolute (fix: "missing uploads\\tmp\\..." because cwd can differ)
  const absInput = path.isAbsolute(inputPath) ? inputPath : path.resolve(process.cwd(), inputPath);

  // ✅ Make output absolute + ensure directory exists
  const outDir = path.resolve(process.cwd(), 'uploads', 'images');
  await fs.mkdir(outDir, { recursive: true });

  const absOutput = path.join(outDir, outputFilename);

  // ✅ Fail early with a clearer error if input isn't there
  await fs.access(absInput);

  await sharp(absInput)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(absOutput);

  await safeUnlink(absInput);

  // Return something useful:
  // - absOutput for server
  // - or a relative path for building URLs
  return absOutput;
}
