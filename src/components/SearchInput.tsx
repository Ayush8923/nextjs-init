"use client";

import React, { ChangeEvent, useState } from "react";
import { MagnifyingIcon } from "./icons";

type SearchInputProps = {
  placeholder?: string;
  onSearch: Function;
};

const SearchInput = ({
  placeholder = "Search...",
  onSearch,
}: SearchInputProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setValue(keyword);
    onSearch(keyword);
  };

  return (
    <div className="flex items-center relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full p-[10px] rounded-md border border-gray-300 focus:outline-none focus:ring-0"
      />
      <div className="absolute right-2">
        <MagnifyingIcon />
      </div>
    </div>
  );
};

export default SearchInput;
