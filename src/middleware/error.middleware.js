// 📂 src/middleware/error.middleware.js (Error Handling)
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message });
};
export default errorHandler;

// 📂 src/utils/logger.js (Logger Utility)
export const log = (message) => {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
};
