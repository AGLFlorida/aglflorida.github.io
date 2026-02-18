---
title: Automation Rabbit Hole
date: "2026-02-18"
excerpt: When automating everything leads you down the rabbit hole.
author: Brandon Shoop
---

![Lighthouse report scores](/assets/lighthouse_scores.png)

We started running the Lighthouse CLI after tightening up accessibility (a11y) on this site. That led to a long pass fixing accessibility, best-practices, and SEO issues that Lighthouse reported. The cleanup was useful; what’s still open is whether to run Lighthouse in the build. In-tree would catch regressions early but add build time and noise if scores fluctuate. For now we’re running it on demand.

That said, we can't be sad about these scores.