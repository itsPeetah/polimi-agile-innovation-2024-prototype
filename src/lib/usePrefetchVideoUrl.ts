import { useEffect, useState } from "react";
import prefetchVideo from "./prefetchVideo";

export default function usePrefetchVideoUrl(src: string) {
  const [objectUrl, setObjectUrl] = useState("");
  const [startedDownloading, setStartedDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  useEffect(() => {
    function onSuccess(src: string, blobUrl: string) {
      setObjectUrl(() => blobUrl);
      setIsDownloaded(() => true);
    }

    setStartedDownloading(() => true);
    prefetchVideo(src, onSuccess, (err) => console.error(err));
  }, [src]);

  return { objectUrl, startedDownloading, isDownloaded };
}
