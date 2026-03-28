/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Categories — regions and location types
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
 *         description: Successfully retrieved the list of regions
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
 *                       id:
 *                         type: string
 *                         example: "68d5213e0e6bcc357e9833b0"
 *                       region:
 *                         type: string
 *                         example: "Поділля"
 *                       slug:
 *                         type: string
 *                         example: "podillya"
 *                       level:
 *                         type: string
 *                         example: "регіональне"
 *                       note:
 *                         type: string
 *                         example: "Історико-географічна область на південному заході правобережної України."
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
 *         description: Successfully retrieved the list of location types
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
 *                       id:
 *                         type: string
 *                         example: "68d51e2e0e6bcc357e98339b"
 *                       type:
 *                         type: string
 *                         example: "Озеро"
 *                       slug:
 *                         type: string
 *                         example: "ozero"
 *                       shortDescription:
 *                         type: string
 *                         example: "Спокійний відпочинок, риболовля та водні розваги."
 */
