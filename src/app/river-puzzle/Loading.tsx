import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

import sky from "../../../public/images/river-riddle/background.jpg";
import elements from "../../../public/images/river-riddle/elements.png";

const Loading = () => {
  return (
    <div
      className="flex h-[100vh] w-[100vw] flex-col bg-cover bg-center bg-no-repeat text-center"
      style={{
        backgroundImage: `url(${sky.src})`,
      }}
    >
      <div className="flex max-h-[40%] justify-center">
        <Player
          autoplay
          loop
          src="/lottie/puzzles/loading.json"
          className="h-full"
        />
      </div>
      <div className="text-3xl">Loading..</div>

      <div
        className="fixed bottom-0 mt-4 h-[40vh] w-full bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${elements.src}')`,
        }}
      ></div>
    </div>
  );
};

export default Loading;
