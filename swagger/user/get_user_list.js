/**
 * @swagger
 * /user:
 *  get:
 *    summary: Return the list of all the users
 *    tags: [Users]
 *    parameters:
 *      - in: query
 *        name: limit
 *        description: The limit number user per page
 *        schema:
 *          type: integer
 *          format: int64
 *      - in: query
 *        name: page
 *        description: The page of list user
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *      - in: query
 *        name: username
 *        description: The username for query
 *        schema:
 *          type: string
 *      - in: query
 *        name: name
 *        description: The name for query
 *        schema:
 *          type: string
 *      - in: query
 *        name: phone
 *        description: The phone number for query
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: The list of the users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */