import { type vec3 } from './vec';

export function rotateYXZ(points: vec3[], rotation: vec3): vec3[] {
  const cosx = Math.cos(rotation.x);
  const sinx = Math.sin(rotation.x);
  const cosy = Math.cos(rotation.y);
  const siny = Math.sin(rotation.y);
  const cosz = Math.cos(rotation.z);
  const sinz = Math.sin(rotation.z);
  const transformY: vec3[] = [];

  // First transfrom Y
  for (const p of points) {
    transformY.push({ x: p.x * cosy - p.z * siny, y: p.y, z: p.x * siny + p.z * cosy });
  }

  const transformYXZ = transformY
    .map((p) => {
      return {
        x: p.x,
        y: p.y * cosx - p.z * sinx,
        z: p.y * sinx + p.z * cosx,
      };
    })
    .map((p) => {
      return {
        x: p.x * cosz - p.y * sinz,
        y: p.x * sinz + p.y * cosz,
        z: p.z,
      };
    });

  return transformYXZ;
}
