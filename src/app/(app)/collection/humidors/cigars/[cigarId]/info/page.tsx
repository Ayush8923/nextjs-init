"use client";

import React, { useState } from "react";
import collection from "@/apis/collection";
import {
  BackButton,
  BottomSheet,
  Button,
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
  const [hasSmokeCigarModalOpen, setHasSmokeCigarModalOpen] = useState(false);
  const [hasInitialLoading, setHasInitialLoading] = useState(true);

  const [selectedCigar, setSelectedCigar] = useState<{
    cigar: CigarData;
    humidor: HumidorsData;
  } | null>(null);

  const {
    cigar,
    isLoading: isInitialLoad,
    mutate,
  } = useCigar({
    user,
    cigarId,
    onInitialLoad: () => setHasInitialLoading(false),
  });

  if (isInitialLoad || hasInitialLoading) {
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
    if (!selectedCigar?.cigar) {
      setHasDeleteModal(false);
      return;
    }

    setIsApiLoading(true);
    try {
      await collection.deleteCigarFromHumidor(selectedCigar.cigar.id);
      await mutate();
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
    } finally {
      setHasDeleteModal(false);
      setIsApiLoading(false);
    }
  };

  const handleSmokeCigar = async () => {
    if (!selectedCigar?.cigar) {
      setHasDeleteModal(false);
      return;
    }

    setIsApiLoading(true);
    try {
      await collection.finishCigar(selectedCigar.cigar.id);
      await mutate();
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
    } finally {
      setHasSmokeCigarModalOpen(false);
      setIsApiLoading(false);
    }
  };

  const onHandleDelete = (cigar: CigarData, humidor: HumidorsData) => {
    setSelectedCigar({ cigar, humidor });
    setHasDeleteModal(true);
  };

  const onCigarSmoke = (cigar: CigarData, humidor: HumidorsData) => {
    setSelectedCigar({ cigar, humidor });
    setHasSmokeCigarModalOpen(true);
  };

  const getCigarModalMessage = (action: string) => {
    if (!selectedCigar) return "";

    const { cigar, humidor } = selectedCigar;
    const cigarAddedAt = cigar.added_at
      ? formatDisplayDate(cigar.added_at)
      : "";

    return `Are you sure you want to ${action} ${cigar.name} from ${humidor.name} added on ${cigarAddedAt}?`;
  };

  const renderActionItems = () => {
    return (
      <>
        <Button
          type="button"
          className="w-full"
          title="Smoke"
          onClick={handleSmokeCigar}
          disabled={isApiLoading}
          loading={isApiLoading}
        />

        <Button
          type="button"
          className="w-full"
          title="Cancel"
          variant="secondary"
          onClick={() => setHasSmokeCigarModalOpen(false)}
        />
      </>
    );
  };

  const renderDeleteCigarModalContent = () => getCigarModalMessage("delete");

  const renderSmokeCigarModalContent = () => getCigarModalMessage("smoke");

  return (
    <Container>
      <div className="flex flex-col h-full justify-between">
        <CigarInfo cigar={cigar} />
        <div className="mt-9 -mx-6">
          <HumidorLocationInfo
            humidors={cigar?.humidors || []}
            onCigarDelete={(cigar, humidor) => onHandleDelete(cigar, humidor)}
            onCigarSmoke={(cigar, humidor) => onCigarSmoke(cigar, humidor)}
          />
        </div>
      </div>

      <BottomSheet
        hasModalOpen={hasSmokeCigarModalOpen}
        title="Smoke a Cigar"
        content={renderSmokeCigarModalContent}
        renderActionItem={renderActionItems}
      />

      <DeleteModal
        hasDeleteModal={hasDeleteModal}
        title="Delete Cigar"
        content={renderDeleteCigarModalContent}
        onHandleDelete={onCigarDelete}
        isApiLoading={isApiLoading}
        onHandleCancel={() => setHasDeleteModal(false)}
      />
    </Container>
  );
};

export default CigarInfoPage;
