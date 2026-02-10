"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
      <CldUploadWidget
        uploadPreset="kyop6jdp"
        options={{ multiple: true, singleUploadAutoClose: false, sources: ["local", "url", "camera"] }}
        onSuccess={(result) => {
          const info = result.info;
          if (info && typeof info !== "string" && "secure_url" in info) {
            onChange(info.secure_url);
          }
        }}
      >
        {({ open, isLoading }) => (
          <Button
            type="button"
            disabled={disabled || isLoading}
            variant="secondary"
            onClick={() => open()} // ✅ Wrap in a lambda
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            {isLoading ? "Uploading..." : "Upload image"}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
