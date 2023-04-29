import { Technology, Website } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url")!;

  try {
    const res = await fetch(
      `https://api.wappalyzer.com/v2/lookup/?urls=${url}`,
      {
        headers: { "x-api-key": process.env.WAPPALIZER_API_KEY || "" },
      }
    );

    const data = await res.json();

    if (typeof data !== "object") {
      throw new Error("Invalid URL");
    }

    const websites: (Website & {
      technologies: (Technology & { versions: string[] })[];
    })[] = [];

    for (let index = 0; index < data.length; index++) {
      const websiteElement = data[index];

      const website = await prisma.website
        .findUnique({
          where: { url },
        })
        .then(async (ws) => {
          if (!ws) {
            return await prisma.website.create({
              data: { url: websiteElement.url },
            });
          }
          return ws;
        });

      const analyze = await prisma.analyze.create({
        data: {
          websiteId: website.id,
          analyzedAt: new Date(),
        },
      });

      const technologies: (Technology & { versions: string[] })[] = [];

      await prisma.websiteTechnology.deleteMany({
        where: { websiteId: website.id },
      });

      for (let index = 0; index < websiteElement.technologies.length; index++) {
        const technologyElement = websiteElement.technologies[index];

        const technology = await prisma.technology
          .findUnique({
            where: { slug: technologyElement.slug },
          })
          .then(async (tech) => {
            if (!tech) {
              return await prisma.technology.create({
                data: {
                  name: technologyElement.name,
                  slug: technologyElement.slug,
                },
              });
            }
            return tech;
          });

        await prisma.websiteTechnology.create({
          data: {
            technologyId: technology.id,
            versions: technologyElement.versions,
            websiteId: website.id,
          },
        });

        technologies.push(
          await prisma.analyzeTechnology
            .create({
              data: {
                analyzeId: analyze.id,
                technologyId: technology.id,
                versions: technologyElement.versions,
              },
              include: { technology: true },
            })
            .then((tech) => ({ versions: tech.versions, ...tech.technology }))
        );
      }
      websites.push({ ...website, technologies });
    }

    return NextResponse.json(websites, { status: 200 });
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
}
