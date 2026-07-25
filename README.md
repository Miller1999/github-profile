# GitHub Profile App

🔗 **Frontend (live):** [github-profile-navy-theta.vercel.app](https://github-profile-navy-theta.vercel.app)
🔗 **Backend API (live):** [github-profile-backend-agx4.onrender.com](https://github-profile-backend-agx4.onrender.com)

A full-stack application that displays GitHub profile information using **NestJS** (backend) and **Next.js** (frontend).

The app fetches data from the public GitHub API via a custom NestJS endpoint and renders a modern, responsive profile card.

---

## 📁 Project Structure

```
github-profile-app/
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── app.controller.ts # GET /user/:username endpoint
│   │   ├── app.module.ts     # Root module with HttpModule
│   │   ├── app.service.ts    # Base service (unused)
│   │   ├── github.service.ts # GitHub API integration
│   │   └── main.ts           # Bootstrap (CORS enabled, port 3001)
│   ├── package.json
│   └── ...
├── frontend/                 # Next.js UI
│   ├── src/app/
│   │   ├── page.tsx          # Profile page (fetches backend & renders)
│   │   ├── layout.tsx        # Root layout with metadata
│   │   └── globals.css       # Tailwind CSS styles
│   ├── .env.example          # Environment variable template
│   ├── package.json
│   └── ...
├── README.md                 # This file
└── TODO.md                   # Progress tracking
```

---

## ✨ Features

- **Backend API** (`GET /user/:username`) — Queries GitHub's public API and returns profile data
- **Profile Card UI** — Displays:
  - Avatar, full name, and `@username`
  - Company, location, and bio
  - Stats: **Public Repos**, **Followers**, **Following** (3-column grid)
  - **"View on GitHub"** button linking to the profile
  - Blog link (if available)
  - Public gists count and API attribution
- **Dark mode support** — Automatically adapts to system preference
- **Responsive design** — Works on mobile and desktop
- **Loading spinner** & **error handling** with user-friendly messages

---

## 🛠️ Tech Stack

| Layer      | Technology                                              |
| ---------- | ------------------------------------------------------- |
| **Backend**  | [NestJS](https://nestjs.com/), Axios, TypeScript        |
| **Frontend** | [Next.js](https://nextjs.org/) 16, React 19, Tailwind CSS 4 |
| **API**      | [GitHub REST API](https://docs.github.com/en/rest)      |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/Miller1999/github-profile-app.git
cd github-profile-app
```

### 2. Backend setup

```bash
cd backend
npm install
npm run start:dev
```

The backend starts at **http://localhost:3001**.

Test it:

```bash
curl http://localhost:3001/user/Miller1999
```

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend starts at **http://localhost:3000**.

> **Note:** The frontend reads the backend URL from the environment variable `NEXT_PUBLIC_API_URL`. By default it falls back to `http://localhost:3001`. You can override it by creating a `frontend/.env.local` file:
>
> ```
> NEXT_PUBLIC_API_URL=http://localhost:3001
> ```

---

## 🔧 Configuration

### Environment Variables (Frontend)

| Variable                | Default                | Description                  |
| ----------------------- | ---------------------- | ---------------------------- |
| `NEXT_PUBLIC_API_URL`   | `http://localhost:3001` | Backend API base URL         |

### Environment Variables (Backend)

The backend runs on port **3001** by default. To change it, edit `src/main.ts`:

```ts
await app.listen(process.env.PORT || 3001);
```

---

## 📡 API Reference

### `GET /user/:username`

Fetches a GitHub user's public profile.

**Parameters:**

| Param      | Type   | Description               |
| ---------- | ------ | ------------------------- |
| `username` | string | GitHub username (required) |

**Response example** (truncated):

```json
{
  "login": "Miller1999",
  "name": "Miller",
  "bio": "Full-stack developer...",
  "public_repos": 42,
  "followers": 100,
  "following": 50,
  "avatar_url": "https://avatars.githubusercontent.com/u/...",
  "location": "Argentina",
  "html_url": "https://github.com/Miller1999",
  "company": "@company",
  "blog": "https://miller.dev"
}
```

---

## 🧪 Running Tests

### Backend

```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
```

### Frontend

```bash
cd frontend
npm run lint          # Linting
```

---

## 📄 License

MIT
