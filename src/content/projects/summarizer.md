---
title: "CLI/LLM Project: Summarizer"
date: "2025-06-27"
description: "Local LLM Git Commit Summarizer"
technologies:
  - "Shell"
  - "Javascript"
links:
  - text: "Github"
    url: "https://github.com/AGLFlorida/summarizer"
applicationCategory: "GenAI utilility"
operatingSystem: "MacOS"
---

## Overview
This project sets up two open-source LLMs locally Mixtral-8x7B-Instruct and Phi-3 Mini. It uses Ollama to run AI summarization tasks entirely offline.

It includes a NodeJS script that:

- Retrieves commit messages from your Git repo
- Sends them to the selected model
- Returns a press-release-style summary for changelogs, tag messages, etc.

## What It Does
- Uses git describe and git log to get commit messages since the last tag
- Builds a natural-language prompt with that history
- Sends it to Ollama’s local model endpoint
- Streams and sanitizes the response
- Prints a one-paragraph customer-facing summary