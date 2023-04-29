"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import SearchInput from "../../components/SearchInput";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Home() {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSearchTechnologies = (value: string) => {
    setLoading(true);

    fetch(`/api/website?url=${value}`).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        push(`/website/${data.id}`);
      } else {
        setLoading(false);
        toast.error(await res.text(), { position: "bottom-center" });
      }
    });
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      {loading && (
        <div className="bg-gray-900/80 absolute z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 text-white" />
        </div>
      )}
      <SearchInput onEnter={handleSearchTechnologies} />
    </div>
  );
}
