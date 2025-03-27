import EyeIcon from "@/components/icon/EyeIcon";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import InputError from "@/components/InputError";
import CrossEyeIcon from "./icon/CrossEyeIcon";

type PasswordInputProps = {
  label?: string;
  name?: string;
  register?: UseFormRegister<any>;
  errors?: FieldErrors;
};

const PasswordInput = ({
  label,
  name,
  register,
  errors,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={label}
        {...(register && name
          ? register(name, { required: `${label} is required` })
          : {})}
        className="w-full p-[10px] border rounded-md"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-6 -translate-y-1/2"
      >
        {!showPassword ? <EyeIcon /> : <CrossEyeIcon />}
      </button>
      <InputError messages={name ? [errors?.[name]?.message as string] : []} />
    </div>
  );
};

export default PasswordInput;
