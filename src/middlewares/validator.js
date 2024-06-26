"use strict";
require("dotenv").config();

const { ResponseHandler, HttpStatus } = require("@/shared/index");
const jwt = require("jsonwebtoken");

exports.validate = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null)
		return res.status(401).send({
			httpStatus: HttpStatus.UNAUTHORIZED,
			msg: "access unauthorized",
		});

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403);
		req.email = decoded.email;
		// if (decoded.sts_reset === 1) return res.send({ httpStatus: HttpStatus.UPGRADE_REQUIRED, msg: 'you need to reset password' })
		next();
	});
};
