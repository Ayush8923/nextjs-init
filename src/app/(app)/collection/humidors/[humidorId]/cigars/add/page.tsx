"use client";

import collection from "@/apis/collection";
import { useCigarMeta } from "@/app/(app)/collection/hooks";
import {
  Button,
  Container,
  CustomPopover,
  Dropdown,
  ImageUploader,
  InputError,
  InputField,
} from "@/components";
import { formatArrayToLabelValueOptions } from "@/lib/common";
import { CigarDetailsFormData, CollectionPagesParams } from "@/lib/types";
import { addCigarValidationRules } from "@/lib/validations/collectionValidation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const addCigarFields = [
  {
    name: "name",
    label: "Cigar Name",
    type: "text",
    required: true,
    key: "name",
    validationRules: addCigarValidationRules.cigarName,
  },
  {
    name: "brand",
    label: "Brand",
    type: "text",
    required: true,
    key: "brand",
    validationRules: addCigarValidationRules.brand,
  },
  {
    name: "manufacturer",
    label: "Manufacturer",
    type: "text",
    required: true,
    key: "manufacturer",
    validationRules: addCigarValidationRules.manufacturer,
  },
  {
    name: "origin",
    label: "Origin",
    type: "text",
    required: true,
    key: "origin",
    validationRules: addCigarValidationRules.origin,
  },
  {
    name: "vitola",
    label: "Vitola",
    type: "text",
    required: true,
    key: "vitola",
    validationRules: addCigarValidationRules.vitola,
  },
];

const CigarsAdd = ({ params }: { params: CollectionPagesParams }) => {
  const { humidorId } = params;
  const router = useRouter();
  const { cigarMetaData: cigarsMetaData } = useCigarMeta();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CigarDetailsFormData>();

  const [error, setError] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCigarImage, setSelectedCigarImage] = useState<File | null>(
    null
  );

  const onSubmit = async (cigarDetails: CigarDetailsFormData) => {
    setIsLoading(true);
    try {
      const response = await collection.create({
        cigarDetails,
        image: selectedCigarImage,
      });
      const redirectionUrl = `/collection/humidors/${humidorId}/cigars/${response?.id}/details`;
      router.push(redirectionUrl);
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
      setError(error.response.data.errors);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col h-full relative">
        <h1 className="text-2xl font-medium mb-6">Add Cigar</h1>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="text-base font-extralight">Add Cigar Details</div>
            <CustomPopover content="Provide specific details about the cigar you are adding, such as the brand, size, wrapper type, origin, and any other distinguishing characteristics." />
          </div>
          <div className="font-extralight text-base">2/4</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="my-6 pb-[48px]">
          <div className="flex justify-center mb-6">
            <div className={`${!error.image && "h-[120px]"}`}>
              <ImageUploader
                name="cigarImage"
                label="Cigar Image"
                labelClassName="flex items-center justify-center w-[120px] h-[120px] bg-gray-100 cursor-pointer mb-2 overflow-hidden rounded-xl"
                register={register}
                errors={errors}
                setSelectedFile={setSelectedCigarImage}
              />
              {error.image && (
                <InputError messages={error.image} className="-mt-4" />
              )}
            </div>
          </div>

          <div className="space-y-4">
            {addCigarFields.map((field) => (
              <div key={field.key}>
                <InputField
                  key={field.key}
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  register={register}
                  errors={errors}
                  validationRules={field.validationRules}
                />
                <InputError messages={error[field.name]} className="!mt-1" />
              </div>
            ))}

            <div>
              <div className="text-xs font-light mb-1.5">Dimensions</div>
              <div className="space-y-4">
                <InputField
                  type="number"
                  label="Length (inches)"
                  name="length"
                  register={register}
                  errors={errors}
                  step=".01"
                  validationRules={addCigarValidationRules.length}
                />
                <InputField
                  type="number"
                  label="Ring Gauge"
                  name="ringGauge"
                  register={register}
                  errors={errors}
                  validationRules={addCigarValidationRules.ringGauge}
                />
                <InputError messages={error.dimensions} className="!mt-1" />
              </div>
            </div>

            <div>
              <div className="text-xs font-light mb-1.5">Blend details</div>
              <div className="space-y-4">
                <InputField
                  type="text"
                  label="Color"
                  name="color"
                  register={register}
                  errors={errors}
                />
                <InputError messages={error.color} className="!mt-1" />

                <InputField
                  type="text"
                  label="Flavour"
                  name="flavour"
                  register={register}
                  errors={errors}
                  isRequired={false}
                />
                <InputError messages={error.flavour} className="!mt-1" />

                <Controller
                  name="strength"
                  control={control}
                  rules={{ required: "Strength is required" }}
                  render={({ field }) => (
                    <Dropdown
                      field={field}
                      items={
                        formatArrayToLabelValueOptions(
                          cigarsMetaData?.strengths
                        ) ?? []
                      }
                      placeholder="Strength"
                      error={errors.strength?.message}
                      searchable
                    />
                  )}
                />
                <InputError messages={error.strength} className="!mt-1" />

                <Controller
                  name="wrapper"
                  control={control}
                  rules={{ required: "Wrapper is required" }}
                  render={({ field }) => (
                    <Dropdown
                      field={field}
                      items={
                        formatArrayToLabelValueOptions(
                          cigarsMetaData?.wrappers
                        ) ?? []
                      }
                      placeholder="Wrapper"
                      error={errors.wrapper?.message}
                      searchable
                    />
                  )}
                />
                <InputError messages={error.wrapper} className="!mt-1" />

                <Controller
                  name="binder"
                  control={control}
                  rules={{ required: "Binder is required" }}
                  render={({ field }) => (
                    <Dropdown
                      field={field}
                      items={
                        formatArrayToLabelValueOptions(
                          cigarsMetaData?.binders
                        ) ?? []
                      }
                      placeholder="Binder"
                      error={errors.binder?.message}
                      searchable
                    />
                  )}
                />
                <InputError messages={error.binder} className="!mt-1" />

                <Controller
                  name="filler"
                  control={control}
                  rules={{ required: "Filler is required" }}
                  render={({ field }) => (
                    <Dropdown
                      field={field}
                      items={
                        formatArrayToLabelValueOptions(
                          cigarsMetaData?.fillers
                        ) ?? []
                      }
                      placeholder="Filler"
                      error={errors.filler?.message}
                      searchable
                    />
                  )}
                />
                <InputError messages={error.filler} className="!mt-1" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full"
              title="Next"
              loading={isLoading}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CigarsAdd;
