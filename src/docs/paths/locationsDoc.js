/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Локації для відпочинку та подорожей
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
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filter by region slug (e.g., odeshchyna)
 *       - in: query
 *         name: locationType
 *         schema:
 *           oneOf:
 *             - type: string
 *             - type: array
 *               items:
 *                 type: string
 *         style: form
 *         explode: true
 *         description: "Filter by location type slug(s). Single value: `?locationType=more`. Multiple: `?locationType=more&locationType=ozero`"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, rate, name]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort direction
 *     responses:
 *       200:
 *         description: Successfully retrieved paginated list of locations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocationListResponse'
 *       400:
 *         description: Validation error (invalid query params)
 */

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Створити нову локацію (тільки авторизовані)
 *     description: Створює локацію та автоматично інкрементує `articlesAmount` поточного користувача.
 *     tags: [Locations]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, locationType, region, description, image, coordinates]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 96
 *               locationType:
 *                 type: string
 *                 description: Slug of the location type
 *               region:
 *                 type: string
 *                 description: Slug of the region
 *               description:
 *                 type: string
 *                 minLength: 20
 *                 maxLength: 6000
 *               image:
 *                 type: string
 *                 format: uri
 *                 description: Main image URL
 *               coordinates:
 *                 type: object
 *                 required: [lat, lon]
 *                 properties:
 *                   lat:
 *                     type: number
 *                     minimum: -90
 *                     maximum: 90
 *                   lon:
 *                     type: number
 *                     minimum: -180
 *                     maximum: 180
 *     responses:
 *       201:
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Validation error or invalid data
 *       401:
 *         description: Unauthorized
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
 *         schema:
 *           type: string
 *           pattern: '^[a-f\d]{24}$'
 *         description: MongoDB ObjectId (24-символьний hex)
 *     responses:
 *       200:
 *         description: Detailed location data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Invalid id format
 *       404:
 *         description: Location not found
 */

/**
 * @swagger
 * /locations/{id}:
 *   patch:
 *     summary: Редагування локації (тільки автор)
 *     tags: [Locations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-f\d]{24}$'
 *         description: MongoDB ObjectId (24-символьний hex)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 96
 *               description:
 *                 type: string
 *                 minLength: 20
 *                 maxLength: 6000
 *               locationType:
 *                 type: string
 *               region:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: uri
 *               isPublished:
 *                 type: boolean
 *               coordinates:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lon:
 *                     type: number
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Validation error or invalid id format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not the author)
 *       404:
 *         description: Location not found
 */

/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     summary: Видалення локації (тільки автор)
 *     description: Видаляє локацію та автоматично декрементує `articlesAmount` її автора.
 *     tags: [Locations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-f\d]{24}$'
 *         description: MongoDB ObjectId (24-символьний hex)
 *     responses:
 *       204:
 *         description: Location deleted successfully
 *       400:
 *         description: Invalid id format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not the author)
 *       404:
 *         description: Location not found
 */
