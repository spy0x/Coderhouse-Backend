import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(err.message);
    if (err.cause) console.log(err.cause);
    const response: Result = {
      status: err.name,
      message: err.message,
      code: err.code,
    };
    return res.status(err.status || 500).json(response);
  }
  return next();
};
export default errorHandler;
