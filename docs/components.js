//! User
/**
 * @openapi
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [Point]
 *           example: Point
 *         coordinates:
 *           type: array
 *           items:
 *             type: number
 *           example: [31.2357, 30.0444]
 *         address:
 *           type: string
 *           example: "Cairo, Egypt"
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65123abcde1234567890
 *         name:
 *           type: string
 *           example: Yousef Mohamed
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         phone:
 *           type: string
 *           example: "+201234567890"
 *         email:
 *           type: string
 *           format: email
 *           example: "yousef@example.com"
 *         isAdmin:
 *           type: boolean
 *           example: false
 *         favourites:
 *           type: array
 *           items:
 *             type: string
 *           example: ["65123abcde1234567890"]
 *         cart:
 *           type: array
 *           items:
 *             type: string
 *           example: ["65123abcde1234567890"]
 *     UserSignupInput:
 *       type: object
 *       required: [name, phone, email, password]
 *       properties:
 *         name:
 *           type: string
 *           example: "Yousef Mohamed"
 *         phone:
 *           type: string
 *           example: "+201234567890"
 *         email:
 *           type: string
 *           example: "yousef@example.com"
 *         password:
 *           type: string
 *           example: "password123"
 *         location:
 *           $ref: '#/components/schemas/Location'
 *     UserLoginInput:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "yousef@example.com"
 *         password:
 *           type: string
 *           example: "password123"
 */

//! Restaurant
/**
 * @openapi
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - categories
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId of the restaurant
 *         name:
 *           type: string
 *           example: "Pizza Hut"
 *         description:
 *           type: string
 *           example: "Famous pizza restaurant"
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Pizza", "Italian"]
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *               example: "Point"
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: [longitude, latitude]
 *               example: [31.2357, 30.0444]
 *             address:
 *               type: string
 *               example: "123 Nile Street, Cairo"
 *             description:
 *               type: string
 *               example: "Downtown branch"
 *         foods:
 *           type: array
 *           items:
 *             type: string
 *           description: List of Food IDs
 */
