"use client";

import {
  BackButton,
  Button,
  Dropdown,
  InputError,
  InputField,
} from "@/components";
import { formatArrayToLabelValueOptions } from "@/lib/common";
import { addCigarValidationRules } from "@/lib/validations/collectionValidation";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { CigarThumbnailIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { UseFormRegister, Control } from "react-hook-form";

type Cigar = {
  name: string;
  brand: string;
  origin: string;
  rating: string | number;
  image_url: string;
};

type FormValues = {
  [key: string]: any;
};

type EditCigarDetailProps = {
  handleSubmit: (
    _onSubmit: (_data: any) => void
  ) => (_event: React.FormEvent) => void;
  cigar: Cigar;
  register: UseFormRegister<FormValues>;
  errors: any;
  error: Record<string, string[]>;
  cigarsMetaData: any;
  control: Control<FormValues>;
  onSubmit: (_data: FormValues) => void;
  isLoading: boolean;
};

const addCigarFields = [
  {
    name: "name",
    label: "Cigar Name",
    type: "text",
    required: true,
    key: "name",
    validationRules: addCigarValidationRules.cigarName,
    disabled: true,
  },
  {
    name: "brand",
    label: "Brand",
    type: "text",
    required: true,
    key: "brand",
    validationRules: addCigarValidationRules.brand,
    disabled: true,
  },
  {
    name: "manufacturer",
    label: "Manufacturer",
    type: "text",
    required: true,
    key: "manufacturer",
    validationRules: addCigarValidationRules.manufacturer,
    disabled: true,
  },
  {
    name: "origin",
    label: "Origin",
    type: "text",
    required: true,
    key: "origin",
    validationRules: addCigarValidationRules.origin,
    disabled: true,
  },
  {
    name: "vitola",
    label: "Vitola",
    type: "text",
    required: true,
    key: "vitola",
    validationRules: addCigarValidationRules.vitola,
    disabled: true,
  },
];

const EditCigarDetail = ({
  handleSubmit,
  cigar,
  register,
  errors,
  error,
  cigarsMetaData,
  control,
  onSubmit,
  isLoading,
}: EditCigarDetailProps) => {
  const router = useRouter();
  return (
    <div>
      <BackButton />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between mt-9 border-b border-gray-200 pb-9">
          <div className="flex items-start">
            {cigar?.image_url ? (
              <Image
                src={cigar.image_url}
                alt={cigar?.name}
                width={97}
                height={97}
                className="rounded-md mr-3 h-24 w-24"
              />
            ) : (
              <div className="h-24 w-24 rounded-[10px] mr-4 flex items-center justify-center">
                <CigarThumbnailIcon width="97" height="97" />
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-2xl font-medium leading-none">
                {cigar?.name}
              </h1>
              <p className="font-light text-xs leading-none">{cigar?.brand}</p>
              <p className="font-light text-xs leading-none">{cigar?.origin}</p>
              <p className="font-light text-xs leading-none">{cigar?.rating}</p>
            </div>
          </div>
          <div className="flex space-x-3 self-end">
            <Button
              type="submit"
              title="Add to DB"
              className="w-[134px]"
              loading={isLoading}
              disabled={isLoading}
            />
            <Button
              type="button"
              title="Cancel"
              variant="secondary"
              className="w-[120px]"
              onClick={() => router.back()}
            />
          </div>
        </div>

        <div className="my-8">
          <div className="space-y-4 max-w-lg">
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
                    validationRules={
                      !field.disabled ? field.validationRules : {}
                    }
                    // TODO: Need to Remove this disable props when we implement EditCigar Functionality in Admin Page
                    disabled={field.disabled}
                  />
                  <InputError messages={error[field?.name]} className="!mt-1" />
                </div>
              ))}
            </div>

            <div>
              <div className="text-xs uppercase font-light mb-1.5">
                Dimensions
              </div>
              <div className="space-y-4">
                <InputField
                  type="number"
                  label="Length (inches)"
                  name="length"
                  register={register}
                  errors={errors}
                  step=".01"
                  // TODO: Need to enable these validation when we implement EditCigar Functionality in the Admin Page Currently All field are disable with values.
                  // validationRules={addCigarValidationRules.length}
                  disabled
                />
                <InputError messages={error.length} className="!mt-1" />

                <InputField
                  type="number"
                  label="Ring Gauge"
                  name="ringGauge"
                  register={register}
                  errors={errors}
                  // TODO: Need to enable these validation when we implement EditCigar Functionality in the Admin Page currently all field are disable with values.
                  // validationRules={addCigarValidationRules.ringGauge}
                  disabled
                />
                <InputError messages={error.ringGauge} className="!mt-1" />
              </div>
            </div>

            <div>
              <div className="text-xs uppercase font-light mb-2">
                Blend details
              </div>
              <div className="space-y-4">
                <InputField
                  type="text"
                  label="Color"
                  name="color"
                  register={register}
                  errors={errors}
                  disabled
                />
                <InputError messages={error.color} className="!mt-1" />
                <InputField
                  type="text"
                  label="Flavour"
                  name="flavour"
                  register={register}
                  errors={errors}
                  isRequired={false}
                  disabled
                />
                <InputError messages={error.flavour} className="!mt-1" />{" "}
                <Controller
                  name="strength"
                  control={control}
                  rules={{ required: "Strength is required" }}
                  disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
                    />
                  )}
                />
                <InputError messages={error.filler} className="!mt-1" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCigarDetail;
