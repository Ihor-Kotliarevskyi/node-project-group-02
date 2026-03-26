/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Місця відпочинку
 */

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Список всіх локацій з фільтрацією та пагінацією
 *     tags: [Locations]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: region
 *         schema: { type: string }
 *         description: Фільтр за назвою регіону
 *       - in: query
 *         name: type
 *         schema: { type: string }
 *         description: Фільтр за типом локації
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Пошук за назвою/описом
 *     responses:
 *       200:
 *         description: Пагінований список локацій
 */

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Створити нову локацію (тільки авторизовані)
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, type, region, description, images]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 96
 *               type:
 *                 type: string
 *                 maxLength: 64
 *               region:
 *                 type: string
 *                 maxLength: 64
 *               description:
 *                 type: string
 *                 minLength: 20
 *                 maxLength: 6000
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Локацію створено
 *       400:
 *         description: Помилка валідації або файлу
 *       401:
 *         description: Не авторизований
 */

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Детальна інформація про локацію за ID
 *     tags: [Locations]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Дані локації
 *       404:
 *         description: Локацію не знайдено
 */

/**
 * @swagger
 * /locations/{id}:
 *   patch:
 *     summary: Редагування локації (тільки автор)
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Локацію оновлено
 *       403:
 *         description: Немає доступу
 *       404:
 *         description: Локацію не знайдено
 */
