"use strict";

const { HttpStatus, HttpReason, getHttpReason } = require("@/shared/enum/http-status");

exports.ResponseHandler = (res, { httpStatus = HttpStatus.OK, message, data = {} }) => {
    const response = {
        responseCode: `${httpStatus}`,
        responseMessage: message || getHttpReason(httpStatus),
        responseData: data
    }

    res.status(httpStatus);
    res.json(response);
    res.end();
}