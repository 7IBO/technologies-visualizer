"use client";

import React, { KeyboardEvent } from "react";

type SearchInputProps = {
  onEnter: (value: string) => void;
};

const SearchInput = ({ onEnter }: SearchInputProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter(event.currentTarget.value);
    }
  };

  return (
    <input
      className="bg-gray-700 rounded-md text-white px-4 py-3 focus:outline-none"
      placeholder="Chercher"
      type="text"
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchInput;
