# 📘 Subscription Tracker API Documentation

This documentation provides detailed information about all endpoints of the **Subscription Tracker API**, including authentication, user management, and subscription features.


## 🧭 Base URL
```bash
http://localhost:5000/api/v1/
```

## 1. Authentication

To create an account

- **POST auth/sign-up**

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
- **POST auth/sign-in**

To login to an existing account

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

- **POST auth/sign-out**

Logout

**response**
```json
{
  "success": true,
  "message": "User signed out successfully"
}
```
   
## 2. Users

Don't forget to add your JWT token
- **GET users/:id**

Get user details

**response**
```json
{
  "success": true,
  "data": {
    "_id": "6908e83e7e5db9dc44db3e97",
    "name": "first",
    "email": "first@gmail.com",
    "isAdmin": false,
    "createdAt": "2025-11-03T17:37:02.682Z",
    "updatedAt": "2025-11-03T17:37:02.682Z",
    "__v": 0
  }
}
```

- **PUT users/:id**

Modify user data
**req.body**
```json
{
  "name": "second"
}
```

**response**
```json
{
  "success": true,
  "message": "User account updated successfully",
  "data": {
    "isAdmin": false,
    "_id": "69089bf50d2bd16e97d8edd7",
    "name": "second",
    "email": "second@gmail.com",
    "createdAt": "2025-11-03T12:11:33.925Z",
    "updatedAt": "2025-11-03T12:19:05.142Z",
    "__v": 0
  }
}
```

- **DELETE users/:id**

Delete the user account

**response**
```json
{
  "success": true,
  "message": "The user account was deleted successfully",
  "data": {}
}
```
   
## 3. Subscriptions

- **GET subscriptions/user/:id**

To see all a user subscription

**response**
```json
{
  "success": true,
  "data": [
 {
      "_id": "69076afe811fb3d706fe6e82",
      "name": "Netflix",
      "price": 10000,
      "currency": "FCFA",
      "frequency": "monthly",
      "category": "entertainment",
      "paymentMethod": "MOMO",
      "status": "actif",
      "startDate": "2025-02-01T00:00:00.000Z",
      "user": "6901f707deafa5cebdf216f2",
      "createdAt": "2025-11-02T14:30:22.586Z",
      "updatedAt": "2025-11-02T14:30:22.586Z",
      "renewalDate": "2025-03-03T00:00:00.000Z",
      "__v": 0
    },
]
}
```

- **POST subscriptions**

To create a new subscription

**req.body**
```json
{
  "name": "Amazon prime",
  "price": 10,
  "currency": "USD",
  "frequency": "monthly",
  "category": "sport",
  "startDate": "2025-02-01",
  "paymentMethod": "Paypal"
}
```

**response**
```json
{
  "success": true,
  "data": {
    "name": "Amazon prime",
    "price": 10,
    "currency": "USD",
    "frequency": "monthly",
    "category": "sport",
    "paymentMethod": "Paypal",
    "status": "expired",
    "startDate": "2025-02-01T00:00:00.000Z",
    "user": "6908a5d70c914574bf54d206",
    "_id": "6908f00b7e5db9dc44db3eae",
    "createdAt": "2025-11-03T18:10:19.379Z",
    "updatedAt": "2025-11-03T18:10:19.379Z",
    "renewalDate": "2025-03-03T00:00:00.000Z",
    "__v": 0
  }
}
```

- **DELETE subscriptions/:id**

To remove a subscription

**response**
```json
{
  "success": true,
  "data": {}
}
```

- **PUT subscriptions/:id**

To modify a subscription

**req.body**
```json
{
  "name": "XBOX GAME PASS",
  "price": 5,
  "currency": "EUR"
}
```

**response**
```json
{
  "success": true,
  "data": {
    "_id": "6908f19a7e5db9dc44db3ec7",
    "name": "XBOX GAME PASS",
    "price": 5,
    "currency": "EUR",
    "frequency": "monthly",
    "category": "sport",
    "paymentMethod": "Paypal",
    "status": "expired",
    "startDate": "2025-02-01T00:00:00.000Z",
    "user": "6908a5d70c914574bf54d206",
    "createdAt": "2025-11-03T18:16:58.131Z",
    "updatedAt": "2025-11-03T18:17:13.555Z",
    "renewalDate": "2025-03-03T00:00:00.000Z",
    "__v": 0
  }
}
```
