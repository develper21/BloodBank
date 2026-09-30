# 📄 Development Rules

## BloodBridge – Project Guidelines for AI & Human Collaboration

This document defines the development rules, coding standards, and best practices for the BloodBridge application. These rules ensure consistency, maintainability, security and quality. Both AI assistants and human contributors must follow these guidelines.

---

## 1️⃣ General Principles

These rules apply to the entire project.

- ✅ Follow the project documentation ([PRD](PRD.md), [ARCHITECTURE](ARCHITECTURE.md), [DESIGN](DESIGN.md)) before making any change.
- ✅ Keep the code clean, readable and well-structured.
- ✅ Prioritize simplicity and maintainability.
- ✅ Do not duplicate logic. Reuse existing components, utilities or services.
- ✅ Make small, focused changes instead of large, risky edits.
- ✅ Do not modify unrelated files.
- ✅ Write self-explanatory code with meaningful variable and function names.
- ✅ Keep the `#region` comment convention used across backend files (`// #region Name`).

## 2️⃣ Technology & Coding Standards

Rules related to the tech stack and coding style.

| | Rule | Details |
|---|---|---|
| 🟨 **Language** | JavaScript ESM (`import/export`) | Both Backend and Frontend use ES modules — no CommonJS `require` in new code. |
| ⚛️ **Frontend** | React 18 + Vite | Functional components + hooks only; pages in `src/pages`, layouts in `src/layouts`. |
| 🌐 **API calls** | Via `src/services/*` only | Never call `axios` directly inside pages — add the call to the matching service file. |
| 🎨 **Styling** | Tailwind CSS | Follow the palette in [DESIGN](DESIGN.md); no inline `style={{}}` unless dynamic. |
| 🖥 **Backend** | Express 5 layered pattern | Route → middleware → controller → model. No DB access inside routes. |
| 🔐 **Auth** | JWT + bcryptjs | Passwords always hashed (10 rounds); tokens expire in 24h; never log secrets. |
| 🛡 **Authorization** | Middleware chain | `authMiddleware` → `adminAuthMiddleware`/`superAdminAuthMiddleware` → `organizationAuthMiddleware` → `roleMiddleware([...])`. |
| 🧱 **Data** | MongoDB native driver via `models/` | All collection access goes through `models/`; controllers never build raw queries. |
| ⚡ **Caching** | Redis middleware | Public listings are cached; write routes must invalidate affected keys. |
| 🧪 **Testing** | Jest + RTL (unit), Cypress (e2e) | New features need at least one unit test; run `npm test` before PRs. |
| 📦 **Dependencies** | Stable, well-maintained packages | No new dependency without discussion; pin versions in `package.json`. |
| 📁 **File Naming** | PascalCase components, camelCase utils | `HospitalRoutes.js`, `OrganizationUsersRoutes.js`, `getOrganizationStatus.js`. |

## 3️⃣ Project Structure

Follow the defined folder structure in [ARCHITECTURE](ARCHITECTURE.md).

- ✅ Reusable UI components go in `Frontend/src/components/`.
- ✅ Role-specific pages stay in `src/pages/{hospital,bloodbank,ngo,superadmin}/`.
- ✅ Backend business logic lives in `controllers/`, data access in `models/` — never mix them.
- ✅ New routes must be mounted in `Backend/app.js` inside the `#region ApiRoutesSetup` block.
- ✅ Types/shapes of request bodies must be documented as JSDoc comments above each route (existing convention).
- ❌ Do not create new top-level folders without a clear reason documented in ARCHITECTURE.md.

## 4️⃣ API & Security Rules

- ✅ Every response follows the envelope: `{ success, message, data }` (or `{ success, error }` for failures).
- ✅ Organization-scoped endpoints must verify `req.user.organizationCode` matches the requested resource.
- ✅ Only SuperAdmin can approve/reject/suspend organizations.
- ✅ Login endpoints use `loginLimiter` (rate limiting) — do not remove it.
- ✅ PII (email, phone, name) must be masked in logs — use `middleware/compliance.js` helpers.
- ✅ Keep the Postman collections (`Backend/Postman/postman.json`, `Frontend/Postman/postman.json`) updated whenever a route changes.

## 5️⃣ Git & Delivery Rules

- ✅ Small, descriptive commits (`feat: add blood stock shortage alerts`).
- ✅ Never commit `.env`, `credentials.txt`, `dump.rdb` or generated `coverage/` files.
- ✅ Update [TASKS](TASKS.md) status and [MEMORY](MEMORY.md) notes after completing a task.
