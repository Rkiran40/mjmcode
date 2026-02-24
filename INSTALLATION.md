# 🚀 Production Deployment Guide for Pratyaksha News

This guide will help you deploy the project in a production environment.

## 1. Prerequisites
- Node.js (v18+ recommended)
- MySQL Server
- Nginx (recommended for serving frontend)

## 2. Backend Setup
1. Copy `.env.example` to `.env` and fill in production values (DB credentials, JWT secret, etc.).
2. Initialize the database using the provided SQL schema:
   ```sh
   mysql -u <user> -p <db_name> < backend/db/schema.sql
   ```
3. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
4. Start the backend:
   ```sh
   NODE_ENV=production npm start
   ```

## 3. Frontend Setup
1. Copy `.env.example` to `.env` and set production API URLs.
2. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```

3. Build the frontend:
   ```sh
   npm run build
   ```
   This will generate a `dist/` folder with production-ready static files.

4. Serve the `dist/` folder:
   - **Recommended:** Use Nginx (see below) to serve static files.
   - **Alternative:** Use a static server like `serve`:
     ```sh
     npm install -g serve
     serve -s dist
     ```
   - **Or:** Configure your backend (Express) to serve static files from `dist/` if needed.

## 4. Nginx Example
```
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/frontend/dist;
    index index.html;

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```


- Set `NODE_ENV=production` in all environments and `.env` files.
- Use strong, unique secrets in `.env` files (never commit real secrets to version control).
- Restrict `CORS_ORIGIN` to your production domain in `.env`.
- Change default admin credentials after first login.
- Review logging and error handling to avoid leaking sensitive data.
- Never use development values in production for secrets, CORS, or database credentials.

## 7. Logging & Error Handling
- Ensure logging does not expose sensitive information in production.
- Use appropriate log levels (e.g., `info`, `warn`, `error`).
- Customize error responses to avoid leaking stack traces or internal details to users.
- Set `NODE_ENV=production` in all environments and `.env` files.
- Use strong, unique secrets in `.env` files (never commit real secrets to version control).
- Restrict `CORS_ORIGIN` to your production domain in `.env`.
- Change default admin credentials after first login.
- Review logging and error handling to avoid leaking sensitive data.
- Never use development values in production for secrets, CORS, or database credentials.


## 6. Static Assets
- Ensure all required images (e.g., `/logo.png`, `favicon.ico`, `favicon.jpg`) are present in `frontend/public`.
- If you add new images or assets, place them in `frontend/public` and reference them correctly in your code.

---
For further help, contact info@pratyakshanews.com
