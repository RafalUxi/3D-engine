import { type vec3 } from '../math/vec';

export const TARGET_COUNT = 500;

export function generateRandomPosition(number: number) {
  const output: vec3[] = [];

  for (let i = 0; i < number; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const r = 15 + Math.random() * 15;

    output.push({ x: r * Math.cos(angle), y: 3 + Math.random() * 7, z: r * Math.sin(angle) });
  }

  return output;
}
