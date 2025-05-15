import React from "react";
import {
  Button,
  Dropdown,
  ImageUploader,
  InputError,
  InputField,
} from "@/components";
import { formatArrayToLabelValueOptions } from "@/lib/common";
import { addCigarValidationRules } from "@/lib/validations/collectionValidation";
import { Controller } from "react-hook-form";

type CigarFormProps = {
  handleSubmit: any;
  register: any;
  errors: any;
  control: any;
  isLoading: boolean;
  setSelectedCigarImage: any;
  cigarOptionsData: any;
  error: any;
  onSubmit: (_data: any) => void;
  initialImageUrl?: string;
  actionBtnLabel?: string;
};

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

const CigarForm = ({
  handleSubmit,
  register,
  errors,
  control,
  isLoading,
  setSelectedCigarImage,
  cigarOptionsData,
  error,
  onSubmit,
  initialImageUrl,
  actionBtnLabel = "Next",
}: CigarFormProps) => {
  return (
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
            initialImageUrl={initialImageUrl}
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
                      cigarOptionsData?.strengths
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
                      cigarOptionsData?.wrappers
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
                    formatArrayToLabelValueOptions(cigarOptionsData?.binders) ??
                    []
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
                    formatArrayToLabelValueOptions(cigarOptionsData?.fillers) ??
                    []
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
          title={actionBtnLabel}
          loading={isLoading}
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default CigarForm;
