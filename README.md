<div align="center">

# 🗺️ RelaxMap — Backend API

**REST API сервер для платформи пошуку місць відпочинку в Україні**

[![Node.js](https://img.shields.io/badge/Node.js-ESM-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Swagger](https://img.shields.io/badge/Docs-Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)](https://swagger.io)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)

</div>

---

## 📋 Зміст

- [Про проєкт](#-про-проєкт)
- [Технологічний стек](#-технологічний-стек)
- [Архітектура](#-архітектура)
- [API Endpoints](#-api-endpoints)
- [Моделі даних](#-моделі-даних)
- [Встановлення](#-встановлення)
- [Змінні середовища](#-змінні-середовища)
- [Запуск](#-запуск)
- [Документація Swagger](#-документація-swagger)

---

## 🌿 Про проєкт

**RelaxMap** — це платформа для відкриття та обміну місцями відпочинку по всій Україні. Даний репозиторій містить серверну частину застосунку: RESTful API, побудоване на Node.js + Express з MongoDB як базою даних.

### Ключові можливості

- 🔐 **Автентифікація** — реєстрація / вхід / вихід з cookie-based сесіями та refresh-токенами
- 📍 **Локації** — повний CRUD для місць відпочинку з фільтрацією, пагінацією та пошуком
- 💬 **Відгуки** — система коментарів і рейтингів для кожної локації
- 🗂️ **Категорії** — довідники регіонів і типів локацій
- 👤 **Профіль** — управління обліковим записом, аватар через Cloudinary
- 📄 **Swagger UI** — інтерактивна документація API

---

## 🛠️ Технологічний стек

| Шар | Технологія |
|-----|-----------|
| Runtime | Node.js (ESM modules) |
| Framework | Express 5 |
| База даних | MongoDB + Mongoose 9 |
| Автентифікація | JWT + Cookie sessions |
| Валідація | Celebrate (Joi) |
| Завантаження файлів | Multer + Cloudinary |
| Логування | Pino + pino-http |
| Документація | Swagger (swagger-jsdoc + swagger-ui-express) |
| Хешування паролів | bcrypt |
| Лінтер | ESLint |
| Dev сервер | Nodemon |

---

## 🏗️ Архітектура

```
src/
├── controllers/          # Обробники HTTP-запитів
│   ├── authController.js
│   ├── usersController.js
│   ├── locationsController.js
│   ├── categoriesController.js
│   └── feedbacksController.js
│
├── services/             # Бізнес-логіка та робота з БД
│   ├── authService.js
│   ├── usersService.js
│   ├── locationsService.js
│   ├── categoriesService.js
│   └── feedbacksService.js
│
├── models/               # Mongoose-схеми
│   ├── user.js
│   ├── location.js
│   ├── feedback.js
│   ├── session.js
│   ├── region.js
│   └── locationType.js
│
├── routes/               # Маршрути Express
│   ├── authRoutes.js
│   ├── usersRoutes.js
│   ├── locationsRoutes.js
│   ├── categoriesRoutes.js
│   └── feedbacksRoutes.js
│
├── middleware/           # Проміжне ПЗ
│   ├── authenticate.js   # JWT / cookie автентифікація
│   ├── multer.js         # Завантаження файлів
│   ├── logger.js         # Pino HTTP логер
│   ├── errorHandler.js   # Глобальний обробник помилок
│   └── notFoundHandler.js
│
├── validations/          # Celebrate/Joi схеми валідації
│   ├── authValidation.js
│   ├── usersValidation.js
│   ├── locationsValidation.js
│   └── feedbacksValidation.js
│
├── docs/                 # Swagger-специфікація
│   ├── swaggerConfig.js
│   └── paths/
│       ├── authDoc.js
│       ├── usersDoc.js
│       ├── locationsDoc.js
│       ├── categoriesDoc.js
│       └── feedbacksDoc.js
│
├── constants/            # Константи (часові інтервали тощо)
│   └── time.js
│
├── db/                   # Підключення до MongoDB
│   └── connectMongoDB.js
│
└── server.js             # Точка входу
```

---

## 📡 API Endpoints

### 🔑 Auth — `/auth`

| Метод | Шлях | Опис | Auth |
|-------|------|------|------|
| `POST` | `/auth/register` | Реєстрація нового користувача | — |
| `POST` | `/auth/login` | Вхід в обліковий запис | — |
| `POST` | `/auth/logout` | Вихід із сесії | — |
| `POST` | `/auth/refresh` | Оновлення access-токена | — |

### 👤 Users — `/users`

| Метод | Шлях | Опис | Auth |
|-------|------|------|------|
| `GET` | `/users/me` | Отримати власний профіль | ✅ |
| `PATCH` | `/users/me` | Оновити профіль / аватар | ✅ |
| `GET` | `/users/:id` | Публічний профіль користувача | — |
| `GET` | `/users/:id/locations` | Локації конкретного користувача | — |

### 📍 Locations — `/locations`

| Метод | Шлях | Опис | Auth |
|-------|------|------|------|
| `GET` | `/locations` | Список локацій (з фільтрами та пагінацією) | — |
| `POST` | `/locations` | Створити нову локацію | ✅ |
| `GET` | `/locations/:id` | Деталі локації | — |
| `PATCH` | `/locations/:id` | Оновити локацію | ✅ |

### 💬 Feedbacks — `/feedbacks`

| Метод | Шлях | Опис | Auth |
|-------|------|------|------|
| `GET` | `/feedbacks/:locationId` | Відгуки для локації (пагінація) | — |
| `POST` | `/feedbacks/:locationId` | Залишити відгук | ✅ |

### 🗂️ Categories — `/categories`

| Метод | Шлях | Опис | Auth |
|-------|------|------|------|
| `GET` | `/categories/regions` | Список регіонів України | — |
| `GET` | `/categories/types` | Типи локацій | — |

---

## 📦 Моделі даних

### User
```js
{
  name:           String   // 2–32 символи
  email:          String   // унікальний, нижній регістр
  password:       String   // bcrypt-хеш, 8–128 символів (не повертається в JSON)
  avatarUrl:      String   // URL до Cloudinary
  articlesAmount: Number   // кількість опублікованих локацій
  createdAt / updatedAt
}
```

### Location
```js
{
  name:        String   // 3–96 символів
  description: String   // 20–6000 символів
  image:       String   // головне фото (URL)
  region:      String   // slug регіону
  locationType: String  // тип локації
  ownerId:     ObjectId → User
  coordinates: { lat: Number, lon: Number }
  rate:        Number   // 0–5 (середній рейтинг)
  feedbacksId: [ObjectId → Feedback]
  isPublished: Boolean
  createdAt / updatedAt
}
```

### Feedback
```js
{
  userName:     String
  description:    String
  rate:     Number   // 1–5
  createdAt / updatedAt
}
```

---

## 🚀 Встановлення

### Вимоги

- Node.js `v18+`
- MongoDB Atlas або локальний MongoDB
- Cloudinary акаунт (для зображень)
- SMTP-сервер (для email-нотифікацій)

### Кроки

```bash
# 1. Клонувати репозиторій
git clone https://github.com/Ihor-Kotliarevskyi/node-project-group-02.git
cd node-project-group-02

# 2. Встановити залежності
npm install

# 3. Створити файл .env на основі прикладу
cp .env.example .env
# Заповнити .env своїми значеннями (див. нижче)
```

---

## ⚙️ Змінні середовища

Скопіюйте `.env.example` у `.env` і заповніть значення:

```env
# Сервер
PORT=5000
APP_DOMAIN=http://localhost:5000
FRONTEND_DOMAIN=http://localhost:3000

# База даних
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>

# JWT
JWT_SECRET=your_super_secret_key

# Cloudinary (для завантаження зображень)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMTP (для email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASSWORD=your_app_password
```

---

## ▶️ Запуск

```bash
# Режим розробки (з hot-reload через nodemon)
npm run dev

# Сервер запуститься на http://localhost:5000
# Swagger UI буде доступний на http://localhost:5000/api-docs
```

---

## 📄 Документація Swagger

Після запуску сервера інтерактивна документація API доступна за адресою:

```
http://localhost:5000/api-docs
```

Документація дозволяє переглядати всі ендпоінти, схеми запитів/відповідей та виконувати тестові запити прямо в браузері.

---

<div align="center">

Розроблено командою **Group 02** · [GitHub](https://github.com/Ihor-Kotliarevskyi/node-project-group-02)

</div>
