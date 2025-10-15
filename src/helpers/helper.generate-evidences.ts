import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import syncRequest from 'sync-request';
import sizeOf from 'image-size'; // 👈 install with: npm install image-size
import axios from 'axios';
const ImageModule = require('docxtemplater-image-module-free');

export default function generateDoc(data: any, projectTitle: string, template: string) {
  try {
    // Load the docx template
    const templatePath = path.join(__dirname, template);
    const content = fs.readFileSync(templatePath, 'binary');

    let opts: any = {};
    opts.centered = true; // center images
    opts.fileType = 'docx';

    // Function to fetch image data
    opts.getImage = function (tagValue: string) {
      if (tagValue.startsWith('http')) {
        const res = syncRequest('GET', tagValue);
        return res.getBody();
      }
      return fs.readFileSync(tagValue);
    };

    // Function to define image size (fixed width = 4 cm, height auto)
    opts.getSize = function (img: Buffer) {
      const dimensions = sizeOf(img);
      const fixedWidth = 280; // ~4 cm in pixels (1 cm ≈ 37.8px)
      const aspectRatio = dimensions.height / dimensions.width;
      const newHeight = fixedWidth * aspectRatio;
      return [fixedWidth, newHeight];
    };

    const imageModule = new ImageModule(opts);

    const zip = new PizZip(content);

    const doc = new Docxtemplater()
      .attachModule(imageModule)
      .loadZip(zip)
      .setData(data) // 👈 use your passed data here
      .render();

    // Generate the document buffer
    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    // Save the output document
    const generatedDate = Date.now();

    const outputPath = path.join(
      __dirname,
      `../../uploads/evidences/${projectTitle}_${generatedDate}.docx`
    );
    fs.writeFileSync(outputPath, buffer);

    return outputPath; // Return the file path
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
}

async function getImageBase64(url: string) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary').toString('base64');
}
