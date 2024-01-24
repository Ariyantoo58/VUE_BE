"use strict";

/** Init */
const express = require("express");
const app = express();

require("dotenv").config();
require("module-alias/register");
require("morgan-body")(app);

const { APP_NAME, APP_PORT } = require("@/configs/index");
const { getHttpReason, HttpStatus, ResponseHandler } = require("@/shared/index");
const routes = require("@/routes");

app.disable("x-powered-by");

/** Interceptors */
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({ limit: "5mb" }));

/** Routes */
app.use(routes);

/** Filter */
app.use((error, req, res, next) => {
    console.error(error.constructor.name);
    switch (error.constructor) {
        case SyntaxError: { return ResponseHandler(res, { httpStatus: HttpStatus.BAD_REQUEST }); }
        default: { return ResponseHandler(res, { httpStatus: HttpStatus.INTERNAL_SERVER_ERROR }); }
    }
});

app.all("*", (req, res, next) => !res.headersSent && ResponseHandler(res, { httpStatus: HttpStatus.NOT_FOUND, message: getHttpReason(HttpStatus.NOT_FOUND) }));

/** Start */
app.listen(APP_PORT, () => {
    console.log(`[server] ${APP_NAME} running on port ${APP_PORT}`);
});
