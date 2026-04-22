# MyStore

A full-stack store app with a React + Vite frontend and an Express + MongoDB backend.

## Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Framer Motion
- Backend: Express, MongoDB, Mongoose, JWT, bcrypt
- Tooling: ESLint, Nodemon

## Project Structure

```text
Store/
├─ client/   # React frontend
└─ server/   # Express API
```

## Features

- Product catalog with category pages
- Product details page
- Search, cart, and wishlist
- User register/login/profile flow
- Protected checkout/profile routes
- Admin login and admin dashboard
- Admin product create, edit, delete, reset
- Default admin and default products seeded on server startup

## Setup

### 1. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Configure environment variables

Create `server/.env` from `server/.env.example`.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_secure_secret
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Alok Ranjan
ADMIN_EMAIL=admin@mystore.com
ADMIN_PASSWORD=admin123
```

Notes:

- `MONGO_URI` must point to a working MongoDB database.
- The backend creates or promotes the admin user on startup using `ADMIN_EMAIL`.
- If the frontend runs on a different URL, update `CLIENT_URL`.

## Run Locally

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

Frontend default URL:

```text
http://localhost:5173
```

Backend default URL:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## Frontend Scripts

From `client/`:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Backend Scripts

From `server/`:

```bash
npm run dev
npm start
```

## Admin Login

Default admin credentials:

```text
Email: admin@mystore.com
Password: admin123
```

If you changed `ADMIN_EMAIL` or `ADMIN_PASSWORD` in `server/.env`, use those instead.

Important:

- Start the backend at least once before using admin login.
- The backend seeds the admin account during startup.

## Main Routes

### Store

- `/`
- `/category/:name`
- `/product/:id`
- `/offers`
- `/search`
- `/cart`
- `/wishlist`
- `/login`
- `/register`
- `/profile`
- `/checkout`

### Admin

- `/admin/login`
- `/admin`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/:id/edit`

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Products

- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/products/reset`

## Build Status

Current local checks:

- Frontend lint passes
- Frontend production build passes
- Backend entry file parses successfully

## Notes

- The frontend API base URL defaults to `http://localhost:5000/api`.
- If needed, you can override it with `VITE_API_BASE_URL` on the client side.
- Admin/product data depends on the backend and MongoDB being available.

