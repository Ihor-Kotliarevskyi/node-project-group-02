/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управління користувачами
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Список всіх користувачів (з пагінацією)
 *     tags: [Users]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Номер сторінки
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Кількість користувачів на сторінці (максимум 50)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, articlesAmount]
 *           default: name
 *         description: Поле для сортування
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Напрямок сортування
 *     responses:
 *       200:
 *         description: Список користувачів успішно отримано
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 42
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       400:
 *         description: Помилка валідації параметрів
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Отримати дані поточного користувача
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/me:
 *   patch:
 *     summary: Оновити профіль поточного користувача
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 32
 *               avatarUrl:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Публічний профіль користувача за ID
 *     tags: [Users]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-f\d]{24}$'
 *         description: MongoDB ObjectId (24-символьний hex)
 *     responses:
 *       200:
 *         description: Public user data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid id format
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}/locations:
 *   get:
 *     summary: Список опублікованих локацій конкретного користувача
 *     tags: [Users]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: Paginated list of user's locations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationListResponse'
 *       400:
 *         description: Invalid id format
 *       404:
 *         description: User not found
 */
