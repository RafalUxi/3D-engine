import './style.css';
import { resize } from './base';
import { fillBG } from './engine';
import { forwardFlat, rightFlat, type Camera } from './math/camera';
import { isKey_A, isKey_D, isKey_S, isKey_W, pitch, yaw, isMouseClick } from './inputs';
import { drawFloor, drawViewfinder } from './models/imaginePack';
import { generatePoints, generateRandomPoints } from './game/generatePoints';
import { TARGET_COUNT, generateRandomPosition } from './game/startConfig';
import { mountUI } from './ui/ui';
import { isPlaying, addShot, addHits, roundId } from './game/stats';

// Tailwind + react UI
mountUI();

let canShoot = true;
const camera: Camera = {
  position: { x: 1, y: 1, z: 1 },
  yaw: 0,
  pitch: 0,
};

let targetsPosition = generateRandomPosition(TARGET_COUNT);
let lastRoundId = roundId;

const frame = (): void => {
  if (roundId !== lastRoundId) {
    lastRoundId = roundId;
    camera.position = { x: 0, y: 0, z: 0 };
  }

  // Background
  fillBG('blue');

  // const Floor
  drawFloor('green', pitch);

  // Crosshair
  drawViewfinder('red', 10, 10);

  // draw targets
  const targets = generateRandomPoints(camera, targetsPosition);

  // START GAME
  if (isPlaying) {
    camera.yaw = yaw;
    camera.pitch = pitch;

    if (isMouseClick && canShoot) {
      addShot();
      canShoot = false;
      const targetHitted = generatePoints(camera, targets);
      if (targetHitted) {
        targetsPosition = targetsPosition.filter((_t, i) => i !== targetHitted.index);
        addHits();
      }
    }

    if (targetsPosition.length < TARGET_COUNT) {
      const nextTargets = generateRandomPosition(TARGET_COUNT - targetsPosition.length);
      for (const t of nextTargets) {
        targetsPosition.push(t);
      }
    }

    if (!isMouseClick && !canShoot) {
      canShoot = true;
    }

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
  }

  requestAnimationFrame(frame);
};

resize();
window.addEventListener('resize', () => resize());
requestAnimationFrame(frame);
