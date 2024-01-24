"use strict";

const { ErrorHandler } = require("@/shared");
const express = require("express");
const router = express.Router();
const { userController } = require("@/modules/users/index")

router.route("/")
    .get(ErrorHandler(userController.getUsers));

module.exports = router;
