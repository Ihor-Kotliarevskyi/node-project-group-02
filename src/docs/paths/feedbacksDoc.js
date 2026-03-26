/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: Відгуки про місця відпочинку
 */

/**
 * @swagger
 * /feedbacks/{locationId}:
 *   get:
 *     summary: Список відгуків для конкретної локації
 *     tags: [Feedbacks]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Пагінований список відгуків
 *       404:
 *         description: Локацію не знайдено
 */

/**
 * @swagger
 * /feedbacks/{locationId}:
 *   post:
 *     summary: Додати відгук до локації (тільки авторизовані)
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text, rating]
 *             properties:
 *               text:
 *                 type: string
 *                 minLength: 5
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Відгук додано
 *       401:
 *         description: Не авторизований
 *       404:
 *         description: Локацію не знайдено
 */
