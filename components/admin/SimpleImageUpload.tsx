'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface SimpleImageUploadProps {
  currentUrl?: string;
  onImageChange: (url: string) => void;
  label?: string;
}

export default function SimpleImageUpload({ 
  currentUrl, 
  onImageChange, 
  label = 'Image URL'
}: SimpleImageUploadProps) {
  const [preview, setPreview] = useState(currentUrl || '');
  const [uploading, setUploading] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreview(url);
    onImageChange(url);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPreview(result.url);
        onImageChange(result.url);
      } else {
        alert('Upload failed: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      <Input
        type="url"
        value={preview}
        onChange={handleUrlChange}
        placeholder="Enter image URL or upload below"
      />
      <div className="flex items-center gap-4">
        <Button variant="outline" disabled={uploading} asChild>
          <label className="cursor-pointer">
            {uploading ? 'Uploading...' : 'Upload Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </Button>
        <span className="text-sm text-muted-foreground">
          Max 10MB • JPG, PNG, WebP
        </span>
      </div>
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