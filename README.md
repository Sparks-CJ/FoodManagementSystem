# MERN Food Management System 🍽️

**Motto:** *“Save Food. Save Money. Save Tomorrow.”*

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Folder Structure](#folder-structure)
5. [Installation & Setup](#installation--setup)
6. [Environment Variables](#environment-variables)
7. [Deployment](#deployment)

---

## Project Overview
The **Food Management System** is a web application built using the **MERN stack (MongoDB, Express, React, Node.js)** to help households and small businesses manage their food inventory efficiently.  
It supports the **Sustainable Development Goal (SDG) 12: Responsible Consumption and Production**, reducing food waste and promoting sustainability.

Users can:
- Track food items with expiration dates.
- Record quantity and type of food.
- Get notifications for items nearing expiration.
- Reduce food wastage and save money.

---

## Features
- **User Authentication**: Register and login securely.
- **Food Inventory Management**: Add, edit, delete, and view food items.
- **Expiry Tracking**: Alerts for soon-to-expire items.
- **Dashboard**: Overview of your food inventory.
- **Responsive Design**: Works on desktop and mobile devices.

---

## Technologies
- **Frontend**: React, Vite, Context API
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Render.com

---

## Folder Structure
mern-food-app/
├── client/
│ ├── src/
│ │ ├── components/ # UI Components (FoodForm, FoodList)
│ │ ├── context/ # AuthContext for user state
│ │ ├── pages/ # Login, Register, Dashboard
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
├── server/
│ ├── src/
│ │ ├── controllers/ # authController, foodController
│ │ ├── models/ # User, FoodItem
│ │ ├── routes/ # auth.js, food.js
│ │ ├── middleware/ # auth middleware
│ │ └── app.js
│ ├── server.js
│ └── package.json
└── README.md

Deployment on Render

Create a new Web Service for backend:

Repository: server folder

Build Command: npm install

Start Command: node server.js

Set environment variables in Render dashboard.

Create a Static Site for frontend:

Repository: client folder

Build Command: npm run build

Publish Directory: dist

Set VITE_API_URL to the backend Render URL.
