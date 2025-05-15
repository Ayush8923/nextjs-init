import React from "react";
import { Button, BackButton, Accordion } from "@/components";
import Image from "next/image";
import { CigarData } from "@/lib/types";

type CigarInfoProps = {
  cigar: CigarData;
  onClickEditCigar: (_cigarId: number) => void;
  isEditCigarVisible: boolean;
};

const CigarInfo = ({
  cigar,
  onClickEditCigar,
  isEditCigarVisible,
}: CigarInfoProps) => {
  if (!cigar) {
    return null;
  }
  return (
    <div>
      <BackButton />
      <div className="mt-6 mb-5 flex">
        <div className="flex-1 pr-4">
          <h1 className="text-2xl font-medium text-primary-100 leading-[120%]">
            {cigar.name || "-"}
          </h1>
          <p className="text-xs font-light leading-none mt-1">
            {cigar.manufacturer || "-"}
          </p>
          <p className="text-xs font-light leading-none mt-1">
            {cigar.brand || "-"}
          </p>
          <p className="text-xs font-light leading-none mt-1">
            Qty: {cigar.active_cigars_count || 0}
          </p>
        </div>
        {cigar?.image_url ? (
          <Image
            src={cigar.image_url}
            alt={cigar.name}
            width={120}
            height={120}
            className="rounded-[10px] mr-3 h-[120px] w-[120px] object-fill"
          />
        ) : (
          <div className="w-[120px] h-[120px] bg-gray-100 rounded-[10px]"></div>
        )}
      </div>

      <hr className="border-gray-200" />
      <Accordion title="Cigar Details" defaultOpen>
        <div className="grid grid-cols-2 gap-6 pb-2">
          {/* Wrapper */}
          <div>
            <p className="text-xs font-light text-gray-500">Wrapper</p>
            <p className="font-medium text-base leading-none mt-1">
              {cigar.wrapper}
            </p>
          </div>

          {/* Blend */}
          <div>
            <p className="text-xs font-light text-gray-500">Binder</p>
            <p className="font-medium text-base leading-none mt-1">
              {cigar.binder || "-"}
            </p>
          </div>

          {/* Filler */}
          <div>
            <p className="text-xs font-light text-gray-500">Filler</p>
            <p className="font-medium text-base leading-none mt-1">
              {cigar.filler || "-"}
            </p>
          </div>

          {/* Origin */}
          <div>
            <p className="text-xs font-light text-gray-500">Origin</p>
            <p className="font-medium text-base leading-none mt-1">
              {cigar.origin || "-"}
            </p>
          </div>

          {/* Strength */}
          <div>
            <p className="text-xs font-light text-gray-500">Strength</p>
            <p className="font-medium text-base leading-none mt-1">
              {cigar.strength || "-"}
            </p>
          </div>

          {/* Flavor Note */}
          <div>
            <p className="text-xs font-light text-gray-500">Flavor Note</p>
            <p className="font-medium text-base leading-none mt-1">
              {(cigar.flavour && JSON.parse(cigar.flavour).join(", ")) || "-"}
            </p>
          </div>

          {/* Vitola */}
          <div>
            <p className="text-xs font-light text-gray-500">Vitola</p>
            <p className="font-medium text-base leading-none mt-1">
              {cigar.vitola || "-"}
            </p>
          </div>

          {/* Dimension */}
          <div>
            <p className="text-xs font-light text-gray-500">Dimension</p>
            <p className="font-medium text-base leading-none mt-1">
              {cigar.dimensions ? `${cigar.dimensions} ring gauge` : "-"}
            </p>
          </div>
        </div>
      </Accordion>

      <hr className="border-gray-200" />

      {isEditCigarVisible && (
        <div className="flex justify-between gap-[16px] relative">
          <Button
            className="w-full"
            type="button"
            title="Edit Details"
            variant="secondary"
            onClick={() => onClickEditCigar(cigar.id)}
          />
        </div>
      )}
    </div>
  );
};

export default CigarInfo;
