"use client";

import collection from "@/apis/collection";
import { useCigarOptions } from "@/app/(app)/collection/hooks";
import { useCigar } from "@/app/(app)/collection/hooks";
import { Button } from "@/components";
import EditCigarDetail from "@/components/admin/EditCigarDetail";
import { useAuth } from "@/hooks/auth";
import { CigarDetailsFormData } from "@/lib/types";
import { Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type PageParams = {
  cigarId: number;
};

const AddedByUserCigarEdit = ({ params }: { params: PageParams }) => {
  const { cigarId } = params;
  const router = useRouter();
  const [error, setError] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth({ middleware: "admin" });
  const { cigar, isLoading: hasApiLoading } = useCigar({ user, cigarId });
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

  const onSubmit = async (cigarDetails: CigarDetailsFormData) => {
    setIsLoading(true);
    setError({});
    try {
      await collection.updateCigar(cigarDetails, null, cigarId, {
        includeMethod: true,
        includeStatus: true,
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

  const renderActiveButtonView = () => {
    return (
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

export default AddedByUserCigarEdit;
