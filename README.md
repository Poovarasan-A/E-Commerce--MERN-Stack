# E-Commerce Platform
## Overview
This is a full-fledged e-commerce application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application includes an admin dashboard for managing products, orders, and users, as well as user authentication using JWT tokens. Redux Toolkit is used for state management, and Stripe is integrated as the payment gateway.

## Features
  - User authentication and authorization (JWT)
  - Product browsing and search
  - Shopping cart functionality
  - Order placement and payment processing
  - Admin dashboard for managing products, orders, and users
  - Responsive design
    
## Tech Stack
  - Frontend: React, Redux Toolkit, React Router, Axios
  - Backend: Node.js, Express
  - Database: MongoDB
  - Authentication: JWT (JSON Web Tokens)
  - Styling: Tailwind CSS
  - Payment Gateway: Stripe
  - Others: Mongoose, Bcrypt.js, dotenv

## Admin Dashboard
The admin dashboard can be accessed by users with admin privileges. Features include:
- Managing Products (Add, Edit, Delete)
- Managing Orders
- Managing Users
  
## Authentication
User authentication is handled using JWT tokens. Upon successful login, a JWT token is issued which is used to authenticate and authorize subsequent requests.

## State Management
Redux Toolkit is used for efficient state management across the application. It helps in managing the application's state in a predictable way.

## Payment Processing
Stripe is integrated for handling payments. Users can add products to the cart and proceed to checkout where they can pay using their credit/debit cards via Stripe.

##Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.
