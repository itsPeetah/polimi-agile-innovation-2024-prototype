import { useEffect, useState } from "react";
import prefetchVideo from "./prefetchVideo";

export default function usePrefetchVideoUrl(
  src: string,
  skip: boolean = false
) {
  const [objectUrl, setObjectUrl] = useState("");
  const [startedDownloading, setStartedDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  useEffect(() => {
    function onSuccess(src: string, blobUrl: string) {
      setObjectUrl(() => blobUrl);
      setIsDownloaded(() => true);
    }

    if (skip) {
      setObjectUrl(() => src);
      setIsDownloaded(() => true);
    } else {
      setStartedDownloading(() => true);
      prefetchVideo(src, onSuccess, (err) => console.error(err));
    }
  }, [src]);

  return { objectUrl, startedDownloading, isDownloaded };
}
