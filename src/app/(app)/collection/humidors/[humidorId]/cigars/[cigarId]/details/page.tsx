"use client";

import React, { useState } from "react";
import {
  Button,
  CigarInfoSection,
  Container,
  CustomPopover,
  InputField,
} from "@/components";
import { CigarDetailsFormData, CollectionPagesParams } from "@/lib/types";
import { collectionValidationRules } from "@/lib/validations/collectionValidation";
import { useCigarStore } from "@/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/auth";
import { useCigar } from "@/app/(app)/collection/hooks";

const CigarDetails = ({ params }: { params: CollectionPagesParams }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CigarDetailsFormData>();
  const { user } = useAuth({ middleware: "auth" });
  const { humidorId, cigarId } = params;
  const { cigar, isLoading } = useCigar({ user, cigarId });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setCigarDetails, flowType } = useCigarStore();
  const currentStep = flowType === "custom" ? 3 : 2;
  const totalSteps = flowType === "custom" ? 4 : 3;

  const onSubmit = async (details: CigarDetailsFormData) => {
    setLoading(true);
    setCigarDetails(details);
    const redirectionUrl = `/collection/humidors/${humidorId}/cigars/${cigarId}/additional-info`;
    router.push(redirectionUrl);
    setLoading(false);
  };

  return (
    <Container>
      <div className="flex flex-col h-full relative">
        <div>
          <h1 className="text-2xl font-medium mb-6">Add Cigar</h1>

          <CigarInfoSection
            name={cigar?.name || ""}
            image={cigar?.image_url || ""}
            manufacturer={cigar?.manufacturer || ""}
            origin={cigar?.origin || ""}
            rating={cigar?.rating || ""}
            isLoading={isLoading}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <div className="text-base font-extralight">
              Add Pricing & Quantity
            </div>
            <CustomPopover content="Enter the number of cigars and their price. Quantity is required, price is optional." />
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
              label="0.00"
              name="price"
              register={register}
              errors={errors}
              isRequired={false}
              validationRules={collectionValidationRules.cigarPrice}
              step=".01"
            />
          </div>

          <div className="fixed bottom-[80px] left-0 right-0 p-6 md:px-0 max-w-md mx-auto">
            <Button
              className="w-full"
              type="submit"
              title="Next"
              loading={loading}
              disabled={loading || isLoading}
            />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CigarDetails;
