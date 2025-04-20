"use client";

import React, { useState } from "react";
import {
  Button,
  CigarInfoSection,
  Container,
  CustomTooltip,
  InputField,
} from "@/components";
import { CigarDetailsFormData } from "@/lib/types";
import { collectionValidationRules } from "@/lib/validations/collectionValidation";
import { useCigarStore } from "@/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CigarDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CigarDetailsFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setCigarDetails, cigarDetails, flowType } = useCigarStore();
  const currentStep = flowType === "custom" ? 3 : 2;
  const totalSteps = flowType === "custom" ? 4 : 3;

  const onSubmit = async (details: CigarDetailsFormData) => {
    setIsLoading(true);
    setCigarDetails(details);
    router.push(`/collection/cigars/${cigarDetails?.id}/additional-info`);
    setIsLoading(false);
  };

  return (
    <Container>
      <div className="flex flex-col h-full relative">
        <div className="sticky top-[68px] bg-white z-40">
          <h1 className="text-2xl font-medium mb-6">Add Cigar</h1>

          <CigarInfoSection
            name={cigarDetails?.name || ""}
            image={cigarDetails?.image_url || ""}
            manufacturer={cigarDetails?.manufacturer || ""}
            origin={cigarDetails?.origin || ""}
            rating={cigarDetails?.rating || ""}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <div className="text-base font-extralight">
              Add Pricing & Qualtity
            </div>
            <CustomTooltip content="Enter the number of cigars and their price. Quantity is required, price is optional." />
          </div>
          <div className="font-extralight text-base">{`${currentStep}/${totalSteps}`}</div>
        </div>

        <form className="mt-9" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <InputField
              key="quantity"
              type="number"
              label="Quantity"
              name="quantity"
              register={register}
              errors={errors}
              validationRules={collectionValidationRules.cigarQuantity}
            />
            <InputField
              key="price"
              type="number"
              label="Price per cigar"
              name="price"
              register={register}
              errors={errors}
              isRequired={false}
              validationRules={collectionValidationRules.cigarPrice}
            />
          </div>

          <div className="fixed bottom-[80px] left-0 right-0 p-6 md:px-0 max-w-md mx-auto">
            <Button
              className="w-full"
              type="submit"
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

export default CigarDetails;
