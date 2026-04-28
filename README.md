# HealthSync Ops

A React + TypeScript B2B healthcare SaaS assignment project with:

- Firebase authentication flow
- Firebase sign up and password reset
- Protected dashboard, analytics, and patient management routes
- Zustand state management
- Grid/List patient views with responsive UI
- Service worker registration and local notification trigger
- Lazy-loaded application routes
- Mobile collapsible navigation

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

## Repository

- GitHub: `https://github.com/anilreddy111/Healthcare-SaaS-Application`

## Firebase setup

1. Copy `.env.example` to `.env`
2. Add your Firebase web app config
3. Enable Email/Password auth in Firebase Authentication
4. Create at least one test user in Firebase Authentication or use the in-app Sign Up flow

### Required environment variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Auth flows included

- Sign in with Firebase Email/Password
- Sign up with Firebase Email/Password
- Forgot password email reset
- Protected routes with session restore on refresh

## Notification use case

Use the `Trigger handoff notification` button on the dashboard. The app registers `public/sw.js`, requests notification permission, and shows a local notification that deep-links to `/patients`.

## Deployment

Deploy to Vercel or Netlify and add the same Firebase environment variables in the hosting dashboard before publishing.

### Vercel

1. Import the GitHub repository
2. Framework preset: `Vite`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add all `VITE_FIREBASE_*` environment variables
6. Deploy and verify auth flows

### Netlify

1. Import the GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add all `VITE_FIREBASE_*` environment variables
5. Deploy and verify auth flows

## Final test checklist

- Sign up works with Firebase
- Sign in works with Firebase
- Forgot password sends reset email
- Protected routes redirect correctly
- Patient grid/list toggle works
- Mobile navigation collapse works
- Dashboard notification permission and local notification work
- Build passes with `npm run build`

## Build

```bash
npm run build
```
