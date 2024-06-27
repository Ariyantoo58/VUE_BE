"use strict";

const { ResponseHandler, HttpStatus } = require("@/shared/index");

const client = require("@/config/redis");

exports.getUsers = async (req, res) => {
	const { id } = req.params;
	const cacheKey = `user${id}`;
	try {
		const cachedData = await client.get(cacheKey);

		if (cachedData) {
			console.log("Data retrieved from Redis cache");
			return ResponseHandler(res, {
				httpStatus: HttpStatus.OK,
				data: JSON.parse(cachedData), // Parse the cached JSON data
			});
		} else {
			const users = await req.service.serviceUserById(id);

			if (users) {
				await client.setEx(cacheKey, 3600, JSON.stringify(users)); // Cache the data for 1 hour
				console.log("Data retrieved from MySQL and cached in Redis");
				return ResponseHandler(res, {
					httpStatus: HttpStatus.OK,
					data: users,
				});
			} else {
				return ResponseHandler(res, {
					httpStatus: HttpStatus.NOT_FOUND,
					message: "User not found",
				});
			}
		}
	} catch (error) {
		console.error("Error fetching user data:", error);
		return ResponseHandler(res, {
			httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal server error",
		});
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await req.service.serviceAllUser();

		return ResponseHandler(res, { httpStatus: HttpStatus.OK, data: users });
	} catch (error) {
		return ResponseHandler(res, {
			httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal server error",
		});
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const users = await req.service.serviceDeleteUser(id);

		return ResponseHandler(res, { httpStatus: HttpStatus.OK, data: users });
	} catch (error) {
		return ResponseHandler(res, {
			httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal server error",
		});
	}
};

exports.UpdateUser = async (req, res) => {
	const { id } = req.params;
	try {
		const users = await req.service.serviceUpdateUser(req.body, id);

		return ResponseHandler(res, { httpStatus: HttpStatus.OK, data: users });
	} catch (error) {
		return ResponseHandler(res, {
			httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal server error",
		});
	}
};
