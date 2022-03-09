/**
 * @swagger
 * /user/login:
 *  post:
 *    summary: Return the JWT token when login
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Login success
 *      404:
 *        description: The user was not found
 *      409:
 *        description: Password was wrong
 */