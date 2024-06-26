"use strict";

const { ErrorHandler } = require("@/shared");
const express = require("express");
const router = express.Router();
const { usersController } = require("@/modules/index");
const { validate } = require("@/middlewares/validator");

router
	.route("/:id")
	.get(
		validate,
		usersController.getUsers,
		ErrorHandler(usersController.getUsers)
	);

router
	.route("/")
	.get(
		validate,
		usersController.getAllUsers,
		ErrorHandler(usersController.getAllUsers)
	);
router
	.route("/:id")
	.delete(
		validate,
		usersController.deleteUser,
		ErrorHandler(usersController.deleteUser)
	);

router
	.route("/:id")
	.put(
		validate,
		usersController.UpdateUser,
		ErrorHandler(usersController.UpdateUser)
	);

module.exports = router;
