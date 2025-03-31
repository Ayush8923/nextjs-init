"use client";

import Button from "@/components/Button";
import InputError from "@/components/InputError";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import { AuthFlowHeader, PasswordInput } from "@/components";
import { PasswordResetFormData } from "@/lib/types";
import { useForm } from "react-hook-form";

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>();
  const searchParams = useSearchParams();

  const { resetPassword } = useAuth({ middleware: "guest" });

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState<{
    password?: string[];
    password_confirmation?: string[];
  }>({});
  const [status, setStatus] = useState(null);

  const submitForm = (data: PasswordResetFormData) => {
    resetPassword({
      email: email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      setErrors,
      setStatus,
      setIsLoading,
    });
  };

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam.replace(/ /g, "+")));
    }
  }, [searchParams]);

  return (
    <AuthFlowHeader label="Reset Password">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="space-y-6">
          <div className="text-base font-extralight">
            Enter your registered email address to reset your account password
          </div>

          <AuthSessionStatus className="mt-2 mb-4" status={status} />
          <PasswordInput
            label="New Password"
            name="password"
            register={register}
            errors={errors}
          />
          <InputError messages={error.password} className="mt-2" />

          <PasswordInput
            label="Confirm New Password"
            name="passwordConfirmation"
            register={register}
            errors={errors}
          />
          <InputError messages={error.password_confirmation} className="mt-2" />
        </div>

        <Button
          type="submit"
          className="w-full"
          title="Reset Password"
          disabled={isLoading}
          loading={isLoading}
        />
      </form>
    </AuthFlowHeader>
  );
};

export default PasswordReset;
