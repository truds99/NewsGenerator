import Joi from "joi";
import { CreateNewsData } from "../repositories/news-repository";

export const newsSchema = Joi.object<CreateNewsData>({
  title: Joi.string().required(),
  text: Joi.string().required(),
  author: Joi.string().required(),
  firstHand: Joi.boolean().optional(),
  publicationDate: Joi.date().required()
});
