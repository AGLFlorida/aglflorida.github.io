---
title: "Your Tests Are Catching Half Your Builds. That's Not a QA Problem."
date: "2026-11-27"
excerpt: "When half of what ships to QA fails there, the fix is not slower developers. It is better test automation."
products:
  - "workflow-automation"
---

## The Number That Should Concern You

If your test suite is catching roughly half of everything that arrives in QA as "ready to test," your first instinct might be to push harder on code review, slow the pipeline, or add more checkpoints before code leaves a developer's hands.

That instinct is wrong.

Half the builds failing QA is not a discipline problem. It is a test automation problem. The signal the number is sending is that your automated tests are not covering the paths your QA team is checking manually. QA is doing expensive, human verification of work that should have failed earlier and faster.

## What We Saw in a Past Engagement

In one AI enablement engagement, the team's testing was catching roughly half of what developers called ready to test. The fix was not more caution from the developers. It was more complete test automation so the team could move fast without passing fragile code downstream.

The distinction matters. When you treat a coverage gap as a people problem, you get slower developers and the same fragile pipeline. When you treat it as a system problem, you get a faster pipeline that surfaces failures at the right place.

The full story of that engagement - and what changed - is in our [AdvisorCheck case study](/blog/advisorcheck-ai-enablement).

## How the Gap Usually Forms

Test coverage gaps compound over time. The first few features ship with reasonable coverage. Then the team is under pressure and skips tests for a release or two. Then the system grows and the tests that do exist stop covering the paths that actually break. Then the gaps are too large to close incrementally, so they persist.

By the time the number lands at "half the builds fail QA," it usually represents months of deferred testing work, not a sudden drop in quality.

The debt compounds. Every new feature added without test coverage makes the existing gap larger in relative terms, even if the absolute coverage number stays flat.

## What the Fix Looks Like

The solution is not a one-time test blitz. That approach gets you to 60% coverage instead of 50%, and within a release cycle or two the gap opens again.

The durable fix is two things running together.

A test coverage gate: new code ships with tests. Not as a cultural aspiration - as a pipeline enforcement. Code that drops coverage below the threshold does not merge.

A deliberate backfill plan: the team allocates a fixed share of capacity - typically around 20% of sprint velocity - to closing coverage gaps in existing code, starting with the paths QA is currently catching manually.

Together, these stop the gap from growing and gradually reduce it. Neither works alone. The gate without the backfill leaves the existing debt in place. The backfill without the gate means you are closing gaps while opening new ones.

## Where This Fits in a Workflow Audit

Identifying this pattern and mapping a path out of it is a core part of a [Workflow Automation Audit](/products/workflow-automation). The audit looks at where code actually spends its time in your delivery pipeline - waiting to be reviewed, waiting to be tested, sitting in QA - and identifies where automation will have the most impact. Test coverage gaps consistently show up as one of the highest-leverage places to intervene.

The output is a prioritized roadmap plus hands-on guidance implementing it, with everything documented and owned by your team, not ours.

## Get Started

- Learn more about the [Workflow Automation Audit](/products/workflow-automation)
- Start a conversation: [aglflorida.com/contact](/contact)

## Contact & Media Inquiries

For interviews, partnerships, or review access, please contact:

**Brandon Shoop**
Founder, AGL Consulting
Website: [aglflorida.com/contact](/contact)
