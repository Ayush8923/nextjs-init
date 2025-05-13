"use client";

import { useState } from "react";
import useSWR from "swr";
import admin from "@/apis/admin";
import { CigarTable } from "@/components";
import { PAGINATION_SIZE } from "@/lib/common";
import { useRouter } from "next/navigation";

const Cigars = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error } = useSWR(
    {
      page: currentPage,
      limit: PAGINATION_SIZE,
      name: searchQuery,
      status: "active",
    },
    (params) => admin.getCigars(params),
    {
      revalidateOnFocus: true,
    }
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
      setSearchQuery={setSearchQuery}
      onRowClick={(selectedCigar) =>
        router.push(`/admin/cigars/${selectedCigar.id}/edit`)
      }
    />
  );
};

export default Cigars;
