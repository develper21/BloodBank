# 🧠 Project Memory

## BloodBridge – Context, Progress & Important Notes

This document keeps track of the current state of the project, important decisions, and things to remember. It helps maintain continuity across development sessions, AI assistants, or new contributors.

| 📅 | Last Updated | 👤 | Current Phase | 💾 |
|:---:|:---:|:---:|:---:|:---:|
| | **Sep 30, 2026** | | **Phase 6** — Docs, Testing & Alignment | MongoDB + Redis |

---

## 🎯 Current Status

- ✅ Project setup completed (Vite + React frontend, Express + MongoDB backend)
- ✅ Git repository initialized and pushed to GitHub
- ✅ Authentication (user, org-user, admin, superadmin) completed with JWT + rate limiting
- ✅ Organization registration → approval workflow completed
- ✅ All core domains live: hospitals, blood banks, NGOs, donors, camps, slots
- ✅ Emergency request + drive lifecycles completed
- ✅ Monitoring, compliance and audit logging completed
- 🔄 Working on documentation, Postman collections and API alignment (Phase 6)

## ✅ Completed Tasks

| # | Task | Completed On |
|---|---|---|
| 1.1 | Initialize Vite + React project | Done |
| 1.2 | Configure Tailwind CSS | Done |
| 1.3 | Set up Express + MongoDB backend | Done |
| 2.1 | Implement user register/login (JWT) | Done |
| 2.2 | Organization registration wizard | Done |
| 2.3 | Admin & SuperAdmin login + rate limiting | Done |
| 2.4 | Approval workflow (approve/reject/suspend) | Done |
| 2.5 | Organization user CRUD | Done |
| 3.1 | Hospital CRUD + nearby geosearch | Done |
| 3.2 | Blood bank management + verification | Done |
| 3.3 | Blood stock + shortage alerts | Done |
| 3.4 | NGO camps, slots, donor registration | Done |
| 4.1 | Blood request lifecycle (CRITICAL gate) | Done |
| 4.2 | NGO/Blood-bank & Hospital/NGO drives | Done |
| 4.3 | Alert center + audit logs | Done |
| 5.1 | SuperAdmin dashboard + monitoring | Done |
| 5.2 | GDPR/HIPAA compliance module | Done |
| 6.1 | Postman collections (Backend + Frontend) | Sep 30, 2026 |
| 6.2 | Docs folder (6 documents) | Sep 30, 2026 |

## 🔄 In Progress

| # | Task | Notes |
|---|---|---|
| 6.4 | Fix frontend↔backend route mismatches | PATCH `/admin/requests/:id/status`, PATCH `/admin/drives/:id/status`, GET `/admin/dashboard/stats|activities`, GET `/admin/requests/:id` (vs `/id/:id`) have no backend routes |
| 6.5 | Add auth middleware to admin request/drive routes | `/api/admin/requests/*` and `/api/admin/drives/*` are currently public |
| 6.6 | Raise frontend test coverage | jest --coverage |

## 📌 Important Notes

- **Secrets**: never commit `.env` / `credentials.txt` / `dump.rdb`; they exist locally only.
- **Codes**: organization codes (`HOSP-DEL-001`, `BB-MUM-001`, `NGO-DEL-001`) are the public identifiers; Mongo `_id` is internal.
- **Approval flow**: org registers as `PENDING`; SuperAdmin approval creates the org admin account.
- **CRITICAL requests**: need admin approval before blood banks can respond (`/api/admin/requests/approve`).
- **90-day rule**: donors can't re-register within 90 days of last donation (DonorController).
- **Role casing quirk**: `OrganizationUsersRoutes.js` uses `roleMiddleware(["Admin"])` for update/delete/stats but `["ADMIN"]` for create — JWT carries `role` from login; verify during testing.
- **Redis cache**: public blood-bank/NGO listings are cached; use write routes (which invalidate) or restart to clear.
- **CampRoutes.js** (`/api/... available-camps`) exists but is **not mounted** in app.js — public camps come from inline `app.js` routes instead.
- **Testing order**: start backend (`npm run dev`, port 5000) → run the login request of your role in Postman (token auto-saves) → then run folder requests top-to-bottom.

## 🔗 Key Files Map

| Need | File |
|---|---|
| Mount/inspect routes | `Backend/app.js` (ApiRoutesSetup region) |
| Backend API collection | `Backend/Postman/postman.json` |
| Frontend API collection | `Frontend/Postman/postman.json` |
| Auth logic | `Backend/controllers/Auth/AuthController.js` |
| Approval logic | `Backend/controllers/admin/ApprovalController.js` |
| Frontend API modules | `Frontend/src/services/*.jsx` |
| Design system | `Docs/DESIGN.md` |
| Task tracking | `Docs/TASKS.md` |
