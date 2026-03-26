/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Автентифікація користувачів
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Користувач створений
 *       409:
 *         description: Email вже використовується
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Вхід в систему
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішний вхід, токени встановлені у cookies
 *       401:
 *         description: Невірні дані
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Вихід з системи (видалення сесії та cookies)
 *     tags: [Auth]
 *     responses:
 *       204:
 *         description: Успішний вихід
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Оновлення сесії через refreshToken (cookie)
 *     tags: [Auth]
 *     security: []
 *     responses:
 *       200:
 *         description: Сесію оновлено, нові cookies встановлені
 *       401:
 *         description: Невалідний або відсутній refresh token
 */
