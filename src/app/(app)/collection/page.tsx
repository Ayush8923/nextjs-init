"use client";

import collection from "@/apis/collection";
import { Container } from "@/components";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useSWR from "swr";

const Collection = () => {
  const router = useRouter();
  const { data: humidors } = useSWR("/api/humidors", collection.getHumidors);

  useEffect(() => {
    let isActive = true;
    if (humidors?.data?.length > 0) {
      if (isActive) router.replace("/collection/cigars");
    } else {
      if (isActive) router.replace("/collection/add-humidor");
    }

    return () => {
      isActive = false;
    };
  }, [humidors]);

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
