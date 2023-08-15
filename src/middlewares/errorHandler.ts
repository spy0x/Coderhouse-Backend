import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        logger.warn(err.message);
        if (err.cause) logger.warn(err.cause);
        const response: Result = {
            status: err.name,
            message: err.message,
            code: err.code
        };
        return res.status(err.status || 500).json(response);
    }
    return next();
};
export default errorHandler;
