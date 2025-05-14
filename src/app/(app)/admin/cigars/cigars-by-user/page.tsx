"use client";

import { useState } from "react";
import useSWR from "swr";
import admin from "@/apis/admin";
import { CigarTable } from "@/components";
import { PAGINATION_SIZE } from "@/lib/common";
import { useRouter } from "next/navigation";
import { useCigarOptions } from "@/app/(app)/collection/hooks";

const Cigars = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string;
  }>({});
  const { data, error } = useSWR(
    {
      page: currentPage,
      limit: PAGINATION_SIZE,
      status: "pending",
      name: searchQuery,
      ...appliedFilters,
    },
    (params) => admin.getCigars(params)
  );
  const { cigarOptionsData } = useCigarOptions();

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
        router.push(`/admin/cigars/cigars-by-user/${selectedCigar.id}/edit`)
      }
      setAppliedFilters={(selectedFilters: { [key: string]: string }) =>
        setAppliedFilters(selectedFilters)
      }
      cigarOptionsData={cigarOptionsData}
    />
  );
};

export default Cigars;
