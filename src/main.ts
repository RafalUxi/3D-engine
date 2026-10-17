import './style.css';
import { resize } from './base';
import { fillBG } from './engine';
import { forwardFlat, rightFlat, type Camera } from './math/camera';
import { isKey_A, isKey_D, isKey_S, isKey_W, pitch, yaw } from './inputs';
import { drawFloor, drawViewfinder } from './models/imaginePack';
import { generateRandomPoints } from './math/game/generatePoints';

const camera: Camera = {
  position: { x: 1, y: 1, z: 1 },
  yaw: 0,
  pitch: 0,
};

const frame = (): void => {
  // Background
  fillBG('blue');

  // const Floor
  drawFloor('green', pitch);

  // Crosshair
  drawViewfinder('red', 10, 10);

  // draw targets
  generateRandomPoints(camera);

  camera.yaw = yaw;
  camera.pitch = pitch;

  if (isKey_W) {
    const forward = forwardFlat(yaw);
    camera.position.x += forward[0]!.x * 0.05;
    camera.position.z += forward[0]!.z * 0.05;
  }
  if (isKey_S) {
    const forward = forwardFlat(yaw);
    camera.position.x -= forward[0]!.x * 0.05;
    camera.position.z -= forward[0]!.z * 0.05;
  }
  if (isKey_A) {
    const right = rightFlat(yaw);
    camera.position.x -= right[0]!.x * 0.05;
    camera.position.z -= right[0]!.z * 0.05;
  }
  if (isKey_D) {
    const right = rightFlat(yaw);
    camera.position.x += right[0]!.x * 0.05;
    camera.position.z += right[0]!.z * 0.05;
  }

  requestAnimationFrame(frame);
};

resize();
window.addEventListener('resize', () => resize());
requestAnimationFrame(frame);
