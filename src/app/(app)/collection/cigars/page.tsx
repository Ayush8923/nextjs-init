"use client";

import React, { useEffect, useState } from "react";
import { Button, Container, CustomTooltip, SearchInput } from "@/components";
import useSWRInfinite from "swr/infinite";
import admin from "@/apis/admin";
import { PAGINATION_SIZE } from "@/lib/common";
import { CigarData } from "@/lib/types";
import { Spinner } from "@radix-ui/themes";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import collection from "@/apis/collection";
import { useCigarStore } from "@/store";
import { CigarThumbnailIcon } from "@/components/icons";
import Image from "next/image";

const CigarsList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: humidors } = useSWR("/api/humidors", collection.getHumidors);
  const { setCigarDetails, setFlowType } = useCigarStore();

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data.length) return null;
    return `/api/cigars?page=${pageIndex + 1}&limit=${PAGINATION_SIZE}&name=${encodeURIComponent(
      searchQuery
    )}`;
  };

  const { data, setSize, isValidating, error } = useSWRInfinite(
    getKey,
    admin.getCigars
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
  }, [searchQuery]);

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
    const cigarDetails = {
      id: cigar.id,
      name: cigar.name,
      manufacturer: cigar.manufacturer,
      origin: cigar.origin,
      rating: cigar.rating,
      humidorId: humidors?.data[0]?.id,
    };
    setCigarDetails(cigarDetails);
    setFlowType("existing");
    router.push(`/collection/cigars/${cigar.id}/details`);
  };

  const handleAddNewCigar = () => {
    const cigarDetails = {
      humidorId: humidors?.data[0]?.id,
    };
    setCigarDetails(cigarDetails);
    setFlowType("custom");
    router.push("/collection/cigars/add");
  };

  const cigarsList = () => (
    <div className="flex-1 overflow-y-auto pb-20">
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
              className="rounded-md mr-3 h-[74px] w-[74px] "
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

  return (
    <Container>
      <div className="flex flex-col h-full relative">
        <div className="sticky top-[68px] bg-white z-40">
          <h1 className="text-2xl font-medium mb-6">Add Cigar</h1>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="text-base font-extralight">Select a Cigar</div>
              <CustomTooltip content="Use the search bar to quickly find a cigars, or scroll through the list to select one." />
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

        {isLoadingInitialData
          ? renderSpinner(isLoadingInitialData)
          : cigars.length > 0
            ? cigarsList()
            : addNewCigar()}
      </div>
    </Container>
  );
};

export default CigarsList;
