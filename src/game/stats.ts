export let hits = 0;
export let shots = 0;
export let isPlaying: boolean = false;
export let roundId = 0;
export let sensitivity = 0.003;

export function addShot() {
  shots += 1;
}

export function addHits() {
  hits += 1;
}

export function startStats() {
  isPlaying = true;
  hits = 0;
  shots = 0;
  roundId += 1;
}

export function stopStats() {
  isPlaying = false;
}

export function resumeStats() {
  isPlaying = true;
}

export function setSensitivity(value: number) {
  sensitivity = value;
}
