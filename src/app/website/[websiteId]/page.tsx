import Link from "next/link";
import { notFound } from "next/navigation";

import prisma from "@/utils/prisma";
import SearchInput from "@/components/SearchInput";
import TechnologyCard from "@/components/TechnologyCard";

const getData = async (id: string) => {
  const website = await prisma.website.findUnique({
    where: { id },
    include: { technologies: { include: { technology: true } } },
  });

  if (!website) {
    return notFound();
  }

  return {
    ...website,
    technologies: website.technologies.map((tech) => ({
      ...tech.technology,
      versions: tech.versions,
    })),
  };
};

interface IParams {
  websiteId: string;
}

const WebsitePage = async ({ params }: { params: IParams }) => {
  const website = await getData(params.websiteId);

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
        <Link className="cursor-pointer text-white" href="/search">
          Annuler
        </Link>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {website.technologies.map((tech: any, index: number) => (
          <TechnologyCard technology={tech} key={index} />
        ))}
      </div>
    </div>
  );
};

export default WebsitePage;
