"use client";

import { CustomTable, SearchInput } from "@/components";
import { CigarData } from "@/lib/types";
import { getTotalPages } from "@/lib/common";
import { FilterIcon } from "../icons";
import { useState } from "react";
import { FilterModal } from "@/components";

const headers = [
  "Name",
  "Vitola",
  "Dimension",
  "Wrapper",
  "Filler",
  "Origin",
  "Strength",
  "Flavor",
];

interface CigarTableProps {
  initialData: CigarData[];
  total: number;
  title: string;
  onPageChange: (_page: number) => void;
  currentPage: number;
  loading: boolean;
  setSearchQuery: (_val: string) => void;
  onRowClick: (_selectedCigar: any) => void;
  setAppliedFilters: (_filters: { [key: string]: string }) => void;
  cigarOptionsData?: {
    brands: string[];
    wrappers: string[];
    binders: string[];
    fillers: string[];
    strengths: string[];
    manufacturers?: string[];
  };
}

const CigarTable = ({
  initialData,
  total,
  title,
  onPageChange,
  currentPage,
  loading,
  setSearchQuery,
  onRowClick,
  setAppliedFilters,
  cigarOptionsData,
}: CigarTableProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const extractCigarDB =
    initialData?.map((cigar: CigarData) => [
      [
        cigar.name || "",
        cigar.manufacturer || "",
        cigar.brand || "",
        cigar?.rating || "",
      ],
      cigar.vitola || "-",
      cigar.dimensions || "-",
      cigar.wrapper || "-",
      cigar.filler || "-",
      cigar.origin || "-",
      cigar.strength || "-",
      (cigar.flavour && JSON.parse(cigar.flavour).join(", ")) || "-",
    ]) || [];

  return (
    <div>
      <h1 className="font-medium text-2xl mb-9">{title}</h1>
      <div className="flex items-center mb-10">
        <div className="w-[231px] mr-3">
          <SearchInput
            placeholder="Search Cigars"
            onSearch={(val: string) => setSearchQuery(val)}
          />
        </div>
        <button
          className="flex items-center space-x-1.5 h-[39px] border-primary-100 border rounded-md px-3.5 py-2.5"
          onClick={() => setShowFilter(true)}
        >
          <FilterIcon />
          <div className="text-sm font-semibold">Filter</div>
        </button>
      </div>
      <CustomTable
        headers={headers}
        rows={extractCigarDB}
        loading={loading}
        noDataMessage="No cigars available."
        currentPage={currentPage}
        lastPage={getTotalPages(total)}
        onPageChange={onPageChange}
        isRowClickable={true}
        onRowClick={(index: number) => {
          const selectedCigar = initialData[index];
          onRowClick(selectedCigar);
        }}
      />
      <FilterModal
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(selectedFilters: { [key: string]: string }) => {
          setAppliedFilters(selectedFilters);
          setShowFilter(false);
        }}
        cigarOptionsData={cigarOptionsData}
        centered
      />
    </div>
  );
};

export default CigarTable;
