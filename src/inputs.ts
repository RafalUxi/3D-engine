import { canvas } from './base';
import { sensitivity } from './game/stats';

export let yaw = 0;
export let pitch = 0;
export let isMouseClick = false;
export let isKey_A = false;
export let isKey_S = false;
export let isKey_D = false;
export let isKey_W = false;

export function requestPointerLock() {
  if (document.pointerLockElement !== canvas) {
    canvas
      .requestPointerLock({ unadjustedMovement: true })
      .catch(() => canvas.requestPointerLock()); // przeglądarka bez tej opcji → zwykły lock
  }
}

window.addEventListener('mousedown', () => {
  isMouseClick = true;
});

window.addEventListener('mouseup', () => {
  isMouseClick = false;
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyA') {
    isKey_A = true;
  }
  if (e.code === 'KeyS') {
    isKey_S = true;
  }
  if (e.code === 'KeyD') {
    isKey_D = true;
  }
  if (e.code === 'KeyW') {
    isKey_W = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'KeyA') {
    isKey_A = false;
  }
  if (e.code === 'KeyS') {
    isKey_S = false;
  }
  if (e.code === 'KeyD') {
    isKey_D = false;
  }
  if (e.code === 'KeyW') {
    isKey_W = false;
  }
});

window.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement === canvas) {
    yaw += e.movementX * sensitivity;
    pitch -= e.movementY * sensitivity;
    pitch = Math.min(Math.max(pitch, -1.553), 1.553);
  }
});
