---
product: Dual N-Back
version: 1.7.0
release: https://github.com/AGLFlorida/n-back/releases/tag/1.7.0
date: 2026-09-29
---

## X
Dual N-Back 1.7.0 is out on iOS and Android.

New: Guess Feedback. Tap a match and the button glows green if you got it, red if you missed. No more waiting for the score screen. Prefer training blind? Turn it off in Settings.

https://aglflorida.com/products/n-back?utm_source=x&utm_medium=social&utm_campaign=n-back-1.7.0

250/280

[Add to Buffer](https://buffer.com/add?text=Dual%20N-Back%201.7.0%20is%20out%20on%20iOS%20and%20Android.%0A%0ANew%3A%20Guess%20Feedback.%20Tap%20a%20match%20and%20the%20button%20glows%20green%20if%20you%20got%20it%2C%20red%20if%20you%20missed.%20No%20more%20waiting%20for%20the%20score%20screen.%20Prefer%20training%20blind%3F%20Turn%20it%20off%20in%20Settings.%0A%0Ahttps%3A//aglflorida.com/products/n-back%3Futm_source%3Dx%26utm_medium%3Dsocial%26utm_campaign%3Dn-back-1.7.0): select the X channel only.

Visual: short screen recording (or GIF) of a round with the green and red glow firing; a still of a green-glowing button if video is a hassle.

## LinkedIn
Dual N-Back 1.7.0 now tells you the instant a guess is right, or wrong.

Players told us they couldn't tell why a guess missed until the end-of-round score screen. So we fixed that:

- Guess Feedback: the button you press glows green for a correct match and red for a miss, right as you tap it
- It only reacts to real guesses, so letting a square pass gives nothing away
- On by default; one switch in Settings turns it off for a tougher session

Working-memory training runs on a tight feedback loop. Now you learn the pattern by playing instead of by reading the instructions.

Dual N-Back is free, works offline, and adapts its difficulty as you improve.

Learn more: https://aglflorida.com/products/n-back?utm_source=linkedin&utm_medium=social&utm_campaign=n-back-1.7.0
App Store: https://apps.apple.com/us/app/n-back-a-memory-game/id6743125322
Google Play: https://play.google.com/store/apps/details?id=com.agl.nback

Do you train with feedback on, or do you like to fly blind?

#BrainTraining #WorkingMemory #ReactNative

[Add to Buffer](https://buffer.com/add?text=Dual%20N-Back%201.7.0%20now%20tells%20you%20the%20instant%20a%20guess%20is%20right%2C%20or%20wrong.%0A%0APlayers%20told%20us%20they%20couldn%27t%20tell%20why%20a%20guess%20missed%20until%20the%20end-of-round%20score%20screen.%20So%20we%20fixed%20that%3A%0A%0A-%20Guess%20Feedback%3A%20the%20button%20you%20press%20glows%20green%20for%20a%20correct%20match%20and%20red%20for%20a%20miss%2C%20right%20as%20you%20tap%20it%0A-%20It%20only%20reacts%20to%20real%20guesses%2C%20so%20letting%20a%20square%20pass%20gives%20nothing%20away%0A-%20On%20by%20default%3B%20one%20switch%20in%20Settings%20turns%20it%20off%20for%20a%20tougher%20session%0A%0AWorking-memory%20training%20runs%20on%20a%20tight%20feedback%20loop.%20Now%20you%20learn%20the%20pattern%20by%20playing%20instead%20of%20by%20reading%20the%20instructions.%0A%0ADual%20N-Back%20is%20free%2C%20works%20offline%2C%20and%20adapts%20its%20difficulty%20as%20you%20improve.%0A%0ALearn%20more%3A%20https%3A//aglflorida.com/products/n-back%3Futm_source%3Dlinkedin%26utm_medium%3Dsocial%26utm_campaign%3Dn-back-1.7.0%0AApp%20Store%3A%20https%3A//apps.apple.com/us/app/n-back-a-memory-game/id6743125322%0AGoogle%20Play%3A%20https%3A//play.google.com/store/apps/details%3Fid%3Dcom.agl.nback%0A%0ADo%20you%20train%20with%20feedback%20on%2C%20or%20do%20you%20like%20to%20fly%20blind%3F%0A%0A%23BrainTraining%20%23WorkingMemory%20%23ReactNative): select the AGL Consulting LinkedIn page only.

Visual: one screenshot of a button mid-glow, or the same short clip as X. Not a launch, so no carousel.

## Pillar
1. Releases and launches.

## Before queueing
Add one real detail in your own voice, e.g. who asked for this or how it changed your own training.

## Source changes used
- feat: add visual guess feedback on button press: new "Guess Feedback" setting, on by default. The pressed button glows green/red at the moment of the guess; only fires on an actual press. Driven by player feedback (issue #139) that misses were only explained on the score screen.

## Left out
- fix: App Store rejection from default expo-av setting: removed an unused background-audio permission; nothing changes for users.
- fix: Upload Symbols Failed warnings: build tooling.
- 9 chores: dependency bumps (actions, npm, Expo group, Node 24), CI overhaul, compat-matrix lock, version/build bumps, issue templates.
- UTM tags on store links: App Store and Play ignore them; only the aglflorida.com link is tagged.
- Timing: 1.7.0 went live 2026-09-08 (App Store confirms 1.7.0), so this is a catch-up post, three weeks after release.
