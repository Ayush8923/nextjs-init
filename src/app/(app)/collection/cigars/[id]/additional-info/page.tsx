"use client";

import collection from "@/apis/collection";
import {
  Button,
  CigarInfoSection,
  Container,
  CustomTooltip,
  DateInput,
  InputError,
} from "@/components";
import { RatingIcon } from "@/components/icons";
import { todayAsDateInputValue } from "@/lib/common";
import { CigarDetailsFormData } from "@/lib/types";
import { useCigarStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const AdditionalInfo = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CigarDetailsFormData>({
    defaultValues: {
      addedAt: todayAsDateInputValue(),
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>([]);
  const router = useRouter();
  const {
    cigarDetails: cigar,
    flowType,
    clearCigarDetails,
    clearCigarFlowType,
  } = useCigarStore();
  const totalSteps = flowType === "custom" ? 4 : 3;

  const onSubmit = async (data: CigarDetailsFormData) => {
    setIsLoading(true);
    setError(null);
    const payloadData = {
      added_at: data.addedAt,
      rating: data.rating,
      quantity: cigar?.quantity,
      price: cigar?.price,
    };
    try {
      await collection.storeCigar({
        cigarDetails: payloadData,
        humidorId: cigar?.humidorId,
        cigarId: cigar?.id,
      });
      router.replace(`/collection/cigars/${cigar?.id}/saved`);
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
      setError(error.response.data.errors);
      setIsLoading(false);
    } finally {
      clearCigarDetails();
      clearCigarFlowType();
    }
  };

  return (
    <Container>
      <div className="flex flex-col h-full relative">
        <div className="sticky top-[68px] bg-white z-40">
          <h1 className="text-2xl font-medium mb-6">Add Cigar</h1>

          <CigarInfoSection
            name={cigar?.name || ""}
            image=""
            manufacturer={cigar?.manufacturer || ""}
            origin={cigar?.origin || ""}
            rating={cigar?.rating || ""}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <div className="text-base font-extralight">Other Information</div>
            <CustomTooltip content="Rate your cigar experience from 1 to 5 stars based on your satisfaction level." />
          </div>
          <div className="font-extralight text-base">{`${totalSteps}/${totalSteps}`}</div>
        </div>

        <form className="mt-9" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <DateInput
              name="addedAt"
              placeholder="Added to humidor on"
              register={register}
              errors={errors}
              required
              requiredMessage={"Added to humidor on is required"}
            />
            <div className="mb-2 text-base font-extralight">
              Have you smoked it before?
            </div>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <div className="flex gap-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <RatingIcon
                      key={star}
                      selected={Number(field.value || 0) >= star}
                      onClick={() => field.onChange(star)}
                    />
                  ))}
                </div>
              )}
            />
            <InputError messages={error ?? []} />
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

export default AdditionalInfo;
