# InterviewBuddy

InterviewBuddy is a small full-stack application that helps teams manage interview-related resources such as organizations and users. This repository contains a Node/TypeScript backend and a TypeScript/React frontend scaffolded with Vite.

## Table of contents

- [Project structure](#project-structure)
- [Quick start](#quick-start)
- [Backend](#backend)
	- [Requirements](#requirements)
	- [Configuration & environment variables](#configuration--environment-variables)
	- [Database](#database)
	- [Run locally](#run-locally)
- [Frontend](#frontend)
	- [Requirements](#requirements-1)
	- [Run locally](#run-locally-1)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Project structure

Top-level folders:

- `backend/` — Node + TypeScript API server (Express-style routes and controllers).
	- `src/` — source TypeScript files.
	- `database/schema.sql` — database schema and seed SQL.
- `frontend/` — Vite + React + TypeScript single-page app.
- `docs/` — diagrams and documentation (ER diagram, etc.)

## Quick start

You can run backend and frontend independently. Typical development flow:

1. Configure environment variables for the backend (see Backend → Configuration).
2. Start the backend server.
3. Start the frontend dev server and open the app in your browser.

## Backend

### Requirements

- Node.js (recommended: 18.x or 20.x)
- npm or yarn
- A local PostgreSQL instance (or another DB if adapted)

### Configuration & environment variables

The backend reads configuration from environment variables. Create a `.env` file in `backend/` or set variables in your environment. Common variables used by projects like this are:

- `PORT` — port the API will listen on (default: 3000)
- `DATABASE_URL` or individual `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` — database connection params

Check `backend/src/config/database.ts` for the exact variable names used by this project.

### Database

An SQL schema is included at `backend/database/schema.sql`. Use it to create the database schema and optional seed data.

Example (Postgres):

```bash
# create database (adjust name as needed)
createdb interviewbuddy_dev
# apply schema
psql -d interviewbuddy_dev -f backend/database/schema.sql
```

### Run locally

Install dependencies and start the server:

```bash
cd backend
npm install
# build (if needed) and start in dev mode (depends on scripts in backend/package.json)
npm run dev
```

The server entrypoint is `backend/src/index.ts`. API routes are under `backend/src/routes/` and controllers under `backend/src/controllers/`.

## Frontend

### Requirements

- Node.js (recommended: same major as backend)
- npm or yarn

### Run locally

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite (commonly `http://localhost:5173/`). The frontend expects the backend API to be available — check `frontend/src` for any proxy configuration or base URL.

## Testing

This repository may not include tests yet. If tests are added, run them from the package folders, for example:

```bash
cd backend
npm test

cd frontend
npm test
```

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository and create a feature branch.
2. Run and test the app locally.
3. Open a pull request describing your changes.

If you plan to change database schemas or major API surfaces, open an issue first so we can discuss the design.

## Notes & tips

- Check `backend/src/config/database.ts` for the database configuration and adjust your `.env` accordingly.
- The `docs/ER_diagram.md` file contains an ER diagram describing the main data model; consult it when working on model changes.

## Files of interest

- `backend/src/index.ts` — backend entry
- `backend/src/routes/` — API routes
- `backend/src/controllers/` — request handlers
- `backend/database/schema.sql` — DB schema
- `frontend/src/` — frontend source

## License

This project does not include a license file. If you plan to open-source it, consider adding an appropriate `LICENSE` file (MIT, Apache-2.0, etc.).

---

If you'd like, I can also:

- Add example `.env.example` files for backend and frontend
- Add simple npm script entries (e.g., `start`, `dev`) if missing
- Add a CONTRIBUTING.md and LICENSE

Tell me which of the above you'd like next and I will implement it.