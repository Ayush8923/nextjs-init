"use client";

import { Button, Container } from "@/components";
import { HumidorIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import React from "react";
import { CollectionPagesParams } from "@/lib/types";

const HumidorSaved = ({ params }: { params: CollectionPagesParams }) => {
  const { humidorId } = params;
  const router = useRouter();

  const redirectToCigarsList = () => {
    const redirectionUrl = `/collection/humidors/${humidorId}/cigars`;
    router.replace(redirectionUrl);
  };

  return (
    <Container hasHeaderVisible={false}>
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mx-auto mb-6">
            <HumidorIcon />
          </div>
          <h1 className="text-2xl font-medium">Humidor added</h1>
          <p className="text-2xl font-medium">successfully to collection!</p>
        </div>
      </div>

      <div className="fixed bottom-[80px] left-0 right-0 p-6 md:px-0 max-w-md mx-auto">
        <Button
          className="w-full"
          title="Add Cigar to Humidor"
          onClick={() => redirectToCigarsList()}
        />
      </div>
    </Container>
  );
};

export default HumidorSaved;
