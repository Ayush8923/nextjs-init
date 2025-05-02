"use client";

import React, { useState } from "react";
import collection from "@/apis/collection";
import {
  BackButton,
  CigarInfo,
  Container,
  DeleteModal,
  HumidorLocationInfo,
} from "@/components";
import { useAuth } from "@/hooks/auth";
import { CigarData, CollectionPagesParams, HumidorsData } from "@/lib/types";
import { Spinner } from "@radix-ui/themes";
import { formatDisplayDate } from "@/lib/common";
import { useCigar } from "@/app/(app)/collection/hooks";

const CigarInfoPage = ({ params }: { params: CollectionPagesParams }) => {
  const { cigarId } = params;
  const { user } = useAuth({ middleware: "auth" });
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [hasDeleteModal, setHasDeleteModal] = useState(false);

  const [cigarToDelete, setCigarToDelete] = useState<{
    cigar: CigarData;
    humidor: HumidorsData;
  } | null>(null);

  const {
    cigar,
    isLoading: isInitialLoad,
    mutate,
  } = useCigar({ user, cigarId });

  if (isInitialLoad) {
    return (
      <Container>
        <BackButton />
        <div className="flex flex-col h-full">
          <div className="flex-1 flex justify-center items-center">
            <Spinner size="3" />
          </div>
        </div>
      </Container>
    );
  }

  const onCigarDelete = async () => {
    if (!cigarToDelete?.cigar) {
      setHasDeleteModal(false);
      return;
    }

    setIsApiLoading(true);
    try {
      await collection.deleteCigarFromHumidor(cigarToDelete.cigar.id);
      mutate();
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
    } finally {
      setHasDeleteModal(false);
      setIsApiLoading(false);
    }
  };

  const onHandleDelete = (cigar: CigarData, humidor: HumidorsData) => {
    setCigarToDelete({ cigar, humidor });
    setHasDeleteModal(true);
  };

  const renderDeleteCigarModalContent = () => {
    if (!cigarToDelete) return "";

    const cigarAddedAt = cigarToDelete.cigar.added_at
      ? formatDisplayDate(cigarToDelete.cigar.added_at)
      : "";

    return `Are you sure you want to delete ${cigar.name} from ${
      cigarToDelete.humidor.name
    } added on ${cigarAddedAt}?`;
  };

  return (
    <Container>
      <div className="flex flex-col h-full justify-between">
        <CigarInfo cigar={cigar} />
        <div className="mt-9 -mx-6">
          <HumidorLocationInfo
            humidors={cigar?.humidors || []}
            onCigarDelete={(cigar, humidor) => onHandleDelete(cigar, humidor)}
          />
        </div>
      </div>

      <DeleteModal
        hasDeleteModal={hasDeleteModal}
        title="Delete Cigar"
        content={renderDeleteCigarModalContent()}
        onHandleDelete={onCigarDelete}
        isApiLoading={isApiLoading}
        onHandleCancel={() => setHasDeleteModal(false)}
      />
    </Container>
  );
};

export default CigarInfoPage;
