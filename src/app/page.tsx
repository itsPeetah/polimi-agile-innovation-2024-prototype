import videos from "@/lib/videos";
import Player from "./Player";

const startingVideo = videos[0];

export default function Home() {
  return (
    <>
      <Player initialVideo={startingVideo} />
    </>
  );
}
