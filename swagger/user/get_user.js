/**
 * @swagger
 * /user/{id}:
 *  get:
 *    summary: Get the user by id
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The user id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: The user description by id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *        description: Not authenticated
 *      404:
 *        description: The user was not found
 *      409:
 *        description: Something was wrong
 */