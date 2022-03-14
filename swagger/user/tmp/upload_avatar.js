/**
 * @swagger
 * /user/avatar/upload:
 *  post:
 *    summary: Upload the avatar of the user
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              avatar:
 *                type: string
 *                format: base64
 *          encoding:
 *            avatar:
 *              contentType: image/png, image/jpeg, image/jpg
 *    responses:
 *      200:
 *        description: The avatar upload was successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Some error happened
 */