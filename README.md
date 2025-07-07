# 📝 TodoStack

A full-featured and secure **Todo App** built with **Node.js**, **Express**, and **MongoDB**, designed for productivity, security, and scalability.

👉 **Live Demo:** [https://todostack-six.vercel.app](https://todostack-six.vercel.app)

---

## 🚀 Features

- ✅ Create, update, and delete tasks
- 🏷️ Tag system for categorization
- ⏰ Smart Reminders with Email Notifications
- 📁 Attach images to todos (stored on Cloudinary)
- 🗂️ Archived & soft-deleted tasks
- 🔎 Filtering, search, and sorting API
- 🧼 Clean input (XSS, NoSQL injection protection)
- 🔒 Secure (Rate Limiting, CORS, Helmet, etc.)
- 📄 Well-structured RESTful API

---

## 🛠️ Tech Stack

| Layer        | Tech                                    |
|--------------|------------------------------------------|
| Backend      | Node.js, Express.js                     |
| Database     | MongoDB, Mongoose                       |
| Auth         | JWT, Refresh Tokens                     |
| Security     | Helmet, Rate Limiting, XSS Clean, CORS  |
| File Uploads | Cloudinary                              |
| Email        | Nodemailer                              |
| Task Queue   | Agenda.js                               |
| Deployment   | Vercel (Frontend), Render/Railway (API) |

---


## 🧪 API Examples

> 🔐 **Note**: All routes are protected. Add the following header:
```
Authorization: Bearer <your_token>
```

---

### 🔐 Login

```http
POST /api/v1/users/log-in
```

**Request**:
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response**:
```json
{
  "token": "your_jwt_token"
}
```

---

### ✅ Create Todo

```http
POST /api/v1/todo
```

**Request**:
```json
{
  "title": "Finish project",
  "description": "Complete API section",
  "dueDate": "2025-07-08T10:00:00.000Z"
}
```

**Response**:
```json
{
    "status": "success",
    "message": "Todo created successfully",
    "todo": {
        "_id": "686b19457edd4bfcbf9ac630",
        "userId": "686b164292ae94b2a9417d76",
        "title": "My fifth todo",
        "description": "This is a sample of description",
        "dueDate": "2025-07-10T00:00:00.000Z",
        "isCompleted": false,
        "isPinned": false,
        "photo": [
            {
                "secure_url": "https://res.cloudinary.com/dwqhqw4ep/image/upload/v1751849284/toDoMedia/686b164292ae94b2a9417d76/dpyz8ootdpkvnqzgdnbf.jpg",
                "public_id": "toDoMedia/686b164292ae94b2a9417d76/dpyz8ootdpkvnqzgdnbf",
                "_id": "686b19457edd4bfcbf9ac631"
            }
        ],
        "tag": {
            "_id": "686b17e592ae94b2a9417d8b",
            "name": "very fast",
            "color": "#ff8801"
        },
        "reminder": null,
        "reminderSent": false,
        "createdAt": "2025-07-07T00:48:05.525Z",
        "updatedAt": "2025-07-07T00:48:05.525Z",
        "__v": 0
    },
    "timestamp": "2025-07-07T00:48:06.022Z"
}
```

---

### 📋 Get All Todos

```http
GET /api/v1/todo
```

**Response**:
```json
{
    "status": "success",
    "message": "Todos retrieved successfully",
    "todos": [
        {
            "_id": "686b19457edd4bfcbf9ac630",
            "userId": "686b164292ae94b2a9417d76",
            "title": "My fifth todo",
            "description": "This is a sample of description",
            "dueDate": "2025-07-10T01:00:00.000Z",
            "isCompleted": true,
            "isPinned": false,
            "photo": [
                {
                    "secure_url": "https://res.cloudinary.com/dwqhqw4ep/image/upload/v1751849284/toDoMedia/686b164292ae94b2a9417d76/dpyz8ootdpkvnqzgdnbf.jpg",
                    "public_id": "toDoMedia/686b164292ae94b2a9417d76/dpyz8ootdpkvnqzgdnbf",
                    "_id": "686b19457edd4bfcbf9ac631"
                }
            ],
            "tag": "686b17e592ae94b2a9417d8b",
            "reminder": null,
            "reminderSent": false,
            "createdAt": "2025-07-07T00:48:05.525Z",
            "updatedAt": "2025-07-07T00:50:36.505Z"
        },
        {
            "_id": "686b18a292ae94b2a9417da6",
            "userId": "686b164292ae94b2a9417d76",
            "title": "My Updated todo",
            "description": "This is a sample of description",
            "dueDate": "2025-07-10T01:00:00.000Z",
            "isCompleted": true,
            "isPinned": true,
            "photo": [
                {
                    "secure_url": "https://res.cloudinary.com/dwqhqw4ep/image/upload/v1751849121/toDoMedia/686b164292ae94b2a9417d76/nmkwhbp3xugmnbd6gmex.jpg",
                    "public_id": "toDoMedia/686b164292ae94b2a9417d76/nmkwhbp3xugmnbd6gmex",
                    "_id": "686b18a292ae94b2a9417da7"
                }
            ],
            "tag": "686b17e592ae94b2a9417d8b",
            "reminderSent": false,
            "createdAt": "2025-07-07T00:45:22.521Z",
            "updatedAt": "2025-07-07T00:49:30.173Z"
        }
    ],
    "count": 2,
    "timestamp": "2025-07-07T00:50:36.863Z"
}
```

---

### ✏️ Update Todo

```http
PUT /api/v1/todo/:id
```

**Request**:
```json
{
  "title": "Updated title",
  "completed": true
}
```

**Response**:
```json
{
    "status": "success",
    "message": "Todo updated successfully",
    "todo": {
        "_id": "686b18a292ae94b2a9417da6",
        "userId": "686b164292ae94b2a9417d76",
        "title": "My Updated todo",
        "description": "This is a sample of description",
        "dueDate": "2025-07-10T00:00:00.000Z",
        "isCompleted": false,
        "isPinned": false,
        "photo": [
            {
                "secure_url": "https://res.cloudinary.com/dwqhqw4ep/image/upload/v1751849121/toDoMedia/686b164292ae94b2a9417d76/nmkwhbp3xugmnbd6gmex.jpg",
                "public_id": "toDoMedia/686b164292ae94b2a9417d76/nmkwhbp3xugmnbd6gmex",
                "_id": "686b18a292ae94b2a9417da7"
            }
        ],
        "tag": {
            "_id": "686b17e592ae94b2a9417d8b",
            "name": "very fast",
            "color": "#ff8801"
        },
        "reminderSent": false,
        "createdAt": "2025-07-07T00:45:22.521Z",
        "updatedAt": "2025-07-07T00:48:45.725Z",
        "__v": 0
    },
    "timestamp": "2025-07-07T00:48:46.253Z"
}
```

---

### ❌ Delete Todo

```http
DELETE /api/v1/todo/:id
```

**Response**:
```json
{
    "status": "success",
    "message": "Todo and associated images deleted successfully",
    "timestamp": "2025-07-07T01:05:20.951Z"
}
```

---

### ⏰ Add Reminder

```http
POST /api/v1/todo/:todoId/reminder
```

**Request**:
```json
{
  "remindAt": "2025-07-06T23:10:54.444Z",
  "message": "Don't forget to review the code"
}

```

**Response**:
```json
{
    "status": "success",
    "message": "Reminder created successfully",
    "reminder": {
        "userId": "686b164292ae94b2a9417d76",
        "todoId": "686b19457edd4bfcbf9ac630",
        "remindAt": "2026-07-06T23:10:54.444Z",
        "message": "Don't forget to review the code",
        "_id": "686b1d915c9ccf36804a972e",
        "createdAt": "2025-07-07T01:06:25.907Z",
        "updatedAt": "2025-07-07T01:06:25.907Z",
        "__v": 0
    },
    "timestamp": "2025-07-07T01:06:26.081Z"
}
```

---

## ⚙️ Installation & Usage

```bash
# 1. Clone the repository
git clone https://github.com/your-username/todostack.git
cd todostack

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env
# Fill in the required values (MongoDB URI, JWT secret, Cloudinary, email, etc.)

# 4. Run the development server
npm run dev
```

> 📌 The frontend is deployed on Vercel, and the backend runs on Node.js + MongoDB.

---

## 📁 API Structure

```
/api/v1/users      → Auth & user profile
/api/v1/tags       → Manage tags
/api/v1/todo       → Todos with reminders, images, archiving
```

✅ All routes are protected with JWT-based authentication.

---

## 📬 Postman API Documentation

You can explore and test the full TodoStack API using the official Postman docs below:

👉 [View Postman Documentation](https://documenter.getpostman.com/view/42346862/2sB34cp2vf)

> 🧪 Includes all available endpoints:  
> Users, Todos, Tags, Reminders, Auth, and more.

---

## 🌐 Live Demo

> Try the live app:  
👉 [https://todostack-six.vercel.app](https://todostack-six.vercel.app)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

- **Name:** Mina Hany  
- **Backend Developer | Node.js & MongoDB**

---
