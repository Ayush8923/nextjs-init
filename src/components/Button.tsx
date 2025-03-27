import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  title?: string;
  variant?: "primary" | "secondary";
  className?: string;
  iconClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  [key: string]: any;
}

const Button = ({
  title,
  variant = "primary",
  className = "",
  iconClassName = "",
  onClick,
  disabled,
  loading = false,
  icon,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-full font-semibold text-sm py-[10px] px-[15px] mt-6 relative flex items-center justify-center";
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
      {loading ? (
        <span className="loader border-2 border-t-transparent w-6 h-6 rounded-full animate-spin"></span>
      ) : (
        <>
          {icon && (
            <span className={`absolute left-6 ${iconClassName}`}>{icon}</span>
          )}
          <span className="mx-auto">{title}</span>
        </>
      )}
    </button>
  );
};

export default Button;
