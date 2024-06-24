const constants = require('../utils/constants');

const generateTitle = (statusCode) => {
    switch(statusCode) { // title for status codes
        case constants.VALIDATION_ERROR:
            return "Validation Failed: Invalid input format"
        case constants.UNATHORIZED:
            return "Unauthorized: User not authenticated"
        case constants.FORBIDDEN:
            return "Forbidden: Access denied"
        case constants.NOT_FOUND:
            return "Not Found: Resource not found";
        case constants.SERVER_ERROR:
            return "Server Error: Internal server error";
        default:
            return `Unknown Error Code: ${statusCode}`;
    }
}

const errorHandler = (err, req, res, next) => {
    statusCode = res.statusCode || 500;
    res.json({ // error format
        title: generateTitle(statusCode),
        message: err.message,
        stackTrace: err.stack
    })
}

module.exports = errorHandler