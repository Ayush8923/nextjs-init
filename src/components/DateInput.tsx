import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import InputError from "./InputError";

interface DateInputProps {
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  required?: boolean;
  defaultValue?: string;
  errors?: FieldErrors;
  requiredMessage?: string;
}

const DateInput = ({
  name,
  placeholder,
  register,
  required = false,
  errors,
  requiredMessage = "This Field is required.",
}: DateInputProps) => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div>
      <input
        type="date"
        placeholder={placeholder}
        max={today}
        className="w-full p-2.5 border border-gray-300 rounded text-gray-600 appearance-none"
        {...register(name, required ? { required: requiredMessage } : {})}
      />
      <InputError messages={name ? [errors?.[name]?.message as string] : []} />
    </div>
  );
};

export default DateInput;
