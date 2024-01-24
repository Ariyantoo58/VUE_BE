"use strict";

const { ErrorHandler } = require("@/shared");
const express = require("express");
const router = express.Router();
const { authenticationController } = require("@/modules/authentication/index")

router.route("/")
    .get(ErrorHandler(authenticationController.login));

module.exports = router;
