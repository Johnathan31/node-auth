![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

# 🚀 Node.js + PostgreSQL + JWT

A **Node.js** web application built with:

- Express.js

- PostgreSQL

- JWT

- HttpOnly Cookies

- bcrypt Password Hashing

---

## 📚 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Helmet
- JSON Web Token (JWT)
- bcryptjs (instead of `bcrypt` to work in Docker Images properly)
- cookie-parser
- dotenv
- Express Rate Limit
- chalk

---

## ⚙️ Features

- A _RESTfull API_ using Express.js, controlling:
  - User registration.
  - User login.
  - User logout.
  - Current User. (for more, visit [API docs](./api.md))

- 💾 A Persistent database storage _PostgreSQL_.

- Various HTTP security headers using _Helmet_.

- 🛡 _JWT_ security layer for authentication.

- 🔒 Password hashing algorithms using _bcryptjs_.

- 🔐 _Environment variables_ management.

- 🍪 _HttpOnly Cookies_ storage, preventing XSS attacks.

- 🛡 Protected routes.

- production and development database config (prod ↔ dev DB).

- _Rate Limiting_ to prevent Brute Force attacks.

- 🎨 Colorful logs for requests, errors, and information using `chalk`.

---

## 🪾 Project structure

```
node-auth/
├── .gitignore
├── api.md
├── License
├── src/
│   ├── index.js
│   └── ...
├── README.md
├── main.sql
├── package-lock.json
├── package.json
└── .env.example
```

---

## ⚡ Getting Started

1. Clone the repository and go to it:

```Bash
git clone https://github.com/<your-name>/node-auth
cd node-auth
```

2. Install dependencies:

```Bash
npm i
```

3. Create a `.env` file (also, see [.env example file](./.env.example)).


### 🛠️ Development

1. Configure the `NODE_ENV` option in te `.env` file:

```
NODE_ENV=development
```

2. Start the PostgreSQL server:

```Bash
# Linux
systemctl start postgresql

# Some Linux Distributions
service postgresql start

# MacOS
brew services start postgresql

# Windows
net start postgresql-x64-17
```

3. Open PostgreSQL shell, and create a database:

```Bash
psql postgres
CREATE DATABASE accounts;
\q
```

4. Run the main [SQL queries](./main.sql):

```
psql accounts -f ./main.sql
```

5. Start the API:

```Bash
npm start
```

**Note**: You can run the server persistently using [pm2](https://pm2.io):

```Bash
# some package ready scripts' shortcuts
npm run pm2-start
npm run pm2-stop
npm run pm2-reload
npm run pm2-restart
```

### 📊 Production

1. Configure the `NODE_ENV` option in `.env`:

```
NODE_ENV=production
```

2. Get Connection string from services like Neon, or Supabase, then add it to the `.env` file:

```
DB_URL=postgresql://...
```

---

## 📈 Future Improvements

- add _Docker compose_ to make a fully containerized Node.js application.

- Configure a _Nginx Reverse proxy_ server.

- Add a frontend service (e.g. React) to complete the stack.

- Implement _Email Verification_.

- Implement _Password Refresher_ with an SQL table.
