---
title: "Automated Release Notes."
date: "2025-06-27"
excerpt: "Automating release notes from the git log!"
---

## AI Meets Release Notes: A Side Quest with Surprising Potential

At AGL Florida, we recently went down a rabbit hole: could AI generate human-readable, press-release-style summaries of our product updates—directly from our git log?The idea was simple: combine our conventionally structured commit messages with modern language models to auto-generate clean, consumable release notes. The implementation? A bit more chaotic.

We wired up a GitHub Actions workflow using Hugging Face’s hosted version of Mixtral-8x7B-Instruct and tested it alongside Phi-3 Mini, both in the cloud and offline via Ollama. Our repo summarizer handles the local orchestration, and you can see the whole process in our live GitHub workflow here.

So far? Results are promising—if a little unpredictable. Mixtral produced surprisingly fluent prose, and running it offline via Ollama opens up possibilities for secure, private automation. Bugs remain, and we’re still tuning how we extract and pass context, but this “side quest” is shaping into something more. We’ll keep iterating, and if you’re curious, the code’s open. We’d love your thoughts on how AI can clean up the messier parts of developer workflows.