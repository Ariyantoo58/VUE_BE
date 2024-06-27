"use strict";

const { ErrorHandler } = require("@/shared");
const express = require("express");
const router = express.Router();
const { authenticationController } = require("@/modules/index");
const authInject = require("@/modules/authentication/authentication.service");

router
	.route("/login")
	.post(
		authInject,
		authenticationController.getAuthentication,
		ErrorHandler(authenticationController.getAuthentication)
	);

router
	.route("/refresh-token")
	.get(
		authInject,
		authenticationController.authRefreshToken,
		ErrorHandler(authenticationController.authRefreshToken)
	);
router
	.route("/logout")
	.get(
		authInject,
		authenticationController.authLogut,
		ErrorHandler(authenticationController.authLogut)
	);

router
	.route("/register")
	.post(
		authInject,
		authenticationController.authRegister,
		ErrorHandler(authenticationController.authRegister)
	);

module.exports = router;
