import prisma from "./../database";
import { News } from "@prisma/client";

export type CreateNewsData = Omit<News, "id" | "createAt">;
export type AlterNewsData = CreateNewsData;

function formatNewsData(newsData: CreateNewsData) {
  return {
    ...newsData,
    publicationDate: new Date(newsData.publicationDate),
  };
}

export function getNews({
  page = 1,
  order = "desc",
  title,
}: {
  page?: number;
  order?: "asc" | "desc";
  title?: string;
}) {
  const take = 10;
  const skip = (page - 1) * take;

  return prisma.news.findMany({
    where: title
      ? {
          title: {
            contains: title,
            mode: "insensitive",
          },
        }
      : undefined,
    orderBy: {
      publicationDate: order,
    },
    take,
    skip,
  });
}


export function getSpecificNews(id: number) {
  return prisma.news.findUnique({
    where: { id },
  });
}

export function createNews(newsData: CreateNewsData) {
  return prisma.news.create({
    data: formatNewsData(newsData),
  });
}

export function alterNews(id: number, newsData: AlterNewsData) {
  return prisma.news.update({
    where: { id },
    data: formatNewsData(newsData),
  });
}

export function deleteNews(id: number) {
  return prisma.news.delete({
    where: { id },
  });
}
