# Pizzeria — Backend + React Frontend

This folder contains your existing Node/Express/MongoDB backend, unchanged,
alongside a new React frontend (`pizza-frontend-react/`) that's a full port
of your Angular app — same pages, same cart behavior, same styling.

```
pizzeria-fullstack-react/
├── backend/                 ← Node.js + Express + MongoDB API (unchanged, runs on port 7000)
└── pizza-frontend-react/    ← React frontend (runs on port 3000)
```

Your original Angular frontend is **not included here** — this is meant to
sit alongside it if you want to keep both, or replace it if you're moving to
React. Either frontend talks to the same unmodified backend.

## Run the backend

```bash
cd backend
npm install
npm start
```
Starts the API at `http://localhost:7000`. Make sure MongoDB is running and
your connection string in `config/db.js` / `.env` points to it. Seed sample
data first if your database is empty:
```bash
node seed/seed.js
```

## Run the React frontend

```bash
cd pizza-frontend-react
npm install
cp .env.example .env
npm start
```
Opens at `http://localhost:3000` and calls the backend at
`http://localhost:7000/api` by default (see `.env`).

## Run both together

Open two terminals — one for `backend/`, one for `pizza-frontend-react/` —
and start each as above. They're separate processes that communicate over
HTTP, so order doesn't matter much, but start the backend first so the
frontend's initial menu/ingredient fetches succeed right away.

See `pizza-frontend-react/README.md` for details on how each Angular concept
was translated into its React equivalent (CartService → CartContext, etc.).
