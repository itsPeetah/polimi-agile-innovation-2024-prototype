export type VideoFile = {
  name: string;
  duration: number;
  symbol: string;
  choices?: {
    a: VideoFile;
    b: VideoFile;
  };
};

export type Choice = "a" | "b";

function getVideoFilePath(fileName: string): string {
  const videoPath = `/video/silent/${fileName}`;
  const isDev = process.env.NODE_ENV === "development";
  return isDev
    ? videoPath
    : `https://pgmp.me/polimi-agile-innovation-2024-prototype${videoPath}`;
}

/* ##############################################
                    VIDEOS
############################################## */

const scene4a: VideoFile = {
  name: getVideoFilePath("Scene 4a.mp4"),
  duration: 0,
  symbol: "🍊",
};

const scene4b: VideoFile = {
  name: getVideoFilePath("Scene 4b.mp4"),
  duration: 0,
  symbol: "🍪",
};

const scene3a: VideoFile = {
  name: getVideoFilePath("Scene 3a.mp4"),
  duration: 0,
  choices: {
    a: scene4a,
    b: scene4b,
  },
  symbol: "☕️",
};

const scene3b: VideoFile = {
  name: getVideoFilePath("Scene 3b.mp4"),
  duration: 0,
  choices: {
    a: scene4a,
    b: scene4b,
  },
  symbol: "🍬",
};

const scene2a: VideoFile = {
  name: getVideoFilePath("Scene 2a.mp4"),
  duration: 0,
  choices: {
    a: scene3a,
    b: scene3b,
  },
  symbol: "🥛",
};

const scene2b: VideoFile = {
  name: getVideoFilePath("Scene 2b.mp4"),
  duration: 0,
  choices: {
    a: scene3a,
    b: scene3b,
  },
  symbol: "💧",
};

const scene1: VideoFile = {
  name: getVideoFilePath("Scene 1.mp4"),
  duration: 0,
  choices: {
    a: scene2a,
    b: scene2b,
  },
  symbol: "",
};

const videos: VideoFile[] = [
  scene1,
  scene2a,
  scene2b,
  scene3a,
  scene3b,
  scene4a,
  scene4b,
];

export default videos;
