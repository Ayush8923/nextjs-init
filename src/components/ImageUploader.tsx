import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import InputError from "@/components/InputError";
import Image from "next/image";
import { MAX_FILE_SIZE } from "@/lib/common";

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
  maxFileSize?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  name,
  label,
  register,
  errors,
  labelClassName,
  isRequired = false,
  imageWidth = 120,
  imageHeight = 120,
  setSelectedFile,
  maxFileSize = MAX_FILE_SIZE,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > maxFileSize) {
        setFileError("File size exceeds the 10MB limit.");
        setImagePreview(null);
        if (setSelectedFile) {
          setSelectedFile(null);
        }
      } else {
        setFileError(null);
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        if (setSelectedFile) {
          setSelectedFile(file);
        }
      }
    }
  };

  const errorMessage: string[] = [fileError, errors?.[name]?.message]
    .filter(Boolean)
    .map((error) =>
      typeof error === "string" ? error : String(error?.message || "")
    );

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
          <span className="text-3xl text-gray-500">+</span>
        )}
      </label>

      <InputError className="mb-4" messages={errorMessage} />
    </div>
  );
};

export default ImageUploader;
