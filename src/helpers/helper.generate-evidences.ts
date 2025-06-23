import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import axios from 'axios';
const ImageModule = require('docxtemplater-image-module-free');

export default function generateDoc(data: any, projectTitle: string, template: string) {
  try {
    // Load the invoice template
    const templatePath = path.join(__dirname, template);
    const content = fs.readFileSync(templatePath, 'binary');

    let opts: any = {};
    opts.centered = true;
    opts.fileType = 'docx';

    opts.getImage = function (tagValue: fs.PathOrFileDescriptor, tagName: any) {
      return fs.readFileSync(tagValue);
    };

    //Pass the function that return image size
    opts.getSize = function (img: any, tagValue: any, tagName: any) {
      return [240, 400];
    };

    const imageModule = new ImageModule(opts);

    const zip = new PizZip(content);
    // Load the docx file as binary
    const doc = new Docxtemplater()
      .attachModule(imageModule)
      .loadZip(zip)
      .setData({ image: 'examples/image.png' })
      .render(data);

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
