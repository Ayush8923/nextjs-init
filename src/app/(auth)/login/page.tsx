"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import { LoginFormData } from "@/lib/types";
import { AuthHeader, LoadingOverlay } from "@/components";
import { useForm } from "react-hook-form";
import { AppleIcon, GoogleIcon } from "@/components/icons";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import { createCookie } from "@/lib/cookieService";
import { useSearchParams } from "next/navigation";
import { getCookie } from "@/lib/common";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";

type Props = {
  setIsApiLoading: Dispatch<SetStateAction<boolean>>;
};

const LoginFormPage = ({ setIsApiLoading }: Props) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const { login, socialLogin, updateDob, user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      if (!token) return;
      setIsApiLoading(true);

      await createCookie("authToken", token);

      const dobFromCookie = getCookie("DOB");
      if (dobFromCookie) {
        redirectUser();
      }
    };

    checkTokenAndRedirect();
  }, [token, user]);

  const redirectUser = async () => {
    const hasTokenInCookie = getCookie("authToken");
    const hasDOBInCookie = getCookie("DOB");

    if (hasTokenInCookie && hasDOBInCookie) {
      await updateDob({
        dob: hasDOBInCookie,
        setErrors: () => {},
        setIsLoading: () => {},
        router,
      }).then(() => {
        setIsApiLoading(false);
      });
    }
  };

  const submitForm = async (data: LoginFormData) => {
    login({
      email: data.email,
      password: data.password,
      remember: false,
      setErrors,
      setStatus,
      setIsLoading,
    });
  };

  const handleSocialLogin = async (provider: string) => {
    setIsApiLoading(true);
    socialLogin(provider);
  };

  return (
    <AuthHeader label="Login to Unos y Otros">
      <AuthSessionStatus className="mb-4" status={status} />
      <LoginForm
        submitForm={submitForm}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        error={error}
        isLoading={isLoading}
      />

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <Button
        type="button"
        title="Continue with Google"
        className="w-full"
        variant="secondary"
        icon={<GoogleIcon />}
        onClick={() => handleSocialLogin("google")}
      />

      <Button
        className="w-full"
        type="button"
        title="Continue with Apple"
        variant="secondary"
        icon={<AppleIcon />}
      />

      <div className="text-center mt-9">
        <span className="text-primary-100 font-normal text-xs">
          Don’t have an account?
          <Link
            href="/consent"
            className="text-primary-100 font-bold ml-1 hover:underline"
          >
            Sign up
          </Link>
        </span>
      </div>
    </AuthHeader>
  );
};

const Page = () => {
  const [isApiLoading, setIsApiLoading] = useState(false);
  return (
    <>
      <LoadingOverlay isLoading={isApiLoading} />
      <Suspense fallback={<LoadingOverlay isLoading={true} />}>
        <LoginFormPage setIsApiLoading={setIsApiLoading} />
      </Suspense>
    </>
  );
};

export default Page;
