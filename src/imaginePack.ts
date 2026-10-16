import { ctx, w, h } from './base';

export function drawViewfinder(color: string, width: number, height: number) {
  ctx.fillStyle = color;
  ctx.fillRect(w / 2 - width / 2, h / 2 - height / 2, width, height);
}
