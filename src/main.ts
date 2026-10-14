import './style.css';
import { resize } from './base';
import { fillBG, uxiDraw3D } from './engine';
import { cube, cubeEdge } from './geometry';

const frame = (): void => {
  fillBG('black');
  uxiDraw3D(cube, cubeEdge);

  requestAnimationFrame(frame);
};

resize();
window.addEventListener('resize', () => resize());
requestAnimationFrame(frame);
