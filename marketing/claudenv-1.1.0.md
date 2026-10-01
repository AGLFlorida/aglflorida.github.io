---
product: claudenv (founder open-source tool, not an AGL product)
version: v1.1.0
release: https://github.com/1shooperman/claude-env/releases/tag/v1.1.0
date: 2026-10-01
---

## X
Founder Spotlight: claudenv. Our founder built a small shell tool that switches Claude Code accounts the way nvm switches Node versions. v1.1.0 fixes a prompt bug when a Python venv is active.

https://brandonshoop.com/claude-env/?utm_source=x&utm_medium=social&utm_campaign=claudenv-1.1.0

#ClaudeCode

230/280

[Add to Buffer](https://buffer.com/add?text=Founder%20Spotlight%3A%20claudenv.%20Our%20founder%20built%20a%20small%20shell%20tool%20that%20switches%20Claude%20Code%20accounts%20the%20way%20nvm%20switches%20Node%20versions.%20v1.1.0%20fixes%20a%20prompt%20bug%20when%20a%20Python%20venv%20is%20active.%0A%0Ahttps%3A//brandonshoop.com/claude-env/%3Futm_source%3Dx%26utm_medium%3Dsocial%26utm_campaign%3Dclaudenv-1.1.0%0A%0A%23ClaudeCode): select the X channel only.

Visual: terminal screenshot of `claudenv list` with the active env marked and the prompt prefix showing.

## LinkedIn
Founder Spotlight: the small tool our founder built to keep client and personal Claude Code accounts apart.

If you use Claude Code across more than one account, you know the friction of logging out and back in. claudenv fixes it with a shell function that works like nvm or venv:

- Switch accounts with one command, or pick from a list
- Drop a .claudenvrc file in a project folder and the right account activates when you cd in
- Your prompt shows which account is live

v1.1.0 is a small fix: the prompt prefix no longer piles up when a Python virtual environment is active.

We build tools like this when our own workflow gets in the way. It is open source and macOS-first.

How do you keep work and personal AI tooling separate?

https://brandonshoop.com/claude-env/?utm_source=linkedin&utm_medium=social&utm_campaign=claudenv-1.1.0

#ClaudeCode #DeveloperTools #OpenSource #AIEngineering

[Add to Buffer](https://buffer.com/add?text=Founder%20Spotlight%3A%20the%20small%20tool%20our%20founder%20built%20to%20keep%20client%20and%20personal%20Claude%20Code%20accounts%20apart.%0A%0AIf%20you%20use%20Claude%20Code%20across%20more%20than%20one%20account%2C%20you%20know%20the%20friction%20of%20logging%20out%20and%20back%20in.%20claudenv%20fixes%20it%20with%20a%20shell%20function%20that%20works%20like%20nvm%20or%20venv%3A%0A%0A-%20Switch%20accounts%20with%20one%20command%2C%20or%20pick%20from%20a%20list%0A-%20Drop%20a%20.claudenvrc%20file%20in%20a%20project%20folder%20and%20the%20right%20account%20activates%20when%20you%20cd%20in%0A-%20Your%20prompt%20shows%20which%20account%20is%20live%0A%0Av1.1.0%20is%20a%20small%20fix%3A%20the%20prompt%20prefix%20no%20longer%20piles%20up%20when%20a%20Python%20virtual%20environment%20is%20active.%0A%0AWe%20build%20tools%20like%20this%20when%20our%20own%20workflow%20gets%20in%20the%20way.%20It%20is%20open%20source%20and%20macOS-first.%0A%0AHow%20do%20you%20keep%20work%20and%20personal%20AI%20tooling%20separate%3F%0A%0Ahttps%3A//brandonshoop.com/claude-env/%3Futm_source%3Dlinkedin%26utm_medium%3Dsocial%26utm_campaign%3Dclaudenv-1.1.0%0A%0A%23ClaudeCode%20%23DeveloperTools%20%23OpenSource%20%23AIEngineering): select the AGL Consulting LinkedIn page only.

Visual: one screenshot of the prompt with an active env, or a 3-slide carousel: the problem (juggling accounts) -> `claudenv work` -> `.claudenvrc` auto-activation.

## Pillar
2. How we build (founder spotlight on a self-built dev tool). Not a pillar 1 release post; v1.1.0 is a single bug fix.

## Before queueing
Why you built it: the moment juggling Claude Code accounts annoyed you enough to write a tool. Also confirm the company page should promote a personal repo, and whether to link brandonshoop.com or the GitHub repo.

## Source changes used
- Prevent claudenv prefix accumulation when a Python venv is active: prompt stays clean. Only user-facing change in v1.1.0.
- Feature list (switching, .claudenvrc auto-activation, prompt prefix) taken from the README, not the release notes.

## Left out
- Install/upgrade mechanics, SHA256 check, oh-my-zsh tips, WSL roadmap, PR number.
