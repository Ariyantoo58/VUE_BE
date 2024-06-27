"use strict";

const { ErrorHandler } = require("@/shared");
const express = require("express");
const router = express.Router();
const { usersController } = require("@/modules/index");
const { validate } = require("@/middlewares/validator");
const userInject = require("@/modules/users/users.service");

router.route("/:id").get(
	validate,
	userInject,
	usersController.getUsers,

	ErrorHandler(usersController.getUsers)
);

router
	.route("/")
	.get(
		validate,
		userInject,
		usersController.getAllUsers,
		ErrorHandler(usersController.getAllUsers)
	);
router
	.route("/:id")
	.delete(
		validate,
		userInject,
		usersController.deleteUser,
		ErrorHandler(usersController.deleteUser)
	);

router
	.route("/:id")
	.put(
		validate,
		userInject,
		usersController.UpdateUser,
		ErrorHandler(usersController.UpdateUser)
	);

module.exports = router;
