"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  CigarList,
  Container,
  HumidorList,
  SearchInput,
  ToggleSwitch,
} from "@/components";
import { AddPlusIcon, FilterIcon } from "@/components/icons";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { HumidorsData } from "@/lib/types";
import { Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useHumidorStore } from "@/store";
import { useAuth } from "@/hooks/auth";
import { useCigarList, useHumidorList } from "./hooks";

const HumidorsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCigarView, setIsCigarView] = useState(false);
  const { setHumidorDetails } = useHumidorStore();
  const router = useRouter();
  const debouncedSearchQuery = useDebouncedValue(searchQuery);
  const { user } = useAuth({ middleware: "auth" });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const {
    humidors,
    isLoading: isLoadingHumidors,
    isValidating,
  } = useHumidorList({
    query: debouncedSearchQuery,
    enabled: !isCigarView,
    onInitialLoad: () => setIsInitialLoad(false),
  });

  const {
    cigars: cigarListData,
    setSize: setCigarSize,
    isValidating: isCigarValidating,
    isLoading: isLoadingCigars,
  } = useCigarList({
    query: debouncedSearchQuery,
    user,
    enabled: isCigarView,
    onInitialLoad: () => setIsInitialLoad(false),
  });

  useEffect(() => {
    if (isCigarView) {
      setCigarSize(1);
    }
  }, [debouncedSearchQuery, isCigarView]);

  const onSelectHumidor = (humidor: HumidorsData) => {
    const extractedHumidorDetails = {
      id: humidor.id,
      name: humidor.name,
      image_url: humidor.image_url,
      type: humidor.type,
      humidification_method: humidor.humidification_method,
      capacity: humidor.capacity,
    };
    setHumidorDetails(extractedHumidorDetails);
    setIsCigarView(false);
    router.push("/collection/cigars");
  };

  const renderSpinner = (loading: boolean) => {
    if (!loading) {
      return;
    }
    return (
      <div className="flex justify-center items-center mb-[40px]">
        <Spinner size="3" loading={loading} />
      </div>
    );
  };

  const renderCigarsList = () => (
    <div className="flex-1 overflow-y-auto pb-10">
      <CigarList cigars={cigarListData} />
      {renderSpinner(isCigarValidating)}
    </div>
  );

  const renderHumidorsList = () => (
    <div className="flex-1 overflow-y-auto pb-10">
      <HumidorList
        humidors={humidors}
        selectedHumidor={(humidor) => onSelectHumidor(humidor)}
      />
      {renderSpinner(isValidating)}
    </div>
  );

  const renderNoHumidorView = () => (
    <div className="h-full flex justify-center items-center flex-col">
      <p className="font-extralight text-base">
        Could not find your humidor? Add
      </p>
      <p className="font-extralight text-base">your own humidor.</p>
      <Button
        className="!mt-4 px-[35px]"
        variant="secondary"
        title="Add Humidor"
        onClick={() => router.push("/collection/humidors/add")}
      />
    </div>
  );

  const renderNoCigarView = () => (
    <div className="h-full flex justify-center items-center flex-col">
      <p className="font-extralight text-base">
        Could not find your Cigar? Add
      </p>
      <p className="font-extralight text-base">your own Humidor.</p>
      <Button
        className="!mt-4 px-[35px]"
        variant="secondary"
        title="Add Humidor"
        onClick={() => router.push("/collection/humidors/add")}
      />
    </div>
  );

  const renderContent = () => {
    if (isLoadingHumidors || isLoadingCigars) return renderSpinner(true);
    if (isCigarView && cigarListData?.length > 0) return renderCigarsList();
    if (humidors.length > 0) return renderHumidorsList();
    if (isCigarView && !(cigarListData?.length > 0)) return renderNoCigarView();
    return renderNoHumidorView();
  };

  if (isInitialLoad) {
    return (
      <Container>
        <div className="flex flex-col h-full">
          <h1 className="text-2xl font-medium mb-6">Your Collection</h1>
          <div className="flex-1 flex justify-center items-center">
            <Spinner size="3" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col h-full relative leading-none">
        <div className="bg-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium">Your Collection</h1>
            <div className="flex items-center font-extralight text-base leading-none">
              <div className="font-normal text-xs leading-none">
                <div>Cigar</div>
                <div>view</div>
              </div>
              <ToggleSwitch
                id="toggle"
                onCheckedChange={(checked) => setIsCigarView(checked)}
                checked={isCigarView}
                className="ml-1"
              />
            </div>
          </div>

          <div className="flex space-x-2 mb-[30px]">
            <div className="flex-1">
              <SearchInput
                placeholder={`Search ${isCigarView ? "Cigar" : "Humidor"}`}
                onSearch={(val: string) => setSearchQuery(val)}
              />
            </div>

            {/* TODO: Need to enable this button when we have the list of the brands & Pricing etc. */}
            {isCigarView && (
              <button
                className="flex items-center space-x-1.5 !ml-3 h-[48px] border-primary-100 border rounded-md px-3.5 py-2.5 opacity-50"
                disabled
                onClick={() => {}}
              >
                <FilterIcon />
                <div className="text-sm font-semibold">Filter</div>
              </button>
            )}
          </div>
        </div>

        {renderContent()}

        <div className="sticky bottom-[80px] right-0 w-full flex justify-end pointer-events-none z-40">
          <div
            className="h-12 w-12 mr-4 cursor-pointer pointer-events-auto z-40"
            onClick={() => router.push("/collection/humidors/add")}
          >
            <AddPlusIcon />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HumidorsList;
