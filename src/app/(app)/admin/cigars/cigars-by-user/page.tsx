"use client";

import { useState } from "react";
import useSWR from "swr";
import admin from "@/apis/admin";
import { CigarTable } from "@/components";
import { PAGINATION_SIZE } from "@/lib/common";

const Cigars = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error } = useSWR(
    `/api/cigars?page=${currentPage}&limit=${PAGINATION_SIZE}&source=manual`,
    admin.getCigars
  );

  const cigars = data?.data || [];
  const total = data?.total || 0;
  const isLoading = !data && !error;

  return (
    <CigarTable
      initialData={cigars}
      total={total}
      title="Cigar Database"
      onPageChange={setCurrentPage}
      currentPage={currentPage}
      loading={isLoading}
    />
  );
};

export default Cigars;
