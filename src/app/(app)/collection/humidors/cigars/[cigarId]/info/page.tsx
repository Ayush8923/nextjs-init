"use client";

import React from "react";
import collection from "@/apis/collection";
import {
  BackButton,
  CigarInfo,
  Container,
  HumidorLocationInfo,
} from "@/components";
import { useAuth } from "@/hooks/auth";
import { CollectionPagesParams } from "@/lib/types";
import { Spinner } from "@radix-ui/themes";
import useSWR from "swr";

const CigarInfoPage = ({ params }: { params: CollectionPagesParams }) => {
  const { cigarId } = params;
  const { user } = useAuth({ middleware: "auth" });
  const { data: cigar, error } = useSWR(
    `/api/users/${user?.id}/cigars/${cigarId}`,
    () => collection.getCigarById(user, cigarId)
  );
  const isInitialLoad = !cigar && !error;

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

  return (
    <Container>
      <div className="flex flex-col h-full justify-between">
        <CigarInfo cigar={cigar} />
        <div className="mt-9 -mx-6">
          <HumidorLocationInfo humidors={cigar?.humidors || []} />
        </div>
      </div>
    </Container>
  );
};

export default CigarInfoPage;
