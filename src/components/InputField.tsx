import { FieldErrors, UseFormRegister } from "react-hook-form";
import InputError from "@/components/InputError";

type InputFieldProps = {
  type?: string;
  label?: string;
  name?: string;
  register?: UseFormRegister<any>;
  errors?: FieldErrors;
  isRequired?: boolean;
};

const InputField = ({
  type,
  label,
  name,
  register,
  errors,
  isRequired = true,
}: InputFieldProps) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={label}
        {...(register && name
          ? register(
              name,
              isRequired ? { required: `${label} is required` } : {}
            )
          : {})}
        className="w-full p-[10px] border rounded-md"
      />
      <InputError messages={name ? [errors?.[name]?.message as string] : []} />
    </div>
  );
};

export default InputField;
