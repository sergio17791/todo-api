import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error.name) {
    return response.status(StatusCodes.BAD_REQUEST).send({
      error: error.name,
      message: error.message,
    });
  } else {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: 'InternalServerError',
      message: 'Something is wrong',
    });
    next(error);
  }
};
