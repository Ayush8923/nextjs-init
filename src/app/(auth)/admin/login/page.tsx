"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData } from "@/lib/types";
import { useAuth } from "@/hooks/auth";
import LoginForm from "@/components/LoginForm";
import { AuthHeader } from "@/components";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login, user, isUserAdmin } = useAuth({
    middleware: "admin",
    redirectIfAuthenticated: "/admin/dashboard",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (user && !isUserAdmin()) {
      setStatus("You are not authorized to access admin page.");
    }
  }, [user]);

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
        <LoginForm
          submitForm={submitForm}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          error={error}
          isLoading={isLoading}
          notAccessibleMessage={status || ""}
        />
      </AuthHeader>
    </div>
  );
};

export default AdminLogin;
