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
  searchable?: boolean;
  autoFocus?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  field,
  items,
  placeholder = "Select...",
  error,
  searchable = false,
  autoFocus = false,
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

  return (
    <div className="relative w-full">
      <DropdownMenu.Root
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          !val && setSearch("");
        }}
      >
        <DropdownMenu.Trigger className="inline-flex items-center justify-between p-2.5 w-full border border-gray-500 rounded-md shadow-sm bg-white transition">
          <span className={field.value ? "text-black" : "text-gray-400"}>
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
                <DropdownMenu.Item
                  key={item.value}
                  className="dropdown-item px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 font-normal text-base"
                  onSelect={() => {
                    field.onChange(item.value);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </DropdownMenu.Item>
              ))
            ) : search.trim() !== "" ? (
              <DropdownMenu.Item
                className="dropdown-item px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 font-normal text-base"
                onSelect={() => selectedDropdownItem()}
              >
                Add New &quot;{search}&quot;
              </DropdownMenu.Item>
            ) : (
              <div className="px-3 py-2 text-gray-500">No results found</div>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <InputError className="mb-4 mt-1" messages={error ? [error] : []} />
    </div>
  );
};

export default Dropdown;
