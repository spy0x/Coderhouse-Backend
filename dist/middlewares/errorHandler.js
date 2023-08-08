const errorHandler = (err, req, res, next) => {
    if (err) {
        console.log(err.cause);
        const response = {
            status: err.name,
            message: err.message,
            code: err.code
        };
        return res.status(err.status || 500).json(response);
    }
    return next();
};
export default errorHandler;
