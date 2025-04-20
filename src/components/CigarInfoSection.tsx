"use client";

import Image from "next/image";
import React from "react";
import { CigarThumbnailIcon } from "./icons";

type CigarInfoSectionProps = {
  name: string;
  image: string;
  manufacturer: string;
  origin: string;
  rating: string;
};

const CigarInfoSection = ({
  name,
  image,
  manufacturer,
  origin,
  rating,
}: CigarInfoSectionProps) => {
  return (
    <div className="bg-primary-100 px-6 py-3.5 flex -mx-12">
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
