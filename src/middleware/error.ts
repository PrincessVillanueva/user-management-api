import type { Request, Response, NextFunction } from "express";

export default function error(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(400).send({ message: err.message });
}
