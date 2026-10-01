---
product: VesseLog
version: 1.2.2
release: https://github.com/AGLFlorida/vesselog/releases/tag/1.2.2
date: 2026-10-01
---

## X
VesseLog now runs in your browser. Same maintenance calendar, service history, and vendor contacts as the mobile app, on a laptop at the marina office or a tablet at the dock. Nothing to install, just sign in.

https://vesselog.com/?utm_source=x&utm_medium=social&utm_campaign=vesselog-1.2.2&utm_content=web

234/280

[Add to Buffer](https://buffer.com/add?text=VesseLog%20now%20runs%20in%20your%20browser.%20Same%20maintenance%20calendar%2C%20service%20history%2C%20and%20vendor%20contacts%20as%20the%20mobile%20app%2C%20on%20a%20laptop%20at%20the%20marina%20office%20or%20a%20tablet%20at%20the%20dock.%20Nothing%20to%20install%2C%20just%20sign%20in.%0A%0Ahttps%3A//vesselog.com/%3Futm_source%3Dx%26utm_medium%3Dsocial%26utm_campaign%3Dvesselog-1.2.2%26utm_content%3Dweb): select the X channel only.

Visual: screenshot of the web app's maintenance calendar in a desktop browser window.

## LinkedIn
VesseLog is now on the web. Sign in from any browser and your whole fleet's maintenance is right there, no install required.

Not every maintenance job gets planned from a phone. The coaching staff building next week's launch schedule, or the owner lining up winter work with the yard, usually has a laptop open. So we put the full app in the browser:

- The same maintenance calendar, service history, and vendor contacts as the mobile app
- One account across your phone and your computer
- Works on desktop, tablet, and phone screens

For us this was a build-once decision: the web version runs the same screens as the mobile app, so a fix or a feature lands everywhere at once.

https://vesselog.com/?utm_source=linkedin&utm_medium=social&utm_campaign=vesselog-1.2.2&utm_content=web

Where do you do your boat planning: phone, laptop, or a notebook in the glovebox?

#Boating #BoatMaintenance #WebApps #ReactNative

[Add to Buffer](https://buffer.com/add?text=VesseLog%20is%20now%20on%20the%20web.%20Sign%20in%20from%20any%20browser%20and%20your%20whole%20fleet%27s%20maintenance%20is%20right%20there%2C%20no%20install%20required.%0A%0ANot%20every%20maintenance%20job%20gets%20planned%20from%20a%20phone.%20The%20coaching%20staff%20building%20next%20week%27s%20launch%20schedule%2C%20or%20the%20owner%20lining%20up%20winter%20work%20with%20the%20yard%2C%20usually%20has%20a%20laptop%20open.%20So%20we%20put%20the%20full%20app%20in%20the%20browser%3A%0A%0A-%20The%20same%20maintenance%20calendar%2C%20service%20history%2C%20and%20vendor%20contacts%20as%20the%20mobile%20app%0A-%20One%20account%20across%20your%20phone%20and%20your%20computer%0A-%20Works%20on%20desktop%2C%20tablet%2C%20and%20phone%20screens%0A%0AFor%20us%20this%20was%20a%20build-once%20decision%3A%20the%20web%20version%20runs%20the%20same%20screens%20as%20the%20mobile%20app%2C%20so%20a%20fix%20or%20a%20feature%20lands%20everywhere%20at%20once.%0A%0Ahttps%3A//vesselog.com/%3Futm_source%3Dlinkedin%26utm_medium%3Dsocial%26utm_campaign%3Dvesselog-1.2.2%26utm_content%3Dweb%0A%0AWhere%20do%20you%20do%20your%20boat%20planning%3A%20phone%2C%20laptop%2C%20or%20a%20notebook%20in%20the%20glovebox%3F%0A%0A%23Boating%20%23BoatMaintenance%20%23WebApps%20%23ReactNative): select the AGL Consulting LinkedIn page only.

Visual: 4-slide carousel (PDF document post):
1. "VesseLog, now in your browser" + app icon
2. Maintenance calendar on a desktop browser
3. Same screen side by side: phone and laptop
4. "Sign in at vesselog.com"

## Pillar
1. Releases and launches, with a pillar 2 (how we build) nod via the shared-screens line.

## Before queueing
- Confirm users sign in at vesselog.com itself (not a separate app subdomain) and that data is shared with their mobile account. Adjust the link and "one account" bullet if not.
- Add one real detail in your own voice, e.g. the moment you wanted VesseLog on a laptop.

## Source changes used
The web build shipped in 1.2.1; 1.2.2 is its public launch (1.2.2 itself adds only an Android fix and a dependency chore).
- feat: full web deployment / run the mobile app screens in the web portal: VesseLog is usable in a browser, no install.
- feat: web auth and web entitlements: same account and plan as mobile.
- fix: collapse web masthead buttons to icons on phone width: the web app works on small screens too.

## Left out
- Admin schedule debugger, dev documentation route, Firebase/App Check init, analytics/error reporting, og: tags, Hosting config: internal or invisible to users.
- Mobile-only items, incl. the 1.2.2 Android photo-permission fix: covered in the iOS and Android posts.
- 1.2.2 package-lock chore.
