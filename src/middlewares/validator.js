"use strict";

const { ResponseHandler, HttpStatus } = require("@/shared/index")

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    const extractedErrors = errors.array().map((err) => {
        return { [err.param]: err.msg };
    });

    return ResponseHandler(res, { httpStatus: HttpStatus.BAD_REQUEST, data: extractedErrors });
};
