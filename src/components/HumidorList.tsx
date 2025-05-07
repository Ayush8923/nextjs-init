"use client";

import React, { MouseEvent } from "react";
import { HumidorsData } from "@/lib/types";
import { ShareIcon } from "./icons";
import { humidorTypes } from "@/lib/constant";
import Image from "next/image";

type HumidorListProps = {
  humidors: HumidorsData[];
  selectedHumidor: (_humidor: HumidorsData) => void;
};

const HumidorList = ({ humidors, selectedHumidor }: HumidorListProps) => {
  if (!(humidors.length > 0)) {
    return;
  }

  const handleShareCollection = (event: MouseEvent) => {
    event.stopPropagation();
    alert("Sharing functionality coming soon!");
    return;
  };

  return humidors.map((humidor) => (
    <div
      className="flex mb-6 cursor-pointer hover:bg-gray-50 rounded-sm transition"
      onClick={() => selectedHumidor(humidor)}
      key={humidor.id}
    >
      {humidor?.image_url ? (
        <Image
          src={humidor.image_url}
          alt={humidor.name}
          width={132}
          height={132}
          className="rounded-sm mr-3 h-[132px] w-[132px] "
        />
      ) : (
        <div className="h-[132px] w-[132px] rounded-sm mr-4 bg-gray-100"></div>
      )}
      <div className="flex-1 mt-5">
        <div className="space-y-1">
          <div className="text-base font-medium leading-none">
            {humidor.name}
          </div>
          <div className="text-xs font-light leading-none">
            {humidorTypes.find((item) => item.value === humidor.type)?.label}
          </div>
          <div className="text-xs font-light leading-none">
            {humidor?.cigars_count} Cigars{" "}
            {humidor?.capacity &&
              (humidor?.percentage_filled > 100
                ? "(Overfilled)"
                : `${humidor?.percentage_filled}%`)}
          </div>
        </div>

        {/* TODO: This need to this share collection functionality in the later phase. */}
        <div
          className="flex items-center mt-4 space-x-2 cursor-pointer"
          onClick={(event) => handleShareCollection(event)}
        >
          <ShareIcon />
          <div className="font-semibold text-sm leading-none">
            Share Collection
          </div>
        </div>
      </div>
    </div>
  ));
};

export default HumidorList;
