"use client";

import Button from "@/components/Button";
import InputError from "@/components/InputError";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import { LoginFormData } from "@/lib/types";
import { AuthFlowHeader, InputField, PasswordInput } from "@/components";
import { useForm } from "react-hook-form";
import { AppleIcon, GoogleIcon } from "@/components/icons";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/account-details",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});
  const [status, setStatus] = useState(null);

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

  return (
    <AuthFlowHeader label="Login to Unos y Otros">
      <AuthSessionStatus className="mb-4" status={status} />
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="space-y-4">
          <InputField
            type="email"
            label="Email"
            name="email"
            register={register}
            errors={errors}
          />
          <InputError messages={error.email} className="mt-2" />

          <PasswordInput
            label="Password"
            name="password"
            register={register}
            errors={errors}
          />
          <InputError messages={error.password} className="mt-2" />
        </div>

        <Button
          type="submit"
          className="w-full"
          title="Next"
          disabled={isLoading}
          loading={isLoading}
        />

        <div className="text-center mt-5">
          <Link
            href="/forgot-password"
            className="text-primary-100 text-xs font-bold"
          >
            Forgot Password
          </Link>
        </div>

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
        />

        <Button
          className="w-full"
          type="button"
          title="Sign up with Apple"
          variant="secondary"
          icon={<AppleIcon />}
        />
      </form>

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
    </AuthFlowHeader>
  );
};

export default Login;
