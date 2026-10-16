import { rotateYXZ } from './transform';
import type { vec3 } from './vec';

export type Camera = {
  position: vec3;
  yaw: number;
  pitch: number;
};

export function worldCamera(points: vec3[], camera: Camera) {
  const worldPointsPos = points.map((p): vec3 => {
    return {
      x: p.x - camera.position.x,
      y: p.y - camera.position.y,
      z: p.z - camera.position.z,
    };
  });
  const worldPoints = rotateYXZ(worldPointsPos, { x: camera.pitch, y: camera.yaw, z: 0 });
  return worldPoints;
}

export function forwardFlat(yaw: number) {
  const forward: vec3[] = [{ x: 0, y: 0, z: 1 }];
  const outputMove = rotateYXZ(forward, { x: 0, y: -yaw, z: 0 });
  return outputMove;
}

export function rightFlat(yaw: number) {
  const forward: vec3[] = [{ x: 1, y: 0, z: 0 }];
  const outputMove = rotateYXZ(forward, { x: 0, y: -yaw, z: 0 });
  return outputMove;
}
