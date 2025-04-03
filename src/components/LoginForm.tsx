import React from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { LoginFormData } from "@/lib/types";
import { Button, InputError, InputField, PasswordInput } from "@/components";
import Link from "next/link";

interface LoginFormProps {
  submitForm: any;
  register: UseFormRegister<any>;
  handleSubmit: ReturnType<typeof useForm<LoginFormData>>["handleSubmit"];
  errors: FieldErrors;
  error: { email?: string[]; password?: string[] };
  isLoading: boolean;
}

const LoginForm = ({
  submitForm,
  register,
  handleSubmit,
  errors,
  error,
  isLoading,
}: LoginFormProps) => {
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="space-y-4">
        <InputField
          type="email"
          label="Email"
          name="email"
          register={register}
          errors={errors}
        />
        <InputError messages={error?.email} className="mt-2" />

        <PasswordInput
          label="Password"
          name="password"
          register={register}
          errors={errors}
        />
        <InputError messages={error?.password} className="mt-2" />
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
    </form>
  );
};

export default LoginForm;
