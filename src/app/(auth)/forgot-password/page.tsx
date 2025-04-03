"use client";

import Button from "@/components/Button";
import InputError from "@/components/InputError";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { AuthHeader, InputField } from "@/components";
import { ForgotPasswordFormData } from "@/lib/types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();
  const { forgotPassword } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });
  const router = useRouter();

  const [error, setErrors] = useState<{
    email?: string[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState("");

  const submitForm = (data: ForgotPasswordFormData) => {
    setEmail(data.email);
    forgotPassword({ email: data.email, setErrors, setStatus, setIsLoading });
  };

  useEffect(() => {
    if (status && email) {
      router.push(`/password-reset/verification/${email}`);
    }
  }, [status, email, router]);

  return (
    <AuthHeader label="Reset Password">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="space-y-6">
          <div className="text-base font-extralight">
            Enter your registered email address to reset your account password
          </div>
          <InputField
            type="email"
            label="Email"
            name="email"
            register={register}
            errors={errors}
          />
          <InputError messages={error.email} className="mt-2" />
        </div>

        <Button
          type="submit"
          className="w-full"
          title="Next"
          disabled={isLoading}
          loading={isLoading}
        />
      </form>

      <Button
        type="button"
        className="w-full"
        title="Cancel"
        variant="secondary"
        onClick={() => router.push("/login")}
      />
    </AuthHeader>
  );
};

export default ForgotPassword;
