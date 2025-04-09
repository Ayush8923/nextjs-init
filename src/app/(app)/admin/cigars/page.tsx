"use client";

import { CustomTable } from "@/components";
import useSWR from "swr";
import { CigarData } from "@/lib/types";
import admin from "@/apis/admin";
import { getTotalPages, PAGINATION_SIZE } from "@/lib/common";
import { useState } from "react";

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

const Cigars = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: cigarDB, error } = useSWR(
    `/api/cigar?page=${currentPage}&limit=${PAGINATION_SIZE}`,
    admin.getCigars
  );
  const isLoading = !cigarDB && !error;

  const extractCigarDB =
    cigarDB?.data?.map((cigar: CigarData) => [
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
      <h1 className="font-medium text-2xl mb-9">Cigar Database</h1>
      <CustomTable
        headers={headers}
        rows={extractCigarDB}
        loading={isLoading}
        noDataMessage="No cigars available."
        currentPage={currentPage}
        lastPage={getTotalPages(cigarDB?.total)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Cigars;
