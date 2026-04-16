# Mango Marketplace — Agent Knowledge File

## Project Overview

**Mango Marketplace** is a multi-vendor e-commerce platform built with a microservices architecture.

- **Frontend**: React + TypeScript (`mango-marketplace-web`) — this repo
- **Jira Project**: `DEV` on `shahidulladev.atlassian.net`
- **Jira Cloud ID**: `0ce714b1-e7f7-4ebe-83ca-b8177b8a6936`

---

## Workflow: Working on a Jira Task

When the user says **"work on DEV-XX"** (or any variant like "start DEV-XX", "implement DEV-XX"):

1. **Fetch the Jira issue** via MCP to get full details (summary, description, acceptance criteria).
2. **Determine the branch name** using the convention below.
3. **Create the branch from `develop`**:
   ```bash
   git fetch origin develop
   git checkout -b feature/<epic-slug>/<DEV-XX>-<short-description> origin/develop
   ```
4. **Implement the changes** in the correct repo (see repo mapping below).
5. **Commit** with a message referencing the Jira key: `DEV-XX: <what was done>`.
6. **Push** the branch: `git push -u origin <branch-name>`
7. **Create a PR** targeting `develop` (NOT `main`).
8. **Update the Jira issue** status to "In Progress" (or "In Review" after PR is created).

> **Never push directly to `main` or `develop`.** All work goes through PRs.

---

## Branching Strategy

```
main
 └── develop
      └── feature/<epic-slug>/<DEV-XX>-<short-description>
```

### Epic slug mapping

| Epic | Jira Key | Slug |
|------|----------|------|
| F4 – User Profile Management | DEV-10 | `user-profile` |
| F5 – Vendor Registration | DEV-11 | `vendor-registration` |
| F6 – Product Catalog Infrastructure | DEV-12 | `catalog-infra` |
| F7 – Vendor Setup | DEV-13 | `vendor-setup` |
| F8 – Product CRUD | DEV-14 | `product-crud` |
| F9 – Browsing & Discovery | DEV-15 | `browsing` |
| F10 – Inventory Management | DEV-16 | `inventory` |
| F11 – Order Infrastructure | DEV-17 | `order-infra` |
| F12 – Cart | DEV-18 | `cart` |
| F13 – Checkout | DEV-19 | `checkout` |
| F14 – Payment | DEV-20 | `payment` |
| F15 – Order Tracking | DEV-21 | `order-tracking` |
| F16 – Search | DEV-22 | `search` |
| F17 – Image Upload | DEV-23 | `image-upload` |
| F18 – Notifications | DEV-24 | `notifications` |
| F19 – Analytics | DEV-25 | `analytics` |
| F20 – Admin | DEV-26 | `admin` |

---

## Microservices Repo Map

| Repo | Responsibility |
|------|---------------|
| `mango-marketplace-web` | React frontend (this repo) |
| `mango-user-service` | User profiles, addresses, password management |
| `mango-auth-service` | JWT issuance & validation |
| `mango-catalog-service` | Products, categories, images |
| `mango-order-service` | Cart, checkout, orders, tracking |
| `mango-marketplace-infra` | AWS CDK infra (EventBridge, SQS, RDS, S3) |

---

## F4 – User Profile Management Task Order

These are the 8 tasks under epic DEV-10, in dependency order:

| Order | Key | Task | Repo | Branch |
|-------|-----|------|------|--------|
| 1 | DEV-50 | JWT Auth Middleware | mango-user-service | `feature/user-profile/DEV-50-jwt-auth-middleware` |
| 2 | DEV-47 | User Profile GET API | mango-user-service | `feature/user-profile/DEV-47-user-profile-api` |
| 3 | DEV-48 | Profile Update API | mango-user-service | `feature/user-profile/DEV-48-profile-update-api` |
| 4 | DEV-49 | Password Change API | mango-user-service | `feature/user-profile/DEV-49-password-change` |
| 5 | DEV-51 | Address Management API | mango-user-service | `feature/user-profile/DEV-51-address-management` |
| 6 | DEV-52 | Profile UI | mango-marketplace-web | `feature/user-profile/DEV-52-profile-ui` |
| 7 | DEV-53 | Address UI | mango-marketplace-web | `feature/user-profile/DEV-53-address-ui` |
| 8 | DEV-54 | Password Change UI | mango-marketplace-web | `feature/user-profile/DEV-54-password-change-ui` |

DEV-50 is the critical blocker — complete it first.

---

## Tech Stack

### Frontend (this repo)
- React 18 + TypeScript
- Vite
- Tailwind CSS
- react-hook-form + zod (validation)
- axios (HTTP client)
- AuthContext for auth state

### Backend (separate repos)
- .NET 9.0, Clean Architecture
- Dapper ORM + PostgreSQL
- JWT Bearer auth (issuer: `Mango.AuthService`, audience: `Mango.Marketplace`, HMAC SHA-256)
- AWS EventBridge + SQS (event-driven)

---

## Jira Backlog Priority Order

| Priority | Epics |
|----------|-------|
| Highest | F4 – User Profile (DEV-10) |
| High | F5 (DEV-11), F6 (DEV-12), F7 (DEV-13), F8 (DEV-14), F9 (DEV-15), F17 (DEV-23) |
| Medium | F10 (DEV-16), F11 (DEV-17), F12 (DEV-18), F13 (DEV-19) |
| Low | F14 (DEV-20), F15 (DEV-21), F16 (DEV-22), F18 (DEV-24) |
| Lowest | F19 (DEV-25), F20 (DEV-26) |
| Done | F1 (DEV-7), F2 (DEV-8), F3 (DEV-9) |

---

## PR Rules

- PRs always target `develop`
- Title format: `DEV-XX: <short description>`
- Include a summary of what was implemented and a test plan in the PR body
- Link the Jira issue in the PR description
- Transition the Jira issue to "In Review" after opening the PR
