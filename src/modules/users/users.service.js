"use strict";

const { user } = require("@/models");

const serviceUserById = async (id) => {
	try {
		const response = await user.findOne({
			where: [{ id: parseInt(id) }],

			attributes: [
				"firstName",
				"lastName",
				"email",
				"username",
				"id",
				"password",
			],
		});

		return response;
	} catch (error) {
		return error.message;
	}
};

const serviceAllUser = async () => {
	console.log("first");
	try {
		const response = await user.findAll({});
		console.log(response, "response");
		return response;
	} catch (error) {
		return error.message;
	}
};

const serviceDeleteUser = async (id) => {
	try {
		const response = await user.destroy({
			where: {
				id: id,
			},
		});

		return response;
	} catch (error) {
		return error.message;
	}
};

const serviceUpdateUser = async (body, id) => {
	try {
		const response = await user.update(body, {
			where: {
				id: id,
			},
		});

		return response;
	} catch (error) {
		return error.message;
	}
};

const userService = () => {
	return Object.freeze({
		serviceUserById,
		serviceAllUser,
		serviceDeleteUser,
		serviceUpdateUser,
	});
};

const userInject = async (req, res, next) => {
	req.service = userService();
	next();
};

module.exports = userInject;
