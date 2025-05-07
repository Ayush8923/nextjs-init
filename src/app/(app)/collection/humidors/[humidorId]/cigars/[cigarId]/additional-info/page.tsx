"use client";

import collection from "@/apis/collection";
import { useCigar } from "@/app/(app)/collection/hooks";
import {
  Button,
  CigarInfoSection,
  Container,
  CustomPopover,
  DateInput,
  InputError,
} from "@/components";
import { RatingIcon } from "@/components/icons";
import { useAuth } from "@/hooks/auth";
import { todayAsDateInputValue } from "@/lib/common";
import { CigarDetailsFormData, CollectionPagesParams } from "@/lib/types";
import { useCigarStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { mutate } from "swr";

const AdditionalInfo = ({ params }: { params: CollectionPagesParams }) => {
  const { humidorId, cigarId } = params;
  const { user } = useAuth({ middleware: "auth" });
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
  const { cigar, isLoading: hasApiLoading } = useCigar({ user, cigarId });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>([]);
  const router = useRouter();
  const { flowType, cigarDetails } = useCigarStore();
  const totalSteps = flowType === "custom" ? 4 : 3;

  const onSubmit = async (data: CigarDetailsFormData) => {
    setIsLoading(true);
    setError(null);
    const payloadData = {
      added_at: data.addedAt,
      rating: data.rating,
      quantity: cigarDetails?.quantity,
      price: cigarDetails?.price,
    };
    try {
      await collection.storeCigar({
        cigarDetails: payloadData,
        humidorId: humidorId,
        cigarId: cigarId,
      });
      mutate(() => true, undefined, { revalidate: true });
      const redirectionUrl = `/collection/humidors/${humidorId}/cigars/${cigarId}/saved`;
      router.replace(redirectionUrl);
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
      setError(error.response.data.errors);
      setIsLoading(false);
    }
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
            isLoading={hasApiLoading}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <div className="text-base font-extralight">Other Information</div>
            <CustomPopover content="Rate your cigar experience from 1 to 5 stars based on your satisfaction level." />
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
              control={control}
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
              loading={isLoading || hasApiLoading}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AdditionalInfo;
