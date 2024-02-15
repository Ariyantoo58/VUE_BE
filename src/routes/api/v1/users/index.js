"use strict";

const { ErrorHandler } = require("@/shared");
const express = require("express");
const router = express.Router();
const { usersController } = require("@/modules/index")

router.route("/")
    .get(ErrorHandler(usersController.getUsers));

module.exports = router;
