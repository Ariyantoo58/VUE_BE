"use strict";

const { user } = require("@/models");

exports.serviceUserById = async (id) => {
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

exports.serviceAllUser = async () => {
	try {
		const response = await user.findAll({});

		return response;
	} catch (error) {
		return error.message;
	}
};

exports.serviceDeleteUser = async (id) => {
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

exports.serviceUpdateUser = async (body, id) => {
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
