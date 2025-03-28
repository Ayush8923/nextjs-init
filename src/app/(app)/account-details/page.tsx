"use client";

import {
  CountrySelect,
  InputError,
  InputField,
  StateSelect,
  Button,
  AuthFlowHeader,
} from "@/components";
import account from "@/hooks/account";
import { useAuth } from "@/hooks/auth";
import { AccountDetailsFormData, CountryData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const accountDetailsField = [
  {
    name: "firstName",
    label: "First Name*",
    type: "text",
    required: true,
    key: "first_name",
  },
  {
    name: "middleName",
    label: "Middle Name",
    type: "text",
    required: false,
    key: "middle_name",
  },
  {
    name: "lastName",
    label: "Last Name*",
    type: "text",
    required: true,
    key: "last_name",
  },
  {
    name: "suffix",
    label: "Suffix",
    type: "text",
    required: false,
    key: "suffix",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    key: "email",
    disabled: true,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "number",
    required: false,
    key: "phone",
  },
  {
    name: "referredBy",
    label: "Referred By",
    type: "text",
    required: false,
    key: "referred_by",
  },
];

const Page = () => {
  const { user } = useAuth({ middleware: "auth" });
  const [error, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AccountDetailsFormData>({
    defaultValues: {
      email: user?.email || "",
    },
  });
  const selectedCountry = watch("country") as unknown as CountryData;

  const onSubmit = async (data: AccountDetailsFormData) => {
    account.profileUpdate({
      setErrors,
      setIsLoading,
      router,
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      country: data.country?.name,
      state: data.state?.name,
      phone: data.phoneNumber,
      suffix: data.suffix,
      referred_by: data.referredBy,
    });
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <AuthFlowHeader label="Setting up your account">
        <div className="flex items-center justify-between mb-6 font-extralight text-base text-primary-100">
          <div>Account details</div>
          <div className="text-center">2/4</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {accountDetailsField.map(
              ({ name, label, type, required, key, disabled = false }) => (
                <div key={key}>
                  <InputField
                    key={name}
                    type={type}
                    label={label}
                    name={name}
                    register={register}
                    errors={errors}
                    isRequired={required}
                    disabled={disabled}
                  />
                  <InputError messages={[error[key]]} className="!mt-1" />
                </div>
              )
            )}

            <CountrySelect
              control={control}
              errorMessage={errors?.country?.message}
            />

            <StateSelect
              control={control}
              countryId={selectedCountry?.id}
              errorMessage={errors?.state?.message}
            />
          </div>

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
