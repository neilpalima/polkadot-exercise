"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionErrors = exports.developmentErrors = exports.notFound = void 0;
const notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};
exports.notFound = notFound;
/* istanbul ignore next */
const developmentErrors = (err, req, res) => {
    err.stack = err.stack || '';
    const errorDetails = {
        message: err.message,
        stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };
    res.status(err.status || 500).send(errorDetails);
};
exports.developmentErrors = developmentErrors;
/* istanbul ignore next */
const productionErrors = (err, req, res) => {
    console.error(err.message);
    res.status(err.status || 500).send({
        message: err.message
    });
};
exports.productionErrors = productionErrors;
//# sourceMappingURL=errorHandler.js.map