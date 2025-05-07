"use client";

import { ProfileDetailsFormData } from "@/lib/types";
import { useForm } from "react-hook-form";
import account from "@/apis/account";
import { useState } from "react";
import {
  InputError,
  ImageUploader,
  InputField,
  Button,
  AuthHeader,
} from "@/components";
import { useAuth } from "@/hooks/auth";
import { profileValidationRules } from "@/lib/validations/profileValidation";

const Page = () => {
  useAuth({ middleware: "auth", redirectIfAuthenticated: "/dashboard" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileDetailsFormData>();

  const [error, setErrors] = useState<{
    profile_image?: string[];
    profile_handle?: string[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null
  );

  const onSubmit = async (profileDetailsFormData: any) => {
    setIsLoading(true);
    try {
      await account.profileImageUpdate({
        profileDetailsFormData,
        selectedProfileImage,
      });
      window.location.replace("/dashboard");
    } catch (error: any) {
      if (error.response.status !== 422) throw error;

      setErrors(error.response.data.errors);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <AuthHeader label="Setting up your account">
        <div className="flex items-center justify-between mb-6 font-extralight text-base text-primary-100">
          <div>Profile details</div>
          <div className="text-center">3/4</div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full"
        >
          <ImageUploader
            name="profileImage"
            label="Profile Image"
            labelClassName="flex items-center justify-center w-[120px] h-[120px] rounded-full bg-gray-100 cursor-pointer mb-2 overflow-hidden"
            register={register}
            errors={errors}
            setSelectedFile={setSelectedProfileImage}
          />
          <InputError messages={error.profile_image} className="!mt-1" />

          <div className="w-full">
            <InputField
              key="profileHandle"
              type="text"
              label="Profile Handle *"
              name="profileHandle"
              register={register}
              errors={errors}
              validationRules={profileValidationRules.profileHandle}
            />
          </div>

          <InputError messages={error.profile_handle} className="!mt-1" />

          <Button
            type="submit"
            className="w-full"
            title="Next"
            disabled={isLoading}
            loading={isLoading}
          />
        </form>
      </AuthHeader>
    </div>
  );
};

export default Page;
