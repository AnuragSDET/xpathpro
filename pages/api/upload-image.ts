import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
import formidable from 'formidable';
import fs from 'fs';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read file and upload to Sanity
    const fileBuffer = fs.readFileSync(file.filepath);
    
    const asset = await sanityClient.assets.upload('image', fileBuffer, {
      filename: file.originalFilename || 'upload.jpg',
    });

    res.status(200).json({
      success: true,
      url: asset.url,
      asset: asset,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
}