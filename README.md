# SpotFree: Smart Parking Slot Booking PWA 🚗💨

**SpotFree** is a high-performance, scalable Progressive Web App (PWA) designed to revolutionize the parking experience. Built with a modern full-stack architecture, it supports real-time parking discovery, interactive maps, and seamless duration-based booking.

---

## 🚀 Key Features

- **PWA Ready:** Installable on iOS/Android, offline fallback, and fast loading.
- **Interactive Mapping:** Powered by OpenStreetMap (Leaflet) for zero-cost, real-time parking discovery.
- **Smart Booking:** Dynamic duration selection with live price calculation.
- **Modern Full-Stack:** FastAPI (Python) backend with high-speed REST endpoints and SQLAlchemy.
- **Premium UI:** Mobile-first design using Next.js 15, Tailwind CSS v4, and Lucide Icons.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 & Lucide Icons
- **Mapping:** Leaflet & OpenStreetMap
- **PWA:** `next-pwa` (Workbox)

### Backend
- **API Framework:** FastAPI
- **ORM:** SQLAlchemy (SQLite by default, PostgreSQL supported)
- **Auth:** JWT-based user authentication
- **Validation:** Pydantic

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python -m backend.init_db
uvicorn backend.main:app --reload
```
API Documentation available at [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📦 Database Schema
- **Users:** JWT-based secure authentication.
- **ParkingLots:** Location-based lot management.
- **Slots:** Real-time availability tracking.
- **Bookings:** Multi-hour session management.

---

## 🏗️ Future Roadmap
- [ ] **Live Payments:** Integrate Razorpay/Stripe India.
- [ ] **QR Generation:** Auto-generate QR codes for seamless entry/exit.
- [ ] **Push Notifications:** Firebase Cloud Messaging (FCM).
- [ ] **Admin Dashboard:** Revenue and occupancy analytics for owners.

---

## License
MIT License. Created by [Kishan Raj K](https://github.com/kishanrajk).
