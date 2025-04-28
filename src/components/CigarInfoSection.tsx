"use client";

import Image from "next/image";
import React from "react";
import { CigarThumbnailIcon } from "./icons";
import { Skeleton } from "@radix-ui/themes";

type CigarInfoSectionProps = {
  name: string;
  image: string;
  manufacturer: string;
  origin: string;
  rating: string;
  isLoading: boolean;
};

type CigarInfoSkeletonViewProps = {
  isLoading: boolean;
};

const CigarInfoSkeletonView = ({ isLoading }: CigarInfoSkeletonViewProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="bg-primary-100 px-6 py-3.5 flex -mx-[24px]">
      <div className="w-[74px] h-[74px] rounded-lg mr-4 bg-gray-500 animate-pulse">
        <Skeleton width="74px" height="74px" />
      </div>
      <div className="text-white">
        <div>
          <Skeleton
            width="150px"
            height="20px"
            className="!bg-gray-500 animate-pulse"
          />
          <Skeleton
            width="100px"
            height="15px"
            className="mt-1.5 !bg-gray-500 animate-pulse"
          />
          <Skeleton
            width="60px"
            height="15px"
            className="mt-1.5 !bg-gray-500 animate-pulse"
          />
        </div>
      </div>
    </div>
  );
};

const CigarInfoSection = ({
  name,
  image,
  manufacturer,
  origin,
  rating,
  isLoading,
}: CigarInfoSectionProps) => {
  if (isLoading) {
    return <CigarInfoSkeletonView isLoading={isLoading} />;
  }

  return (
    <div className="bg-primary-100 px-6 py-3.5 flex -mx-[24px]">
      {image ? (
        <Image
          src={image}
          alt="cigarImage"
          width={74}
          height={74}
          className="rounded-full w-[74px] h-[74px]"
        />
      ) : (
        <div className="w-[74px] h-[74px] rounded-lg mr-4">
          <CigarThumbnailIcon />
        </div>
      )}
      <div className="text-white">
        <h2 className="text-base font-medium">{name}</h2>
        <p className="font-light text-xs mt-1.5">
          {manufacturer} • {origin}
        </p>
        <p className="font-light text-xs mt-1.5">{rating}</p>
      </div>
    </div>
  );
};

export default CigarInfoSection;
