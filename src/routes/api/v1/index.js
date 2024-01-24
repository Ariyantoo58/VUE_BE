"use strict";

const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/authentication", require("./authentication"));

module.exports = router;
