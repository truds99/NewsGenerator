import express, { Request, Response, json } from "express";
import "express-async-errors";

import newsRouter from "./routers/news-router";
import errorHandlingMiddleware from "./middlewares/error-handler";
import httpStatus from "http-status";

const app = express();
app.use(json());

const HEALTH_CHECK_MESSAGE = "I'm ok!";

app.get("/health", (req: Request, res: Response) => {
  res.status(httpStatus.OK).send(HEALTH_CHECK_MESSAGE);
});

app.use("/news", newsRouter);
app.use(errorHandlingMiddleware);

export default app;
