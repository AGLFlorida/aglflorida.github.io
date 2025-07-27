---
title: "The Archivist"
date: "2025-07-27"
excerpt: "We tried vibe coding some CLI tooling."
---

# Android Archivist: Because You'll Overwrite your `.aab` and deobfuscation files on the next build...

We needed a CLI tool to help us keep track of our Android release artifacts. Because somewhere between `app-release.aab`, `mapping.txt`, three different version numbers, and a panicked upload to the Play Console... things tended to disappear.

## The Problem

We kept losing track of our builds. Not existentially — just literally. Was that `app-release.aab` from version 1.2.0? Or 1.3.0 with version code 15? Who knows. Play Console wasn’t about to help, and we don't commit our android build folders for our React Native projects. 

## What We Built

A simple tool that we called `archivist`:

- Grabs your `.aab` and `mapping.txt` from the standard Android build outputs
- Sorts them into a versioned folder structure like: `archive/com.example.app/1.3.0/16/`
- Configurable via `.archiveconfig.json` (which we don’t commit to Git because we’re not monsters)
- Includes a tiny Python web server so you can browse or serve the files locally

## How to Use It

Once you've sourced our little shell function:

```sh
archivist 1.4.0 19 com.example.app
```

That’s it. Your bundle is safe. You can sleep at night.

## The Vibe

- We wrestled with `make`, `ts-node`, and `Ctrl+C` throwing tracebacks.
- We misquoted enough shell variables to build a shrine.
- But we now have a reproducible, portable way to archive Android bits without guessing filenames or repeating ourselves.

If you ship Android builds, and you’d rather be writing code than spelunking through `android/app/build/outputs`, give it a look. It’s not flashy. It’s not fancy. But it works, and that’s kind of the whole point.

See the source here: https://github.com/AGLFlorida/android_archivist