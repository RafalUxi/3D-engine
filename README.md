# Raw Aim

An aim trainer that runs on a 3D engine I wrote from scratch. No Three.js, no WebGL, no math libraries. Everything you see on screen comes out of one formula: `x / z`.

**Play it:** [aim.rafaltrzeciakowski.dev](https://aim.rafaltrzeciakowski.dev)

## How to play

| Input          | Action                  |
| -------------- | ----------------------- |
| Click **Play** | start a 15-second round |
| Mouse          | aim                     |
| Left click     | shoot                   |
| W A S D        | move                    |
| Esc            | pause                   |

The sensitivity slider is in the menu and on the pause screen. When the round ends you get hits, shots, misses and accuracy.

## How it works

### Projection

A point in front of the camera lands on the screen at

```
x' = d · x / z
y' = d · y / z
d  = (h / 2) / tan(fov / 2)
```

That's similar triangles: the further away something is (bigger `z`), the closer it gets to the center of the screen. The engine draws only points and lines on a 2D canvas, so this is the whole renderer.

### Camera

The formula assumes the eye sits at `(0, 0, 0)` and looks down `+z`. The camera can't actually move, so the world moves instead. Every point gets the camera position subtracted and is then rotated by the opposite of the camera's yaw and pitch. Turning your head right looks the same as the world turning left.

### Shooting

A shot is a ray from the camera along the crosshair. For each target:

```
s  = toTarget · dir            how far along the shot the target is
d² = |toTarget|² − s²          how far the shot passes from its center
hit if s > 0 and d² ≤ r²
```

A dot product and Pythagoras. When the shot hits more than one target, the closest one (smallest `s`) wins.

### Floor

The floor isn't a model. It's one rectangle drawn from the horizon line down. The horizon is where a point infinitely far away at eye level would land: `h / 2 + d · tan(pitch)`. It's the same `y / z · d` formula as before.

## Run locally

Requires Node 22.

```bash
npm install
npm run dev
```

| Script            | What it does                             |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | dev server with hot reload               |
| `npm run build`   | type check + production build to `dist/` |
| `npm run preview` | serve the production build               |
| `npm test`        | Vitest in watch mode                     |
| `npm run format`  | Prettier                                 |

## Project structure

```
src/
  math/        vectors, rotations, world → camera, shot direction
  engine.ts    projection and drawing points/edges on the canvas
  game/        targets, hit test, round stats
  ui/          menu, HUD and pause screen (React + Tailwind)
  inputs.ts    mouse, keyboard, pointer lock
  base.ts      canvas and context
  main.ts      game loop
```

The engine and the game loop are plain TypeScript. React is only used for the menus on top of the canvas.

## Stack

TypeScript, Vite, Canvas 2D, React + Tailwind for the UI, Vitest. Deployed on Vercel.

---

Made by Rafał Trzeciakowski · [GitHub](https://github.com/RafalUxi) · [YouTube](https://www.youtube.com/@Uxi_dev)
