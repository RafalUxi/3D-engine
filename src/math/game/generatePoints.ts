import type { Camera } from '../camera';
import { uxiDraw3D } from '../../engine';
import { cube, cubeEdge } from '../../geometry';
import { type vec3 } from '../vec';

const TARGET_COUNT = 40;

const randomPosition = generateRandomPosition(TARGET_COUNT);

export function generateRandomPoints(camera: Camera) {
  for (let i = 0; i < randomPosition.length; i++) {
    const position = randomPosition[i];
    if (position === undefined) continue;
    uxiDraw3D(cube, cubeEdge, { x: 0, y: 0, z: 0 }, position, { x: 0.2, y: 0.2, z: 0.2 }, camera);
  }
}

function generateRandomPosition(number: number) {
  const output: vec3[] = [];

  for (let i = 0; i < number; i++) {
    const randomX = Math.random() * 15 + 5;
    const randomY = Math.random() * 7 + 3;
    const randomZ = Math.random() * 15 + 5;

    output.push({ x: randomX, y: randomY, z: randomZ });
  }

  return output;
}
