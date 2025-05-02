"use client";

import React, { Suspense, useState } from "react";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { ConsentFormData } from "@/lib/types";
import { AGE_LIMIT, calculateAge, createCookie, getCookie } from "@/lib/common";
import { DateInput, InputError, LoadingOverlay } from "@/components";
import { useAuth } from "@/hooks/auth";

const ConsentContent = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ConsentFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState<{ dob?: string[] }>({});

  const { updateDob } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const selectedDate = watch("dob");

  const onSubmit = async ({ dob }: ConsentFormData) => {
    setIsLoading(true);
    const age = calculateAge(dob);

    // Save the user date of birth in a cookie
    createCookie("DOB", dob);
    const isOfEligibleAge = age >= AGE_LIMIT;

    // If the user is 21 or older, redirect to the sign-up page
    // Otherwise, redirect to the no-access page
    const destination = isOfEligibleAge ? "/sign-up" : "/no-access";
    redirectUser(isOfEligibleAge, destination);
  };

  const redirectUser = async (
    isOfEligibleAge: boolean,
    destination: string
  ) => {
    const hasTokenInCookie = getCookie("authToken");
    const hasDOBInCookie = getCookie("DOB");

    if (hasTokenInCookie && isOfEligibleAge && hasDOBInCookie) {
      try {
        await updateDob({ dob: hasDOBInCookie });
        window.location.replace("/dashboard");
      } catch (error: any) {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      } finally {
        setIsLoading(false);
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = destination;
      }, 1000);
    }
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
            <DateInput
              name="dob"
              placeholder="Date of Birth"
              register={register}
              errors={errors}
              control={control}
              required
              requiredMessage={"Date of Birth on is required"}
            />
            <InputError messages={error?.dob} className="!mt-2" />

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={!selectedDate || isLoading}
              loading={isLoading}
              title="Next"
            />
          </form>
        </div>
      </div>
    </>
  );
};

const Page = () => {
  return (
    <>
      <Suspense fallback={<LoadingOverlay isLoading={true} />}>
        <ConsentContent />
      </Suspense>
    </>
  );
};

export default Page;
