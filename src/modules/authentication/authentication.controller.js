"use strict";

const { ResponseHandler, HttpStatus } = require("@/shared/index");

exports.login = (req, res, next) => {
    return ResponseHandler(res, { httpStatus: HttpStatus.UNAUTHORIZED, message: "Login Failed", data: {} });
}