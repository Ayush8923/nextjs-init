"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ControllerRenderProps } from "react-hook-form";
import { useState } from "react";
import InputError from "./InputError";
import { DropdownAppearanceIcon } from "./icons";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  field: ControllerRenderProps<any, any>;
  items: DropdownItem[];
  placeholder?: string;
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  field,
  items,
  placeholder = "Select...",
  error,
}) => {
  const [open, setOpen] = useState(false);

  const selectedItem = items.find((item) => item.value === field.value);

  return (
    <div className="relative w-full">
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger
          className={
            "inline-flex items-center justify-between px-4 py-2 w-full border border-gray-500 rounded-md shadow-sm bg-white transition"
          }
        >
          <span className={selectedItem ? "text-black" : "text-gray-400"}>
            {selectedItem?.label || placeholder}
          </span>
          <DropdownAppearanceIcon />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-white border rounded-md shadow-lg p-1 z-50"
            sideOffset={5}
            style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
          >
            {items.map((item) => (
              <DropdownMenu.Item
                key={item.value}
                className="px-3 py-2 rounded-md cursor-pointer"
                onSelect={() => {
                  field.onChange(item.value);
                  setOpen(false);
                }}
              >
                {item.label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <InputError className="mb-4" messages={error ? [error] : []} />
    </div>
  );
};

export default Dropdown;
