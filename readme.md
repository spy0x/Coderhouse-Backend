# Los Tres Primos Market

Backend-focused final project for Coderhouse: an e-commerce platform for 3D assets with authentication, product/cart management, purchases, and admin features.

## Tech Stack

- Node.js + Express
- TypeScript (`src`) with transpiled JavaScript output (`dist`)
- MongoDB + Mongoose
- Passport (local + GitHub auth)
- Socket.IO
- Swagger (API docs)
- Tailwind CSS
- React + Vite frontend source in `frontend_react/`

## Deployments

- Render: <https://coderbackend-ltp.onrender.com/>
- Glitch: <https://fvd-coderhouse.glitch.me/>

> GitHub login is only configured for the Render deployment.

## API Documentation

- Swagger UI:
  - <https://coderbackend-ltp.onrender.com/apidocs>
  - <https://fvd-coderhouse.glitch.me/apidocs>
- Postman docs: <https://documenter.getpostman.com/view/19344400/2s9XxvTEr6>
- Postman collection JSON: <https://drive.google.com/file/d/1EtcL6qChZSYwAKGpKFmodre4eP-Kj_87/view?usp=sharing>

## Main Features

- User register/login/logout (local + GitHub OAuth)
- Product catalog with pagination/filter/sort
- Cart management (add/update/remove/clear items)
- Purchase flow with ticket/order generation
- Email notifications (Nodemailer)
- Role-based actions (user / premium / admin)
- User administration endpoints and views
- Logger testing endpoint and mocking products endpoint

## Project Structure

- `src/` → TypeScript backend source code
- `dist/` → transpiled backend output used to run the app
- `frontend_react/` → React frontend source code
- `public/` → static assets

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file at project root.

Required/used variables in this repository:

```env
PORT=8080
NODE_ENV=DEVELOPMENT
PROD_URL=http://localhost:8080
SESSION_SECRET=your_session_secret

DAO=MONGO
MONGO_USER=your_mongo_user
MONGO_PASSWORD=your_mongo_password
MONGO_URL=your_mongo_cluster_url

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

MAIL_USER=your_mail_user
MAIL_PASS=your_mail_password

ADMIN_MAIL=admin_email_for_tests
ADMIN_PASS=admin_password_for_tests
```

### 3) Run the app

```bash
npm start
```

`npm start` runs the server from `dist/App.js`.

### 4) Run tests

```bash
npm test
```

Tests run against `dist/tests/Supertest.test.js`.

## Useful Routes

### API

- `GET /api/products`
- `GET /api/products/:pid`
- `POST /api/products`
- `PUT /api/products/:pid`
- `DELETE /api/products/:pid`
- `POST /api/carts`
- `GET /api/carts/:cid`
- `POST /api/carts/:cid/product/:pid`
- `PUT /api/carts/:cid/product/:pid`
- `DELETE /api/carts/:cid/product/:pid`
- `POST /api/carts/:cid/purchase`
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/current`
- `GET /api/users/github`
- `GET /api/users/githubcallback`

### Views

- `/products`
- `/carts/:cid`
- `/chat`
- `/realtimeproducts`
- `/users`
- `/orders`

## Notes

- First startup on free hosting providers can be slow due to cold starts.
- This repository includes both source (`src`) and transpiled output (`dist`).
