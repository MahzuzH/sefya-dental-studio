# 🦷 Dental App Report

A web-based dental reporting system that allows doctors/admins to manage patient data, create diagnosis reports, and share results with patients via QR code.

---

## 🚀 Features

### 👨‍⚕️ Admin / Doctor

- Login authentication (JWT-based)
- Manage patient data (CRUD)
- Assign diagnosis manually (based on scan/image)
- Generate patient report
- Generate QR Code for report access

### 🧑‍🦱 Patient

- Scan QR Code
- View dental report (read-only)

---

## 🧱 Tech Stack

### Frontend

- React (Vite)
- TailwindCSS
- JavaScript
- Poppins Font (@fontsource)

### Backend

- Golang (Gin Framework)
- JWT Authentication
- GORM (ORM)
- MySQL (Laragon)

---

## 📁 Project Structure

```
dental-app-report/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── ...
│   │   ├── components/
│   │   └── main.jsx
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   └── main.go
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Project

```
git clone https://github.com/your-username/dental-app-report.git
cd dental-app-report
```

---

### 2. Backend Setup

```
cd backend
go mod tidy
go run main.go
```

Server will run on:

```
http://localhost:8080
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔑 Notes

- Password can be hashed using bcrypt (recommended)
- JWT token is stored in localStorage
- QR Code feature will be used for patient access
- System designed for ~700 patients (lightweight scalable)

---

## 📌 Roadmap

- [x] Login system (JWT)
- [x] Patient CRUD
- [x] UI Login Page (Modern Design)
- [ ] Diagnosis module
- [ ] Report generator
- [ ] QR Code system
- [ ] Role-based access (admin/doctor)

---

## 🎯 Future Improvements

- Upload & process dental scan images
- AI-based diagnosis (optional)
- PDF export report
- Patient history tracking

---

## 👨‍💻 Author

Mahzuz Hazman
Informatics Student

---

## ⭐ License

This project is for educational and portfolio purposes.
