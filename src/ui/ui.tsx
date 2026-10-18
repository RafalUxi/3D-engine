import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SiYoutube } from 'react-icons/si';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { canvas } from '../base';
import { requestPointerLock } from '../inputs';
import {
  startStats,
  stopStats,
  resumeStats,
  setSensitivity,
  sensitivity,
  isPlaying,
  hits,
  shots,
} from '../game/stats';

const ROUND_DURATION_MS = 15_000;

type Stats = {
  hits: number;
  shots: number;
};

function getMisses(stats: Stats): number {
  return stats.shots - stats.hits;
}

function formatAccuracy(stats: Stats): string {
  if (stats.shots === 0) return '—';
  return `${Math.round((stats.hits / stats.shots) * 100)}%`;
}

function SensitivitySlider() {
  const [value, setValue] = useState<number>(sensitivity);

  return (
    <label className="pointer-events-auto flex items-center gap-3 font-mono text-sm text-violet-200">
      <span className="text-violet-200/60">Sensitivity</span>
      <input
        type="range"
        min={0.0005}
        max={0.01}
        step={0.0005}
        value={value}
        onChange={(e) => {
          const next = Number(e.target.value);
          setValue(next);
          setSensitivity(next);
        }}
        className="w-32 accent-purple-300"
      />
      <span className="w-10 text-right tabular-nums">{(value * 1000).toFixed(1)}</span>
    </label>
  );
}

function App() {
  const [play, setPlay] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(ROUND_DURATION_MS / 1000);
  const [liveHits, setLiveHits] = useState<number>(0);
  const remainingMs = useRef<number>(ROUND_DURATION_MS);
  const pausedRef = useRef<boolean>(false);

  useEffect(() => {
    const onPointerLockChange = () => {
      const locked = document.pointerLockElement === canvas;

      if (!locked && isPlaying) {
        stopStats();
        pausedRef.current = true;
        setPaused(true);
      } else if (locked && pausedRef.current) {
        pausedRef.current = false;
        resumeStats();
        setPaused(false);
      }
    };

    document.addEventListener('pointerlockchange', onPointerLockChange);
    return () => document.removeEventListener('pointerlockchange', onPointerLockChange);
  }, []);

  useEffect(() => {
    if (!play || paused) return;

    const endTime = performance.now() + remainingMs.current;

    const interval = setInterval(() => {
      const remaining = endTime - performance.now();
      remainingMs.current = remaining;
      setLiveHits(hits);

      if (remaining <= 0) {
        clearInterval(interval);
        stopStats();
        setStats({ hits: hits, shots: shots });
        setTimeLeft(0);
        setPlay(false);
        document.exitPointerLock();
        return;
      }

      setTimeLeft(Math.ceil(remaining / 100) / 10);
    }, 100);

    return () => {
      clearInterval(interval);
      remainingMs.current = Math.max(0, endTime - performance.now());
    };
  }, [play, paused]);

  if (!play)
    return (
      <div className="pointer-events-none flex h-full w-screen items-center justify-center bg-black/50">
        <div className="relative flex h-128 w-96 flex-col items-center rounded-2xl border border-black bg-zinc-900">
          <h1 className="absolute top-1/10 text-5xl font-bold text-white">Raw Aim</h1>
          <div className="absolute top-2/10 text-base text-white">by Rafał Trzeciakowski</div>

          <div className="pointer-events-auto absolute top-1/3 flex flex-row space-x-4">
            <a
              href="https://github.com/RafalUxi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 transition-colors duration-200 hover:text-purple-300"
            >
              <FiGithub className="h-8 w-8" />
            </a>
            <a
              href="https://www.linkedin.com/in/rafa%C5%82-trzeciakowski-2015b4419/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 transition-colors duration-200 hover:text-purple-300"
            >
              <FiLinkedin className="h-8 w-8" />
            </a>
            <a
              href="https://www.youtube.com/@Uxi_dev"
              className="text-white/40 transition-colors duration-200 hover:text-purple-300"
            >
              <SiYoutube className="h-8 w-8" />
            </a>
          </div>
          {stats && (
            <dl className="absolute top-9/20 grid grid-cols-2 gap-x-8 gap-y-1 font-mono text-violet-200">
              <dt className="text-violet-200/60">Hits</dt>
              <dd className="text-right">{stats.hits}</dd>
              <dt className="text-violet-200/60">Shots</dt>
              <dd className="text-right">{stats.shots}</dd>
              <dt className="text-violet-200/60">Misses</dt>
              <dd className="text-right">{getMisses(stats)}</dd>
              <dt className="text-violet-200/60">Accuracy</dt>
              <dd className="text-right">{formatAccuracy(stats)}</dd>
            </dl>
          )}

          <button
            className="pointer-events-auto absolute top-15/20 text-6xl font-black text-white hover:text-purple-300"
            onClick={() => {
              remainingMs.current = ROUND_DURATION_MS;
              pausedRef.current = false;
              setPaused(false);
              setTimeLeft(ROUND_DURATION_MS / 1000);
              setLiveHits(0);
              setPlay(true);
              startStats();
              requestPointerLock();
            }}
          >
            Play
          </button>

          <div className="absolute bottom-5">
            <SensitivitySlider />
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative h-full w-screen bg-transparent">
      <div className="absolute top-4 left-6 font-mono text-4xl font-bold text-white tabular-nums">
        {liveHits}
      </div>

      <div className="absolute top-4 right-6 font-mono text-4xl font-bold text-white tabular-nums">
        {timeLeft.toFixed(1)}
      </div>

      {paused && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black/60">
          <h2 className="text-5xl font-bold text-white">Paused</h2>
          <button
            className="pointer-events-auto text-4xl font-black text-white hover:text-purple-300"
            onClick={() => requestPointerLock()}
          >
            Resume
          </button>
          <SensitivitySlider />
        </div>
      )}
    </div>
  );
}

export function mountUI(): void {
  const container = document.querySelector<HTMLDivElement>('#ui');
  if (!container) throw new Error('UI container #ui not found');

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
