---
title: "Punch In [Beta]"
date: "2026-05-29"
description: "A Mac desktop app for tracking time across projects and clients."
type: "mobile-app"
price: "Free"
image: "/assets/punchin.png"
features:
  - "Menu-bar tray showing active project and live elapsed time"
  - "Timer view: start/stop sessions against existing or new tasks"
  - "Sessions view: full history with per-session delete and filtering by company and date"
  - "Reports view: daily and week-to-date rollups, filterable by company and date"
  - "Configure view: manage companies and projects with unsaved-changes guard"
  - "Local-first SQLite storage — no account, no cloud"
  - "Auto-stops sessions running over 24 hours"
technologies:
  - "Electron"
  - "TypeScript"
  - "Next.js"
  - "SQLite"
links:
  - text: "GitHub"
    url: "https://github.com/AGLFlorida/punch-in"
---

Punch In is a Mac desktop app for tracking time across projects and clients. It lives in your menu bar and shows your current task and elapsed time at a glance—start and stop sessions without breaking focus.

Under the hood it's a full Electron app with a Next.js renderer. Four screens cover the whole workflow: **Timer** to start and stop sessions, **Sessions** to browse and delete individual records, **Reports** for daily and week-to-date rollups by project, and **Configure** to manage your companies and projects.

All data is stored locally in a SQLite database. No accounts, no sync, no subscription.

Built for developers and freelancers who bill by the hour and want something fast and out of the way.
