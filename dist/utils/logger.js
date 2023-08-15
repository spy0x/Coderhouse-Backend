import winston from "winston";
const customFormat = winston.format.combine(winston.format.timestamp(), winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
}));
const consoleFormat = winston.format.combine(winston.format.colorize({ all: true }));
const developmentLogger = winston.createLogger({
    transports: [new winston.transports.Console({ level: "debug", format: consoleFormat })],
    format: customFormat,
});
const productionLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: "info", format: consoleFormat }),
        new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
    format: customFormat,
});
export let logger;
export function initLogger() {
    if (process.env.NODE_ENV === "PRODUCTION")
        logger = productionLogger;
    else
        logger = developmentLogger;
}
