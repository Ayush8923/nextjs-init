"use client";

import React, { useEffect, useState } from "react";
import collection from "@/apis/collection";
import { CigarList, Container, DeleteModal, SearchInput } from "@/components";
import HumidorCard from "@/components/HumidorCard";
import {
  AddPlusIcon,
  FilterIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@/components/icons";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { CollectionPagesParams } from "@/lib/types";
import { Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useHumidorCigars } from "@/app/(app)/collection/hooks/useHumidorCigars";

const HumidorDetails = ({ params }: { params: CollectionPagesParams }) => {
  const { humidorId } = params;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasDeleteModal, setHasDeleteModal] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const debouncedSearchQuery = useDebouncedValue(searchQuery);
  const { data: humidor, error } = useSWR(`/api/humidors/${humidorId}`, () =>
    collection.getHumidorById(humidorId)
  );
  const isLoading = !humidor && !error;

  const {
    cigars: humidorCigars,
    setSize,
    isLoading: isLoadingInitialData,
    isValidating: isCigarValidating,
  } = useHumidorCigars({
    humidorId,
    query: debouncedSearchQuery,
    enabled: !!humidorId,
    onInitialLoad: () => setIsInitialLoad(false),
  });

  useEffect(() => {
    setSize(1);
  }, [humidorId, debouncedSearchQuery]);

  const handleShareCollection = () => {
    alert("Sharing functionality coming soon!");
    return;
  };

  const renderNoCigarView = () => {
    if (isLoadingInitialData) {
      return renderSpinner(isLoadingInitialData);
    }

    return (
      <div className="h-full flex justify-center items-center flex-col text-center">
        <div className="text-base font-extralight text-center">
          <p>Nothing here yet, add a</p>
          <p>new cigar to your collection </p>
          <p className="flex justify-center">
            or
            <button
              className="font-semibold text-base ml-1 underline underline-offset-1 cursor-pointer"
              onClick={() => setHasDeleteModal(true)}
            >
              delete humidor.
            </button>
          </p>
        </div>
      </div>
    );
  };

  const renderCigarsList = () => {
    return (
      <>
        {humidorCigars?.length > 0 && (
          <div className="flex-1 overflow-y-auto pb-5">
            <CigarList cigars={humidorCigars} />
          </div>
        )}
        {renderSpinner(isCigarValidating)}
      </>
    );
  };

  const renderCigarListView = () => {
    return (
      <div>
        <div className="flex space-x-2 my-9">
          <div className="flex-1">
            <SearchInput
              placeholder="Search Cigar"
              onSearch={(val: string) => setSearchQuery(val)}
            />
          </div>

          {/* TODO: Need to enable this button when we have the list of the brands & Pricing etc. */}
          <button
            className="flex items-center space-x-1.5 !ml-3 h-[48px] border-primary-100 border rounded-md px-3.5 py-2.5 opacity-50"
            disabled
            onClick={() => {}}
          >
            <FilterIcon />
            <div className="text-sm font-semibold">Filter</div>
          </button>
        </div>

        {renderCigarsList()}

        {!isCigarValidating &&
          debouncedSearchQuery &&
          humidorCigars.length === 0 && (
            <div className="h-full flex justify-center items-center flex-col text-center">
              <p className="text-base font-light">No cigars found.</p>
            </div>
          )}
      </div>
    );
  };

  const renderSpinner = (loading: boolean) => {
    return (
      loading && (
        <div className="h-full flex justify-center items-center flex-col text-center">
          <Spinner size="3" loading={loading} />
        </div>
      )
    );
  };

  const renderContent = () => {
    if (isInitialLoad) {
      return renderSpinner(isInitialLoad);
    }

    if (!debouncedSearchQuery && humidorCigars.length === 0) {
      return renderNoCigarView();
    }

    return renderCigarListView();
  };

  const onHandleDelete = async () => {
    setIsApiLoading(true);
    try {
      await collection.deleteHumidor(humidorId);
      const redirectionUrl = "/collection/";
      router.push(redirectionUrl);
    } catch (error: any) {
      if (error.response?.status !== 422) throw error;
    } finally {
      setIsApiLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col h-full relative">
        <div className="flex justify-between mb-3">
          <button
            className="flex items-center font-bold text-xs text-gray-500"
            onClick={() => router.back()}
          >
            <LeftArrowIcon /> <span className="ml-1.5">Back</span>
          </button>
          <button
            className="flex items-center font-bold text-xs text-primary-100 disabled:opacity-50"
            disabled
          >
            <span className="mr-1.5">Activity</span> <RightArrowIcon />
          </button>
        </div>
        <HumidorCard
          humidor={humidor}
          loading={isLoading}
          handleShareCollection={handleShareCollection}
        />

        {renderContent()}
      </div>
      <div className="sticky bottom-[80px] right-0 w-full flex justify-end pointer-events-none z-40">
        <div
          className="h-12 w-12 cursor-pointer pointer-events-auto z-40"
          onClick={() =>
            router.push(`/collection/humidors/${humidorId}/cigars`)
          }
        >
          <AddPlusIcon />
        </div>
      </div>
      <DeleteModal
        hasDeleteModal={hasDeleteModal}
        title={"Delete Humidor"}
        content={`Are you sure you want to delete ${humidor?.name} Humidor`}
        onHandleDelete={() => onHandleDelete()}
        isApiLoading={isApiLoading}
        onHandleCancel={() => setHasDeleteModal(false)}
      />
    </Container>
  );
};

export default HumidorDetails;
