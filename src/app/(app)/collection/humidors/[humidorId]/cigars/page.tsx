"use client";

import React, { useEffect, useState } from "react";
import { Button, Container, CustomPopover, SearchInput } from "@/components";
import useSWRInfinite from "swr/infinite";
import admin from "@/apis/admin";
import { PAGINATION_SIZE } from "@/lib/common";
import { CigarData, CollectionPagesParams } from "@/lib/types";
import { Spinner } from "@radix-ui/themes";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useRouter } from "next/navigation";
import { useCigarStore } from "@/store";
import { CigarThumbnailIcon } from "@/components/icons";
import Image from "next/image";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const CigarsList = ({ params }: { params: CollectionPagesParams }) => {
  const { humidorId } = params;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { setFlowType } = useCigarStore();
  const debouncedSearchQuery = useDebouncedValue(searchQuery);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data.length) return null;
    return JSON.stringify({
      page: pageIndex + 1,
      limit: PAGINATION_SIZE,
      name: debouncedSearchQuery,
      key: "cigars",
    });
  };

  const { data, setSize, isValidating, error } = useSWRInfinite(
    getKey,
    (key) => {
      const keyParams = JSON.parse(key);
      return admin.getCigars(keyParams);
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: () => setIsInitialLoad(false),
    }
  );

  const isLoadingInitialData = !data && !error;
  const cigars: CigarData[] = data
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

  const renderSpinner = (loading: boolean) => {
    return (
      loading && (
        <div className="flex justify-center items-center mb-[40px]">
          <Spinner size="3" loading={loading} />
        </div>
      )
    );
  };

  const handleCigarSelect = (cigar: CigarData) => {
    setFlowType("existing");
    const redirectionUrl = `/collection/humidors/${humidorId}/cigars/${cigar?.id}/details`;
    router.push(redirectionUrl);
  };

  const handleAddNewCigar = () => {
    setFlowType("custom");
    const redirectionUrl = `/collection/humidors/${humidorId}/cigars/add`;
    router.push(redirectionUrl);
  };

  const cigarsList = () => (
    <div className="flex-1 overflow-y-auto pb-10">
      {cigars.map((cigar) => (
        <div
          className="flex items-center mb-6 cursor-pointer hover:bg-gray-50 rounded-md transition"
          onClick={() => handleCigarSelect(cigar)}
          key={cigar.id}
        >
          {cigar?.image_url ? (
            <Image
              src={cigar.image_url}
              alt={cigar.name}
              width={74}
              height={74}
              className="rounded-md mr-3 h-[74px] w-[74px] object-fill"
            />
          ) : (
            <div className="h-[74px] w-[74px] rounded-md mr-3">
              <CigarThumbnailIcon />
            </div>
          )}
          <div className="flex-1">
            <div className="text-base font-medium">{cigar.name}</div>
            <div className="text-xs font-light">
              {cigar.manufacturer} • {cigar.origin}
            </div>
            <div className="text-xs font-light">{cigar.rating}</div>
          </div>
        </div>
      ))}
      {renderSpinner(isValidating)}
    </div>
  );

  const addNewCigar = () => (
    <div className="h-full flex justify-center items-center flex-col">
      <p className="font-extralight text-base">
        Could not find your cigar? Add
      </p>
      <p className="font-extralight text-base">your own cigar.</p>
      <Button
        className="!mt-4 px-[35px]"
        variant="secondary"
        title="Add Cigar"
        onClick={() => handleAddNewCigar()}
      />
    </div>
  );

  const renderContent = () => {
    if (isLoadingInitialData) {
      return renderSpinner(isLoadingInitialData);
    }

    if (cigars.length > 0) {
      return cigarsList();
    }

    return addNewCigar();
  };

  if (isInitialLoad) {
    return (
      <Container>
        <div className="flex flex-col h-full">
          <h1 className="text-2xl font-medium mb-6">Add Cigar</h1>
          <div className="flex-1 flex justify-center items-center">
            <Spinner size="3" />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col h-full relative">
        <div>
          <h1 className="text-2xl font-medium mb-6">Add Cigar</h1>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="text-base font-extralight">Select a Cigar</div>
              <CustomPopover content="Use the search bar to quickly find a cigars, or scroll through the list to select one." />
            </div>
            <div className="font-extralight text-base">{`1/${cigars.length > 0 ? 3 : 4}`}</div>
          </div>

          <div className="mb-9">
            <SearchInput
              placeholder="Search Cigar"
              onSearch={(val: string) => setSearchQuery(val)}
            />
          </div>
        </div>

        {renderContent()}
      </div>
    </Container>
  );
};

export default CigarsList;
