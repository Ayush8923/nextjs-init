"use client";

import { useCigar } from "@/app/(app)/collection/hooks";
import collection from "@/apis/collection";
import { useAuth } from "@/hooks/auth";
import { CigarDetailsFormData } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Spinner } from "@radix-ui/themes";
import EditCigarDetail from "@/components/admin/EditCigarDetail";
import admin from "@/apis/admin";

type PageParams = {
  cigarId: number;
};

const EditCigar = ({ params }: { params: PageParams }) => {
  const { cigarId } = params;
  const [error, setError] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth({ middleware: "admin" });
  const { cigar, isLoading: hasApiLoading } = useCigar({ user, cigarId });
  const { data: cigarsMetaData } = useSWR(
    "/api/cigars/meta",
    collection.getCigarsMeta
  );

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
      reset({
        name: cigar.name,
        brand: cigar.brand,
        manufacturer: cigar.manufacturer,
        origin: cigar.origin,
        vitola: cigar.vitola,
        length: length?.toString(),
        ringGauge: ringGauge?.toString(),
        color: cigar.color,
        flavour: cigar?.flavour?.join(", "),
        strength: cigar.strength,
        wrapper: cigar.wrapper,
        binder: cigar.binder,
        filler: cigar.filler,
      });
    }
  }, [cigar, reset]);

  const onSubmit = async () => {
    setIsLoading(true);
    setError({});
    try {
      await admin.updateCigarStatus(cigarId, {
        status: "active",
      });
      // Refresh the page to get the updated list in the cigar by users page.
      window.location.replace("/admin/cigars/cigars-by-user");
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

  return (
    <EditCigarDetail
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      control={control}
      cigar={cigar}
      cigarsMetaData={cigarsMetaData}
      error={error}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

export default EditCigar;
