import { ctx, w, h } from '../base';
import { fov } from '../engine';

export function drawViewfinder(color: string, width: number, height: number) {
  ctx.fillStyle = color;
  ctx.fillRect(w / 2 - width / 2, h / 2 - height / 2, width, height);
}

export function drawFloor(color: string, pitch: number) {
  ctx.fillStyle = color;
  const d = h / 2 / Math.tan(fov / 2);
  const horizonY = h / 2 + d * Math.tan(pitch);
  ctx.fillRect(0, horizonY, w, h - horizonY);
}
