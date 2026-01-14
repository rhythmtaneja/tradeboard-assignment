# TradeBoard – Secure Trade Notes Dashboard

TradeBoard is a full-stack web application that allows users to securely manage personal trade notes through an authenticated dashboard.  
The project demonstrates frontend-backend integration, JWT-based authentication, secure password handling, and scalable project structure.

---

## 🚀 Features

- User registration & login (JWT authentication)
- Secure password hashing
- Protected dashboard routes
- User profile fetching
- Trade notes CRUD (Create, Read, Update, Delete)
- Search and filter trade notes
- Responsive UI
- Clean and scalable code structure

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Argon2 password hashing

---

## 🔐 Authentication Flow

1. User logs in with email and password
2. Backend verifies credentials and issues a JWT
3. Frontend stores JWT and attaches it to API requests
4. Protected routes validate JWT before allowing access

---

## 📦 Project Structure

### Backend
backend/
├── app/
│ ├── core/
│ ├── models/
│ ├── routes/
│ ├── schemas/
│ ├── database.py
│ └── main.py


### Frontend
frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── utils/
│ └── App.jsx

---

## ⚙️ Setup Instructions

### Backend

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs on: http://127.0.0.1:8000

### Frontend

cd frontend
npm install
npm run dev

Frontend runs on: http://localhost:5173


🔍 API Documentation

FastAPI automatically provides Swagger docs at:

http://127.0.0.1:8000/docs

🔒 Security Considerations

Passwords are securely hashed using Argon2

JWT tokens are validated for protected routes

User data is scoped to authenticated users only

Sensitive configuration should be moved to environment variables in production

📈 Scalability Notes (Production Considerations)

Replace SQLite with PostgreSQL

Store secrets using environment variables

Use HTTP-only cookies for JWT storage

Add refresh tokens

Add role-based access control if needed

Deploy frontend and backend separately



👤 Author

Built as part of a Frontend Developer Intern assignment.
