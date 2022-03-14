/**
 * @swagger
 * /user:
 *  patch:
 *    summary: Update the user
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *              date_of_birth:
 *                type: string
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */