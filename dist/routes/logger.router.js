import { Router } from "express";
const loggerRouter = Router();
/* Test Types of Server Console Logs with different colors. */
loggerRouter.get("/", (req, res) => {
    req.logger.debug("This is a debug message");
    req.logger.info("This is an info message");
    req.logger.warn("This is a warn message");
    req.logger.error("This is an error message");
    res.send("Logger Test Done. Check your Server Console!");
});
export default loggerRouter;
