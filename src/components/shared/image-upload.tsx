"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  values: string[];
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  values,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {values?.map((url: string) => (
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
                <Trash className="w-4 h-4" />
              </Button>
            </div>

            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>

      <CldUploadWidget onUploadAdded={onUpload} uploadPreset="ecommerce-arkx">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

{
  /* <FormField
  control={form.control}
  name="imageUrl"
  render={({field}) => (
    <FormItem>
      <FormLabel>Background Image</FormLabel>
      <FormControl>
        <ImageUpload
          values={field.value ? [field.value]: []}
          disabled={loading}
          onChange={(url) => field.onChange(url)}
          onRemove={() => field.onChange("")}
        />
      </FormControl>
    </FormItem>
  )}
/> */
}

export default ImageUpload;
