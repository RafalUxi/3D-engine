import './style.css';
import { resize } from './base';
import { fillBG, uxiDraw3D } from './engine';
import { cube, cubeEdge } from './geometry';
import { pitch, yaw } from './inputs';

const frame = (): void => {
  fillBG('black');
  uxiDraw3D(
    cube,
    cubeEdge,
    { x: pitch, y: yaw, z: 0 },
    { x: 0, y: 0, z: 10 },
    { x: 1, y: 1, z: 1 },
  );

  requestAnimationFrame(frame);
};

resize();
window.addEventListener('resize', () => resize());
requestAnimationFrame(frame);
