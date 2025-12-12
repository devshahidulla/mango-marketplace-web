# Copilot / AI agent instructions for Mango Marketplace Web

Purpose
- Help AI agents make small-to-medium code changes quickly, following project conventions.

Quick setup & common commands
- Start dev server: `npm run dev` (uses Vite).
- Build for production: `npm run build`.
- Preview a build: `npm run preview`.
- Lint: `npm run lint`.
- Env: backend base URL is `VITE_API_URL` (use `.env` to override). Default: `http://localhost:3000/api`.

Big-picture architecture
- Frontend: React + Vite + TypeScript. Routing via `react-router-dom` (see `src/main.tsx` and `src/App.tsx`).
- UI: Tailwind CSS utility classes; small reusable components live in `src/components/common`, layout components in `src/components/layout`.
- State & auth: Context providers in `src/context` (notably `AuthContext.tsx` and `CartContext.tsx`).
- API layer: central Axios instance in `src/services/api.ts` and higher-level services in `src/services/index.ts` (e.g. `productService`, `authService`, `cartService`).

Critical patterns & examples (follow exactly)
- Auth token: `authService` stores JWT in `localStorage` under `token`. `src/services/api.ts` request interceptor reads `localStorage.getItem('token')` and sets `Authorization: Bearer <token>`.
- 401 handling: Axios response interceptor removes the token and redirects to `/login` on HTTP 401. Follow this pattern for global auth errors.
- Auth flow: `AuthProvider` (in `src/context/AuthContext.tsx`) checks `localStorage` on mount, calls `authService.getCurrentUser()` and exposes `login`, `register`, `logout`, and `isAuthenticated`.
- Typed services: `src/types/index.ts` contains project types. Services return typed responses (e.g. `getAll(): Promise<Product[]>`). Use these types for new API code.

Component & UI conventions
- Presentational components are small, typed, and live in `src/components/common` (e.g. `Button.tsx`, `Card.tsx`). Prefer composition over large monolithic components.
- Layout components (header/footer) live in `src/components/layout`. Header uses Tailwind utilities and responsive breakpoints (`hidden md:flex`, etc.).
- CSS: global styles in `src/index.css` and `src/App.css`; Tailwind config at `tailwind.config.ts`.

Where to add features
- New API wrappers: add to `src/services` and export from `src/services/index.ts` following existing function signatures.
- Types: add new types to `src/types/index.ts` and reference them in services and components.
- Pages: add new routes under `src/pages` and register routes in the router in `src/App.tsx`.

Testing & CI
- This repo currently has no test scripts configured. Add tests and a `test` script if required by CI.

Small rules for PRs and edits
- Keep API call logic inside `src/services` and avoid side effects in components. Components should call services via hooks or context.
- Preserve `localStorage` key `token` usage unless migrating auth scheme (document migration in PR). 
- Use existing Tailwind utility classes; prefer class-based styling over inline styles.

Notes for maintainers
- Use `react-hook-form` + `zod` for forms and validation (packages are in `package.json`).
- If changing API base URL behavior, update `src/services/api.ts` and note `VITE_API_URL` in `.env`.

If anything is unclear or you want additional, deeper examples (tests, CI config, or developer git-flow), tell me which area to expand.
