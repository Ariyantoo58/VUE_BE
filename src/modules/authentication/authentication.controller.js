"use strict";

const { ResponseHandler, HttpStatus } = require("@/shared/index");
const {
	loginAuth,
	UpdateToken,
	RefreshTokenDB,
	serviceRegister,
} = require("./authentication.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAuthentication = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const singleUser = await loginAuth({
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

		await UpdateToken({
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

		const userRefresh = await RefreshTokenDB({
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

		const singleUser = await RefreshTokenDB({
			token: refreshToken,
		});

		if (!singleUser)
			return ResponseHandler(res, {
				httpStatus: HttpStatus.FORBIDDEN,
				message: "FORBIDDEN",
			});
		await UpdateToken({ refreshToken: null, userId: singleUser.id });

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

exports.ResetPasswords = async (req, res, next) => {
	const { email, password1, password2 } = req.body;
	try {
		const match = password1 === password2;
		if (!match)
			return ResponseHandler(res, {
				httpStatus: HttpStatus.NOT_FOUND,
				message: "Password tidak sama",
			});

		const userData = await getUserByEmail({
			email: email,
		});

		if (!userData[0])
			return ResponseHandler(res, {
				httpStatus: HttpStatus.FORBIDDEN,
				message: "FORBIDDEN",
			});
		await resetPasswords({
			password: password1,
			userId: userData[0].ID,
		});

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
		const response = await serviceRegister({
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
