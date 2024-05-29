"use client";

import usePreloadedVideos from "@/lib/usePreloadedVideos";
import useRefMap from "@/lib/useRefMap";
import { Ref, useState } from "react";

interface Props {
  visible: string;
  showDebug?: boolean;
  videoUrls: string[];
}

export default function PreloadingPlayer({
  videoUrls,
  visible,
  showDebug,
  ...props
}: Props) {
  const videoRefs = useRefMap<HTMLVideoElement>(videoUrls);
  const [canPlayThroughCounter, setCanPlayThroughCounter] = useState(0);
  const {
    doneCounter: downloadCounter,
    allAvailable: allDownloaded,
    videoMap: videoBlobUrls,
  } = usePreloadedVideos(videoUrls);

  function Debug() {
    return (
      <div className="absolute top-0 h-0 z-50">
        <p>
          Downloaded: {downloadCounter}/{videoUrls.length}
        </p>
        <p>
          Can play through: {canPlayThroughCounter}/{downloadCounter}
        </p>
      </div>
    );
  }

  function VideoStack() {}

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full">
        {/* Debug */}
        {showDebug && <Debug />}
        {allDownloaded &&
          videoUrls.map((v) => {
            const ref = videoRefs.get(v);
            const src = videoBlobUrls.get(v)!;

            return (
              <video
                key={`video_player_${v}`}
                ref={ref}
                src={src}
                className="absolute top-0 left-0 w-full h-full"
                style={{ width: visible === v ? "100%" : "0%" }}
                onCanPlayThrough={() => {
                  setCanPlayThroughCounter((prev) => prev + 1);
                }}
                autoPlay
                loop
              />
            );
          })}
      </div>
    </div>
  );
}
