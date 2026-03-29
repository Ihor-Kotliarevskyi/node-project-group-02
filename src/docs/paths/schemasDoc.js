/**
 * @swagger
 * components:
 *   schemas:
 *     
 *     # ========== USER SCHEMAS ==========
 *     
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68d5213e0e6bcc357e9833b0"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 32
 *           example: "Петро Мельник"
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 64
 *           example: "user@example.com"
 *         avatar:
 *           type: string
 *           format: uri
 *           nullable: true
 *           example: "https://example.com/avatar.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-20T14:22:00Z"
 *       required:
 *         - id
 *         - name
 *         - email
 *     
 *     UserPublic:
 *       type: object
 *       description: Публічна інформація про користувача (без email)
 *       properties:
 *         id:
 *           type: string
 *           example: "68d5213e0e6bcc357e9833b0"
 *         name:
 *           type: string
 *           example: "Петро Мельник"
 *         avatar:
 *           type: string
 *           format: uri
 *           nullable: true
 *           example: "https://example.com/avatar.jpg"
 *     
 *     # ========== AUTH SCHEMAS ==========
 *     
 *     Tokens:
 *       type: object
 *       description: Токени сесії (передаються в cookies, але можуть бути в тілі для інформації)
 *       properties:
 *         accessToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIs..."
 *         refreshToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIs..."
 *     
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Login successful"
 *         user:
 *           $ref: '#/components/schemas/User'
 *     
 *     RefreshResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Session refreshed"
 *     
 *     # ========== LOCATION SCHEMAS ==========
 *     
 *     Coordinates:
 *       type: object
 *       description: Географічні координати
 *       properties:
 *         lat:
 *           type: number
 *           minimum: -90
 *           maximum: 90
 *           example: 50.4501
 *         lon:
 *           type: number
 *           minimum: -180
 *           maximum: 180
 *           example: 30.5234
 *       required:
 *         - lat
 *         - lon
 *     
 *     Location:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68d5213e0e6bcc357e9833b1"
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 96
 *           example: "Синевир"
 *         locationType:
 *           type: string
 *           description: Slug типу локації
 *           example: "ozero"
 *         region:
 *           type: string
 *           description: Slug регіону
 *           example: "zakarpattya"
 *         description:
 *           type: string
 *           minLength: 20
 *           maxLength: 6000
 *           example: "Найбільше озеро Українських Карпат..."
 *         image:
 *           type: string
 *           format: uri
 *           example: "https://example.com/synevyr.jpg"
 *         coordinates:
 *           $ref: '#/components/schemas/Coordinates'
 *         ownerId:
 *           type: string
 *           description: ID власника локації
 *           example: "68d5213e0e6bcc357e9833b0"
 *         isPublished:
 *           type: boolean
 *           default: false
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - name
 *         - locationType
 *         - region
 *         - description
 *         - coordinates
 *     
 *     LocationListResponse:
 *       type: object
 *       description: Пагінований список локацій
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Location'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             total:
 *               type: integer
 *               example: 45
 *             totalPages:
 *               type: integer
 *               example: 5
 *             hasNext:
 *               type: boolean
 *               example: true
 *             hasPrev:
 *               type: boolean
 *               example: false
 *     
 *     # ========== FEEDBACK SCHEMAS ==========
 *     
 *     Feedback:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68d5213e0e6bcc357e9833b2"
 *         userId:
 *           type: string
 *           example: "68d5213e0e6bcc357e9833b0"
 *         userName:
 *           type: string
 *           example: "Петро Мельник"
 *         locationId:
 *           type: string
 *           example: "68d5213e0e6bcc357e9833b1"
 *         rate:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 4.5
 *         description:
 *           type: string
 *           example: "Чудове місце для відпочинку! Рекомендую."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-15T12:00:00Z"
 *     
 *     FeedbackListResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Feedback'
 *         locationId:
 *           type: string
 *           example: "68d5213e0e6bcc357e9833b1"
 *         averageRate:
 *           type: number
 *           example: 4.3
 *         totalCount:
 *           type: integer
 *           example: 12
 *     
 *     # ========== CATEGORY SCHEMAS ==========
 *     
 *     Region:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68d5213e0e6bcc357e9833b0"
 *         region:
 *           type: string
 *           example: "Поділля"
 *         slug:
 *           type: string
 *           example: "podillya"
 *         level:
 *           type: string
 *           example: "регіональне"
 *         note:
 *           type: string
 *           nullable: true
 *           example: "Історико-географічна область на південному заході правобережної України."
 *     
 *     LocationType:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "68d51e2e0e6bcc357e98339b"
 *         type:
 *           type: string
 *           example: "Озеро"
 *         slug:
 *           type: string
 *           example: "ozero"
 *         shortDescription:
 *           type: string
 *           nullable: true
 *           example: "Спокійний відпочинок, риболовля та водні розваги."
 *     
 *     CategoriesResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             oneOf:
 *               - $ref: '#/components/schemas/Region'
 *               - $ref: '#/components/schemas/LocationType'
 *     
 *     # ========== ERROR SCHEMAS ==========
 *     
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation error"
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "email"
 *               message:
 *                 type: string
 *                 example: "Invalid email format"
 *     
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Unauthorized"
 *         code:
 *           type: string
 *           example: "AUTH_ERROR"
 *     
 *     ConflictError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Email already in use"
 */

module.exports = {};