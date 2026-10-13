import { ctx, w, h } from './base';

export const fov = Math.PI / 4;

export function fillBG(color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
}

export function drawPoint2D(x: number, y: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 10, 10);
}

// y' = y/z * d
// d - screen distance
// same for x

export function calculateCoordinates(x: number, y: number, z: number) {
  // Behind the screen
  if (z <= 0) return null;
  const d = h / 2 / Math.tan(fov / 2);
  return {
    x: w / 2 + (x / z) * d,
    y: h / 2 - (y / z) * d,
  };
}
