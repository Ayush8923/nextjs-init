"use client";

import { Button, Container } from "@/components";
import { SingleCigarIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import React from "react";

const CigarSaved = () => {
  const router = useRouter();
  return (
    <Container hasHeaderVisible={false}>
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mx-auto mb-6">
            <SingleCigarIcon />
          </div>
          <h1 className="text-2xl font-medium">Cigar added successfully</h1>
          <p className="text-2xl font-medium">to collection!</p>
        </div>
      </div>

      <div className="fixed bottom-[80px] left-0 right-0 p-6 md:px-0 max-w-md mx-auto">
        <Button
          className="w-full"
          title="Add Another Cigar"
          onClick={() => router.replace("/collection/cigars")}
        />
      </div>
    </Container>
  );
};

export default CigarSaved;
