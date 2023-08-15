import { logger } from "../utils/logger.js";
const loggerMiddleware = (req, res, next) => {
    req.logger = logger;
    next();
};
export default loggerMiddleware;
