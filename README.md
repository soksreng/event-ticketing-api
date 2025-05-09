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

## 📦 Sample Request Bodies & API Testing Examples

### 📍 1. Register a User  
**POST** `/api/auth/register`  
```json
{
  "name": "Jack",
  "email": "jack@example.com",
  "password": "mySecurePassword"
}
```

---

### 📍 2. Login a User  
**POST** `/api/auth/login`  
```json
{
  "email": "jack@example.com",
  "password": "mySecurePassword"
}
```

📝 After login, copy the token from the response and use it in the Authorization header for protected routes:
```
Authorization: Bearer <your_token>
```

---

### 📍 3. Create an Event *(Admin Only)*  
**POST** `/api/events`  
```json
{
  "title": "Tech Conference 2025",
  "description": "A 3-day tech expo and networking event",
  "category": "Technology",
  "venue": "Innovation Hall",
  "date": "2025-11-03",
  "time": "09:00",
  "seatCapacity": 200,
  "price": 50
}
```

---

### 📍 4. Update an Event *(Admin Only)*  
**PUT** `/api/events/:id`  
```json
{
  "title": "Updated Tech Conference 2025",
  "venue": "New Innovation Hub",
  "seatCapacity": 220,
  "price": 55
}
```
⚠️ Cannot reduce seatCapacity below already booked seats.

---

### 📍 5. Book Tickets *(User Only)*  
**POST** `/api/bookings`  
```json
{
  "event": "replace_with_valid_event_id",
  "quantity": 2
}
```

---

### 📍 6. View All Bookings *(User Only)*  
**GET** `/api/bookings`  
_(No body needed, just include token in header)_

**Headers:**
```
Authorization: Bearer <your_token>
```

---

### 📍 7. View a Specific Booking *(User Only)*  
**GET** `/api/bookings/:id`  
_(Replace `:id` with your actual booking ID)_

**Headers:**
```
Authorization: Bearer <your_token>
```

---

### 📍 8. Validate Ticket *(Public)*  
**GET** `/api/bookings/validate/QR-abcdef1234`  
_(No body or token needed — just use a valid QR code string)_

---

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
