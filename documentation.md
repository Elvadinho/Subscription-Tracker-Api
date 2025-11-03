# 📘 Subscription Tracker API Documentation

This documentation provides detailed information about all endpoints of the **Subscription Tracker API**, including authentication, user management, and subscription features.


## 🧭 Base URL
```bash
http://localhost:5000/api/v1/
```

1. Authentication

- **auth/sign-up**

**req.body**
```json
{
  "name": "first",
  "email": "first@gmail.com",
  "password": "first"
}
```
**response**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTA4ZTgzZTdlNWRiOWRjNDRkYjNlOTciLCJpYXQiOjE3NjIxOTE0MjIsImV4cCI6MTc2Mjc5NjIyMn0.TZmUPoueHCAnCmMJeQaFSfWu6WxyoMdidwcYjGGVnXs",
    "user": {
      "name": "first",
      "email": "first@gmail.com",
      "password": "$2b$10$siTci2J4gg5tOlP30VBZo.N9v4OQFm0jfw2/rYZJMrH7AOVnzV8w.",
      "isAdmin": false,
      "_id": "6908e83e7e5db9dc44db3e97",
      "createdAt": "2025-11-03T17:37:02.682Z",
      "updatedAt": "2025-11-03T17:37:02.682Z",
      "__v": 0
    }
  }
}
```
- **auth/sign-in**

**req.body**
```json
{
  "email": "first@gmail.com",
  "password": "first"
}
```
**response**
```json
{
  "success": true,
  "message": "User signed in successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTA4ZTgzZTdlNWRiOWRjNDRkYjNlOTciLCJpYXQiOjE3NjIxOTE2MzYsImV4cCI6MTc2Mjc5NjQzNn0.Tv769wgn6eTtY7zQJZXe4qhLvZ_H6braNyqm3Im1f5I",
    "user": {
      "_id": "6908e83e7e5db9dc44db3e97",
      "name": "first",
      "email": "first@gmail.com",
      "password": "$2b$10$siTci2J4gg5tOlP30VBZo.N9v4OQFm0jfw2/rYZJMrH7AOVnzV8w.",
      "isAdmin": false,
      "createdAt": "2025-11-03T17:37:02.682Z",
      "updatedAt": "2025-11-03T17:37:02.682Z",
      "__v": 0
    }
  }
}
```

- **auth/sign-out**

**response**
```json
{
  "success": true,
  "message": "User signed out successfully"
}
```
   
3. User

   
5. Subscription
