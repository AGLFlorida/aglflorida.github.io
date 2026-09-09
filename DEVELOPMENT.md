# AGLFlorida.github.io

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/1shooperman/1shooperman.github.io.git
cd 1shooperman.github.io
npm install
```

## Usage

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Quality and security gates

These run in CI (`.github/workflows/ci.yml`) and can also be run locally:

```bash
npm run lint          # eslint, including eslint-plugin-security and eslint-plugin-no-unsanitized
npm run test
npm run validate:schemas
npm run check:unicode
npm run check:dupes   # jscpd copy-paste detection, see .jscpd.json
npm run compile
npm run build
```

`nodejsscan` was evaluated and intentionally not adopted: it ships as a Python/pip
tool with no npm package, and this project is a fully static export (`output:
'export'` in `next.config.ts`) with no Node.js server or API routes for it to
scan, so it would add a second language toolchain to CI for no coverage this
project actually has.