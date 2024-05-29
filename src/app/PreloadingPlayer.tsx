"use client";

import PrefetchedVideoPlayer from "@/components/PrefetchedVideoPlayer";
import videos, { Choice, VideoFile } from "@/lib/videos";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { createRef, useRef, useState } from "react";

export default function PreloadingPlayer() {
  const videoElementRefs = useRef(
    videos.map((v) => createRef<HTMLVideoElement>())
  );

  const { isReady, addReady } = useCheckReady(videos.length);
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [currentChoice, setCurrentChoice] = useState<Choice | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [translateX, setTranslateX] = useState("0%");

  function restart() {
    videoElementRefs.current!.forEach((ref) => {
      if (!ref.current) return;
      ref.current.pause();
      ref.current.currentTime = 0;
    });

    setCurrentChoice(() => null);
    setGameOver(() => false);
    updateDisplayedVideo(videos[0]);
  }

  function makeChoice(choice: Choice) {
    setCurrentChoice(() => choice);
  }

  function updateDisplayedVideo(next: VideoFile) {
    const index = getVideoIndex(next, videos);
    const tx = getTranslatePercent(index);
    setCurrentVideo(() => next);
    setTranslateX(() => tx);
    videoElementRefs.current[index].current?.play();
  }

  function onVideoEnded() {
    const choice = currentChoice ?? (Math.random() >= 0.5 ? "b" : "a");
    const next = getNextVideo(currentVideo, choice);
    if (!next) {
      setGameOver(true);
      return;
    }

    setCurrentChoice(() => null);
    updateDisplayedVideo(next);
  }

  function Overlay() {
    return <></>;
  }

  return (
    <div className="w-full h-full">
      {/* Video Player View */}
      <div className="relative | w-full aspect-video overflow-hidden">
        {/* Video reel */}
        <div
          className="relative w-full h-full | flex flex-row "
          style={{ transform: `translateX(-${translateX})` }}
        >
          {videos.map((v, i) => {
            return (
              <PrefetchedVideoPlayer
                key={v.name}
                videoElementRef={videoElementRefs.current!.at(i)!}
                videoSrc={v.name}
                onCanPlay={() => addReady(v.name)}
                onEnded={onVideoEnded}
              />
            );
          })}
        </div>
        {/* Overlay */}
        {(!isReady || gameOver) && <Overlay />}
      </div>
      {/* Buttons */}
      <div className=" w-full | flex flex-row gap-4 p-2 justify-center">
        <div>{isReady.toString()}</div>
        <div className="flex-grow" />
        <button
          style={{
            transform: currentChoice === "a" ? "scale(120%)" : undefined,
          }}
          onClick={() => makeChoice("a")}
        >
          Pick 1
        </button>
        <button
          style={{
            transform: currentChoice === "b" ? "scale(120%)" : undefined,
          }}
          onClick={() => makeChoice("b")}
        >
          Pick 2
        </button>
        <div className="flex-grow" />
        <button onClick={restart}>
          <ArrowPathIcon className="z-10 w-6 h-6" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function useCheckReady(howMany: number) {
  const [readyVideos, setReadyVideos] = useState<string[]>([]);
  const isReady = readyVideos.length >= howMany;
  function addReady(video: string) {
    setReadyVideos((prev) => [...prev, video]);
  }
  return { isReady, addReady };
}

function getNextVideo(current: VideoFile, choice: Choice) {
  return current.choices?.[choice];
}

function getVideoIndex(which: VideoFile, allVideos: VideoFile[]) {
  return allVideos.findIndex((vf) => vf.name === which.name);
}

function getTranslatePercent(index: number) {
  return `${index * 100}%`;
}
