# 📋 Product Requirements Document (PRD)

## BloodBridge – Blood Donation Management Platform

| | |
|---|---|
| **Version:** | 1.0 |
| **Date:** | Sep 30, 2026 |
| **Author:** | Team BloodBridge |
| **Status:** | Draft |
| **Target Launch:** | MVP (v1.0) |

---

## 1. Product Overview

BloodBridge is a web application that connects **hospitals, blood banks, NGOs and donors** on a single platform. It digitizes the complete blood-supply chain: organization onboarding with admin approval, blood stock management, emergency blood requests, NGO donation camps with slot booking, hospital↔NGO drives, alerts and audit logging — all in one place.

## 2. Problem Statement

In emergency situations, hospitals struggle to find available blood of the right group at the right blood bank. Coordination happens over phone calls; donor camps and drives are managed on paper; and there is no single source of truth for blood stock across a city. This delay can cost lives.

## 3. Goals

- Provide a **single platform** connecting hospitals, blood banks, NGOs and donors.
- Reduce the time between an **emergency blood request** and its fulfillment.
- Digitize **organization registration → verification → approval** with full audit trails.
- Let NGOs manage **camps, slots and donor registrations** without spreadsheets.
- Give admins **real-time visibility** into stock levels, alerts and system health.

## 4. Target Users

- **Regular Users / Donors** — find camps, register for slots, track donations (age 18–65, tech-savvy smartphone users).
- **Hospitals** — raise urgent blood requests, collaborate with NGOs on donation drives.
- **Blood Banks** — manage stock, respond to requests, run NGO collection drives.
- **NGOs** — organize donation camps, manage slots and donor registries.
- **Admin / SuperAdmin** — verify and approve organizations, monitor alerts, audit logs and system health.

## 5. Core Features (MVP)

1. **Authentication** – User signup/login, organization-user login (JWT), admin & superadmin login (rate-limited).
2. **Organization Registration** – 3-step public wizard → auto-generated `organizationCode`/`registrationCode` → PENDING status → SuperAdmin approve/reject/suspend.
3. **Organization User Management** – Org admins create/update/delete staff users, change passwords, role-based access.
4. **NGO Camps & Slots** – Create camps, create time slots with capacity, donors book slots, camp registration lists.
5. **Donor Flows** – Direct donor registration (landing page), camp registration with 90-day eligibility rule, donation recording.
6. **Blood Requests** – Hospital creates request (CRITICAL→ admin approval), blood bank accepts/processes/fulfills/rejects, communication logs, stats & response-time.
7. **NGO Drives** – Blood bank↔NGO and Hospital↔NGO drive lifecycle: create → approve → start → collect → complete/cancel.
8. **Blood Stock** – Initialize stock, add/remove units, per-group/blood-bank breakdown, shortage alerts.
9. **Alerts & Audit** – Alert center (severity, type, read/unread), admin audit logs with entity/action filters.
10. **Dashboards & Ops** – SuperAdmin dashboard (orgs, stock, users, activity, health), public directories, monitoring, GDPR/HIPAA compliance endpoints.
