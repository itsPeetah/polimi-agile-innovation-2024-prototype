import usePrefetchVideoUrl from "@/lib/usePrefetchVideoUrl";
import React, { Ref, useEffect, useState } from "react";

interface Props {
  videoSrc: string;
  videoElementRef: Ref<HTMLVideoElement>;
  useNativePreload?: boolean;
  onEnded: () => void;
  onCanPlay?: () => void;
}

export default function PrefetchedVideoPlayer({
  videoSrc,
  videoElementRef,
  ...props
}: Props) {
  const {
    objectUrl: src,
    isDownloaded,
    startedDownloading,
  } = usePrefetchVideoUrl(videoSrc, props.useNativePreload);
  const [canPlay, setCanPlay] = useState(false);

  function onCanPlay() {
    setCanPlay(true);
    console.log(`Video ${videoSrc} can now play`);
    props.onCanPlay?.();
  }

  return (
    <video
      playsInline
      ref={videoElementRef}
      className="w-full h-full flex-shrink-0"
      src={src}
      controls={false}
      onCanPlay={onCanPlay}
      onEnded={props.onEnded}
      // preload={"auto"}
    />
  );
}
