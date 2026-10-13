import './style.css';
import { resize } from './base';
import { calculateCoordinates, drawPoint2D, fillBG } from './engine';

function draw(): void {
  // resert scree/ fill bg

  fillBG('black');

  // transform to 3D
  const coord = calculateCoordinates(0, 0, 5);
  if (!coord) return;

  drawPoint2D(coord.x, coord?.y, 'red');
}

const frame = (): void => {
  draw();
  requestAnimationFrame(frame);
};

resize();
window.addEventListener('resize', () => resize());
requestAnimationFrame(frame);
