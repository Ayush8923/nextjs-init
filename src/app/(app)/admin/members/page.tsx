"use client";

import admin from "@/apis/admin";
import { Button, CustomTable } from "@/components";
import { getTotalPages } from "@/lib/common";
import { PAGINATION_SIZE } from "@/lib/common";
import { MembersData } from "@/lib/types";
import React, { useState } from "react";
import useSWR from "swr";

const headers = [
  "Name",
  "Profile handle",
  "State",
  "Email",
  "Phone",
  "DOB",
  "Referred by",
  "Cigars",
  // "Connections", TODO: Enable this column at the scale level.
  "",
];

const Members = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: members, error } = useSWR(
    { page: currentPage, limit: PAGINATION_SIZE },
    (params) => admin.getMembers(params)
  );
  const isLoading = !members && !error;

  const extractMembersData =
    members?.data?.map((member: MembersData) => [
      `${member?.first_name} ${member?.last_name}` || "-",
      member?.profile_handle || "-",
      member?.state || "-",
      member?.email || "-",
      member?.phone || "-",
      member?.dob || "-",
      member?.referred_by || "-",
      member?.cigars_count?.toString() || "0",
      // "-"
    ]) || [];

  const actionRenderer = () => {
    return (
      <Button
        variant="secondary"
        className="!mt-0 !px-2 !py-1"
        title="Block"
        disabled
        onClick={() => {}}
      />
    );
  };

  return (
    <div>
      <h1 className="font-medium text-2xl mb-9">Members</h1>
      <CustomTable
        headers={headers}
        rows={extractMembersData}
        loading={isLoading}
        noDataMessage="No members available."
        actionRenderer={actionRenderer}
        currentPage={currentPage}
        lastPage={getTotalPages(members?.total)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Members;
