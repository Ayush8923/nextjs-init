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
} & Record<string, any>;

const InputField = ({
  type,
  label,
  name,
  register,
  errors,
  isRequired = true,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        placeholder={label}
        {...(register && name
          ? register(
              name,
              isRequired ? { required: `${label} is required` } : {}
            )
          : {})}
        className={`w-full p-[10px] border rounded-md ${className}`}
        {...props}
      />
      <InputError messages={name ? [errors?.[name]?.message as string] : []} />
    </div>
  );
};

export default InputField;
