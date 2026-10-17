import { type vec3 } from './vec';
import { type Camera } from './camera';
import { rotateYXZ } from './transform';

export function shootDirection(camera: Camera) {
  const z: vec3[] = [{ x: 0, y: 0, z: 1 }];

  // First X then Y
  const rot1 = rotateYXZ(z, { x: -camera.pitch, y: 0, z: 0 });
  const rot2 = rotateYXZ(rot1, { x: 0, y: -camera.yaw, z: 0 });

  return rot2[0];
}
