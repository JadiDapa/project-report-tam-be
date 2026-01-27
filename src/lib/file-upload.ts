import path from 'path';
import { promises as fs } from 'fs';

export async function fileUpload(file: File, directory: string) {
  // 1. Timestamped filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const extension = path.extname(file.name);
  const newFileName = `${timestamp}${extension}`;

  // 2. Absolute directory path
  const uploadDir = path.join(process.cwd(), directory);

  // 3. Ensure directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  // 4. Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // 5. Write file
  const filePath = path.join(uploadDir, newFileName);
  await fs.writeFile(filePath, buffer);

  return newFileName;
}
