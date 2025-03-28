import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { CountrySelect as CountryDropdown } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import InputError from "@/components/InputError";

type CountrySelectProps<T extends FieldValues> = {
  control?: Control<T>;
  isRequired?: boolean;
  errorMessage?: string;
};

const CountrySelect = <T extends FieldValues>({
  control,
  isRequired = true,
  errorMessage,
}: CountrySelectProps<T>) => {
  return (
    <div>
      <Controller
        name={"country" as Path<T>}
        control={control}
        rules={isRequired ? { required: "Country is required" } : {}}
        // Disabling ESLint for ref because React function components do not accept refs by default.
        // eslint-disable-next-line no-unused-vars
        render={({ field: { ref, ...field } }) => (
          <CountryDropdown
            containerClassName="form-group"
            inputClassName="!border-none shadow-none focus:ring-0"
            {...field}
            onChange={(value) => field.onChange(value)}
            placeHolder="Country *"
          />
        )}
      />
      <InputError messages={errorMessage ? [errorMessage as string] : []} />
    </div>
  );
};

export default CountrySelect;
