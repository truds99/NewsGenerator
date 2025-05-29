import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "./../services/news-service";
import { AlterNewsData, CreateNewsData } from "../repositories/news-repository";

const INVALID_ID_MESSAGE = "Id is not valid.";
const DEFAULT_PAGE = 1;
const DEFAULT_ORDER: "asc" | "desc" = "desc";

function parseAndValidateId(req: Request, res: Response): number | null {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    res.status(httpStatus.BAD_REQUEST).send(INVALID_ID_MESSAGE);
    return null;
  }
  return id;
}

export async function getNews(req: Request, res: Response) {
  const { page = DEFAULT_PAGE, order = DEFAULT_ORDER, title } = req.query;

  const pageNumber = Number(page);
  const sortOrder = order === "asc" ? "asc" : "desc"; // fallback seguro

  const news = await service.getNews({
    page: isNaN(pageNumber) || pageNumber < 1 ? DEFAULT_PAGE : pageNumber,
    order: sortOrder,
    title: typeof title === "string" ? title : undefined,
  });

  return res.send(news);
}

export async function getSpecificNews(req: Request, res: Response) {
  const id = parseAndValidateId(req, res);
  if (id === null) return;

  const news = await service.getSpecificNews(id);
  return res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as CreateNewsData;
  const createdNews = await service.createNews(newsData);

  return res.status(httpStatus.CREATED).send(createdNews);
}

export async function alterNews(req: Request, res: Response) {
  const id = parseAndValidateId(req, res);
  if (id === null) return;

  const newsData = req.body as AlterNewsData;
  const alteredNews = await service.alterNews(id, newsData);

  return res.send(alteredNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = parseAndValidateId(req, res);
  if (id === null) return;

  await service.deleteNews(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}
