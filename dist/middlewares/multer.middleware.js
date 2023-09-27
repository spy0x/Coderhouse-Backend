export const isFileEmpty = (req, res, next) => {
    if (req.files && req.files.length > 0) {
        return next();
    }
    return res.status(400).json({ status: "ERROR 400", message: "NO FILES UPLOADED" });
};
