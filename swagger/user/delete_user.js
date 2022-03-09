/**
 * @swagger
 * /user/{id}:
 *  delete:
 *    summary: Remove the user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The user id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: The user was deleted
 *      404:
 *        description: The user was not found
 */