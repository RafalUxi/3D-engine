import { ctx, w, h } from './base';
import { type vec3 } from './math/vec';
import { rotateYXZ } from './math/transform';

export const fov = Math.PI / 4;

export function fillBG(color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
}

export function drawPoint2D(x: number, y: number, color: string) {
  const dw = 10;
  const dh = 10;
  ctx.fillStyle = color;
  ctx.fillRect(x - dw / 2, y - dh / 2, dw, dh);
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

// Function to translate raw geometry points to screen
export function projectedToScreen(geometry: vec3[]) {
  const projected: ({ x: number; y: number } | null)[] = [];

  for (const p of geometry) {
    const coord = calculateCoordinates(p.x, p.y, p.z);
    projected.push(coord);
  }
  return projected;
}

// Draw edges
export function drawEdges(
  projectedPoints: ({ x: number; y: number } | null)[],
  geoEdges: number[][],
) {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (const e of geoEdges) {
    const idx1 = e[0];
    const idx2 = e[1];
    if (idx1 === undefined || idx2 === undefined) {
      console.log('edge index lost - please check geometry.ts');
      continue;
    }

    const a = projectedPoints[idx1];
    const b = projectedPoints[idx2];

    if (!a || !b) continue;

    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  }
  ctx.stroke();
}

// Function that generates 3D geometry
export function uxiDraw3D(
  geoPoints: vec3[],
  geoEdges: number[][],
  rotation: vec3,
  position: vec3,
  scale: vec3,
) {
  // Scale object
  const geometryScale = geoPoints.map((p) => {
    return { x: p.x * scale.x, y: p.y * scale.y, z: p.z * scale.z };
  });

  // Rotate object
  const geometryRotate = rotateYXZ(geometryScale, rotation);

  // Change object position
  const geometryPosition = geometryRotate.map((p) => {
    return { x: p.x + position.x, y: p.y + position.y, z: p.z + position.z };
  });

  // Translate raw points to screen points
  const projectedPoints = projectedToScreen(geometryPosition);

  // Draw object edges
  drawEdges(projectedPoints, geoEdges);

  // Draw object points
  for (const p of projectedPoints) {
    if (!p) continue;
    drawPoint2D(p.x, p.y, 'red');
  }
}
