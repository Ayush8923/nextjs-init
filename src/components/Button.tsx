import { MouseEventHandler } from "react";

interface ButtonProps {
  title?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  [key: string]: any;
}

const Button = ({
  title,
  variant = "primary",
  className = "",
  onClick,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-full font-semibold text-sm py-[10px] px-[15px] mt-[24px]";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  const variantStyles = {
    primary: `bg-primary-100 text-white ${disabled ? disabledStyles : ""}`,
    secondary: `bg-white text-primary-100 border border-primary-100 ${
      disabled ? disabledStyles : ""
    }`,
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
