# 📚 Bookstore Management System – Backend (Django)

Welcome to the backend for the Bookstore Management System, built with **Django** and **Django REST Framework**. This system provides a RESTful API for managing book inventory, user roles, and orders in a rare bookstore.

---

## 🧰 Technologies Used
- Python 3.10+
- Django 5.x
- Django REST Framework
- PostgreSQL or SQLite (default)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/bookstore-backend.git
cd bookstore-backend
```

### 2. Create and Activate a Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create a Superuser (Optional)
```bash
python manage.py createsuperuser
```

### 6. Start the Server
```bash
python manage.py runserver
```

---

## 🔗 API Endpoints
All API routes are prefixed with `/api/`

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| GET    | /api/books/      | List all books                     |
| POST   | /api/books/      | Create a new book                  |
| GET    | /api/books/{id}/ | Retrieve a specific book           |
| PUT    | /api/books/{id}/ | Update a book                      |
| DELETE | /api/books/{id}/ | Delete a book                      |


---

## ✅ Features Implemented
- Book inventory management (CRUD)
- User authentication system (coming next)
- Role-based access (admin, employee, customer)
- Admin dashboard via Django admin

---

## 🔒 Coming Soon
- JWT Authentication (Login/Token)
- Order processing and tracking
- Shopping cart system
- API versioning and pagination

---

## 👨‍💻 Team Members
- Latherio Kidd (Backend Lead)
- Johnathan Kavanaugh (Frontend UI/UX)
- Cody Peterson (Product Owner)
- Larry Hezekiah (Scrum Master / QA)

---

## 📄 License
This project is for academic purposes. Licensing to be defined.

---

## 📬 Contact
For questions or collaboration:
**Email:** your.email@domain.com
**GitHub:** [your-org/bookstore-backend](https://github.com/your-org/bookstore-backend)

---
