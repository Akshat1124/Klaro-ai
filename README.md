# Klaro MERN App

A MERN (MongoDB, Express, React, Node) e‑commerce style application with a Vite + React frontend and an Express + MongoDB backend.

## Folder Structure

```
D:.
├─ client/              # React + Vite frontend
│  ├─ src/
│  │  ├─ components/   # Reusable UI components (PascalCase files)
│  │  ├─ pages/        # Route pages (PascalCase files)
│  │  ├─ context/      # React Context providers
│  │  ├─ services/     # API calls to backend (Axios/Fetch)
│  │  ├─ utils/        # Helpers (formatters, validators)
│  │  └─ assets/       # Static assets (images, fonts)
│  ├─ index.html
│  ├─ package.json
│  └─ vite.config.js
├─ server/              # Node/Express backend
│  ├─ controllers/     # Route handlers
│  ├─ models/          # Mongoose models
│  ├─ routes/          # Express routers
│  ├─ middlewares/     # Auth, error-handling, etc.
│  ├─ validators/      # Request validators (optional)
│  ├─ config/          # DB connection, env helpers
│  ├─ app.js           # Express app
│  ├─ server.js        # Server bootstrap
│  └─ package.json
├─ .gitignore
├─ package.json         # Root scripts/workspaces
└─ README.md
```

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB connection string

### Environment Variables
Create `server/.env` with:
```
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

### Install
```
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### Run
```
# In two terminals or use root script

# Frontend (terminal 1)
cd client
npm run dev

# Backend (terminal 2)
cd server
npm run dev

# Or from root (workspaces)
npm run dev
```

### API
- GET `/api/recommendations` → returns example recommendations.

### Frontend Services
- `client/src/services/api.js` defines a shared Axios instance (baseURL `/api`).
- `client/src/services/RecommendationService.js` calls `/api/recommendations`.

### Conventions
- Components/pages: PascalCase files.
- Functions/variables: camelCase.
- Folders: lowercase.

### Notes
- `client/src/pages/index.js` exports fixed to PascalCase.
- Vite proxy forwards `/api` to `http://localhost:5000` (see `client/vite.config.js`).
