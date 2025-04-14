"use client";

import collection from "@/apis/collection";
import {
  Button,
  Container,
  ImageUploader,
  InputError,
  InputField,
} from "@/components";
import { Dropdown } from "@/components";
import { humidificationMethods, humidorTypes } from "@/lib/constant";
import { AddingHumidorFormData } from "@/lib/types";
import { collectionValidationRules } from "@/lib/validations/collectionValidation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const AddingHumidor = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AddingHumidorFormData>();
  const selectedHumidificationMethod = watch("humidificationMethod");

  const [error, setError] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHumidorImage, setSelectedHumidorImage] = useState<File | null>(
    null
  );

  const onSubmit = async (humidorData: AddingHumidorFormData) => {
    collection.createHumidor({
      setError,
      setIsLoading,
      router,
      humidorData,
      selectedHumidorImage,
    });
  };

  return (
    <Container>
      <h1 className="text-2xl font-medium">Add Humidor</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <ImageUploader
          name="humidorImage"
          label="Humidor Image"
          labelClassName="flex items-center justify-center w-[120px] h-[120px] bg-gray-100 cursor-pointer mb-2 overflow-hidden w-full rounded-xl"
          register={register}
          errors={errors}
          setSelectedFile={setSelectedHumidorImage}
        />
        {error.image && (
          <div className="mb-4">
            <InputError messages={error.image} className="!mt-1" />
          </div>
        )}

        <div className="space-y-4">
          <InputField
            key="humidorName"
            type="text"
            label="Name of Humidor *"
            name="humidorName"
            register={register}
            errors={errors}
          />
          <InputError messages={error.name} className="!mt-1" />

          <Controller
            name="humidorType"
            control={control}
            rules={collectionValidationRules.humidorType}
            render={({ field }) => (
              <Dropdown
                field={field}
                items={humidorTypes}
                placeholder="Type of Humidor *"
                error={errors.humidorType?.message}
              />
            )}
          />
          <InputError messages={error.type} className="!mt-1" />

          <InputField
            key="cigarHoldingCapacity"
            type="number"
            label="Cigar Holding Capacity"
            name="cigarHoldingCapacity"
            register={register}
            errors={errors}
            isRequired={false}
            validationRules={collectionValidationRules.cigarHoldingCapacity}
          />
          <InputError messages={error.capacity} className="!mt-1" />

          <Controller
            name="humidificationMethod"
            control={control}
            render={({ field }) => (
              <Dropdown
                field={field}
                items={humidificationMethods}
                placeholder="Humidification Method"
                error={errors.humidificationMethod?.message}
              />
            )}
          />
          {selectedHumidificationMethod === "other" && (
            <div className="mt-4">
              <InputField
                key="customHumidificationMethod"
                type="text"
                label="Specify Other Humidification Method *"
                name="customHumidificationMethod"
                register={register}
                validationRules={
                  collectionValidationRules.customHumidificationMethod
                }
                errors={errors}
                isRequired={selectedHumidificationMethod === "other"}
              />
            </div>
          )}
        </div>
        <InputError messages={error.humidification_method} className="!mt-1" />

        <div className="mt-6">
          <Button
            type="submit"
            className="w-full"
            title="Save"
            loading={isLoading}
          />
          <Button
            type="button"
            className="w-full"
            title="Cancel"
            variant="secondary"
            onClick={() => router.push("/dashboard")}
          />
        </div>
      </form>
    </Container>
  );
};
export default AddingHumidor;
