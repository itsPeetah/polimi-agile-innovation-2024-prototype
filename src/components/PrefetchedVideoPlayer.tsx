import usePrefetchVideoUrl from "@/lib/usePrefetchVideoUrl";
import React, { Ref, useState } from "react";

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
      ref={videoElementRef}
      className="w-full h-full"
      src={src}
      controls
      onCanPlay={onCanPlay}
      onEnded={props.onEnded}
      preload={"auto"}
    />
  );
}
