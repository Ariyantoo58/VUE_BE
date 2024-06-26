"use strict";

const { user } = require("@/models");
const { where } = require("sequelize");

exports.loginAuth = async ({ email }) => {
	try {
		const response = await user.findOne({
			attributes: [
				"firstName",
				"lastName",
				"token",
				"email",
				"password",
				"id",
				"username",
			],
			where: [
				{
					email: email,
				},
			],
		});
		return response;
	} catch (error) {
		return error.message;
	}
};

exports.UpdateToken = async ({ userId, refreshToken }) => {
	try {
		const response = await user.update(
			{
				token: refreshToken,
			},
			{
				where: [
					{
						id: userId,
					},
				],
			}
		);
		return response;
	} catch (error) {
		return error.message;
	}
};

exports.RefreshTokenDB = async ({ refreshToken }) => {
	try {
		const response = await user.findOne({
			attributes: ["firstName", "lastName", "token", "email", "id"],
			where: [
				{
					token: refreshToken,
				},
			],
		});
		return response;
	} catch (error) {
		return error.message;
	}
};

exports.serviceRegister = async ({
	email,
	username,
	lastName,
	firstName,
	password,
}) => {
	try {
		const response = await user.create({
			email: email,
			username: username,
			firstName: firstName,
			lastName: lastName,
			password: password,
		});
		return response;
	} catch (error) {
		return error.message;
	}
};
