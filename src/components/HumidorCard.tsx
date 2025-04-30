"use client";

import { Skeleton } from "@radix-ui/themes";
import Image from "next/image";
import { ShareIcon } from "@/components/icons"; // Adjust this import if needed
import React from "react";
import { humidorTypes } from "@/lib/constant";
import { formatDate } from "@/lib/common";

type Humidor = {
  image_url?: string;
  name: string;
  type: string;
  percentage_filled: number;
  cigars_count: number;
  capacity: number;
  created_at: string;
};

interface HumidorCardProps {
  humidor?: Humidor;
  loading: boolean;
  handleShareCollection: () => void;
}

const HumidorSkeletonView = () => {
  return (
    <div className="-mx-[24px]">
      <Skeleton className="h-[143px] w-full" />

      <div className="px-6 pt-3 pb-6 bg-primary-100 text-white">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-6 w-[120px]" />
        </div>

        <div className="flex justify-between mt-4 mb-6">
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="space-y-1 mr-[60px]">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="flex mt-6 space-x-4">
          <div className="border border-gray-500 rounded-xl w-full p-2">
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-6 w-10" />
          </div>
          <div className="border border-gray-500 rounded-xl w-full p-2">
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-6 w-10" />
          </div>
          <div className="border border-gray-500 rounded-xl w-full p-2">
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-6 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

const HumidorCard = ({
  humidor,
  loading,
  handleShareCollection,
}: HumidorCardProps) => {
  if (loading) {
    return <HumidorSkeletonView />;
  }

  return (
    <div className="-mx-[24px]">
      {humidor?.image_url ? (
        <Image
          src={humidor.image_url}
          alt={humidor.name}
          width={143}
          height={143}
          className="rounded-md mr-3 h-[143px] w-full"
        />
      ) : (
        <div className="bg-primary-200 h-[143px] w-full"></div>
      )}
      <div className="px-6 pt-3 pb-6 bg-primary-100 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium">{humidor?.name}</h1>
          <button
            className="flex items-center space-x-2"
            onClick={handleShareCollection}
          >
            <ShareIcon fill="#FFFFFF" />
            <div className="font-semibold text-sm">Share Collection</div>
          </button>
        </div>

        <div className="flex justify-between mt-4">
          <div className="">
            <p className="text-gray-500 text-xs font-light">Humidor Type</p>
            <p className="text-base font-medium mt-1">
              {humidorTypes.find((item) => item.value === humidor?.type)?.label}
            </p>
          </div>
          <div className="flex flex-col mr-[60px]">
            <p className="text-gray-500 text-sm">Created on</p>
            <p className="text-base font-medium mt-1">
              {formatDate(humidor?.created_at || "", true)}
            </p>
          </div>
        </div>

        <div className="flex mt-6 space-x-4">
          <div className="border border-gray-500 rounded-xl w-full p-2">
            <p className="text-gray-500 text-xs font-light">Status</p>
            <p className="text-white font-normal text-xl mt-1">
              {humidor?.percentage_filled || 0}%
            </p>
          </div>
          <div className="border border-gray-500 rounded-xl w-full p-2">
            <p className="text-gray-500 text-xs font-light">Cigars</p>
            <p className="text-white font-normal text-xl mt-1">
              {humidor?.cigars_count || 0}
            </p>
          </div>
          <div className="border border-gray-500 rounded-xl w-full p-2">
            <p className="text-gray-500 text-xs font-light">Capacity</p>
            <p className="text-white font-normal text-xl mt-1">
              {humidor?.capacity || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumidorCard;
