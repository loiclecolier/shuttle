# Shuttle E-commerce Project (MERN)
---
Shuttle is an **e-commerce website** for badminton equipment. It is at the **prototype** stage.

## Technologies used
---
### Frontend
---
- HTML
- CSS
- JavaScript
- React (and React Router)
- Redux Toolkit (and Redux Persist)

### Backend
---
- NodeJS
- Express
- MongoDB
- JWT (JSON Web Token)
- Multer (image storage)
- Stripe (payments)

## Features
---
- A complete **Rest API** :
    - CRUD (Create, Read, Update, Delete) for users, products, categories, brands, orders and cart
    - Authentication (Login and register) with JWT (JSON Web Token)
    - Image storage with Multer
- A shop with the list of products :
    - Search bar
    - Filters on price, category, brand and promotion
    - Specific page for each product
    - Add to cart on the shop or on the product page with quantity
    - Shopping cart page accessible if the user is logged in
    - Payment with Stripe (TEST mode)
- Authentication :
    - Login Page
    - Register Page
- A dashboard accessible to the administrator (only on desktop):
    - Product management via a dedicated interface (add, modify, delete, search)
    - Brand management via a dedicated interface (add, modify, delete, search)
    - Category management via a dedicated interface (add, modify, delete, search)
    - *User management in progress...*
    - *Order management in progress...*
    - *Order statistics in progress...*