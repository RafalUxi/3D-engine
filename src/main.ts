import './style.css';

const canvas = document.querySelector<HTMLCanvasElement>('#screen');
if (!canvas) throw new Error('Canvas #screen not found');

const ctx = canvas.getContext('2d');
if (!ctx) throw new Error('Canvas 2D context not available');

// Match the backing buffer to the CSS size (and device pixel ratio) so the dot stays sharp.
function resize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, 8, 0, Math.PI * 2);
  ctx.fill();
}

const frame = (): void => {
  draw(canvas, ctx);
  requestAnimationFrame(frame);
};

resize(canvas, ctx);
window.addEventListener('resize', () => resize(canvas, ctx));
requestAnimationFrame(frame);
