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

export function getNews() {
  return prisma.news.findMany({
    orderBy: {
      publicationDate: "desc",
    },
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
