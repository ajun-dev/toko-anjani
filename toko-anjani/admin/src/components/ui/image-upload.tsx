"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash, Loader } from "lucide-react";
import Image from "next/image";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsLoading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned_upload");
        formData.append("cloud_name", "dbdby6oxg");

        const res = await fetch("https://api.cloudinary.com/v1_1/dbdby6oxg/image/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          onChange(data.secure_url);
        } else {
          console.error("Upload failed:", res.statusText);
        }
      }
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setIsLoading(false);
      e.target.value = "";
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
      
      <div className="flex items-center gap-2">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          disabled={disabled || isLoading}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button
            type="button"
            disabled={disabled || isLoading}
            variant="secondary"
            onClick={() => document.getElementById("image-upload")?.click()}
            asChild
          >
            <div className="cursor-pointer">
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Upload image
                </>
              )}
            </div>
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
};

export default ImageUpload;
