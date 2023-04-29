import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const url = searchParams.get("url");

  try {
    if (!url) {
      throw new Error("Missing url parameter");
    }

    const website = await prisma.website
      .findUnique({
        where: { url },
        include: { technologies: { include: { technology: true } } },
      })
      .then(async (ws) => {
        if (!ws) {
          const res = await fetch(`${origin}/api/lookup?url=${url}`);
          if (res.ok) {
            const data = await res.json();
            return data[0];
          }
          throw new Error(await res.text());
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
  } catch (e: any) {
    return NextResponse.json(e.message, { status: 500 });
  }
}
