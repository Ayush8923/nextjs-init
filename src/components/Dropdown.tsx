"use client";

import * as Popover from "@radix-ui/react-popover";
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
  searchable?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}

const DropdownPopover: React.FC<DropdownProps> = ({
  field,
  items,
  placeholder = "Select...",
  error,
  searchable = false,
  autoFocus = false,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedItem =
    field.value && items.find((item) => item.value === field.value)
      ? items.find((item) => item.value === field.value)
      : field.value
        ? { label: field.value, value: field.value }
        : undefined;

  const filteredItems = searchable
    ? items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  const selectedDropdownItem = () => {
    field.onChange(search);
    setSearch("");
    setOpen(false);
  };

  const disabledClass =
    "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300";

  return (
    <div className="relative w-full">
      <Popover.Root
        open={open}
        onOpenChange={(val) => {
          if (!disabled) {
            setOpen(val);
            !val && setSearch("");
          }
        }}
      >
        <Popover.Trigger asChild>
          <button
            type="button"
            className={`inline-flex items-center justify-between p-2.5 w-full border rounded-md shadow-sm transition ${
              disabled ? disabledClass : "bg-white border-gray-500"
            }`}
            disabled={disabled}
          >
            <span className={field.value ? "text-black" : "text-gray-500"}>
              {selectedItem?.label || placeholder}
            </span>
            <DropdownAppearanceIcon />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="bg-white border rounded-md shadow-lg p-2 z-50"
            align="start"
            sideOffset={5}
            style={{ width: "100%" }}
          >
            {searchable && (
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                autoFocus={autoFocus}
              />
            )}

            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.value}
                  className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 font-normal text-base"
                  onClick={() => {
                    field.onChange(item.value);
                    setSearch("");
                    setOpen(false);
                  }}
                >
                  {item.label}
                </div>
              ))
            ) : search.trim() !== "" ? (
              <div
                className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 font-normal text-base"
                onClick={() => selectedDropdownItem()}
              >
                Add New &quot;{search}&quot;
              </div>
            ) : (
              <div className="px-3 py-2 text-gray-500">No results found</div>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <InputError className="mb-4 mt-1" messages={error ? [error] : []} />
    </div>
  );
};

export default DropdownPopover;
