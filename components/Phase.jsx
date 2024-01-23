import { useState } from "react";
import Audio from "./Audio";


const Phase = ({ path, useVisualizer, handlePhaseEnd }) => {
  // States to keep track of whether to show the video or the visualizer
  const [showVideo, setShowVideo] = useState(true);
  const [showVisualizer, setShowVisualizer] = useState(false);

  // Function to run after a video ends
  const handleVideoEnd = () => {
    if (useVisualizer) {
      setShowVideo(false);
      setShowVisualizer(true);
      return;
    } else {
      handlePhaseEnd();
    }
  };

  return (
    <div>
      {showVideo && (
        <video
          muted
          autoPlay
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            margin: 0,
            padding: 0,
          }}
          onEnded={handleVideoEnd}
        >
          <source src={path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {showVisualizer && <Audio handleAnswerEnd={handlePhaseEnd} />}
    </div>
  );
};

export default Phase;
