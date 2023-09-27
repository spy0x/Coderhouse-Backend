import { Request, Response, NextFunction } from "express";

export const isFileEmpty = (req: Request, res: Response, next: NextFunction) => {
  if (req.files && req.files.length as number > 0) {
    return next();
  }
  return res.status(400).json({ status: "ERROR 400", message: "NO FILES UPLOADED" });
}
