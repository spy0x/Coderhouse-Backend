import multer from "multer";
const storageDocuments = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/uploads/documents");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/uploads/profiles");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const storageProducts = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/uploads/products");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
export const uploaderDocuments = multer({ storage: storageDocuments });
export const uploaderProfiles = multer({ storage: storageProfile });
export const uploaderProducts = multer({ storage: storageProducts });
