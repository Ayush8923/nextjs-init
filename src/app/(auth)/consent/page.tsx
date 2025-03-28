"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { ConsentFormData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { createCookie } from "@/lib/cookieService";
import { AGE_LIMIT, calculateAge } from "@/lib/common";

const Page = () => {
  const { register, handleSubmit, watch } = useForm<ConsentFormData>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const selectedDate = watch("dob");

  const onSubmit = async ({ dob }: ConsentFormData) => {
    setIsLoading(true);
    const age = calculateAge(dob);

    // Save the user date of birth in a cookie
    await createCookie("DOB", dob);

    // If the user is 21 or older, redirect to the sign-up page
    // Otherwise, redirect to the no-access page
    setIsLoading(false);
    router.push(age >= AGE_LIMIT ? "/sign-up" : "/no-access");
  };

  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center px-[36px] pb-[8px] text-primary-100">
        <div className="w-full max-w-md mx-auto text-center">
          <h1 className="text-2xl font-medium mb-2">
            Please enter your Date of Birth to continue.
          </h1>

          <p className="text-base font-extralight mb-[24px]">
            This is to confirm that you are above the legal age to use tobacco
            products in your region.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="date"
              placeholder="Date of Birth"
              className="w-full py-3 px-4 border border-gray-300 rounded text-gray-600 appearance-none"
              {...register("dob", { required: true })}
            />

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={!selectedDate}
              loading={isLoading}
              title="Next"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
