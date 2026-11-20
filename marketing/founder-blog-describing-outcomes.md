---
product: Founder Blog
version: n/a
release: https://brandonshoop.com/blog/describing-outcomes
date: 2026-11-20
---

## X
I told the AI to rewrite the app. It did. Nothing was right. Took me two days to realize the problem was the prompt, not the output. https://brandonshoop.com/blog/describing-outcomes?utm_source=x&utm_medium=social&utm_campaign=describing-outcomes #softwaredevelopment

177/280

[Add to Buffer](https://buffer.com/add?text=I%20told%20the%20AI%20to%20rewrite%20the%20app.%20It%20did.%20Nothing%20was%20right.%20Took%20me%20two%20days%20to%20realize%20the%20problem%20was%20the%20prompt%2C%20not%20the%20output.%20https%3A//brandonshoop.com/blog/describing-outcomes%3Futm_source%3Dx%26utm_medium%3Dsocial%26utm_campaign%3Ddescribing-outcomes%20%23softwaredevelopment): select the X channel only.

Visual: screenshot of the blog post header or the three-piece outcome framework section.

## LinkedIn
Spent a month on a rewrite. Expected to learn something about the new stack. The actual lesson was how to describe what I wanted.

Last month I rewrote a client's PHP/Vue app on a modern stack. What I learned:

- Describe behavior first. State what the system should do and for whom, in terms a user would recognize. If you cannot say it that way, you are not ready to hand it off.
- Write acceptance criteria a machine can run. We pixel-diffed every route at three breakpoints and replayed real API request/response pairs against the new backend. Measurable, not taken on trust.
- State constraints early. We started with Go for the API. Once we mapped the vendor integrations, nearly every one shipped a first-party Node SDK. We switched the spec to TypeScript. The AI did not err; the constraint had not been described yet.
- Keep passes small. "Rewrite this app" is not an outcome. Things clicked once we split it: capture the current app, inventory the backend, then port by screen group.

The full post is on my site. If you are adopting AI tooling on a project, the describing part is worth thinking through before you start.

https://brandonshoop.com/blog/describing-outcomes?utm_source=linkedin&utm_medium=social&utm_campaign=describing-outcomes

Where do you find the description hardest: the goal itself, the acceptance criteria, or the constraints?

#softwaredevelopment #AIenablement #consulting #webdevelopment

[Add to Buffer](https://buffer.com/add?text=Spent%20a%20month%20on%20a%20rewrite.%20Expected%20to%20learn%20something%20about%20the%20new%20stack.%20The%20actual%20lesson%20was%20how%20to%20describe%20what%20I%20wanted.%0A%0ALast%20month%20I%20rewrote%20a%20client%27s%20PHP/Vue%20app%20on%20a%20modern%20stack.%20What%20I%20learned%3A%0A%0A-%20Describe%20behavior%20first.%20State%20what%20the%20system%20should%20do%20and%20for%20whom%2C%20in%20terms%20a%20user%20would%20recognize.%20If%20you%20cannot%20say%20it%20that%20way%2C%20you%20are%20not%20ready%20to%20hand%20it%20off.%0A-%20Write%20acceptance%20criteria%20a%20machine%20can%20run.%20We%20pixel-diffed%20every%20route%20at%20three%20breakpoints%20and%20replayed%20real%20API%20request/response%20pairs%20against%20the%20new%20backend.%20Measurable%2C%20not%20taken%20on%20trust.%0A-%20State%20constraints%20early.%20We%20started%20with%20Go%20for%20the%20API.%20Once%20we%20mapped%20the%20vendor%20integrations%2C%20nearly%20every%20one%20shipped%20a%20first-party%20Node%20SDK.%20We%20switched%20the%20spec%20to%20TypeScript.%20The%20AI%20did%20not%20err%3B%20the%20constraint%20had%20not%20been%20described%20yet.%0A-%20Keep%20passes%20small.%20%22Rewrite%20this%20app%22%20is%20not%20an%20outcome.%20Things%20clicked%20once%20we%20split%20it%3A%20capture%20the%20current%20app%2C%20inventory%20the%20backend%2C%20then%20port%20by%20screen%20group.%0A%0AThe%20full%20post%20is%20on%20my%20site.%20If%20you%20are%20adopting%20AI%20tooling%20on%20a%20project%2C%20the%20describing%20part%20is%20worth%20thinking%20through%20before%20you%20start.%0A%0Ahttps%3A//brandonshoop.com/blog/describing-outcomes%3Futm_source%3Dlinkedin%26utm_medium%3Dsocial%26utm_campaign%3Ddescribing-outcomes%0A%0AWhere%20do%20you%20find%20the%20description%20hardest%3A%20the%20goal%20itself%2C%20the%20acceptance%20criteria%2C%20or%20the%20constraints%3F%0A%0A%23softwaredevelopment%20%23AIenablement%20%23consulting%20%23webdevelopment): select the AGL Consulting LinkedIn page only.

Visual: 4-slide carousel
- Slide 1: "Spent a month on a rewrite. The lesson had nothing to do with the stack." (hook)
- Slide 2: "An outcome has three parts: behavior, acceptance criteria, constraints."
- Slide 3: "Rewrite this app is not an outcome. Break it down."
- Slide 4: Link + site callout

## Pillar
2 - How we build

## Before queueing
Add one sentence about why this client project pushed you to write it down. A personal hook (e.g. the moment the Go-to-TypeScript pivot clicked) will make this land better than the lesson alone.

## Source changes used
- Rewrite of client PHP/Vue app: grounds the post in a real engagement, signals active consulting work
- Three-part outcome framework (behavior, acceptance criteria, constraints): the core transferable lesson
- Go-to-TypeScript pivot because of vendor SDK availability: concrete, non-obvious constraint story
- Pixel-diff and API replay as acceptance criteria: shows rigor, relevant to consulting buyers

## Left out
- Internal tooling details (Auth0 specifics, edge schema validation libraries)
- The "where this breaks" / skill atrophy section (useful in the blog; too nuanced for social)
- Links to prior posts (ai-isnt-an-sme, ai-ranked-content) - editorial context, not social-friendly
