"use client";

import { CigarData } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { CigarThumbnailIcon } from "./icons";

type CigarListProps = {
  cigars: CigarData[];
  onCigarSelected: (_id: number) => void;
};

const CigarList = ({ cigars, onCigarSelected }: CigarListProps) => {
  if (!(cigars.length > 0)) {
    return;
  }
  return cigars.map((cigar: CigarData) => (
    <div
      key={cigar.id}
      className="flex items-center space-x-4 mb-4 cursor-pointer hover:bg-gray-50 rounded-sm transition"
      onClick={() => onCigarSelected(cigar?.id)}
    >
      {cigar?.image_url ? (
        <Image
          src={cigar.image_url}
          alt={cigar.name}
          width={74}
          height={74}
          className="rounded-[10px] mr-3 h-[74px] w-[74px] "
        />
      ) : (
        <div className="h-[74px] w-[74px] rounded-[10px] mr-3">
          <CigarThumbnailIcon />
        </div>
      )}
      <div className="flex-1 space-y-1">
        <h2 className="text-base font-medium leading-none">{cigar.name}</h2>
        <p className="text-xs font-light leading-none">
          {cigar.manufacturer} • {cigar.origin}
        </p>
        {cigar?.rating && (
          <p className="text-xs font-light leading-none">{cigar.rating}</p>
        )}
      </div>
      {cigar?.active_cigars_count && (
        <div className="text-base font-light leading-none">
          X{cigar.active_cigars_count}
        </div>
      )}
    </div>
  ));
};

export default CigarList;
