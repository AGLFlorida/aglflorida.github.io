---
title: Email Capture on Guest WiFi
excerpt: A restaurant wanted open guest WiFi with email capture for marketing.
author: Brandon Shoop
date: "2026-01-31"
---

# Email Capture on Guest WiFi

A friend reached out for one of those “fun” projects: they wanted email capture on open guest WiFi for their restaurant so they could use it for customer marketing. We hadn’t done a job like this before, but the mix of networking and software fit what we do: routing, wireless, and a small capture stack running on-site.

## What We Built

The design was straightforward: guest WiFi handled by Ubiquiti, and a dedicated machine to run the capture and redirect flow.

- **Ubiquiti Dream Machine (UDM)** - Router and firewall; we used it to steer unauthenticated guest traffic to the capture flow and then out to the internet after sign-in.
- **Ubiquiti wireless access point (WAP)** - Guest SSID and connectivity.
- **Intel NUC** - Small-form-factor PC acting as the capture server. We ran the capture application on a XAMP-style stack so the client could serve the splash/capture page and store emails without depending on a third-party SaaS for the core flow.

The NUC lived on the same network as the UDM; guest traffic was redirected to the NUC for the capture page, then allowed through once the user submitted an address (or otherwise completed the flow the client wanted).

## Lab vs. On-Site

We built and tested everything in our lab. When we deployed on-site, we hit issues that didn’t show up in the lab: different environment, different constraints. We drove out to the site and worked through the deployment with the client. While we were there, we also improved the setup so the capture page wasn’t relying on HTTP and a raw IP.

## HTTPS and a Real Hostname

On-site we switched the guest capture from HTTP on a private IP (e.g. `192.168.x.x`) to HTTPS with an internal domain name. That gives guests a proper hostname in the browser and avoids mixed-content or “not secure” warnings when the rest of the web is HTTPS.

We used **Let’s Encrypt** for the certificate so the client didn’t have to pay for a commercial cert. The catch is renewal: Let’s Encrypt issues short-lived certs (e.g. 90 days), so someone has to renew them. We’ll need to help the client run renewal in a few months: either by walking them through it or by scripting it and documenting the process. That’s the main operational follow-up from this project.

## Takeaways

It turned out to be a fun, practical job. Ubiquiti for the network, a NUC and LAMP for the capture logic, and a trip onsite to fix deployment issues and lock in HTTPS and a proper hostname. If you’re considering something similar, plan for the gap between lab and real-world deployment and for certificate renewal from day one.
