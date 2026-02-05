# 🔙 TaskBoard Backend API

The backend REST API for the Task Management System. Built with Node.js, Express, and MongoDB, it handles user authentication, session management via HTTP-Only cookies, and task CRUD operations with role-based access control (RBAC).

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JWT (JSON Web Tokens) stored in HTTP-Only Cookies
* **Security:** Bcrypt.js (Hashing), CORS, Helmet

---

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory and add the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager  # Or your MongoDB Atlas URL
JWT_SECRET=your_super_complex_secret_key
NODE_ENV=development
# CORS_ORIGIN=http://localhost:3000 (Optional: If you implement strict CORS)

🚀 Installation & Setup
Navigate to the server directory:


cd server
Install Dependencies:

npm install
Start Development Server:

npm run dev
Runs on http://localhost:5000 by default.

Start Production Server:
npm start

📡 API Endpoints
Method,Endpoint,Description,Access
POST,/api/auth/register,Register a new user,Public
POST,/api/auth/login,Login user & set cookie,Public
POST,/api/auth/logout,Clear session cookie,Private
GET,/api/auth/profile,Get current user info,Private

📝 Tasks
Method,Endpoint,Description,Access
GET,/api/tasks,Get tasks. • User: Own tasks only.• Admin: All tasks (Grouped).,Private
POST,/api/tasks,Create a new task,Private
DELETE,/api/tasks/:id,Delete a task. • User: Own tasks only.• Admin: Any task.,Owner/Admin

☁️ Deployment (Render)
When deploying to Render as a Web Service:

Root Directory: server

Build Command: npm install

Start Command: node server.js

Environment Variables: Add MONGO_URI, JWT_SECRET, and set NODE_ENV to production.

📂 Folder Structure
server/
├── config/         # Database connection logic
├── controllers/    # Request logic (Auth, Tasks)
├── middleware/     # Auth protection, Error handling
├── models/         # Mongoose Schemas (User, Task)
├── routes/         # API Route definitions
├── server.js       # Entry point
└── .env            # Environment variables (Not pushed to Git)