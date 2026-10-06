---
title: "Case Study: Wrapping Up with SanosMD"
date: "2026-10-14"
excerpt: "Closing out a multi track engagement covering AI driven development, direct engineering, compliance, and infrastructure for an AI MedTech firm."
---

## Wrapping Up with SanosMD

We are closing out a multi track engagement with [SanosMD](https://sanosmd.com/), an AI MedTech firm building clinical documentation and care coordination tools for nursing and physician practice teams. The work spanned AI driven development, direct engineering, compliance, and infrastructure, running hands on inside their codebase rather than as advisory from the outside.

On the engineering side, this meant building out the clinical data layer that keeps SanosMD's tools in sync with facility EHR systems: live roster and chart views, a facility level sync and coverage model, and webhook driven updates so clinical changes show up without a manual refresh. We also stood up an internal operations console so the team can see sync coverage, manage customers and facilities, and act on webhook health without digging through logs.

Compliance was not treated as a separate workstream bolted on afterward. In a healthcare setting the review bar for anything patient facing is higher by default, so we built the guardrails into the same pipeline as the feature work: structured code review on every change (AI assisted and human), security and static analysis gates in CI, duplicate credential and secret checks, and documentation that has to match what the system actually does rather than what it was supposed to do.

On infrastructure, we rebuilt the deploy and access model on Terraform: scoped IAM roles and permissions boundaries, OIDC based CI (via Github Workflows) deploys instead of long lived credentials, Cognito backed authentication, and a full dev to prod cutover (DNS, load balancing, managed Postgres) done with a verification gate rather than a leap of faith.

The result is a small team that can ship AI assisted changes quickly without that speed costing them control: every change reviewed, every environment scoped down to what it needs, and a system that is easier to reason about today than when we started.

## Get Started
- Learn more about the AI Enablement Seminar: [https://aglflorida.com/products#services](https://aglflorida.com/products#services)
- Start a conversation: [https://aglflorida.com/contact](https://aglflorida.com/contact)
