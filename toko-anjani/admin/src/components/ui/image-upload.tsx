"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { Trash, Copy } from "lucide-react";
import Image from "next/image";
import { Input } from "./input";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      onChange(imageUrl);
      setImageUrl("");
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder="Paste image URL here (e.g., https://example.com/image.jpg)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={disabled}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddImage();
            }
          }}
        />
        <Button
          type="button"
          disabled={disabled || !imageUrl.trim()}
          variant="secondary"
          onClick={handleAddImage}
        >
          Add Image
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">
        📌 Tip: Upload gambar ke Cloudinary/Imgur dulu, lalu paste URL-nya di sini
      </p>
    </div>
  );
};

export default ImageUpload;
