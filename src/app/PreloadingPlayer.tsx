"use client";

import PrefetchedVideoPlayer from "@/components/PrefetchedVideoPlayer";
import getFilePath from "@/lib/getFilePath";
import videos, { Choice, VideoFile } from "@/lib/videos";
import { ArrowPathIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { createRef, useRef, useState } from "react";

export default function PreloadingPlayer() {
  const videoElementRefs = useRef(
    videos.map((v) => createRef<HTMLVideoElement>())
  );

  const { isReady, addReady, readyVideos } = useCheckReady(videos.length);
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
    updateDisplayedVideo(videos[0], false);
  }

  function makeChoice(choice: Choice) {
    setCurrentChoice(() => choice);
  }

  function updateDisplayedVideo(next: VideoFile, play: boolean = true) {
    const index = getVideoIndex(next, videos);
    const tx = getTranslatePercent(index);
    setCurrentVideo(() => next);
    setTranslateX(() => tx);
    if (play) videoElementRefs.current[index].current?.play();
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
    return (
      <div className="absolute top-0 left-0 z-30 | w-full h-full">
        {/* Pre start */}
        {!isReady && (
          <div className="relative w-full h-full">
            <Image
              src={getFilePath("/loadingthumbnail.jpg")}
              alt="loading..."
              width={1280}
              height={720}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-10 w-full">
              <h1 className="text-center text-4xl">Initializing</h1>
              <h2 className="text-center">
                The app needs a one-time initialization to guarantee fast media
                load times
              </h2>
            </div>
          </div>
        )}
        {/* Finish! */}
        {gameOver && (
          <div className="w-full h-full flex flex-row items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-chocolate-dark">
              <p className="font-bold text-xl max-w-[60%] text-center">
                We recommend you try this product
              </p>
            </div>
            <div className="w-full h-full bg-red-800">image + bg</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="w-full md:max-w-[90%] h-full mx-auto">
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
                  useNativePreload
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
        <div className=" w-full | flex flex-row gap-4 p-2 justify-center items-center">
          <div>
            {isReady ? (
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            ) : (
              <div className="w-3 h-3 bg-orange-400 rounded-full" />
            )}
          </div>
          <div className="flex-grow" />
          <button
            className="p-2 border rounded-xl"
            style={{
              transform: currentChoice === "a" ? "scale(120%)" : undefined,
            }}
            onClick={() => makeChoice("a")}
          >
            Pick 1
          </button>
          <button
            className="p-2 border rounded-xl"
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
      <div>
        <h6>debug info</h6>
        <div className="">{JSON.stringify(readyVideos)}</div>
      </div>
    </>
  );
}

function useCheckReady(howMany: number) {
  const [readyVideos, setReadyVideos] = useState<string[]>([]);
  const isReady = readyVideos.length >= howMany;
  function addReady(video: string) {
    setReadyVideos((prev) => [...prev, video]);
  }
  return { isReady, addReady, readyVideos };
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
