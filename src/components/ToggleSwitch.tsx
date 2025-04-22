import * as React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

type ToggleSwitchProps = {
  id: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (_checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  className = "",
}) => {
  const isChecked = checked ?? defaultChecked;

  const rootClasses =
    "relative inline-flex h-[28px] w-[44px] items-center rounded-full border transition-colors duration-200 focus:outline-none " +
    (isChecked
      ? "bg-primary-100 border-primary-100"
      : "bg-white border-gray-200") +
    (className ? ` ${className}` : "") +
    (disabled ? " cursor-not-allowed opacity-50" : "");

  const thumbClasses =
    "block h-[22px] w-[22px] rounded-full bg-gray-200 shadow-md transition-transform duration-200 " +
    (isChecked ? "translate-x-[17px]" : "translate-x-[2px]");

  return (
    <RadixSwitch.Root
      id={id}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={rootClasses}
    >
      <RadixSwitch.Thumb className={thumbClasses} />
    </RadixSwitch.Root>
  );
};

export default ToggleSwitch;
