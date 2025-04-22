"use client";

import React, { useEffect, useState } from "react";
import collection from "@/apis/collection";
import { Button, Container, SearchInput, ToggleSwitch } from "@/components";
import { AddPlusIcon, ShareIcon } from "@/components/icons";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { PAGINATION_SIZE } from "@/lib/common";
import { HumidorsData } from "@/lib/types";
import { Spinner } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWRInfinite from "swr/infinite";
import { useHumidorStore } from "@/store";
import { humidorTypes } from "@/lib/constant";

const HumidorsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setHumidorDetails } = useHumidorStore();
  const router = useRouter();
  const debouncedSearchQuery = useDebouncedValue(searchQuery);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data.length) return null;
    return {
      page: pageIndex + 1,
      limit: PAGINATION_SIZE,
      name: debouncedSearchQuery,
    };
  };

  const { data, setSize, isValidating, error } = useSWRInfinite(
    getKey,
    collection.getHumidors,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const isLoadingInitialData = !data && !error;
  const humidors: HumidorsData[] = data
    ? [].concat(...data.map((page) => page.data))
    : [];

  const isReachingEnd =
    data && data[data.length - 1]?.data.length < PAGINATION_SIZE;

  useInfiniteScroll({
    isLoading: isValidating,
    hasMore: !isReachingEnd,
    onLoadMore: () => setSize((prev) => prev + 1),
  });

  useEffect(() => {
    setSize(1);
  }, [debouncedSearchQuery]);

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
    router.push("/collection/cigars");
  };

  const renderSpinner = (loading: boolean) => {
    return (
      loading && (
        <div className="flex justify-center items-center mb-[40px]">
          <Spinner size="3" loading={loading} />
        </div>
      )
    );
  };

  const humidorsList = () => {
    return (
      <div className="flex-1 overflow-y-auto pb-20">
        {humidors.map((humidor) => (
          <div
            className="flex mb-6 cursor-pointer hover:bg-gray-50 rounded-sm transition"
            onClick={() => onSelectHumidor(humidor)}
            key={humidor.id}
          >
            {humidor?.image_url ? (
              <Image
                src={humidor.image_url}
                alt={humidor.name}
                width={74}
                height={74}
                className="rounded-sm mr-3 h-[74px] w-[74px] "
              />
            ) : (
              <div className="h-[132px] w-[132px] rounded-sm mr-4 bg-gray-100"></div>
            )}
            <div className="flex-1 mt-5">
              <div className="space-y-1">
                <div className="text-base font-medium leading-none">
                  {humidor.name}
                </div>
                <div className="text-xs font-light leading-none">
                  {
                    humidorTypes.find((item) => item.value === humidor.type)
                      ?.label
                  }
                </div>
                <div className="text-xs font-light leading-none">
                  {humidor?.cigars_count} Cigars{" "}
                  {humidor?.capacity &&
                    (humidor?.percentage_filled > 100
                      ? "(Overfilled)"
                      : `(${humidor?.percentage_filled}% filled)`)}
                </div>
              </div>
              {/* TODO: This need to this share collection functionality in the later phase. */}
              <div className="flex items-center mt-4 space-x-2 opacity-50">
                <ShareIcon />
                <div className="font-semibold text-sm leading-none">
                  Share Collection
                </div>
              </div>
            </div>
          </div>
        ))}
        {renderSpinner(isValidating)}
      </div>
    );
  };

  const noHumidorsFound = () => {
    return (
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
  };

  return (
    <Container>
      <div className="flex flex-col h-full relative leading-none">
        <div className="sticky top-[68px] bg-white z-40">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium">Your Collection</h1>
            <div className="flex items-center font-extralight text-base leading-none">
              <div className="font-normal text-xs leading-none">
                <div>Cigar</div>
                <div>view</div>
              </div>
              <ToggleSwitch
                id="toggle"
                onCheckedChange={(_checked) => {}}
                className="ml-1"
                disabled
              />
            </div>
          </div>

          <div className="mb-[30px]">
            <SearchInput
              placeholder="Search Humidor"
              onSearch={(val: string) => setSearchQuery(val)}
            />
          </div>
        </div>

        {isLoadingInitialData
          ? renderSpinner(isLoadingInitialData)
          : humidors.length > 0
            ? humidorsList()
            : noHumidorsFound()}

        <div
          className="absolute bottom-[35px] right-0 h-[48px] w-[48px] cursor-pointer"
          onClick={() => router.push("/collection/humidors/add")}
        >
          <AddPlusIcon />
        </div>
      </div>
    </Container>
  );
};

export default HumidorsList;
