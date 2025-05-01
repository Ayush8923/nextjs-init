import React from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { FieldErrors, UseFormRegister, Controller } from "react-hook-form";
import InputError from "./InputError";
import { CalendarIcon } from "./icons";

interface DateInputProps {
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  required?: boolean;
  defaultValue?: string;
  errors?: FieldErrors;
  requiredMessage?: string;
  control: any;
  dateFormat?: string;
}

const DateInput = ({
  name,
  placeholder,
  required = false,
  errors,
  requiredMessage = "This Field is required.",
  control,
  dateFormat = "MM-dd-yyyy",
}: DateInputProps) => {
  const maxDate = new Date();

  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        rules={required ? { required: requiredMessage } : {}}
        render={({ field }) => (
          <DatePicker
            placeholderText={placeholder || dateFormat}
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              const formatted = date ? format(date, dateFormat) : "";
              field.onChange(formatted);
            }}
            maxDate={maxDate}
            dateFormat={dateFormat}
            className="w-full p-2.5 pr-10 border border-gray-300 rounded text-gray-600"
            wrapperClassName="w-full"
            showYearDropdown
            scrollableYearDropdown
            showMonthDropdown
            scrollableMonthYearDropdown
            yearDropdownItemNumber={100}
          />
        )}
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
        <CalendarIcon />
      </div>
      <InputError messages={name ? [errors?.[name]?.message as string] : []} />
    </div>
  );
};

export default DateInput;
