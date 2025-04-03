"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData } from "@/lib/types";
import { useAuth } from "@/hooks/auth";
import LoginForm from "@/components/LoginForm";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import { AuthHeader } from "@/components";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login } = useAuth({
    middleware: "admin",
    redirectIfAuthenticated: "/admin/dashboard",
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
    <div className="min-h-screen w-full flex justify-center items-center">
      <AuthHeader label="Login to Unos y Otros">
        <AuthSessionStatus status={status} className="mt-2" />
        <LoginForm
          submitForm={submitForm}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          error={error}
          isLoading={isLoading}
        />
      </AuthHeader>
    </div>
  );
};

export default AdminLogin;
