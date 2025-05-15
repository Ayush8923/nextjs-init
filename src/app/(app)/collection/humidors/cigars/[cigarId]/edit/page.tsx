"use client";

import collection from "@/apis/collection";
import { useCigar, useCigarOptions } from "@/app/(app)/collection/hooks";
import { Container, CustomPopover } from "@/components";
import CigarForm from "@/components/CigarForm";
import { useAuth } from "@/hooks/auth";
import { CigarDetailsFormData, CollectionPagesParams } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditCigarPage = ({ params }: { params: CollectionPagesParams }) => {
  const { cigarId } = params;
  const { user } = useAuth({ middleware: "auth" });
  const { cigar } = useCigar({
    user,
    cigarId,
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CigarDetailsFormData>();
  const [error, setError] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { cigarOptionsData } = useCigarOptions();
  const [selectedCigarImage, setSelectedCigarImage] = useState<File | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (cigar) {
      const [length, ringGauge] = cigar.dimensions
        ? cigar.dimensions.split(" x ").map(Number)
        : [null, null];

      reset({
        name: cigar.name,
        brand: cigar.brand,
        manufacturer: cigar.manufacturer,
        origin: cigar.origin,
        vitola: cigar.vitola,
        length: length ?? undefined,
        ringGauge: ringGauge ?? undefined,
        color: cigar.color,
        flavour: cigar.flavour ? JSON.parse(cigar.flavour).join(", ") : "",
        strength: cigar.strength,
        wrapper: cigar.wrapper,
        binder: cigar.binder,
        filler: cigar.filler,
      });
    }
  }, [cigar, reset]);

  const onSubmit = async (cigarDetails: CigarDetailsFormData) => {
    setIsLoading(true);
    try {
      await collection.updateCigar(cigarDetails, selectedCigarImage, cigarId, {
        includeMethod: true,
        includeStatus: false,
      });
      router.replace(`/collection/humidors/cigars/${cigarId}/info`);
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
      setError(error.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col h-full relative">
        <h1 className="text-2xl font-medium mb-6">Edit Cigar</h1>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="text-base font-extralight">Edit Cigar Details</div>
            <CustomPopover content="Edit specific details about the cigar you were adding, such as the brand, size, wrapper type, origin, and any other distinguishing characteristics." />
          </div>
          <div className="font-extralight text-base">2/4</div>
        </div>

        <CigarForm
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          control={control}
          isLoading={isLoading}
          setSelectedCigarImage={setSelectedCigarImage}
          cigarOptionsData={cigarOptionsData}
          error={error}
          onSubmit={onSubmit}
          initialImageUrl={cigar?.image_url}
          actionBtnLabel="Save"
        />
      </div>
    </Container>
  );
};

export default EditCigarPage;
