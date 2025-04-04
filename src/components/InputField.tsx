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

  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        placeholder={label}
        {...(register && name ? register(name, validation) : {})}
        className={`w-full p-[10px] border rounded-md ${className}`}
        {...props}
      />
      <InputError messages={name ? [errors?.[name]?.message as string] : []} />
    </div>
  );
};

export default InputField;
