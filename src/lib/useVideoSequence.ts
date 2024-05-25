import { useEffect, useState } from "react";
import { VideoFile } from "./videos";

export default function useVideoSequence(initialVideo: VideoFile) {
  const [currentVideo, setCurrentVideo] = useState(initialVideo);
  const [symbolSequence, setSymbolSequence] = useState<string[]>([]);
  const [isFinalVideo, setIsFinalVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  function pickChoice(choice: "a" | "b") {
    if (currentVideo.choices) {
      setCurrentVideo(currentVideo.choices[choice]);
    }
  }

  useEffect(() => {
    if (currentVideo)
      if (currentVideo) {
        setIsFinalVideo(() => currentVideo.choices === undefined);
        setVideoSrc(currentVideo.name);

        if (!symbolSequence.includes(currentVideo.symbol))
          setSymbolSequence((prev) => [...prev, currentVideo.symbol]);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo]);

  return {
    currentVideo,
    isFinalVideo,
    videoSrc,
    pickChoice,
    sequence: symbolSequence.reduce((acc, curr) => acc + curr, ""),
  };
}
