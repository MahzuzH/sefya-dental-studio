# 🦷 Dental Patient Report System

A modern, web-based dental reporting system that enables doctors and clinic administrators to manage patient data, record detailed clinical examinations (diagnoses), and seamlessly share results with patients via accessible QR codes.

---

## 🚀 Key Features

### 👨‍⚕️ Admin / Doctor Dashboard
- **Secure Authentication:** JWT-based login with bcrypt password hashing.
- **Patient Management:** Full CRUD operations for patient records.
- **Clinical Records:** Detailed examination and diagnosis logging.
- **Report Generation:** Create comprehensive dental reports.
- **QR Code Sharing:** Instantly generate QR codes for secure patient access to their reports.

### 🧑‍🦱 Patient Portal
- **Scan & View:** Access read-only dental reports instantly via QR code scan.
- **Premium UI:** Professional "medical light" aesthetic with smooth Framer Motion animations and responsive glassmorphism effects.

### 🛡️ Backend & Infrastructure (Production-Ready)
- Robust database connection pooling & strategic indexing.
- API protection via rate limiting and request compression.
- Graceful shutdown procedures for server stability.
- Structured logging and secure environment secret management.

---

## 🧱 Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS, shadcn/ui, Radix UI
- **Animations:** Framer Motion
- **Icons & Typography:** Lucide React, Geist Font (@fontsource-variable/geist)
- **Routing & State:** React Router DOM, SWR
- **Data Visualization:** Recharts

### Backend
- **Language:** Golang (1.26.1)
- **Framework:** Gin Web Framework
- **Database:** MySQL (Laragon/Local) with GORM (ORM)
- **Security:** JWT Authentication (golang-jwt/jwt/v5), bcrypt
- **Tooling:** Air (for live-reloading)

---

## 📁 Project Structure

```text
dental-patient-report/
│
├── frontend/                 # React UI Application
│   ├── src/
│   │   ├── assets/           # Static assets
│   │   ├── components/       # Reusable UI components (shadcn/ui, etc.)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions and configurations
│   │   ├── pages/            # View components (Dashboard, Login, PublicReport, etc.)
│   │   ├── services/         # API integration services
│   │   ├── App.jsx           # Main application routing
│   │   └── main.jsx          # React entry point
│   └── package.json
│
├── backend/                  # Golang API Server
│   ├── config/               # Database and environment configurations
│   ├── controllers/          # API endpoint handlers
│   ├── middleware/           # Auth, rate-limiting, logging middlewares
│   ├── models/               # GORM database models
│   ├── routes/               # API route definitions
│   ├── uploads/              # Storage for uploaded files/images
│   ├── utils/                # Helper functions (hashing, JWT, etc.)
│   ├── main.go               # Application entry point
│   └── go.mod
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Project

```bash
git clone https://github.com/your-username/dental-patient-report.git
cd dental-patient-report
```

### 2. Backend Setup

Ensure you have Go installed and a MySQL server running (e.g., via Laragon or XAMPP).

```bash
cd backend
# Install dependencies
go mod tidy

# Run the server (default port 8080)
go run main.go
```
*Tip: If using `air` for development, you can just run `air` in the backend directory.*

Server runs on: `http://localhost:8080`

### 3. Frontend Setup

Ensure you have Node.js installed.

```bash
cd frontend
# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔑 Notes
- **Security:** Passwords are mathematically hashed using bcrypt. JWT tokens are used for session management.
- **Patient Access:** The public report page is designed with a premium dark/charcoal theme for high contrast and readability when scanned via QR code.
- **Scalability:** The system is optimized with database connection pooling and indexing, suitable for clinics handling hundreds to thousands of patients.

---

## 📌 Roadmap & Status

- [x] Secure Login system (JWT & bcrypt)
- [x] Patient Management (CRUD)
- [x] Modern UI with Light/Dark Themes & Framer Motion
- [x] Diagnosis & Examination Module
- [x] Report Generator Engine
- [x] QR Code Access System
- [x] Production-grade Backend Optimizations
- [ ] Role-based access control (Admin vs. Doctor specifics)
- [ ] Upload & process dental scan images (X-Rays)
- [ ] Export reports to PDF
- [ ] Patient visit history tracking

---

## 👨‍💻 Author

**Mahzuz Hazman**  
Informatics Student

---

## ⭐ License

This project is for educational and portfolio purposes.
