import { useState } from "react";
import Audio from "./Audio";
import Video from "./Video";
import Image from "next/image";

const Phase = ({ data, handlePhaseEnd, inputData }) => {
  // States to keep track of whether to show the video or the visualizer
  const [showVideo, setShowVideo] = useState(true);
  const [showAudioInput, setShowAudioInput] = useState(false);
  const showBgImage = data.type === "question" ? true : false;

  const useAudioInput = data.useAudioInput;
  const path = data.path;
  const standBy = data.type === "stand_by" ? true : false;
  const transitionImage = data.transitionImage;

  // Function to run after a video ends
  const handleVideoEnd = () => {
    if (useAudioInput) {
      setShowVideo(false);
      setShowAudioInput(true);
      return;
    } else {
      handlePhaseEnd(false);
    }
  };

  return (
    <>
      {showBgImage && (
        <Image
          className="bg-img"
          alt="transition image"
          width={1080}
          height={1920}
          src={transitionImage}
        />
      )}
      {showVideo && (
        <Video path={path} handleEnd={handleVideoEnd} useLoop={standBy} />
      )}
      {showAudioInput && (
        <Audio handleAnswerEnd={handlePhaseEnd} inputData={inputData} />
      )}
    </>
  );
};

export default Phase;
