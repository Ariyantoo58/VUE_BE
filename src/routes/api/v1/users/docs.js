/** GET Methods */

/**
 * @openapi
 * '/api/v1/users':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get All users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *     components:
 *        securitySchemes:
 *          bearerAuth:
 *            type: http
 *            scheme: bearer
 *            bearerFormat: JWT
 */

/**
 * @openapi
 * '/api/v1/users/{id}':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get a user by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *     components:
 *        securitySchemes:
 *          bearerAuth:
 *            type: http
 *            scheme: bearer
 *            bearerFormat: JWT
 */

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/users/{id}':
 *  put:
 *     tags:
 *     - Users
 *     summary: Modify a user
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *                default: ''
 *              lastName:
 *                type: string
 *                default: ''
 *              userName:
 *                type: string
 *                default: ''
 *              email:
 *                type: string
 *                default: ''
 *              password:
 *                type: string
 *                default: ''
 *     responses:
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

/** DELETE Methods */
/**
 * @openapi
 * '/api/v1/users/{id}':
 *  delete:
 *     tags:
 *     - Users
 *     summary: Delete a user by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
