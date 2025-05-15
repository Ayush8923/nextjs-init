"use client";

import { useCigar } from "@/app/(app)/collection/hooks";
import { useAuth } from "@/hooks/auth";
import { CigarDetailsFormData } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "@radix-ui/themes";
import EditCigarDetail from "@/components/admin/EditCigarDetail";
import { useCigarOptions } from "@/app/(app)/collection/hooks";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import collection from "@/apis/collection";

type PageParams = {
  cigarId: number;
};

const EditCigar = ({ params }: { params: PageParams }) => {
  const { cigarId } = params;
  const router = useRouter();
  const [error, setError] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth({ middleware: "admin" });
  const {
    cigar,
    isLoading: hasApiLoading,
    mutate,
  } = useCigar({
    user,
    cigarId,
  });
  const { cigarOptionsData } = useCigarOptions();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CigarDetailsFormData>();

  useEffect(() => {
    if (cigar) {
      const dimensionMatch = cigar.dimensions?.match(
        /^(\d+(?:\.\d+)?)"?\s*x\s*(\d+(?:\.\d+)?)/
      );
      const length = dimensionMatch ? parseFloat(dimensionMatch[1]) : "";
      const ringGauge = dimensionMatch ? parseFloat(dimensionMatch[2]) : "";
      const flavours = cigar.flavour && JSON.parse(cigar.flavour);
      const parsedFlavours = Array.isArray(flavours) ? flavours.join(", ") : "";
      reset({
        name: cigar.name,
        brand: cigar.brand,
        manufacturer: cigar.manufacturer,
        origin: cigar.origin,
        vitola: cigar.vitola,
        length: length?.toString(),
        ringGauge: ringGauge?.toString(),
        color: cigar.color,
        flavour: parsedFlavours,
        strength: cigar.strength,
        wrapper: cigar.wrapper,
        binder: cigar.binder,
        filler: cigar.filler,
      });
    }
  }, [cigar, reset]);

  const onSubmit = async (cigarData: CigarDetailsFormData) => {
    setIsLoading(true);
    setError({});
    try {
      await collection.updateCigar(cigarData, null, cigarId, {
        includeMethod: true,
      });
      await mutate();
    } catch (err: any) {
      setError(err?.response?.data?.errors);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasApiLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="3" />
      </div>
    );
  }

  const renderActiveButtonView = () => {
    return (
      <div className="flex space-x-3 self-end">
        <Button
          type="submit"
          title="Save"
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
    );
  };

  return (
    <EditCigarDetail
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      control={control}
      cigar={cigar}
      cigarOptionsData={cigarOptionsData}
      error={error}
      onSubmit={onSubmit}
      renderActiveButtonView={() => renderActiveButtonView()}
    />
  );
};

export default EditCigar;
