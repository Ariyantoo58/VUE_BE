"use strict";

const { ResponseHandler, HttpStatus } = require("@/shared/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAuthentication = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const singleUser = await req.service.loginAuth({
			email: email,
		});

		if (!singleUser)
			return ResponseHandler(res, {
				httpStatus: HttpStatus.UNAUTHORIZED,
				message: "Maaf email tidak ditemukan",
			});

		if (singleUser.password !== password)
			return ResponseHandler(res, {
				httpStatus: HttpStatus.UNAUTHORIZED,
				message: "Maaf password yang dimasukan salah",
			});

		const userId = singleUser.id;
		const username = singleUser.username;
		const firstName = singleUser.firstName;
		const lastName = singleUser.lastName;

		const refreshToken = jwt.sign(
			{ userId, email, username, firstName, lastName },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: "1d",
			}
		);
		const accessToken = jwt.sign(
			{ userId, email, username, firstName, lastName },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "1d",
			}
		);

		await req.service.updateToken({
			refreshToken: refreshToken,
			userId: userId,
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: 24 * 60 * 60 * 1000,
		});

		return ResponseHandler(res, {
			httpStatus: HttpStatus.OK,
			message: "succsess",
			data: { accessToken, userId, email, username, firstName, lastName },
		});
	} catch (error) {
		return ResponseHandler(res, {
			httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};

exports.authRefreshToken = async (req, res, next) => {
	const refreshToken = req.cookies.refreshToken;

	try {
		if (!refreshToken)
			return ResponseHandler(res, {
				httpStatus: HttpStatus.UNAUTHORIZED,
				message: "UnAuthorized",
			});

		const userRefresh = await req.service.refreshTokenDB({
			refreshToken: refreshToken,
		});

		if (!userRefresh)
			return ResponseHandler(res, {
				httpStatus: HttpStatus.FORBIDDEN,
				message: "FORBIDDEN",
			});
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				if (err)
					return ResponseHandler(res, {
						httpStatus: HttpStatus.UNAUTHORIZED,
						message: "UnAuthorized",
					});
				const userId = userRefresh.id;
				const email = userRefresh.email;

				const accessToken = jwt.sign(
					{ userId, email },
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: "1d",
					}
				);
				return ResponseHandler(res, {
					httpStatus: HttpStatus.OK,
					message: "succsess",
					data: { accessToken },
				});
			}
		);
	} catch (error) {
		return ResponseHandler(res, {
			httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};

exports.authLogut = async (req, res, next) => {
	const refreshToken = req.cookies.refreshToken;

	try {
		if (!refreshToken)
			return ResponseHandler(res, {
				httpStatus: HttpStatus.UNAUTHORIZED,
				message: "UnAuthorized",
			});

		const singleUser = await req.service.refreshTokenDB({
			token: refreshToken,
		});

		if (!singleUser)
			return ResponseHandler(res, {
				httpStatus: HttpStatus.FORBIDDEN,
				message: "FORBIDDEN",
			});
		await req.service.updateToken({
			refreshToken: null,
			userId: singleUser.id,
		});

		res.clearCookie("refreshToken");

		return ResponseHandler(res, {
			httpStatus: HttpStatus.OK,
			message: "succsess",
		});
	} catch (error) {
		return ResponseHandler(res, {
			httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};

exports.authRegister = async (req, res, next) => {
	const { password, lastName, firstName, username, email } = req.body;
	try {
		const response = await req.service.serviceRegister({
			email: email,
			username: username,
			firstName: firstName,
			lastName: lastName,
			password: password,
		});
		return ResponseHandler(res, {
			httpStatus: HttpStatus.OK,
			message: "succsess",
			data: response,
		});
	} catch (error) {
		return ResponseHandler(res, {
			httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
			message: error.message,
		});
	}
};
