import type { Camera } from '../math/camera';
import { uxiDraw3D } from '../engine';
import { cube, cubeEdge } from '../geometry';
import type { vec3 } from '../math/vec';
import { calculateShoot } from './shooting';

// Only generate targets and return what function did
export function generateRandomPoints(camera: Camera, targets: vec3[]) {
  for (let i = 0; i < targets.length; i++) {
    const position = targets[i];
    if (position === undefined) continue;
    uxiDraw3D(cube, cubeEdge, { x: 0, y: 0, z: 0 }, position, { x: 0.2, y: 0.2, z: 0.2 }, camera);
  }
  return targets;
}

export function generatePoints(camera: Camera, targets: vec3[]) {
  const targetHitted: { s: number; index: number }[] = [];
  for (const [i, t] of targets.entries()) {
    const s = calculateShoot(camera, t);
    if (s !== null) {
      targetHitted.push({ s: s, index: i });
    }
  }
  if (targetHitted.length === 0) return null;

  const targetHittedSorted = targetHitted.sort((a, b) => a.s - b.s);
  return targetHittedSorted[0];
}
