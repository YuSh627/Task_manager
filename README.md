# Task Manager Application

This is a full-stack task manager application built with React, Node.js, Express, and MySQL. 
The application allows users to register, log in, and manage their tasks (add, view, and delete tasks). 
It uses JWT for authentication.

## 1. Folder Structure

### 1.1 Client (Frontend)
```
client/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

### 1.2 Server (Backend)
```
server/
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── lib/
│   └── db.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── .env
├── index.js
└── package.json
```

## 2. Tech Stack

### 2.1 Frontend
- React
- Vite
- Axios
- Material-UI

### 2.2 Backend
- Node.js
- Express
- MySQL (hosted on Railway)
- JWT (JSON Web Token)

## 3. Setup Instructions

### 3.1 Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Task_manager.git
cd Task_manager
```

### 3.2 Setup the Backend
```bash
cd server
npm install
```

Create a `.env` file inside the server/ directory with the following content:
```
PORT=5000
DB_HOST="your-database-host"
DB_USER="your-database-username"
DB_PASSWORD="your-database-password"
DB_NAME="task_manager"
JWT_SECRET="your-jwt-secret"
```

```bash
npm start
```

### 3.3 Setup the Frontend
```bash
cd client
npm install
npm run dev
```

## 4. API Endpoints

### 4.1 Authentication
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Log in a user and receive a JWT
- `POST /auth/logout` – Log out the user

### 4.2 Tasks
- `GET /tasks` – Get all tasks for the logged-in user
- `POST /tasks` – Add a new task
- `DELETE /tasks/:id` – Delete a task by ID

## 5. Screenshots

### 5.1 Login Page
![Login Page](https://github.com/user-attachments/assets/68db9b57-3a41-4def-98c4-9535ecebcc80)

### 5.2 Register Page
![Register Page](https://github.com/user-attachments/assets/d2fa8792-a5aa-4b52-a7e3-f448728c40f0)

### 5.3 Task Management
![Task Management](https://github.com/user-attachments/assets/cad53473-085e-4dd3-afe3-a436591afec0)
