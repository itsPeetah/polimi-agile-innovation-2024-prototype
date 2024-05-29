import { useEffect, useState } from "react";
import prefetchVideo from "./prefetchVideo";

export default function usePreloadedVideos(videoUrls: string[]) {
  const [videoMap, setVideoMap] = useState<Map<string, string>>(new Map());
  const [doneCounter, setDoneCounter] = useState(0);

  useEffect(() => {
    function handleDone(videoUrl: string, blobUrl: string) {
      if (videoMap.get(videoUrl)) {
        console.log(`Video ${videoUrl} was already downloaded`);
        return;
      }

      videoMap.set(videoUrl, blobUrl);
      console.log(`Video ${videoUrl} downloaded successfully`);
      setDoneCounter((prev) => prev + 1);
    }

    videoUrls.forEach((videoUrl) =>
      prefetchVideo(videoUrl, handleDone, (err) => {
        console.error(`Error downloading video ${videoUrl}`, err);
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    videoMap,
    doneCounter,
    allAvailable: !(doneCounter < videoUrls.length),
  };
}
