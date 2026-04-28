# HealthSync Ops

A React + TypeScript B2B healthcare SaaS assignment project with:

- Firebase authentication flow
- Protected dashboard, analytics, and patient management routes
- Zustand state management
- Grid/List patient views with responsive UI
- Service worker registration and local notification trigger
- Lazy-loaded application routes

## Stack

- React 19
- TypeScript
- Vite
- Zustand
- Firebase Authentication
- Recharts

## Run locally

```bash
npm install
npm run dev
```

## Firebase setup

1. Copy `.env.example` to `.env`
2. Add your Firebase web app config
3. Enable Email/Password auth in Firebase Authentication
4. Create at least one test user in Firebase Authentication

## Notification use case

Use the `Trigger handoff notification` button on the dashboard. The app registers `public/sw.js`, requests notification permission, and shows a local notification that deep-links to `/patients`.

## Build

```bash
npm run build
```
