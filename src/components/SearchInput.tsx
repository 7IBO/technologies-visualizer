"use client";

import { useState, type KeyboardEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchInputProps = {
  onEnter: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onEnter }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter(searchInput);
    }
  };

  return (
    <div className="bg-gray-700 rounded-md items-center text-gray-300 px-5 py-3 flex gap-2">
      <input
        className="bg-inherit focus:outline-none"
        placeholder="Chercher"
        type="text"
        onChange={(e) => setSearchInput(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
      <AiOutlineSearch
        className="w-7 h-7 p-1 cursor-pointer"
        onClick={() => onEnter(searchInput)}
      />
    </div>
  );
};

export default SearchInput;
