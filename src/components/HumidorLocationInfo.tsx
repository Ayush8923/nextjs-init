"use client";

import React, { useState } from "react";
import { DeleteIcon, LeftArrowIcon, RightArrowIcon, SmokeIcon } from "./icons";
import { formatDisplayDate } from "@/lib/common";
import { CigarData, HumidorsData } from "@/lib/types";
import { Skeleton } from "@radix-ui/themes";

interface HumidorLocationInfoProps {
  humidors: HumidorsData[];
  onCigarDelete: (_cigar: CigarData, _humidor: HumidorsData) => void;
  onCigarSmoke: (_cigar: CigarData, _humidor: HumidorsData) => void;
  isLoading: boolean;
}

const HumidorLocationInfo = ({
  humidors,
  onCigarDelete,
  onCigarSmoke,
  isLoading,
}: HumidorLocationInfoProps) => {
  const [currentHumidorIndex, setCurrentHumidorIndex] = useState(0);

  const currentHumidor = humidors[currentHumidorIndex];
  const hasPrevious = currentHumidorIndex > 0;
  const hasNext = currentHumidorIndex < humidors.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      setCurrentHumidorIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setCurrentHumidorIndex((prev) => prev + 1);
    }
  };

  const validHumidors = humidors.filter(
    (humidor) => humidor.humidor_cigars && humidor.humidor_cigars.length > 0
  );

  if (validHumidors.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-primary-100 text-white p-6 w-full">
        <Skeleton className="h-6 !bg-gray-500 w-1/3 mb-4 rounded" />
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-4 !bg-gray-500 w-full mb-2 rounded"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-primary-100 text-white p-6 w-full">
      <div className="text-xs font-light text-gray-500 mb-1">Humidor</div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium leading-none">
          {currentHumidor.name}
          <span className="text-base font-thin leading-none ml-1.5">
            X{currentHumidor.cigars_count}
          </span>
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className={`text-2xl ${!hasPrevious && "cursor-not-allowed"}`}
          >
            <LeftArrowIcon className={`${!hasPrevious && "opacity-50"}`} />
          </button>
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`text-2xl ${!hasNext && "cursor-not-allowed"}`}
          >
            <RightArrowIcon
              width="12"
              height="20"
              color="white"
              className={`${!hasNext && "opacity-50"}`}
            />
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {currentHumidor.humidor_cigars.map((cigar, index) => (
          <li key={cigar.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-light text-xs leading-none mr-3 opacity-40">
                {index + 1}.
              </span>
              <span className="font-light text-xs leading-none">
                {cigar.added_at ? formatDisplayDate(cigar.added_at) : "-"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-light text-xs mr-[26px]">
                {cigar?.price ? "$" + cigar.price : "N/A"}
              </span>
              <button
                className="cursor-pointer mr-4"
                onClick={() => onCigarSmoke(cigar, currentHumidor)}
              >
                <SmokeIcon />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => onCigarDelete(cigar, currentHumidor)}
              >
                <DeleteIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HumidorLocationInfo;
