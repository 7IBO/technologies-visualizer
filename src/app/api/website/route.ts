import { PrismaClient, Technology, Website } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const url = searchParams.get("url")!;

  const website = await prisma.website
    .findUnique({
      where: { url },
      include: { technologies: { include: { technology: true } } },
    })
    .then(async (ws) => {
      if (!ws) {
        const res = await fetch(`${origin}/api/lookup?url=${url}`);
        return (await res.json())[0];
      }
      return {
        ...ws,
        technologies: ws.technologies.map((tech) => ({
          ...tech.technology,
          versions: tech.versions,
        })),
      };
    });

  return NextResponse.json(website);
}
