// upload.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

const TMP_DIR = path.resolve(process.cwd(), 'uploads', 'tmp');

const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    try {
      await fs.mkdir(TMP_DIR, { recursive: true });
      cb(null, TMP_DIR);
    } catch (e: any) {
      cb(e, TMP_DIR);
    }
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const id = crypto.randomUUID(); // or crypto.randomBytes(8).toString("hex")
    cb(null, `${Date.now()}-${file.fieldname}-${id}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 40 * 1024 * 1024 }
});

export default upload;
