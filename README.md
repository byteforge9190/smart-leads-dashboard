
# Lead Management — Smart Leads

Smart Lead Management is a full-stack TypeScript application for tracking and managing sales leads. It provides secure user authentication, CRUD operations for leads, lead-status filtering, a dashboard with key metrics, and a responsive React UI — built to showcase production-style best practices for back-end APIs and front-end UX.

## Key Features

- **User authentication:** Register, login, and protected routes using JWT stored in cookies.
- **Leads management:** Create, read, update, delete leads with server-side validation.
- **Lead status & filtering:** Quick endpoint to fetch available leads / status.
- **Dashboard & statistics:** Summary views and cards for quick metrics on the client.
- **Form validation:** Client- and server-side validation using `react-hook-form`, `zod` and `Joi`/middleware.
- **Robust API:** Rate-limited and secured Express API with Helmet, CORS, and input validation.
- **Developer-friendly:** TypeScript throughout, ES modules, Vite-powered React app, and easy local setup.

## Tech Stack

- Client: React 19, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form, TanStack Query, Zustand
- Server: Node.js, Express, TypeScript, Mongoose (MongoDB), JWT authentication, Joi/express-validator
- Dev tools: `tsx` for running TypeScript server code, `nodemon`/watch for local development

## Repo Structure (high-level)

The workspace contains two main apps:

- `client/` — React front-end (Vite + TypeScript)
- `server/` — Express API (TypeScript + Mongoose)

See the code for detailed folders and components.

## Getting Started (Local)

Prerequisites:

- Node.js (>= 18 recommended)
- npm (or pnpm/yarn)
- MongoDB running locally or a connection string to a MongoDB Atlas cluster

1. Clone the repo and open the workspace.

2. Backend setup

```bash
cd server
npm install
# create or review .env (example below)
npm run dev
```

3. Frontend setup (in a new terminal)

```bash
cd client
npm install
npm run dev
```

The front-end runs (by default) on `http://localhost:5173` and the API on the port defined in `server/.env` (default `5000`).

### Environment variables

Create a `.env` file in `server/` (a sample `.env` is included). Required keys:

- `MONGODB_URI` — MongoDB connection string (e.g. `mongodb://localhost:27017/smart_lead_management`)
- `CLIENT_URL` — Frontend origin (e.g. `http://localhost:5173`)
- `PORT` — Server port (e.g. `5000`)
- `JWT_SECRET` — Secret key for signing JWTs
- `JWT_EXPIRES_IN` — Token expiration (e.g. `1d`)

## API Endpoints (summary)

Base path: `/api`

- Auth
  - `POST /api/auth/register` — Register a new user
  - `POST /api/auth/login` — Authenticate and receive JWT token
  - `GET /api/auth/me` — Get current authenticated user (requires auth)

- Leads (requires authentication)
  - `GET /api/leads` — List leads with filters, pagination, and role-aware access
  - `GET /api/leads/available` — Get dashboard lead status data
  - `GET /api/leads/export` — Export filtered leads as CSV
  - `POST /api/leads/create` — Create a new lead
  - `GET /api/leads/:id` — Get lead details
  - `PUT /api/leads/:id` — Update a lead
  - `DELETE /api/leads/:id` — Delete a lead

There is also a health-check at `GET /health`.

## API Documentation

### Authentication

#### `POST /api/auth/register`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123",
  "role": "SALES"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "<jwt-token>",
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "SALES"
    }
  },
  "timestamp": "..."
}
```

#### `POST /api/auth/login`

Request body:

```json
{
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```

Response: returns the JWT token and user details.

#### `GET /api/auth/me`

Headers:

```http
Authorization: Bearer <jwt-token>
```

Response: returns the authenticated user profile.

### Leads

All lead endpoints require authentication. Use the same `Authorization: Bearer <jwt-token>` header for every request.

#### `GET /api/leads`

Query parameters:

- `status` — filter by lead status (`New`, `Contacted`, `Qualified`, `Lost`)
- `source` — filter by lead source (`Website`, `Instagram`, `Referral`)
- `search` — search by name or email
- `sort` — `latest` or `oldest`
- `page` — page number for pagination
- `limit` — page size

Role behavior:

- `ADMIN` users receive all leads.
- `SALES` users receive only leads they created.

#### `GET /api/leads/available`

Returns dashboard data for lead status counts, source counts, and a recent lead summary.

#### `GET /api/leads/export`

Exports the same filtered leads as the list endpoint as a CSV download.

Query parameters are the same as `GET /api/leads`.

Response headers:

- `Content-Type: text/csv`
- `Content-Disposition: attachment; filename="leads-<timestamp>.csv"`

#### `POST /api/leads/create`

Request body:

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "New",
  "source": "Website",
  "notes": "Initial contact made"
}
```

`SALES` and `ADMIN` roles can create leads.

#### `GET /api/leads/:id`

Returns lead details. `ADMIN` can access any lead; `SALES` can access only their own leads.

#### `PUT /api/leads/:id`

Request body: same fields as create. `ADMIN` can update any lead; `SALES` can update their own leads.

#### `DELETE /api/leads/:id`

`ADMIN` users can delete any lead. `SALES` delete ability is restricted by role.

### Health check

#### `GET /health`

Returns a simple status response for uptime checks.

## Notable Implementation Details

- Database connection uses Mongoose with a safe single-connection pattern in `server/config/connectDb.ts`.
- Request validation and sanitization is applied through middleware (`server/middleware/*`).
- The front-end uses `@tanstack/react-query` for data fetching and caching and `react-hook-form` for forms.
 - The front-end implements debounced search on the Leads page to reduce unnecessary API calls and improve UX.

### Role-Based Access Control (RBAC)

- Two roles are supported: `ADMIN` and `SALES`.
- Routes are protected and role-aware: `SALES` users can create and manage their own leads; `ADMIN` users have elevated rights (for example, deleting any lead).

### Export CSV

- The UI includes an Export CSV action in the Leads page. The backend exposes `GET /api/leads/export` which returns a CSV attachment of matching leads.
- To download from the browser, the client attaches an authentication token as a query parameter (also supported via Authorization header or cookie).

### Docker / docker-compose

The repository includes `docker-compose.yml` and simple `Dockerfile`s for both services. Note:

- Compose will build the server from `./server` and the client from `./client` and launch a `mongo` service.
- To run the stack locally with Docker:

```bash
docker-compose up --build
```

Environment variables for production should be provided via a `.env` or your deployment tooling. The compose file uses `MONGODB_URI`, `JWT_SECRET`, and related envs.

## For Recruiters / Reviewers

- Purpose-built to demonstrate a modern, production-like TypeScript stack with a clear separation of concerns (API + front-end).
- Emphasizes maintainability: typed APIs, centralized validation, and modular route/controllers.
- Easy to run locally for a quick demo — start the server and client as shown above.

## Next Steps / Improvements

- Add e2e and unit tests (Jest/React Testing Library / Supertest)
- Add CI configuration (GitHub Actions) for linting, tests and builds
- Add Docker files for reproducible local/dev environments

## License

This repository is provided for evaluation and demonstration purposes.
