const isCanvas = document.querySelector<HTMLCanvasElement>('#screen');
if (!isCanvas) throw new Error('Canvas #screen not found');
export const canvas = isCanvas;
export let w = canvas.clientWidth;
export let h = canvas.clientHeight;

const isCtx = canvas.getContext('2d');
if (!isCtx) throw new Error('Canvas 2D context not available');
export const ctx = isCtx;

export function resize(): void {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  w = canvas.clientWidth;
  h = canvas.clientHeight;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
