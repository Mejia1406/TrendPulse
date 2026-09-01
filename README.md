# TrendPulse

Social media trend analytics platform built with Vue 3, TypeScript, and Pinia. Track, analyze, and compare trending topics across major social networks from a unified dashboard.

---

## Features

- **Multi-platform trend tracking** — Monitor trends across Twitter/X, Instagram, TikTok, and YouTube
- **Real-time analytics dashboard** — Overview cards, distribution charts, and top-trending rankings
- **Trend detail view** — Historical evolution, publication statistics, and platform performance
- **Side-by-side comparison** — Compare trends and metrics across different social networks
- **Role-based access control**
  - **Admin**: Full access + user & social media management panels
  - **User**: Read-only dashboards and analytics
- **Persistent client-side state** — All data persisted in `localStorage` with automatic seed data
- **Interactive data visualizations** — Powered by ApexCharts and Chart.js

---

## Tech Stack

| Layer                | Technology                                   |
| -------------------- | -------------------------------------------- |
| Framework            | Vue 3.5 (Composition API, `<script setup>`)  |
| Language             | TypeScript 6.0                               |
| Build tool           | Vite 8.1                                     |
| State management     | Pinia 4.0                                    |
| Routing              | Vue Router 5.2                               |
| Styling              | Tailwind CSS 4.0                             |
| Charts               | ApexCharts 7, Chart.js 4.5 + vue-chartjs     |
| Linting / Formatting | ESLint 10, Oxlint, Prettier 3.9              |

---

## Architecture

TrendPulse follows a **decoupled layered architecture** with a clear separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│                   Presentation Layer                │
│  Views (pages)  ·  Components  ·  App.vue           │
├─────────────────────────────────────────────────────┤
│                    Routing Layer                    │
│  Vue Router  ·  Guards (accessControl.ts)  ·  Meta  │
├─────────────────────────────────────────────────────┤
│                     State Layer                     │
│  Pinia Stores (Auth, User, Trend, SocialMedia, …)   │
├─────────────────────────────────────────────────────┤
│                   Services Layer                    │
│  AuthService  ·  TrendService  ·  UserService  ·  … │
├─────────────────────────────────────────────────────┤
│                    Models Layer                     │
│  Interfaces (DTOs)  ·  Seeders (mock data)          │
├─────────────────────────────────────────────────────┤
│                  Persistence Layer                  │
│  localStorage (via PiniaConfig deep watch)          │
└─────────────────────────────────────────────────────┘
```

### Key patterns

- **Navigation & access control** live exclusively in the router guards (`accessControl.ts`) driven by route `meta` fields — never in views.
- **Business logic** is encapsulated in services, keeping stores and components thin.
- **DTOs** are used for data transfer (e.g. login, entity creation) to separate payload contracts from domain interfaces.
- **State hydration & persistence** is centralized in `PiniaConfig.init()`: it loads from `localStorage` or seeds fresh data, then deep-watches the store state and writes every change back.

---

## Project Structure

```
frontend/
├── src/
│   ├── assets/css/            # Global styles (Tailwind entry)
│   ├── components/
│   │   ├── admin/             # Admin CRUD forms & tables
│   │   ├── common/            # BaseButton, BaseCard, …
│   │   ├── dashboard/         # Charts & lists for each view
│   │   └── layout/            # Header & layout components
│   ├── dtos/                  # Data Transfer Objects
│   ├── interfaces/            # Domain entity interfaces
│   ├── router/
│   │   ├── admin/             # Admin routes module
│   │   ├── accessControl.ts   # beforeEach guards
│   │   └── index.ts           # Router setup
│   ├── seeders/               # Mock/demo data
│   ├── services/              # Business logic layer
│   ├── stores/                # Pinia stores
│   ├── utils/formatters/      # Shared helpers
│   ├── views/
│   │   ├── admin/             # Admin pages
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── TrendView.vue
│   │   ├── TrendsDetailView.vue
│   │   └── CompareView.vue
│   ├── App.vue
│   ├── PiniaConfig.ts         # Pinia bootstrap + persistence
│   └── main.ts
├── vite.config.ts
├── eslint.config.ts
└── tsconfig.*.json
```

---

## Getting Started

### Prerequisites

- Node.js `^22.18.0 || >=24.12.0` (see `engines` in package.json)
- npm (bundled with Node)

### 1. Clone the repository

```bash
git clone https://github.com/Mejia1406/TrendPulse
cd TrendPulse
```

### 2. Install dependencies

Navigate to the `frontend` directory and install packages:

```bash
cd frontend
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

The app will be served at the URL printed by Vite (typically `http://localhost:5173`).

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build locally

```bash
npm run preview
```
---

## Demo Accounts

Seed data is loaded automatically on first launch. Use these credentials to log in:

| Role  | Email                      | Password |
| ----- | -------------------------- | -------- |
| Admin | smoncadam@eafit.edu.co     | 123456   |
| User  | shurtadom3@eafit.edu.co    | 123456   |

> Resetting demo data: delete the `piniaState` entry from your browser's `localStorage` and refresh.

---

## Routes & Access Control

Every route declares access rules via `meta` fields, enforced by the global `beforeEach` guard in `src/router/accessControl.ts`.

| Path                  | Name              | Requires auth | Requires admin | Purpose                               |
| --------------------- | ----------------- | :-----------: | :------------: | ------------------------------------- |
| /login                | login             |      ❌       |       ❌       | Guest-only; redirects logged-in users |
| /home                 | home              |      ✅       |       ❌       | Main dashboard (trend pulse)          |
| /tendencias           | tendencias        |      ✅       |       ❌       | All trends listing                    |
| /tendencias/:id       | tendencia         |      ✅       |       ❌       | Single trend detail + evolution       |
| /comparar             | comparar          |      ✅       |       ❌       | Cross-network comparison              |
| /admin/usuarios       | admin-usuarios    |      ✅       |       ✅       | Admin: manage users                   |
| /admin/redes          | admin-redes       |      ✅       |       ✅       | Admin: manage social media platforms  |

---

## Scripts Reference

| Script               | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| npm run dev          | Start Vite dev server with HMR                                |
| npm run build        | Type-check, then build for production                         |
| npm run build-only   | Build production bundle without type-checking                 |
| npm run preview      | Serve the production build locally                            |
| npm run type-check   | Run vue-tsc --build for TypeScript validation                 |
| npm run lint         | Run Oxlint + ESLint (both with --fix)                         |
| npm run format       | Format src/ with Prettier                                     |

---

## Recommended Tooling

**Editor**
- VS Code + Vue - Official (Volar) (disable Vetur)

**Browser**
- Vue.js devtools for Chrome / Firefox

---

## Team

- Samuel Moncada
- Sara Hurtado
- Athina Cappelletti

