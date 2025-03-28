import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { StateSelect as StateDropdown } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import InputError from "@/components/InputError";

type StateSelectProps<T extends FieldValues> = {
  control?: Control<T>;
  isRequired?: boolean;
  countryId?: number;
  errorMessage?: string;
};

const StateSelect = <T extends FieldValues>({
  control,
  isRequired = true,
  countryId = 0,
  errorMessage,
}: StateSelectProps<T>) => {
  return (
    <div>
      <Controller
        name={"state" as Path<T>}
        control={control}
        rules={isRequired ? { required: "State is required" } : {}}
        // Disabling ESLint for ref because React function components do not accept refs by default.
        // eslint-disable-next-line no-unused-vars
        render={({ field: { ref, ...field } }) => (
          <StateDropdown
            countryid={countryId}
            containerClassName="form-group"
            inputClassName="!border-none shadow-none focus:ring-0"
            {...field}
            onChange={(value) => field.onChange(value)}
            placeHolder="State *"
          />
        )}
      />
      <InputError messages={errorMessage ? [errorMessage as string] : []} />
    </div>
  );
};

export default StateSelect;
