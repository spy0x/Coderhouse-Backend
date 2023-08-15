import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.logger = logger;
    next();
}

export default loggerMiddleware;