---
title: "Punch In: Time Tracker"
date: "2025-11-19"
description: "A small electron app for time tracking."
technologies:
  - "Electron"
  - "Typescript"
links:
  - text: "Github"
    url: "https://github.com/AGLFlorida/punch-in"
applicationCategory: "Desktop Application"
operatingSystem: "MacOS"
---

# Overview
A focused, minimal Mac menu-bar Electron app for tracking time by project. It combines a small Next.js renderer (Timer & Reports UI) with a TypeScript Electron main process and a local SQLite database for durable storage. Now with 40% more vibe coding.

## Key ideas
- Lightweight: minimal UI for quickly starting/stopping tracked sessions.
- Local-first: uses a local SQLite DB (better-sqlite3) stored in Electron's userData directory.
- Simple integration surface: renderer talks to the main process via a single preload bridge window.tp.

## Highlights
- Tray/menu-bar item showing current project & elapsed time
- Next.js renderer for the UI (located at src/renderer)
- TypeScript main process and services (src/main) with a clear service layer and IPC handlers

## Requirements
- arm64 MacOS
- electron 38.7.0