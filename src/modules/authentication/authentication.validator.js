"use strict";

const { body, param, query, validationResult } = require("express-validator");

exports.getAuthentication = [
    param("id").isString().withMessage("id must be string"),
]