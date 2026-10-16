import './style.css';
import { resize } from './base';
import { fillBG, uxiDraw3D } from './engine';
import { cube, cubeEdge } from './geometry';
import { forwardFlat, rightFlat, type Camera } from './math/camera';
import { isKey_A, isKey_D, isKey_S, isKey_W, pitch, yaw } from './inputs';
import { drawViewfinder } from './imaginePack';

const camera: Camera = {
  position: { x: 1, y: 1, z: 1 },
  yaw: 0.5,
  pitch: 0,
};

const frame = (): void => {
  fillBG('black');
  drawViewfinder('red', 10, 10);

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

  uxiDraw3D(
    cube,
    cubeEdge,
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 10 },
    { x: 1, y: 1, z: 1 },
    camera,
  );

  uxiDraw3D(
    cube,
    cubeEdge,
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 5, z: 10 },
    { x: 1, y: 1, z: 1 },
    camera,
  );

  uxiDraw3D(
    cube,
    cubeEdge,
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 5, z: 10 },
    { x: 1, y: 1, z: 1 },
    camera,
  );

  uxiDraw3D(
    cube,
    cubeEdge,
    { x: 0, y: 0, z: 0 },
    { x: 0, y: -5, z: 10 },
    { x: 1, y: 1, z: 1 },
    camera,
  );

  requestAnimationFrame(frame);
};

resize();
window.addEventListener('resize', () => resize());
requestAnimationFrame(frame);
