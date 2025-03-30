import type { Request, Response, NextFunction } from "express";

export class NotFoundError implements Error {
  name: string;
  message: string;

  constructor(message: string) {
    this.name = "Not Found";
    this.message = message;
  }
}

export class BadRequestError implements Error {
  name: string;
  message: string;

  constructor(message: string) {
    this.name = "Bad Request";
    this.message = message;
  }
}

export default function error(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof NotFoundError) {
    res.status(404);
  } else if (err instanceof BadRequestError) {
    res.status(400);
  } else {
    res.status(500); // Internal Server Error for unknown errors
  }

  res.json({ name: err.name, message: err.message });

  next();
}
