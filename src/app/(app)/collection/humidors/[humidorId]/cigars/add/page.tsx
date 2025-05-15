"use client";

import collection from "@/apis/collection";
import { useCigarOptions } from "@/app/(app)/collection/hooks";
import { Container, CustomPopover } from "@/components";
import CigarForm from "@/components/CigarForm";
import { CigarDetailsFormData, CollectionPagesParams } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CigarsAdd = ({ params }: { params: CollectionPagesParams }) => {
  const { humidorId } = params;
  const router = useRouter();
  const { cigarOptionsData } = useCigarOptions();
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
        />
      </div>
    </Container>
  );
};

export default CigarsAdd;
