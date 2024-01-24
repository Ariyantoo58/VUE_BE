"use strict";

const { ResponseHandler, HttpStatus } = require("@/shared/index");
const userService = require("./users.service");

exports.getUsers = async (req, res) => {
    const users = userService.getUserById({ id: 1});
    
    return ResponseHandler(res, { httpStatus: HttpStatus.OK, data: users });
}