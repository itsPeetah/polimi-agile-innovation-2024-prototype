"use client";

import { useEffect, useState } from "react";

export default function Player() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      setProgress((curr) => curr + 0.1);
    }

    const int = setInterval(update, 10);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center p-5 sm:p-10">
        <div
          id="video-player"
          className="relative w-full sm:max-w-[90%] aspect-video overflow-hidden | rounded-2xl bg-white"
        >
          <ProgressBar percent={progress} />
        </div>
        <div className="w-full | flex flex-row items-center justify-center p-5 gap-5">
          <button>Pick 1</button>
          <button>Pick 2</button>
        </div>
      </div>
    </div>
  );
}

function ProgressBar(props: { percent: number }) {
  const percent = Math.min(100, Math.max(0, props.percent));

  return (
    <div
      id="progress-bar-container"
      className="absolute bottom-0 | w-full h-2 | opacity-50"
    >
      <div
        id="progress-bar"
        className="h-full bg-amber-600"
        style={{
          width: `${percent}%`,
        }}
      />
    </div>
  );
}
