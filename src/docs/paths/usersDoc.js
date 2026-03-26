/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управління користувачами
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Отримати дані поточного користувача
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Дані поточного користувача
 *       401:
 *         description: Не авторизований
 */

/**
 * @swagger
 * /users/me:
 *   patch:
 *     summary: Оновити профіль поточного користувача
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Профіль оновлено
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
 *     responses:
 *       200:
 *         description: Публічні дані користувача
 *       404:
 *         description: Користувача не знайдено
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
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Пагінований список локацій
 */
