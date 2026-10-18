import type { Camera } from '../math/camera';
import { shootDirection } from '../math/ray';
import type { vec3 } from '../math/vec';

const TARGET_RADIUS = 0.35;

export function calculateShoot(camera: Camera, targetCenter: vec3): number | null {
  const dir = shootDirection(camera);
  if (dir === undefined) return null;

  const cameraPosition = camera.position;

  // Vector from eye to target
  const toTarget: vec3 = {
    x: targetCenter.x - cameraPosition.x,
    y: targetCenter.y - cameraPosition.y,
    z: targetCenter.z - cameraPosition.z,
  };

  // How far along the line of fire is the target
  const s: number = toTarget.x * dir.x + toTarget.y * dir.y + toTarget.z * dir.z;

  // Target is behind
  if (s <= 0) return null;

  const squareToTarget = square(toTarget.x) + square(toTarget.y) + square(toTarget.z);

  // Distance to target (powered by 2)
  const squareDistance: number = squareToTarget - square(s);

  if (squareDistance <= square(TARGET_RADIUS)) {
    return s;
  } else {
    return null;
  }
}

function square(x: number) {
  return x * x;
}
