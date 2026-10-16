export let yaw = 0;
export let pitch = 0;
export let isMouseDrag = false;
export let isKey_A = false;
export let isKey_S = false;
export let isKey_D = false;
export let isKey_W = false;
export const sensitive = 0.003;

window.addEventListener('mousedown', () => {
  isMouseDrag = true;
});

window.addEventListener('mouseup', () => {
  isMouseDrag = false;
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
  if (isMouseDrag) {
    yaw += e.movementX * sensitive;
    pitch -= e.movementY * sensitive;
  }
});
