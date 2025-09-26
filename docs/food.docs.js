/**
 * @openapi
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60c72b2f5f1b2c001c8e4b8a
 *         name:
 *           type: string
 *           example: Cream Chicken
 *         description:
 *           type: string
 *           example: It's the most delicious chicken with creamy sauce and vegetables.
 *         image:
 *           type: string
 *           format: uri
 *           example: https://example.com/image.jpg
 *         price:
 *           type: number
 *           example: 14.99
 *         restaurant:
 *           type: string
 *           description: MongoDB ObjectId of the restaurant
 *           example: 60c72b2f5f1b2c001c8e4b7f
 *       required:
 *         - name
 *         - image
 *         - price
 *         - restaurant
 *
 * /foods:
 *   get:
 *     summary: Get all foods
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: List of all foods
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 *
 *   post:
 *     summary: Create a new food item and add it to a restaurant
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       201:
 *         description: Food created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "No restaurant found with this ID"
 *
 * /foods/{id}:
 *   get:
 *     summary: Get food by ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Food ID
 *     responses:
 *       200:
 *         description: Food found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Food not found
 *
 *   post:
 *     summary: Add food to user's cart
 *     security:
 *       - bearerAuth: []
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Food ID
 *     responses:
 *       200:
 *         description: Food added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Food not found
 *
 *   patch:
 *     summary: Update food by ID
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Food ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: Food updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Food not found
 *
 *   delete:
 *     summary: Delete food by ID
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Food ID
 *     responses:
 *       204:
 *         description: Food deleted successfully
 *       404:
 *         description: Food not found
 */
