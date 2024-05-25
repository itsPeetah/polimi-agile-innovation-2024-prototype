import { useState } from "react";

export default function useProgressBar() {
  const [progress, setProgress] = useState(0);
  const [interval, _setInterval] = useState<NodeJS.Timeout | null>(null);

  function resetProgress() {
    setProgress(() => 0);
    resetInterval();
  }

  function initializeInterval(duration: number, framerate: number = 30) {
    const durationMS = duration * 1000;
    const increment = (framerate / durationMS) * 100;

    function onTick() {
      setProgress((prev) => Math.max(0, Math.min(100, prev + increment)));
    }

    const int = setInterval(onTick, framerate);
    _setInterval(int);
  }

  function resetInterval() {
    if (interval) {
      clearInterval(interval);
      setInterval(() => null);
    }
  }

  return {
    progress,
    initializeInterval,
    resetProgress,
  };
}
