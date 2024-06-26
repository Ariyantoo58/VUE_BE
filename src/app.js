"use strict";

/** Init */
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("module-alias/register");
require("morgan-body")(app);

const corsConfig = {
	Credential: true,
};

const { APP_NAME, APP_PORT } = require("@/config/index");
const {
	getHttpReason,
	HttpStatus,
	ResponseHandler,
} = require("@/shared/index");
const routes = require("@/routes");
const swaggerDocs = require("./config/swagger");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const client = require("./config/redis");

app.use(
	cors({ origin: process.env.CORS_FE_ORIGIN?.split(","), credentials: true })
);

app.disable("x-powered-by");

// app.use(cors());
app.use(cookieParser());

/** Interceptors */
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({ limit: "5mb" }));

swaggerDocs(app, APP_PORT);
client.on("ready", () => {
	console.log("Redis client ready to use");
});

client.on("error", (err) => {
	console.error("Redis client not connected to the server:", err);
});

client.on("connect", () => {
	console.log("Redis client connected to the server");
});

/** Routes */
app.use(routes);

// Connecting to the Redis server
client.connect().catch(console.error);
/** Filter */
app.use((error, req, res, next) => {
	console.error(error);
	switch (error.constructor) {
		case SyntaxError: {
			return ResponseHandler(res, { httpStatus: HttpStatus.BAD_REQUEST });
		}
		default: {
			return ResponseHandler(res, {
				httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
			});
		}
	}
});

app.all(
	"*",
	(req, res, next) =>
		!res.headersSent &&
		ResponseHandler(res, {
			httpStatus: HttpStatus.NOT_FOUND,
			message: getHttpReason(HttpStatus.NOT_FOUND),
		})
);

/** Start */
app.listen(APP_PORT, () => {
	console.log(`[server] ${APP_NAME} running on port ${APP_PORT}`);
});
