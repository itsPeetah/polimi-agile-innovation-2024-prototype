"use client";

import useProgressBar from "@/lib/useProgressBar";
import useVideoSequence from "@/lib/useVideoSequence";
import { VideoFile } from "@/lib/videos";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  initialVideo: VideoFile;
}

export default function Player({ initialVideo }: Props) {
  const { videoSrc, pickChoice, isFinalVideo, sequence } =
    useVideoSequence(initialVideo);
  const { progress, initializeInterval, resetProgress } = useProgressBar();
  const [hasPicked, setHasPicked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function pickFirst() {
    setHasPicked(() => true);
    resetProgress();
    pickChoice("a");
  }
  function pickSecond() {
    setHasPicked(() => true);
    resetProgress();
    pickChoice("b");

    if (isFinalVideo) {
      onFinalVideoEnded();
      return;
    }
  }

  function onVideoPlay() {
    const video = videoRef.current;
    if (!video) return;
    setHasPicked(() => false);
    initializeInterval(video.duration, 50);
  }

  function onVideoEnded() {
    resetProgress();

    if (isFinalVideo) {
      onFinalVideoEnded();
      return;
    }

    if (!hasPicked) {
      const makeChoice = Math.random() < 0.5 ? pickFirst : pickSecond;
      makeChoice();
    }
  }

  function onFinalVideoEnded() {
    setGameOver(true);
  }

  function buildVideo() {
    return (
      <>
        <video
          ref={videoRef}
          autoPlay={true}
          src={videoSrc}
          onPlay={onVideoPlay}
          onEnded={onVideoEnded}
        />
        <ProgressBar percent={progress} />
      </>
    );
  }

  function buildGameOver() {
    return (
      <div className="w-full h-full | flex flex-col items-center p-5 sm:p-10 gap-5 sm:gap-10">
        <h1 className="text-xl sm:text-3xl md:text-6xl">{sequence}</h1>
        <Image
          src=""
          alt={sequence}
          width={500}
          height={500}
          className="h-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center p-5 sm:p-10">
        <div
          id="video-player"
          className="relative w-full sm:max-w-[90%] aspect-video overflow-hidden | rounded-2xl bg-black -z-10 shadow-2xl"
        >
          {!gameOver && buildVideo()}
          {gameOver && buildGameOver()}
        </div>
        <div className="w-full | flex flex-row items-center justify-center p-5 gap-5">
          <button onClick={pickFirst}>Pick 1</button>
          <button onClick={pickSecond}>Pick 2</button>
          {/* isFinalVideo: {isFinalVideo.toString()} */}
          <button onClick={() => videoRef?.current?.play()}>Play</button>
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
      className="absolute bottom-0 | w-full h-2 | opacity-50 z-20"
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
