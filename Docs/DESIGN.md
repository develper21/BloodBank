# 🎨 Design System

## BloodBridge – Clean. Urgent. Trustworthy.

This document defines the visual design system, UI components, and user experience guidelines for the BloodBridge application. The goal is a modern, warm, medical-trust interface with a consistent dark-red identity across all role portals.

---

## 1. Design Principles

| | | |
|:---:|:---:|:---:|
| 🫀 **Life-First** | 🧹 **Minimal & Clear** | 🧩 **Consistent** |
| Every screen serves the urgent mission: getting blood faster. | Reduce clutter; focus on stock, requests and camps. | One unified system across all 4 role portals. |

## 2. Color Palette

Primary colors used across the application (as implemented in the components).

| Swatch | Name | Value | Used for |
|---|---|---|---|
| 🟥 | **Primary / Brand Deep Red** | `#5c0f14` | Sidebar gradient start, portal identity |
| 🟥 | **Brand Mid Red** | `#75161d` | Sidebar gradient middle |
| 🟥 | **Brand Red** | `#9b1e27` | Sidebar gradient end, hover states |
| 🟥 | **Action Red** | `#8f0f1a → #c62832` (gradient) | Primary buttons (hospital portal) |
| 🩷 | **Accent Rose** | `#ff4d6d → #ff8fa3` (gradient) | Primary buttons (NGO/BloodBank portals) |
| 🩸 | **Landing CTA** | `red-500 → pink-500` (Tailwind) | Landing page hero buttons |
| 🟢 | **Success** | `emerald-500 → teal-500` (Tailwind) | Approve actions, registration wizard |
| 🟣 | **SuperAdmin** | `violet-500 → fuchsia-500` (Tailwind) | SuperAdmin login & identity |
| ⬛ | **Dark Background** | `slate-900 → slate-800` (Tailwind) | Landing/auth pages |
| ⬜ | **Light Surface** | `gray-50 → white` (Tailwind) | Portal main areas |
| 🟨 | **Warning** | `#d1661c → #f2994a` (gradient) | Caution actions |
| 🟥 | **Destructive** | `#d93f42 → #f08a8d` (gradient) | Reject / suspend / delete |

Sidebar recipe (all portals): `bg-gradient-to-b from-[#5c0f14] via-[#75161d] to-[#9b1e27]` with white text.

## 3. Typography

Default Tailwind font stack (system-ui) — clean, modern and highly readable.

| Element | Size | Weight |
|---|---|---|
| Page titles | `text-3xl` – `text-5xl` | `font-bold` |
| Card/stat numbers | `text-4xl` – `text-5xl`, gradient `bg-clip-text` | `font-bold` |
| Section headings | `text-xl` | `font-semibold` |
| Body | `text-sm` – `text-base` | normal |
| Buttons | `text-sm` – `font-bold` | `font-bold` |
| Gradient text | `bg-gradient-to-r from-red-400 via-pink-400 to-rose-300 bg-clip-text text-transparent` | — |

## 4. UI Components

Standard components to be used throughout the application.

- **Buttons**
  - `Primary` — rounded-full/rounded-2xl brand gradient, white text, `shadow-lg`, `hover:scale-[1.02]`.
  - `Secondary` — white/bordered, subtle shadow.
  - `Destructive` — `#d93f42 → #f08a8d` gradient (reject/suspend dialogs).
  - Disabled state: `disabled:opacity-50 disabled:cursor-not-allowed`.
- **Cards** — `rounded-2xl` / `rounded-[28px]`, `border border-white/10` on dark or `border-red-200` on light, `shadow-md hover:shadow-lg`.
- **Stat cards (dashboards)** — icon chip + big gradient number (`bg-clip-text text-transparent`).
- **Sidebar navigation** — 320px (`w-80`) gradient sidebar, section labels, role logout button at bottom; mobile drawer variant.
- **Tables / lists** — zebra-less rows, hover highlight, status chips.
- **Status chips** — PENDING (amber), APPROVED/VERIFIED (emerald), REJECTED (red), SUSPENDED (red outline), CRITICAL (red pulse).
- **Modals** — Radix UI dialog primitives, `rounded-2xl`, backdrop blur, confirm-footer with gradient primary button.
- **Toasts** — react-hot-toast / react-toastify, top-right.
- **Forms** — labeled inputs `rounded-xl border px-4 py-3`, focus ring in brand red, inline validation text in red.
- **Badges** — code badges for `organizationCode` (mono font).

## 5. Layout & Spacing

- Base spacing scale: Tailwind 4px system (`p-4`, `p-6`, `p-8`, `p-10`).
- Portal layout: fixed `w-80` sidebar + fluid `main` with `px-4 py-8 md:px-10`.
- Landing/auth: dark gradient background, centered card `max-w-md`, glassmorphism (`backdrop-blur-xl`, `bg-white/5`).
- Responsive: sidebar collapses into a right-side drawer below `lg`.

## 6. UX Guidelines

- Every destructive action opens a confirm dialog with required reason (mirrors backend validation).
- Critical emergencies are always visually loudest (red pulse chips, sorted on top).
- Show auto-generated codes (`organizationCode`, `registrationCode`) prominently after registration — they are needed for status checks.
- Long lists paginate (`page`/`limit`) with a visible count.
- Optimistic UI only for read paths; mutations always wait for the API envelope `{ success }`.
