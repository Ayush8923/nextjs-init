"use client";

import React from "react";
import ApplicationLogo from "@/components/custom-icons/ApplicationLogo";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mx-[36px] bg-white">
      <main className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center font-extralight text-base text-primary-100">
        <div className="mb-[41px]">
          <ApplicationLogo />
        </div>

        <div className="mb-8">
          <p className="mb-6 text-center">
            Thank you for showing your interest in joining Unos y Otros, but the
            platform only allows members above the legal age to use tobacco
            products in their region.
          </p>

          <p>You can always come back later.</p>
        </div>
      </main>
    </div>
  );
};

export default Page;
