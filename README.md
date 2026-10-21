# Praveen — 3D Space Portfolio

Built with React, Vite, Three.js (React Three Fiber + Drei) and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The output goes to `dist/`.

## Deploy on Netlify / Vercel

- Build command: `npm run build`
- Publish directory: `dist`

## Update content

All text, links, projects, skills and education are in `src/data.js`.
Images are in `public/img/`.

## How the 3D works

- `src/Scene.jsx` — the space scene (stars, planets, galaxy, floating crystals, sun).
- The camera flies forward as you scroll (`src/scroll.js` holds the scroll value).
- Mouse movement adds a small parallax.
