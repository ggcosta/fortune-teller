import { useState } from "react";
import Audio from "./Audio";
import { CSSTransition } from "react-transition-group";

const Phase = ({ path, useAudioInput, handlePhaseEnd, inputData }) => {
  // States to keep track of whether to show the video or the visualizer
  const [showVideo, setShowVideo] = useState(true);
  const [showAudioInput, setShowAudioInput] = useState(false);

  // Function to run after a video ends
  const handleVideoEnd = () => {
    if (useAudioInput) {
      setShowVideo(false);
      setTimeout(() => {
        setShowAudioInput(true);
      }, 1000);
    } else {
      setTimeout(() => {
        handlePhaseEnd(false);
      }, 1000);
    }
  };

  return (
    <>
      <CSSTransition
        in={showVideo}
        timeout={1000}
        classNames={{
          exit: "fade-exit",
          exitActive: "fade-exit-active",
        }}
        unmountOnExit
      >
        <video autoPlay className="video-player" onEnded={handleVideoEnd}>
          <source src={path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CSSTransition>
      <CSSTransition
        in={showAudioInput}
        timeout={1000}
        classNames={{
          enter: "fade-enter",
          enterActive: "fade-enter-active",
        }}
        unmountOnExit
      >
        <Audio handleAnswerEnd={handlePhaseEnd} inputData={inputData} />
      </CSSTransition>
    </>
  );
};

export default Phase;
