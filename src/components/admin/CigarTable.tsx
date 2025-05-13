"use client";

import { CustomTable, SearchInput } from "@/components";
import { CigarData } from "@/lib/types";
import { getTotalPages } from "@/lib/common";

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
}: CigarTableProps) => {
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
      <div className="space-y-4 max-w-sm mb-10">
        <SearchInput
          placeholder="Search Cigars"
          onSearch={(val: string) => setSearchQuery(val)}
        />
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
    </div>
  );
};

export default CigarTable;
