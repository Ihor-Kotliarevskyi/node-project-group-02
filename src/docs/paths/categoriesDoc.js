/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Категорії — регіони та типи локацій
 */

/**
 * @swagger
 * /categories/regions:
 *   get:
 *     summary: Список всіх регіонів
 *     tags: [Categories]
 *     security: []
 *     responses:
 *       200:
 *         description: Масив регіонів
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id: { type: string }
 *                       name: { type: string }
 */

/**
 * @swagger
 * /categories/types:
 *   get:
 *     summary: Список всіх типів локацій
 *     tags: [Categories]
 *     security: []
 *     responses:
 *       200:
 *         description: Масив типів локацій
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id: { type: string }
 *                       name: { type: string }
 */
