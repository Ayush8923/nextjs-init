"use client";

import { useAuth } from "@/hooks/auth";
import { useForm } from "react-hook-form";
import { AppleIcon, GoogleIcon } from "@/components/icons";
import Link from "next/link";
import { SignUpFormData } from "@/lib/types";
import { getCookie } from "@/lib/common";
import {
  InputError,
  InputField,
  PasswordInput,
  Button,
  AuthFlowHeader,
} from "@/components";
import { useState } from "react";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const [error, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const { register: authRegister } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/account-details",
  });

  const onSubmit = async (data: SignUpFormData) => {
    authRegister({
      email: data.email,
      dob: getCookie("DOB"),
      password: data.password,
      password_confirmation: data.confirmPassword,
      setErrors,
      setIsLoading,
    });
  };

  return (
    <AuthFlowHeader label="Sign up to start">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
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
          Already have an account?
          <Link
            href="/login"
            className="text-primary-100 font-bold ml-1 hover:underline"
          >
            Login
          </Link>
        </span>
      </div>
    </AuthFlowHeader>
  );
};

export default Page;
