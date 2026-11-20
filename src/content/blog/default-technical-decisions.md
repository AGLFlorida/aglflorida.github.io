---
title: "Three Technical Decisions Your Team Makes by Default"
date: "2026-12-18"
excerpt: "The decisions that compound fastest are the ones no one actually made."
products:
  - "fractional-cto"
---

## Decisions by Inaction

Not every technical decision is made in a meeting or a design doc. Many of the most consequential ones are made by default: whoever cares most wins the debate, the team copies the approach used last time, or the question gets deferred until inaction becomes a decision.

These defaults are not always wrong. Sometimes the approach from the last project is the right one. Sometimes a decision deferred indefinitely turns out not to matter. The problem is that you cannot tell the difference until the defaults have been compounding for a year or two and the technical debt is visible from across the organization.

Here are three that come up repeatedly.

## 1. The Architecture That No One Decided To Keep

Most systems start with an architecture chosen for the first version: a simple monolith, a two-service split, a schema that made sense for the first three features. As the product grows, the architecture grows with it - but through accretion, not through deliberate choices.

Each team adds its piece. Each service gets its own patterns. No one decided to keep the original architecture; they just kept building on top of it because changing the foundation is expensive and the foundation works well enough.

Until it does not.

The right time to revisit architecture is not when it is breaking. It is at a planned interval, with someone in the room who can see the whole system and ask whether what you have is still the right shape for where you are going.

## 2. The Build-vs-Buy Question That Was Never Asked

When a new capability is needed - authentication, payments, notifications, analytics - someone picks an approach. Usually whoever is building the feature picks the approach, based on what they know and what is fastest.

That is a reasonable way to pick tools. It is a poor way to make infrastructure decisions.

Build-versus-buy is a question with real financial and operational consequences. The right answer depends on differentiation (is this something that makes you uniquely valuable, or a commodity function?), operational burden (who maintains it over time?), and strategic risk (can you migrate off this if you need to?).

Teams without a senior technical decision-maker in that conversation regularly build things they should have bought and buy things they should have built. Both mistakes are expensive to unwind.

## 3. The Standard That Exists in One Person's Head

Coding standards, testing expectations, deployment practices, incident response playbooks - at a certain team size, these need to be written down and owned. At a smaller team size, they are usually unwritten but consistent, because the same two or three people make most of the decisions.

The problem arises when the team grows past the size where unwritten standards hold. New engineers bring their own conventions. Senior engineers are inconsistent because they never had to articulate the standard. Code review becomes negotiation rather than enforcement.

The standard still exists - but only in one person's head. Making it explicit is a forcing function that surfaces disagreements, closes gaps, and gives new engineers a faster path to making decisions the team would endorse.

## Why These Accumulate

All three of these patterns have the same underlying cause: the team is executing, not steering. That is correct - executing is the job. The steering layer is a separate capacity, and it is the first thing that gets dropped when the team is busy.

A [Fractional CTO engagement](/products/fractional-cto) is specifically that steering capacity: someone who can hold the architecture question, ask build-versus-buy at the right time, and make the unwritten standards visible - without pulling the engineering team out of execution mode.

If your team is good at shipping but the technical decisions are piling up, that is the problem a fractional CTO is built for.

## Get Started

- Full details: [aglflorida.com/products/fractional-cto](/products/fractional-cto)
- Start a conversation: [aglflorida.com/contact](/contact)

## Contact & Media Inquiries

For interviews, partnerships, or review access, please contact:

**Brandon Shoop**
Founder, AGL Consulting
Website: [aglflorida.com/contact](/contact)
