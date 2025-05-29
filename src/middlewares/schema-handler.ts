import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import httpStatus from "http-status";

const VALIDATION_ERROR_KEY = "error";

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .send({ [VALIDATION_ERROR_KEY]: error.message });
    }

    next();
  };
}
