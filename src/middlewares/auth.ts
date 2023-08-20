import { Request, Response, NextFunction } from "express";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { geneateCartOwnershipError } from "../services/errors/info.js";

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.get("User-Agent");
  if (req.session?.user?.email) {
    return next();
  }
  return res.status(401).json({ status: "ERROR 401", message: "AUTHENTICATION REQUIRED" });
};
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.get("User-Agent");
  if (req.session?.user?.role === "admin") {
    return next();
  }
  return res.status(403).json({ status: "ERROR 403", message: "AUTHORIZATION DENIED" });
};
export const isUser = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.get("User-Agent");
  if (req.session?.user?.role === "user") {
    return next();
  }
  return res.status(403).json({ status: "ERROR 403", message: "AUTHORIZATION DENIED" });
};
export const isCartOwner = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session?.user?.cartId === req.params.cid) {
      return next();
    }
    CustomError.createError({
      name: "AUTHORIZATION DENIED",
      message: "This cart does not belong to the current user",
      code: EErrors.AUTHORIZATION_DENIED,
      cause: geneateCartOwnershipError(req.session?.user?.cartId, req.params.cid),
      status: 403,
    });
  } catch (error) {
    next(error);
  }
};
