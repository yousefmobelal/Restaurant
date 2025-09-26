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

//! Food
/**
 * @openapi
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - image
 *         - price
 *         - restaurant
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId of the food item
 *           example: "652f12c8a23b9b1a12d45c87"
 *         name:
 *           type: string
 *           description: Name of the food
 *           example: "Cream Chicken"
 *         description:
 *           type: string
 *           description: Short description of the food
 *           example: "Delicious chicken in creamy sauce with vegetables."
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the food image
 *           example: "https://example.com/images/cream-chicken.jpg"
 *         price:
 *           type: number
 *           description: Price of the food in USD
 *           example: 14.99
 *         restaurant:
 *           type: string
 *           description: MongoDB ObjectId of the restaurant this food belongs to
 *           example: "652f1280a23b9b1a12d45c81"
 */
