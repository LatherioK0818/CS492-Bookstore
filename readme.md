# 📚 Bookstore Management System – Full Stack Project

Welcome to the full-stack Bookstore Management System, a web application designed to modernize rare book inventory operations. This system includes both backend and frontend components, supporting full CRUD operations, user management, and role-based access control.

---

## 🧰 Technologies Used

### Backend:
- Python 3.10+
- Django 5.x
- Django REST Framework
- PostgreSQL or SQLite (default)
- JWT (SimpleJWT for authentication)

### Frontend:
- HTML, CSS, JavaScript
- React.js (preferred)
- Axios (for API calls)
- Bootstrap or TailwindCSS

---

## ⚙️ Project Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/CJ-Peter/CS492-Bookstore
cd bookstore-project
```

---

### 🔧 Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # Optional
python manage.py runserver
```

Server will be running at: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will be running at: [http://localhost:3000/](http://localhost:3000/)

---

## 🔗 API Endpoints (Base URL: /api/)

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| GET    | /books/          | List all books                     |
| POST   | /books/          | Create a new book                  |
| GET    | /books/{id}/     | Retrieve a specific book           |
| PUT    | /books/{id}/     | Update a book                      |
| DELETE | /books/{id}/     | Delete a book                      |
| POST   | /token/          | Obtain JWT access & refresh token |
| POST   | /token/refresh/  | Refresh JWT access token          |


---

## ✅ Features Implemented

### 📚 Book Management
- Create, edit, delete, and search books
- ISBN, price, quantity, subject fields

### 👥 User Authentication
- JWT-based login system
- Role-based dashboard access (admin, employee)

### 🛒 Order System (Sprint 2)
- Customers place orders
- Employees track inventory
- Admin can view order analytics

### 💻 UI/UX
- Responsive React frontend
- Protected routes with user roles

---

## 🧪 Testing
- Backend tested with Postman and Django test client
- Frontend tested with React Testing Library & Jest

---

## 🧑‍🤝‍🧑 Team Members & Roles

| Name               | Role                  |
|--------------------|------------------------|
| Latherio Kidd      | Backend Developer / Full Stack Lead |
| Johnathan Kavanaugh| Front-End Developer (UI/UX & React) |
| Cody Peterson      | Product Owner (Requirements, Stories) |
| Larry Hezekiah     | Scrum Master / QA & Testing Lead |

---

## 📬 Contact
- 📧 Email: your.email@domain.com
- 🌐 GitHub: [Bookstore](https://github.com/CJ-Peter/CS492-Bookstore)

---

## 📄 License
This project is built for educational purposes. Licensing info TBD.

---
