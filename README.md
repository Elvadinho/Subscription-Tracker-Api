# 🧾 Subscription Tracker API

A simple and efficient **Subscription Tracker API** built to help users manage their subscriptions with ease.  
Users can **create accounts**, **log in**, **add, update, or delete subscriptions**, and **track renewal dates** — all through secure API endpoints.

---

## 🚀 Features

- 🔐 **User Authentication (JWT)**
  - Register new users
  - Log in and receive a token
  - Protected routes for authenticated users only

- 💳 **Subscription Management**
  - Create, update, delete, and fetch subscriptions
  - Track subscription renewal dates and statuses

- ⚙️ **Fully RESTful API**
  - Clean and consistent endpoints following REST principles

---

## 🧠 Tech Stack

- **Backend:** Node.js + Express  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JSON Web Token (JWT)
- **Security:** Arcjet
- **Environment:** dotenv for configuration  
- **Tools:** Postman / httpie for testing

---

## 🧩 API Endpoints Overview

| Method | Endpoint | Description |
|:------:|:----------|:-------------|
| `POST` | `/api/auth/sign-up` | Register a new user |
| `POST` | `/api/auth/sign-in` | Log in and receive JWT |
| `POST` | `/api/auth/sign-out` | Log out the current user |
| `GET` | `/api/subscriptions/user/:id` | Get all subscriptions for the logged-in user |
| `POST` | `/api/subscriptions` | Create a new subscription |
| `PUT` | `/api/subscriptions/:id` | Update a subscription |
| `DELETE` | `/api/subscriptions/:id` | Delete a subscription |

---

## ⚡ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/subscription-tracker-api.git
   cd subscription-tracker-api
