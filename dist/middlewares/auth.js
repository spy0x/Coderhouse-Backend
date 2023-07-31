export const isLogged = (req, res, next) => {
    if (req.session?.user?.email) {
        return next();
    }
    return res.status(401).render("error", { status: "ERROR 401", message: "AUTHENTICATION REQUIRED" });
};
export const isAdmin = (req, res, next) => {
    if (req.session?.user?.role === "admin") {
        return next();
    }
    return res.status(403).render("error", { status: "ERROR 403", message: "AUTHORIZATION DENIED" });
};
export const isUser = (req, res, next) => {
    if (req.session?.user?.role === "user") {
        return next();
    }
    return res.status(403).render("error", { status: "ERROR 403", message: "AUTHORIZATION DENIED" });
};
export const isCartOwner = (req, res, next) => {
    if (req.session?.user?.cartId === req.params.cid) {
        return next();
    }
    return res.status(403).json({ status: "ERROR 403", message: "AUTHORIZATION DENIED" });
};
