/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Recreation and travel spots
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
 *           type: string
 *         description: Filter by location type slug (e.g., more)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or description
 *     responses:
 *       200:
 *         description: Successfully retrieved paginated list of locations
 */

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Створити нову локацію (тільки авторизовані)
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
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
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *               address:
 *                 type: string
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
 *     responses:
 *       200:
 *         description: Detailed location data retrieved successfully
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
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
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
 *       403:
 *         description: Forbidden (not the author)
 *       404:
 *         description: Location not found
 */
