import './style.css';
import { resize } from './base';
import { fillBG, uxiDraw3D } from './engine';
import { cube, cubeEdge } from './geometry';

const frame = (): void => {
  fillBG('black');
  uxiDraw3D(
    cube,
    cubeEdge,
    { x: Math.PI / 6, y: Math.PI / 2, z: Math.PI / 5 },
    { x: 0, y: 0, z: 5 },
  );

  requestAnimationFrame(frame);
};

resize();
window.addEventListener('resize', () => resize());
requestAnimationFrame(frame);
