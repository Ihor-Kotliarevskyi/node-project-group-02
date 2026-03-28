/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and session management
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
 *                 maxLength: 32
 *                 example: "Петро Мельник"
 *               email:
 *                 type: string
 *                 format: email
 *                 maxLength: 64
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 maxLength: 128
 *                 example: "securePassword123"
 *               avatar:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/avatar.jpg"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error (invalid email, name too short, etc.)
 *       409:
 *         description: Conflict (email already in use)
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
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Login successful, session tokens set in cookies
 *       401:
 *         description: Unauthorized (invalid email or password)
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Вихід з системи (видалення сесії та cookies)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
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
 *         description: Session refreshed, new tokens set in cookies
 *       401:
 *         description: Invalid or missing refresh token
 */
