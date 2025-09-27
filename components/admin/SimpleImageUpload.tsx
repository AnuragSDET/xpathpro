'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreview(url);
    onImageChange(url);
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      <Input
        type="url"
        value={preview}
        onChange={handleUrlChange}
        placeholder="Enter image URL"
      />
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