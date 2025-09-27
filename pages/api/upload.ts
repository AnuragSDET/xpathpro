import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create images bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    const imagesBucket = buckets?.find(bucket => bucket.name === 'images');
    
    if (!imagesBucket) {
      await supabase.storage.createBucket('images', {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 10485760 // 10MB
      });
    }

    res.status(200).json({ success: true, message: 'Upload endpoint ready' });
  } catch (error) {
    console.error('Upload setup error:', error);
    res.status(500).json({ error: 'Failed to setup upload' });
  }
}