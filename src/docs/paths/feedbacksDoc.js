/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: User reviews and ratings
 */

/**
 * @swagger
 * /feedbacks/{locationId}:
 *   post:
 *     summary: Залишити відгук до локації
 *     tags: [Feedbacks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rate, description]
 *             properties:
 *               rate:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4.5
 *               description:
 *                 type: string
 *                 example: "Great atmosphere, very cozy!"
 *     responses:
 *       201:
 *         description: Feedback added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
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
 *     responses:
 *       200:
 *         description: List of feedbacks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userName:
 *                     type: string
 *                   rate:
 *                     type: number
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
