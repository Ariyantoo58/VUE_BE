"use strict";

const { ErrorHandler } = require("@/shared");
const express = require("express");
const router = express.Router();
const { authenticationController } = require("@/modules/index");

/**
 * @openapi
 * '/api/v1/authentication/login':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: user123
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

router
	.route("/login")
	.post(ErrorHandler(authenticationController.getAuthentication));

router
	.route("/refresh-token")
	.get(
		authenticationController.authRefreshToken,
		ErrorHandler(authenticationController.authRefreshToken)
	);
router
	.route("/logout")
	.get(
		authenticationController.authLogut,
		ErrorHandler(authenticationController.authLogut)
	);

/**
 * @openapi
 * '/api/v1/authentication/register':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - username
 *              - email
 *              - password
 *            properties:
 *              firstName:
 *                type: string
 *                default: john
 *              lastName:
 *                type: string
 *                default: doe
 *              username:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: user123
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

router
	.route("/register")
	.post(
		authenticationController.authRegister,
		ErrorHandler(authenticationController.authRegister)
	);

module.exports = router;
