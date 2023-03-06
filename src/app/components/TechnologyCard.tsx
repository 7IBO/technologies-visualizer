import { Technology } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TechnologyCardProps = {
  technology: Technology & { versions: string[] };
};

const TechnologyCard = ({ technology }: TechnologyCardProps) => {
  return (
    <Link
      href={`/technology/${technology.slug}`}
      className="px-3 py-2 bg-gray-700 rounded-md gap-3 items-center flex hover:bg-gray-600 transition duration-75"
    >
      <Image
        src={`https://www.wappalyzer.com/images/icons/${technology.name}.svg`}
        alt={`${technology.name} logo`}
        width={40}
        height={40}
      />
      <p className="text-md text-white">{technology.name}</p>
    </Link>
  );
};

export default TechnologyCard;
