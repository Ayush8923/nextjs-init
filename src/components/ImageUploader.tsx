import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import InputError from "@/components/InputError";
import Image from "next/image";

interface ImageUploaderProps {
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  labelClassName?: string;
  isRequired?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  setSelectedFile?: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  name,
  label,
  register,
  errors,
  labelClassName,
  isRequired = true,
  imageWidth = 120,
  imageHeight = 120,
  setSelectedFile,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      if (setSelectedFile) {
        setSelectedFile(file);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        id={name}
        className="hidden"
        accept="image/*"
        {...register(
          name,
          isRequired ? { required: `${label} is required` } : {}
        )}
        onChange={handleFileChange}
      />

      <label htmlFor={name} className={labelClassName}>
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Profile"
            className="w-full h-full object-cover"
            width={imageWidth}
            height={imageHeight}
          />
        ) : (
          <span className="text-2xl text-gray-500">+</span>
        )}
      </label>
      <InputError
        className="mb-4"
        messages={name ? [errors?.[name]?.message as string] : []}
      />
    </div>
  );
};

export default ImageUploader;
