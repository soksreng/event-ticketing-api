# 🎟️ Event Ticketing API

A RESTful Node.js + Express API for managing event ticket bookings, built with MongoDB and tested using Postman & Thunder Client.

## 🚀 Features
- User registration and login (JWT-based)
- Role-based access control (user/admin)
- Create, update, and delete events (admin only)
- Book tickets with seat availability check
- View user bookings
- QR code generation & validation
- Email confirmation on booking (Nodemailer)
- Admin dashboard: shows all events + who booked each
- Smart 404 responses (HTML vs JSON)

## 🧠 Tech Stack
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas + Mongoose
- **Auth**: JSON Web Token (JWT)
- **Email**: Nodemailer (Gmail App Password)
- **QR Code**: `qrcode` npm package
- **Testing**: Postman & Thunder Client

## 📦 Dependencies

| Package         | Description                            |
|-----------------|----------------------------------------|
| `express`       | Web framework for routing and middleware |
| `mongoose`      | MongoDB object modeling and queries     |
| `dotenv`        | Loads env variables from `.env` file   |
| `bcryptjs`      | Password hashing and comparison        |
| `jsonwebtoken`  | Signing and verifying JWT tokens       |
| `nodemailer`    | Sending email confirmations            |
| `qrcode`        | Generates QR codes from booking data   |
| `morgan`        | Logs HTTP requests to console          |
| `cors`          | Enables CORS for frontend integration  |
| `nodemon`       | Dev-only tool for auto-restarting server |

Install them with:

```
npm install express mongoose dotenv bcryptjs jsonwebtoken nodemailer qrcode morgan cors
npm install --save-dev nodemon
```

## 📁 Folder Structure
```
.
├── controllers/        # Logic for each route
├── models/             # Mongoose schemas: User, Event, Booking
├── routes/             # Route definitions (auth, events, bookings)
├── middleware/         # JWT auth, role check, 404, error handling
├── utils/              # JWT generation, email helper
├── public/             # Static index.html welcome page
├── server.js           # Main Express app
├── .env.example        # Sample env file (not committed)
```

## ⚙️ Environment Setup

1. Clone this repo:
   ```
   git clone https://github.com/soksreng/event-ticketing-api.git
   cd event-ticketing-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file and fill in your values:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

4. Start the server:
   ```
   npm run dev
   ```

5. Visit:
   ```
   http://localhost:5000/            // Welcome page
   http://localhost:5000/api/events  // Event API
   ```

## 🌐 API Endpoints

### 🔐 Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token

### 📅 Events
- `GET /api/events` — Get all events
- `GET /api/events/:id` — Get a single event
- `GET /api/events?category=` — Filter by category
- `GET /api/events?date=YYYY-MM-DD` — Filter by date
- `POST /api/events` — Create event (admin only)
- `PUT /api/events/:id` — Update event (admin only)
- `DELETE /api/events/:id` — Delete event & related bookings (admin only)

### 🎫 Bookings
- `POST /api/bookings` — Book tickets (user only)
- `GET /api/bookings` — View all user bookings
- `GET /api/bookings/:id` — Get a specific booking (user only)
- `GET /api/bookings/validate/:qr` — Validate QR code 

### 📊 Admin
- `GET /api/admin/dashboard` — Get all events + users who booked each 

## 🧪 API Testing

This project was thoroughly tested using:
- ✅ **Thunder Client** (VS Code extension)
- ✅ **Postman** (API client)

To test protected routes:
1. Login via `/api/auth/login`
2. Copy the returned token
3. Add header:
   ```
   Authorization: Bearer <your_token>
   ```

## 👨‍💻 Author

By Sok Sreng CHAN — 2025
