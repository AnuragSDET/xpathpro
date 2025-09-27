import { supabase } from './supabase';

export interface ImageUploadResult {
  url: string;
  path: string;
}

export async function uploadImage(file: File, folder: string = 'images'): Promise<ImageUploadResult> {
  // Optimize image before upload
  const optimizedFile = await optimizeImage(file);
  
  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, optimizedFile);

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return {
    url: publicUrl,
    path: filePath
  };
}

async function optimizeImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      // Calculate optimal dimensions (max 1920px width, maintain aspect ratio)
      const maxWidth = 1920;
      const maxHeight = 1080;
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          const optimizedFile = new File([blob!], file.name, {
            type: 'image/webp',
            lastModified: Date.now(),
          });
          resolve(optimizedFile);
        },
        'image/webp',
        0.85 // High quality compression
      );
    };

    img.src = URL.createObjectURL(file);
  });
}