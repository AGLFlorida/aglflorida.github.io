---
product: Founder Blog
version: n/a
release: https://brandonshoop.com/blog/tiny-local-model
date: 2026-11-24
---

## X
I plugged a local model into my coding agent. The session compacted before I typed a word. That was the wrong job. I measured what it is actually good for. https://brandonshoop.com/blog/tiny-local-model?utm_source=x&utm_medium=social&utm_campaign=tiny-local-model #llm

184/280

[Add to Buffer](https://buffer.com/add?text=I%20plugged%20a%20local%20model%20into%20my%20coding%20agent.%20The%20session%20compacted%20before%20I%20typed%20a%20word.%20That%20was%20the%20wrong%20job.%20I%20measured%20what%20it%20is%20actually%20good%20for.%20https%3A//brandonshoop.com/blog/tiny-local-model%3Futm_source%3Dx%26utm_medium%3Dsocial%26utm_campaign%3Dtiny-local-model%20%23llm): select the X channel only.

Visual: screenshot of the benchmark table or the tokens/sec formula block.

## LinkedIn
I had a misconception about local models. Pretrained means someone else paid for training. You still do the inference.

My first instinct was to wire it into my coding agent. The session compacted before I typed a word. Wrong job for the hardware.

I pulled a 2014 Mac mini out of a drawer, put Qwen 2B and 4B on it under llama.cpp, and measured what it is actually good for.

What I found:

- Generation speed is bound by memory bandwidth, not compute. More threads barely helped. Doubling the model roughly halved the speed.
- What it is actually good for: classification, structured extraction, overnight batches, and anything you would not send to a cloud API.
- Constrained output and thinking off is the right setup for short tasks. The model can still be wrong, but it cannot ramble.

I now run it as a small supporting layer in a custom agent workflow. It does the cheap, boring, private jobs overnight. The best part: when the box is slow or down, the worst case is falling back to the old behavior.

https://brandonshoop.com/blog/tiny-local-model?utm_source=linkedin&utm_medium=social&utm_campaign=tiny-local-model

What is the smallest, most practical use you have found for a local model?

#llm #softwaredevelopment #AIenablement #homelab

[Add to Buffer](https://buffer.com/add?text=I%20had%20a%20misconception%20about%20local%20models.%20Pretrained%20means%20someone%20else%20paid%20for%20training.%20You%20still%20do%20the%20inference.%0A%0AMy%20first%20instinct%20was%20to%20wire%20it%20into%20my%20coding%20agent.%20The%20session%20compacted%20before%20I%20typed%20a%20word.%20Wrong%20job%20for%20the%20hardware.%0A%0AI%20pulled%20a%202014%20Mac%20mini%20out%20of%20a%20drawer%2C%20put%20Qwen%202B%20and%204B%20on%20it%20under%20llama.cpp%2C%20and%20measured%20what%20it%20is%20actually%20good%20for.%0A%0AWhat%20I%20found%3A%0A%0A-%20Generation%20speed%20is%20bound%20by%20memory%20bandwidth%2C%20not%20compute.%20More%20threads%20barely%20helped.%20Doubling%20the%20model%20roughly%20halved%20the%20speed.%0A-%20What%20it%20is%20actually%20good%20for%3A%20classification%2C%20structured%20extraction%2C%20overnight%20batches%2C%20and%20anything%20you%20would%20not%20send%20to%20a%20cloud%20API.%0A-%20Constrained%20output%20and%20thinking%20off%20is%20the%20right%20setup%20for%20short%20tasks.%20The%20model%20can%20still%20be%20wrong%2C%20but%20it%20cannot%20ramble.%0A%0AI%20now%20run%20it%20as%20a%20small%20supporting%20layer%20in%20a%20custom%20agent%20workflow.%20It%20does%20the%20cheap%2C%20boring%2C%20private%20jobs%20overnight.%20The%20best%20part%3A%20when%20the%20box%20is%20slow%20or%20down%2C%20the%20worst%20case%20is%20falling%20back%20to%20the%20old%20behavior.%0A%0Ahttps%3A//brandonshoop.com/blog/tiny-local-model%3Futm_source%3Dlinkedin%26utm_medium%3Dsocial%26utm_campaign%3Dtiny-local-model%0A%0AWhat%20is%20the%20smallest%2C%20most%20practical%20use%20you%20have%20found%20for%20a%20local%20model%3F%0A%0A%23llm%20%23softwaredevelopment%20%23AIenablement%20%23homelab): select the AGL Consulting LinkedIn page only.

Visual: 4-slide carousel
- Slide 1: "I thought pretrained meant the hard part was done." (hook + correction)
- Slide 2: Benchmark table - 2B at 11.6 tok/s vs 4B at 5.1 tok/s
- Slide 3: "What it is good for: classify, extract, batch, private data."
- Slide 4: Link + site callout

## Pillar
2 - How we build

## Before queueing
Add one sentence about why the coding agent failure was useful. The moment you saw the session compact before you typed anything is a sharper personal hook than the benchmark numbers.

## Source changes used
- Pretrained misconception + encyclopedia/inference analogy: the core reframe, shareable in one sentence
- Coding agent failure (context budget overrun): concrete, non-obvious failure mode worth calling out
- Classification/extraction/overnight/private use cases: practical, defensible
- Readiness check + stall tagger real usage: grounds the post in actual work
- "Saves money when it works, costs nothing when it doesn't": the right risk framing for a 2B model

## Left out
- Specific build hash and llama.cpp flags (-c, -np, -t, etc.): dev detail, not user-facing
- Temperature sensor readings: interesting but not the story
- Exact cold load time caveat ("from memory, not re-measured"): editorial honesty for the blog, noise for social
- mmap+mlock / systemd unit config: ops detail
