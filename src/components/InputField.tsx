import { FieldErrors, UseFormRegister } from "react-hook-form";
import InputError from "@/components/InputError";

type InputFieldProps = {
  type?: string;
  label?: string;
  name?: string;
  register?: UseFormRegister<any>;
  errors?: FieldErrors;
  isRequired?: boolean;
  className?: string;
  validationRules?: object;
} & Record<string, any>;

const InputField = ({
  type,
  label,
  name,
  register,
  errors,
  isRequired = true,
  className,
  validationRules = {},
  ...props
}: InputFieldProps) => {
  const validation = {
    ...(isRequired ? { required: `${label} is required` } : {}),
    ...validationRules,
  };

  const isPriceField = name === "price";
  const disabledClass =
    props.disabled &&
    "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300";

  const shouldRegister = register && name && !props.disabled;
  const fieldError =
    !props.disabled && name ? (errors?.[name]?.message as string) : "";

  return (
    <div className="relative">
      {isPriceField && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black font-medium">
          $
        </span>
      )}
      <input
        type={type}
        id={name}
        placeholder={label}
        {...(shouldRegister ? register(name, validation) : {})}
        className={`w-full ${isPriceField ? "pl-8" : "p-[10px]"} border rounded-md ${className} ${disabledClass}`}
        {...props}
      />
      <InputError messages={fieldError ? [fieldError] : []} />
    </div>
  );
};

export default InputField;
