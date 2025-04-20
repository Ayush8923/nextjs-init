"use client";

import { CustomTable } from "@/components";
import { CigarData } from "@/lib/types";
import { getTotalPages } from "@/lib/common";

const headers = [
  "Name",
  "Vitola",
  "Dimension",
  "Wrapper",
  "Brand",
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
}

const CigarTable = ({
  initialData,
  total,
  title,
  onPageChange,
  currentPage,
  loading,
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
      cigar.brand || "-",
      cigar.filler || "-",
      cigar.origin || "-",
      cigar.strength || "-",
      (cigar.flavour && JSON.parse(cigar.flavour).join(", ")) || "-",
    ]) || [];

  return (
    <div>
      <h1 className="font-medium text-2xl mb-9">{title}</h1>
      <CustomTable
        headers={headers}
        rows={extractCigarDB}
        loading={loading}
        noDataMessage="No cigars available."
        currentPage={currentPage}
        lastPage={getTotalPages(total)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CigarTable;
