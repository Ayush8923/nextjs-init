"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import { LoginFormData } from "@/lib/types";
import { AuthHeader } from "@/components";
import { useForm } from "react-hook-form";
import { AppleIcon, GoogleIcon } from "@/components/icons";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import LoginForm from "@/components/LoginForm";
import LoadingOverlay from "@/components/LoadingOverlay";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login, socialLogin } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});
  const [status, setStatus] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

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
    <>
      <LoadingOverlay isLoading={isApiLoading} />
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
          title="Sign up with Google"
          className="w-full"
          variant="secondary"
          icon={<GoogleIcon />}
          onClick={() => handleSocialLogin("google")}
        />

        <Button
          className="w-full"
          type="button"
          title="Sign up with Apple"
          variant="secondary"
          icon={<AppleIcon />}
        />

        <div className="text-center mt-9">
          <span className="text-primary-100 font-normal text-xs">
            Don’t have an account?
            <Link
              href="/sign-up"
              className="text-primary-100 font-bold ml-1 hover:underline"
            >
              Sign up
            </Link>
          </span>
        </div>
      </AuthHeader>
    </>
  );
};

export default Login;
