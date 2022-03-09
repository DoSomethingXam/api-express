/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user
 *        username:
 *          type: string
 *          description: The username of the user
 *        password:
 *          type: string
 *          description: The password of the user
 *        name:
 *          type: string
 *          description: The name of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        phone:
 *          type: string
 *          description: The phone number of the user
 *        date_of_birth:
 *          type: string
 *          format: date
 *          description: The date of birth of the user
 *        avatar:
 *          type: string
 *          description: The avatar of the user
 *      example:
 *        username: user
 *        name: John Doe
 *        email: user@gmail.com
 *        phone: '0391234567'
 *        date_of_birth: 01-01-1971
 *        avatar: user.png
 */

/**
 * @swagger
 * /user:
 *  get:
 *    summary: Return the list of all the users
 *    tags: [Users]
 *    parameters:
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