---
title: "Where Does the Ticket Actually Wait?"
date: "2026-12-11"
excerpt: "Sprint boards show you what is in progress. They do not show you where everything is sitting still."
products:
  - "workflow-automation"
---

## The Question Boards Do Not Answer

A sprint board tells you what state a ticket is in: backlog, in progress, in review, done. It does not tell you how long the ticket has been in each state. It does not tell you whether "in review" means actively being reviewed right now or waiting in a queue for three days.

The question that actually matters for a delivery pipeline is not "what is in progress?" It is "where is everything sitting still?"

That distinction is the difference between a team that feels busy and a team that ships quickly. Most software teams are extremely busy. Far fewer ship as fast as they could.

## Waiting Time vs. Working Time

If you trace a typical ticket from creation to close, you will find that active working time - someone actually thinking about the problem and changing code - is a small fraction of the elapsed time. The rest is waiting.

Waiting to be refined. Waiting to be picked up. Waiting for a review. Waiting for a CI run. Waiting for QA. Waiting for a release window.

None of these waits show up as blockers on the sprint board. They are invisible in a velocity chart. They do not raise a flag in the daily standup. They are just the ambient texture of how the work moves, and they are where most of the time actually goes.

Goldratt's constraint theory makes this precise: in any pipeline, the bottleneck - the slowest step - determines total throughput. Everything else is downstream of that one constraint. The right move is to find it, name it, and address it. Speeding up steps that are not the constraint does not help.

## What a Ticket Map Reveals

One diagnostic we use in a [Workflow Automation Audit](/products/workflow-automation) is a ticket map: for a sample of recently closed tickets, trace how long each spent in each state. The pattern that emerges almost always surprises the team.

Common findings:

- Code sits in review for 2-3 days before anyone picks it up, often because review is treated as a synchronous interruption rather than a scheduled queue.
- CI pipelines run for 20-45 minutes on changes that only affected a single service, because the pipeline has not been updated to scope the test run to what actually changed.
- QA is a synchronous handoff, so tickets wait until a QA engineer is free rather than queuing behind the engineers already working.
- Release windows are weekly or biweekly, so tickets that finish Thursday wait until the following Tuesday to ship.

Each of these is a solvable problem. None of them require the team to work harder.

## The Fix Is Usually Not More People

The instinct when shipping is slow is to add more engineers. Sometimes that is right. More often, the team already has the capacity to ship faster - it is just sitting in the waits.

Before expanding the team, map where the tickets actually spend their time. The bottleneck is almost always visible once you look for it, and the solution is usually automation, a changed process, or a released constraint - not a new hire.

That mapping, and a prioritized plan for addressing what it reveals, is the core output of a [Workflow Automation Audit](/products/workflow-automation). The engagement maps your software delivery lifecycle end to end and identifies where automation will have the most impact, then provides hands-on guidance implementing it. Everything is documented and owned by your team, not ours.

## Get Started

- Learn more about the [Workflow Automation Audit](/products/workflow-automation)
- Start a conversation: [aglflorida.com/contact](/contact)

## Contact & Media Inquiries

For interviews, partnerships, or review access, please contact:

**Brandon Shoop**
Founder, AGL Consulting
Website: [aglflorida.com/contact](/contact)
