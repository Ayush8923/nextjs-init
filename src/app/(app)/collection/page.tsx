"use client";

import React from "react";
import { Container } from "@/components";
import { PAGINATION_SIZE } from "@/lib/common";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import collection from "@/apis/collection";

interface HumidorResponse {
  data: any[];
}

const Collection = () => {
  const router = useRouter();

  useSWR(
    { page: 1, limit: PAGINATION_SIZE },
    (params) => collection.getHumidors(params),
    {
      dedupingInterval: 0,
      onSuccess: (data) => redirectToHumidor(data),
      onError: () => {
        router.replace("/collection/humidors/add");
      },
    }
  );

  const redirectToHumidor = (humidors: HumidorResponse) => {
    router.replace(
      humidors?.data?.length > 0
        ? "/collection/humidors"
        : "/collection/humidors/add"
    );
  };

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
