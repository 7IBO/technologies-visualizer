"use client";

import SearchInput from "./components/SearchInput";
import TechnologyCard from "./components/TechnologyCard";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [website, setWebsite] = useState<any>(null);

  const handleSearchTechnologies = async (value: string) => {
    const res = await fetch(`/api/website?url=${value}`);
    const data = await res.json();

    setWebsite(data);
  };

  if (!website) {
    return <SearchInput onEnter={handleSearchTechnologies} />;
  }

  return (
    <div className="flex gap-10 flex-col">
      <div className="flex justify-between">
        <Link
          href={website.url}
          target="_blank"
          className="text-white font-medium text-lg"
        >
          {website.url}
        </Link>
        <div
          className="cursor-pointer text-white"
          onClick={() => setWebsite(null)}
        >
          Annuler
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {website.technologies.map((tech: any, index: number) => (
          <TechnologyCard technology={tech} key={index} />
        ))}
      </div>
    </div>
  );
}
