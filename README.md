# JobTrack – Setup

## 1. Database (phpMyAdmin / XAMPP)
1. Start **Apache** and **MySQL** in XAMPP.
2. Open http://localhost/phpmyadmin → **Import** → choose `database/jobtrack_db.sql` → Go.
   (Optional: Spring Boot also creates the tables itself because `ddl-auto=update`.)

## 2. Backend (Spring Boot, port 8080)
Edit `Backend/demo/src/main/resources/application.properties`:
- `spring.datasource.username` / `password` (XAMPP default: root / empty)
- `jwt.secret` (use your own long random string, 32+ chars)

```
cd Backend/demo
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
```
Check: http://localhost:8080/api/test

## 3. Frontend (port 5173)
```
cd Frontend/jobtrack-ui
npm install
npm run dev
```

## API
| Method | URL | Auth | Purpose |
|---|---|---|---|
| POST | /api/auth/register | – | name, email, password → token + user |
| POST | /api/auth/login | – | email, password → token + user |
| GET/PUT | /api/users/me | JWT | profile |
| GET | /api/dashboard | JWT | stats, recent, upcoming interviews |
| GET | /api/applications | JWT | list own applications |
| POST | /api/applications | JWT | create |
| GET/PUT/DELETE | /api/applications/{id} | JWT | read / update / delete |

Send `Authorization: Bearer <token>` on protected calls (the frontend does this in `services/api.js`).

## Deployment (go live)
Backend environment variables: DB_URL, DB_USERNAME, DB_PASSWORD, JWT_SECRET, CORS_ORIGINS (your frontend URL).
Frontend: set VITE_API_URL=https://YOUR-BACKEND-URL/api before `npm run build`.
Backend ships a Dockerfile (Backend/demo/Dockerfile). Frontend has _redirects (Netlify) and vercel.json (Vercel) for React Router.




