"use client";

import React, { useState } from "react";
import PreloadingPlayer from "../PreloadingPlayer";
import videos from "@/lib/videos";

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      test :&#41;
      <button onClick={() => setCurrentIndex((p) => p + 1)}>Next</button>
      <div className="w-full aspect-video border">
        <PreloadingPlayer
          showDebug
          visible={videos[currentIndex % videos.length].name}
          videoUrls={videos.map((v) => v.name)}
        />
      </div>
    </div>
  );
}
