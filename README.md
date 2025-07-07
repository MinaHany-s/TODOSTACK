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
