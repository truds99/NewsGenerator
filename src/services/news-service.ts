import prisma from "../database";
import * as newsRepository from "../repositories/news-repository";
import { AlterNewsData, CreateNewsData } from "../repositories/news-repository";

const ERROR_TYPES = {
  NOT_FOUND: "NotFound",
  CONFLICT: "Conflict",
  BAD_REQUEST: "BadRequest",
};

const MIN_TEXT_LENGTH = 500;

export async function getNews() {
  return newsRepository.getNews();
}

export async function getSpecificNews(id: number) {
  const news = await newsRepository.getSpecificNews(id);
  if (!news) {
    throw {
      name: ERROR_TYPES.NOT_FOUND,
      message: `News with id ${id} not found.`,
    };
  }
  return news;
}

export async function createNews(newsData: CreateNewsData) {
  await validateNewsData(newsData);
  return newsRepository.createNews(newsData);
}

export async function alterNews(id: number, newsData: AlterNewsData) {
  const existingNews = await getSpecificNews(id);
  const isNewTitle = existingNews.title !== newsData.title;

  await validateNewsData(newsData, isNewTitle);
  return newsRepository.alterNews(id, newsData);
}

export async function deleteNews(id: number) {
  await getSpecificNews(id);
  return newsRepository.deleteNews(id);
}

async function validateNewsData(newsData: CreateNewsData, checkTitle = true) {
  if (checkTitle) {
    const existing = await prisma.news.findFirst({
      where: { title: newsData.title },
    });

    if (existing) {
      throw {
        name: ERROR_TYPES.CONFLICT,
        message: `News with title "${newsData.title}" already exists.`,
      };
    }
  }

  if (newsData.text.length < MIN_TEXT_LENGTH) {
    throw {
      name: ERROR_TYPES.BAD_REQUEST,
      message: `The news text must have at least ${MIN_TEXT_LENGTH} characters.`,
    };
  }
}
