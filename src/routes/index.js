"use strict";

const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: Integer
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first name of the User
 *  	   lastName:
 *           type: string
 *           description: The last name of the User
 * 		   username:
 *           type: string
 *           description: The username of the User
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the User
 *         password:
 *           type: string
 *           description: The password of the User
 *         createdAt:
 *           type: string
 *           description: The date created of the User
 *         UpdatedAt:
 *           type: string
 *           description: The date updated of the User
 *       example:
 *         id: 3
 *         firstName: Pojok
 * 		   lastName : Code
 * 		   username: pojok123
 *         email: code@example.com
 * 		   password: 123456,
 * 		   createdAt: "01/05/2024"
 * 		   updatedAt: "01/05/2024"
 */

/**
 * @swagger
 * tags:
 *   name: users
 *   description: The User API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: The list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */

router.use("/api", require("./api"));

module.exports = router;
