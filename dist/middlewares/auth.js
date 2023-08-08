import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { geneateCartOwnershipError } from "../services/errors/info.js";
export const isLogged = (req, res, next) => {
    const userAgent = req.get("User-Agent");
    if (req.session?.user?.email) {
        return next();
    }
    if (userAgent?.includes("Postman")) {
        return res.status(401).json({ status: "ERROR 401", message: "AUTHENTICATION REQUIRED" });
    }
    return res.status(401).render("error", { status: "ERROR 401", message: "AUTHENTICATION REQUIRED" });
};
export const isAdmin = (req, res, next) => {
    const userAgent = req.get("User-Agent");
    if (req.session?.user?.role === "admin") {
        return next();
    }
    if (userAgent?.includes("Postman")) {
        return res.status(403).json({ status: "ERROR 403", message: "AUTHORIZATION DENIED" });
    }
    return res.status(403).render("error", { status: "ERROR 403", message: "AUTHORIZATION DENIED" });
};
export const isUser = (req, res, next) => {
    const userAgent = req.get("User-Agent");
    if (req.session?.user?.role === "user") {
        return next();
    }
    if (userAgent?.includes("Postman")) {
        return res.status(403).json({ status: "ERROR 403", message: "AUTHORIZATION DENIED" });
    }
    return res.status(403).render("error", { status: "ERROR 403", message: "AUTHORIZATION DENIED" });
};
export const isCartOwner = (req, res, next) => {
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
    }
    catch (error) {
        next(error);
    }
};
