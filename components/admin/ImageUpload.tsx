'use client';

import { useState } from 'react';
import { uploadImage } from '@/lib/imageUpload';

interface ImageUploadProps {
  currentUrl?: string;
  onImageChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUpload({ 
  currentUrl, 
  onImageChange, 
  folder = 'images',
  label = 'Image'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || '');

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadImage(file, folder);
      setPreview(result.url);
      onImageChange(result.url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreview(url);
    onImageChange(url);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {/* URL Input */}
      <input
        type="url"
        value={preview}
        onChange={handleUrlChange}
        placeholder="Enter image URL or upload below"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <span className="text-sm text-gray-500">
          Max 10MB • Auto-optimized to WebP
        </span>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="max-w-xs max-h-48 object-cover rounded-md border"
          />
        </div>
      )}
    </div>
  );
}