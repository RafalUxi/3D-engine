export let yaw = 0;
export let pitch = 0;
export let isMouseDrag = false;
export const sensitive = 0.008;

window.addEventListener('mousedown', () => {
  isMouseDrag = true;
});

window.addEventListener('mouseup', () => {
  isMouseDrag = false;
});

window.addEventListener('mousemove', (e) => {
  if (isMouseDrag) {
    yaw += e.movementX * sensitive;
    pitch += e.movementY * sensitive;
  }
});
