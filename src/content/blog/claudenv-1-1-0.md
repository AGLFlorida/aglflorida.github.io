---
title: "Founder Spotlight: claudenv v1.1.0"
date: "2026-10-15"
excerpt: "A small shell tool our founder built to switch Claude Code accounts the way nvm switches Node versions."
---

# Founder Spotlight: claudenv v1.1.0

**October 15, 2026** — claudenv v1.1.0 is out, a small fix to the open-source tool our founder built to keep client and personal Claude Code accounts apart.

If you use Claude Code across more than one account, you know the friction of logging out and back in. claudenv fixes it with a shell function that works like nvm or venv.

## What It Does

- **Switch accounts with one command**, or pick from a list
- **Auto-activation**: drop a `.claudenvrc` file in a project folder and the right account activates when you `cd` in
- **Prompt awareness**: your prompt shows which account is live

## What's New in v1.1.0

A single, user-facing fix: the prompt prefix no longer piles up when a Python virtual environment is active.

## The Problem It Solves

Claude Code logs in once per machine, not once per project. That's fine if you only ever touch one account, but it breaks down the moment you're doing client work on one Claude account and personal projects on another. Every switch meant logging out, logging back in, and hoping you remembered which account you'd landed on before you started typing in the wrong context.

claudenv treats accounts the way nvm treats Node versions or a Python venv treats a virtual environment: a named thing you switch into, not a global setting you have to remember to reset. Run `claudenv work` and you're on the work account. Run `claudenv list` and you see every account you've registered, with the active one marked. Drop a `.claudenvrc` file in a project's root and the right account activates automatically the moment you `cd` into that folder, no command to remember at all.

## Why We Build Things Like This

We build tools like this when our own workflow gets in the way, not because there's a product roadmap that calls for them. claudenv started as a one-off shell function to solve an annoyance during a client engagement, and it stuck around because the annoyance didn't go away on its own. It's open source and macOS-first, and if it's useful to you too, that's a bonus, not the point.

## Get It

- Repo and docs: https://brandonshoop.com/claude-env/

## Contact & Media Inquiries

For interviews, partnerships, or review access, please contact:

**Brandon Shoop**
Founder, AGL Consulting
Website: https://aglflorida.com/contact
