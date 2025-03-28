"use client";

import { ProfileDetailsFormData } from "@/lib/types";
import { useForm } from "react-hook-form";
import account from "@/hooks/account";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputError,
  ImageUploader,
  InputField,
  Button,
  AuthFlowHeader,
} from "@/components";

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileDetailsFormData>();

  const [error, setErrors] = useState<{
    profile_image?: string[];
    profile_name?: string[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null
  );

  const onSubmit = async (profileDetailsFormData: any) => {
    account.profileImageUpdate({
      setErrors,
      setIsLoading,
      router,
      profileDetailsFormData,
      selectedProfileImage,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <AuthFlowHeader label="Setting up your account">
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
              key="profileName"
              type="text"
              label="Profile Name *"
              name="profileName"
              register={register}
              errors={errors}
            />
          </div>

          <InputError messages={error.profile_name} className="!mt-1" />

          <Button
            type="submit"
            className="w-full"
            title="Next"
            disabled={isLoading}
            loading={isLoading}
          />
        </form>
      </AuthFlowHeader>
    </div>
  );
};

export default Page;
