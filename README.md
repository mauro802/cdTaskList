# CDTaskList

## Full-stack task management application built with **Next.js** (frontend), **NestJS** (backend), and **PostgreSQL**.

## 📁 Project Structure

- cdTaskList/
  - client/ # Next.js frontend
  - server/ # NestJS backend

---

## 🚀 Features

- Modern React (Next.js 15, React 19)
- API backend (NestJS 11, TypeORM, PostgreSQL)
- Authentication with JWT (register/login)
- CRUD operations for tasks (create, read, update, delete)
- Responsive UI with Tailwind CSS
- Typed with TypeScript (frontend and backend)
- Testing with Jest (backend)
- Centralized error handling

---

## ⚙️ Technologies Used

| Layer    | Stack                                 |
| -------- | ------------------------------------- |
| Frontend | Next.js, React, Tailwind CSS, Axios   |
| Backend  | NestJS, TypeORM, PostgreSQL, JWT, Joi |
| Language | TypeScript                            |
| Testing  | Jest, Supertest (backend)             |

---

## 🧩 Installation

### 1. Clone the repository

```
git clone https://github.com/yourusername/CDTaskList.git
cd CDTaskList
```

### 2. Setup the Backend

```
cd server
cp .env.example .env
# Edit .env and fill in your DB credentials and JWT secret

npm install
npm run start:dev

The backend will be available at http://localhost:3001 (or your configured port).
Make sure you have a local PostgreSQL database running.
```

### 3. Setup the Frontend

```
cd ../client
cp .env.example .env
# Set your API URL in .env (usually http://localhost:3000)

npm install
npm run dev

The frontend will be available at http://localhost:3000 (or your configured port).
```

## 🗂️ Environment Variables

### Backend (server/.env.example):

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=your_db_name
JWT_SECRET=your_jwt_secret

### Frontend (client/.env.example):

NEXT_PUBLIC_API_URL=http://localhost:3001

## 🗃️ Main Folders

### Backend

- server/
  - src/
    - auth/ # Authentication logic (JWT, guards, etc.)
    - tasks/ # Task CRUD and business logic
    - users/ # User management
    - app.module.ts
    - main.ts

### Frontend

- client/
  - src/
    - app/ # Next.js App Router structure
      - login/
      - register/
      - tasks/
    - components/ # Reusable UI components
    - lib/api/ # API abstraction (axios, endpoints)

## 📝 Usage

Register a new user and login.

Create, update, delete and filter tasks from the dashboard.

All task and user endpoints are secured with JWT authentication.

## 🧑‍💻 Author

### Developed by Mauro Zegarra

## 📄 License

This project is licensed as UNLICENSED.
