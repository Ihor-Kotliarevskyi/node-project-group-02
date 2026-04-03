/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: Відгуки та оцінки користувачів
 */

/**
 * @swagger
 * /feedbacks/{locationId}:
 *   post:
 *     summary: Залишити відгук до локації
 *     tags: [Feedbacks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-f\d]{24}$'
 *         description: MongoDB ObjectId (24-символьний hex)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userName, rate, description]
 *             properties:
 *               userName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 32
 *                 example: "Петро Мельник"
 *               rate:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4.5
 *               description:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 1000
 *                 example: "Чудова атмосфера, дуже затишно!"
 *     responses:
 *       201:
 *         description: Feedback added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Location not found
 */

/**
 * @swagger
 * /feedbacks/{locationId}:
 *   get:
 *     summary: Отримати всі відгуки для конкретної локації
 *     tags: [Feedbacks]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-f\d]{24}$'
 *         description: MongoDB ObjectId (24-символьний hex)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *     responses:
 *       200:
 *         description: List of feedbacks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedbackListResponse'
 *       400:
 *         description: Invalid locationId format
 *       404:
 *         description: Location not found
 */
