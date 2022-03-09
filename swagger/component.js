/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
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
 *    Admin:
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
 *          description: The username of the admin
 *        password:
 *          type: string
 *          description: The password of the admin
 *        name:
 *          type: string
 *          description: The name of the admin
 *        email:
 *          type: string
 *          description: The email of the admin
 *      example:
 *        username: admin
 *        name: KaiTou
 *        email: admin@gmail.com
 */