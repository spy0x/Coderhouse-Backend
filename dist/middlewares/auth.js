import { productsDao } from "../DAO/factory.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { geneateCartOwnershipError } from "../services/errors/info.js";
export const isLogged = (req, res, next) => {
    const userAgent = req.get("User-Agent");
    if (req.session?.user?.email) {
        return next();
    }
    return res.status(401).json({ status: "ERROR 401", message: "AUTHENTICATION REQUIRED" });
};
export const isAdmin = (req, res, next) => {
    if (req.session?.user?.role === "admin") {
        return next();
    }
    return res.status(403).json({ status: "ERROR 403", message: "AUTHORIZATION DENIED" });
};
export const isAdminOrPremium = (req, res, next) => {
    const userRole = req.session?.user?.role;
    if (userRole === "admin" || userRole === "premium") {
        return next();
    }
    return res.status(403).json({ status: "ERROR 403", message: "AUTHORIZATION DENIED" });
};
export const isUser = (req, res, next) => {
    const userAgent = req.get("User-Agent");
    if (req.session?.user?.role === "user") {
        return next();
    }
    return res.status(403).json({ status: "ERROR 403", message: "AUTHORIZATION DENIED" });
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
export const isProductOwner = async (req, res, next) => {
    try {
        if (req.session?.user?.role === "admin")
            return next();
        const id = req.params.pid;
        const product = await productsDao.findProduct(id);
        if (product?.owner == req.session?.user?._id) {
            return next();
        }
        return res.status(403).json({ status: "ERROR 403", message: "AUTHORIZATION DENIED" });
    }
    catch (error) {
        next(error);
    }
};
export const isUserIdOwner = (req, res, next) => {
    const uid = req.params.uid;
    if (req.session?.user?._id === uid) {
        return next();
    }
    return res.status(403).json({ status: "ERROR 403", message: "AUTHORIZATION DENIED" });
};
