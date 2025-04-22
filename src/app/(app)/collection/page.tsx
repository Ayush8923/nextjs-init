"use client";

import collection from "@/apis/collection";
import { Container } from "@/components";
import { PAGINATION_SIZE } from "@/lib/common";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useSWR from "swr";

const Collection = () => {
  const router = useRouter();
  const { data: humidors, error } = useSWR(
    { page: 1, limit: PAGINATION_SIZE },
    (params) => collection.getHumidors(params)
  );
  const isLoading = !humidors && !error;

  useEffect(() => {
    if (!isLoading) {
      if (humidors?.data?.length > 0) {
        router.replace("/collection/humidors");
      } else {
        router.replace("/collection/humidors/add");
      }
    }
  }, [isLoading, humidors, router]);

  return (
    <Container>
      <div className="flex flex-col h-full relative">
        <div className="h-full flex justify-center items-center flex-col">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
        </div>
      </div>
    </Container>
  );
};

export default Collection;
