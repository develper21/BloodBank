# 🏛 System Architecture

## BloodBridge – Blood Donation Management Platform

This document describes the overall system architecture, technology stack, folder structure, data flow, and key design decisions for the **BloodBridge** application.

---

## 1. High-Level Architecture

BloodBridge follows a classic **client–server** architecture using React (Vite) on the frontend and Node.js/Express with MongoDB on the backend.

```
┌────────────┐        HTTPS         ┌─────────────────┐        HTTP/JSON        ┌──────────────────┐        Mongoose       ┌────────────┐
│    User    │ ◄──────────────────► │  React Frontend │ ◄─────────────────────► │ Express Backend  │ ◄───────────────────► │  MongoDB   │
│ (Browser)  │   React SPA (Vite)   │  (UI / Client)  │   Axios REST (JWT)      │ REST API Routes  │   Native Driver       │ (Atlas /   │
└────────────┘                      └─────────────────┘                         │ + Redis Cache    │                       │  Local)    │
                                                                                  └──────────────────┘                       └────────────┘
```

**Request flow:** Browser → React page → `src/services/*Api.jsx` (axios, Bearer token) → Express route → middleware chain (CORS → body parser → tracking → Redis cache → auth → role) → controller → model (MongoDB) → JSON response.

## 2. Technology Stack

Technologies used in the project and their purpose.

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + Vite 7 | UI framework and dev server |
| Language | JavaScript (ESM, JSX) | Type-safe-free, fast development |
| Styling | Tailwind CSS 3 | Modern, responsive UI |
| Routing | react-router-dom 6 | Client-side pages & protected routes |
| Charts | Recharts | Dashboard analytics |
| Notifications | react-hot-toast / react-toastify | User feedback |
| HTTP Client | Axios | API calls with token interceptor |
| Backend | Node.js + Express 5 | REST API server (port 5000) |
| Database | MongoDB (native driver) | Data persistence (collections) |
| Auth | JWT (jsonwebtoken) + bcryptjs | Stateless auth, password hashing |
| Cache | Redis | API response caching & invalidation |
| Monitoring | Sentry + custom performance monitor | Error tracking & health metrics |
| Compliance | AES-256-GCM, DSAR, audit logger | GDPR / HIPAA utilities |
| Testing | Jest + React Testing Library, Cypress | Unit & e2e testing |
| DevOps | Docker, Nginx, Render, GitHub | Deployment & source control |

## 3. Folder Structure

The project follows a **client/server split** to keep the code organized and scalable.

```
BloodBridge/
├── Backend/
│   ├── server.js              # Entry point (DB connect + listen on PORT)
│   ├── app.js                 # Express app, middleware, route mounting
│   ├── config/                # db, redis, sentry, performance
│   ├── middleware/            # auth, role, admin, cache, rate limiter, compliance
│   ├── routes/                # Route files grouped by role:
│   │   ├── auth/              #   /api/auth (register, login)
│   │   ├── organization/      #   /api/auth/org, /api/organization-users
│   │   ├── admin/             #   /api/admin/* (approvals, hospitals, bloodbanks,
│   │   │                      #     ngos, blood-stock, alerts, logs, dashboard,
│   │   │                      #     drives, requests)
│   │   ├── hospital/          #   /api/hospitals, hospital-ngo-drives,
│   │   │                      #     hospital-blood-requests
│   │   ├── ngo/               #   /api/ngo (camps, slots, registrations)
│   │   ├── donor/             #   /api/donor (register, donate)
│   │   ├── compliance/        #   /api/compliance (GDPR/HIPAA)
│   │   └── monitoring/        #   /api/monitoring (health, metrics)
│   ├── controllers/           # Business logic per domain
│   ├── models/                # MongoDB collection access layer
│   ├── utils/                 # code generators, helpers
│   └── tests/                 # Jest unit tests
├── Frontend/
│   ├── src/
│   │   ├── main.jsx           # App bootstrap
│   │   ├── App.jsx            # Router with protected routes per role
│   │   ├── layouts/           # Ngo, Hospital, BloodBank, SuperAdmin layouts
│   │   ├── pages/             # Landing, Login, Register, OrganizationRegistration,
│   │   │                      #   hospital/*, bloodbank/*, ngo/*, superadmin/*
│   │   ├── components/        # Shared UI (modals, cards…)
│   │   ├── context/           # React context (auth etc.)
│   │   └── services/          # Axios API modules (authApi, hospitalApi,
│   │                          #   bloodBankApi, ngoApi, superadminApi…)
│   └── tests/ + cypress/      # Frontend unit & e2e tests
├── Docs/                      # PRD, ARCHITECTURE, RULES, DESIGN, TASKS, MEMORY
├── Backend/Postman/postman.json      # Backend API collection
└── Frontend/Postman/postman.json     # Frontend service collection
```

## 4. Key Design Decisions

- **Role-based access**: every protected route chains `authMiddleware` → `organizationAuthMiddleware` / `adminAuthMiddleware` / `superAdminAuthMiddleware` → `roleMiddleware([...])`.
- **Organization codes** (`HOSP-DEL-001`, `BB-MUM-001`, `NGO-DEL-001`) are auto-generated and used as stable public identifiers; Mongo `_id` stays internal.
- **Approval workflow**: every organization registers as `PENDING`; only SuperAdmin can approve → approve creates the org admin user.
- **Caching**: Redis middleware caches hot public listings (blood banks, NGOs, search) and invalidates on writes.
- **Audit everything**: admin mutations write to audit logs; compliance module exposes encryption, PII masking, DSAR and retention policies.
