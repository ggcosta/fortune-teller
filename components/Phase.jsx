import { useState } from "react";
import Audio from "./Audio";

const Phase = ({ path, useAudioInput, handlePhaseEnd, inputData }) => {
  // States to keep track of whether to show the video or the visualizer
  const [showVideo, setShowVideo] = useState(true);
  const [showAudioInput, setShowAudioInput] = useState(false);

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
      {showVideo && (
        <video autoPlay className="video-player" onEnded={handleVideoEnd}>
          <source src={path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {showAudioInput && (
        <Audio handleAnswerEnd={handlePhaseEnd} inputData={inputData} />
      )}
    </>
  );
};

export default Phase;
