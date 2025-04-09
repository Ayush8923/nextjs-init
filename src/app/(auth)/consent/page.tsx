"use client";

import React, { Suspense, useEffect, useState } from "react";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { ConsentFormData } from "@/lib/types";
import { createCookie } from "@/lib/cookieService";
import { AGE_LIMIT, calculateAge, getCookie } from "@/lib/common";
import { InputError, LoadingOverlay } from "@/components";
import { useAuth } from "@/hooks/auth";
import { useSearchParams } from "next/navigation";

const ConsentContent = ({
  setIsApiLoading,
}: {
  setIsApiLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? null;
  const { register, handleSubmit, watch } = useForm<ConsentFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState<{ dob?: string[] }>({});

  const { updateDob, user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const selectedDate = watch("dob");

  const onSubmit = async ({ dob }: ConsentFormData) => {
    setIsLoading(true);
    const age = calculateAge(dob);

    // Save the user date of birth in a cookie
    await createCookie("DOB", dob);
    const isOfEligibleAge = age >= AGE_LIMIT;

    // If the user is 21 or older, redirect to the sign-up page
    // Otherwise, redirect to the no-access page
    const destination = isOfEligibleAge ? "/sign-up" : "/no-access";
    redirectUser(isOfEligibleAge, destination);
  };

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      if (!token) return;

      setIsApiLoading(true);
      await createCookie("authToken", token);

      if (!user) return;

      if (user.dob) {
        window.location.href = "/dashboard";
        return;
      }

      const dobFromCookie = getCookie("DOB");
      if (dobFromCookie) {
        const isOfEligibleAge = calculateAge(dobFromCookie) >= AGE_LIMIT;
        const destination = isOfEligibleAge ? "/sign-up" : "/no-access";
        redirectUser(isOfEligibleAge, destination);
      } else {
        setIsApiLoading(false);
      }
    };

    checkTokenAndRedirect();
  }, [token, user]);

  const redirectUser = async (
    isOfEligibleAge: boolean,
    destination: string
  ) => {
    const hasTokenInCookie = getCookie("authToken");
    const hasDOBInCookie = getCookie("DOB");

    if (hasTokenInCookie && isOfEligibleAge && hasDOBInCookie) {
      await updateDob({ dob: hasDOBInCookie, setErrors, setIsLoading });
    } else {
      window.location.href = destination;
    }
    setIsApiLoading(false);
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
  const [isApiLoading, setIsApiLoading] = useState(false);
  return (
    <>
      <LoadingOverlay isLoading={isApiLoading} />
      <Suspense fallback={<LoadingOverlay isLoading={true} />}>
        <ConsentContent setIsApiLoading={setIsApiLoading} />
      </Suspense>
    </>
  );
};

export default Page;
