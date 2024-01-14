import { useState } from "react";
import Video from "./Video";
import AudioVisualizer from "./AudioVisualizer";

const Phase = ({ paths, numVidsToPlay, handlePhaseEnd, useVisualizer }) => {
  const [showVideo, setShowVideo] = useState(true);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [videoToPlay, setVideoToPlay] = useState(
    Math.floor(Math.random() * paths.length)
  );
  const [videoSources, setVideoSorces] = useState(paths);
  const [numVideosToPlay, setNumVideosToPlay] = useState(numVidsToPlay);

  // Function to run after a video ends

  const handleVideoEnd = () => {
    // Set the video component not to show
    if (useVisualizer) {
      setShowVideo(false);
      setShowVisualizer(true);
      return;
    } else {
      // Check if there any videos left to play in this phase
      checkVideosLeft();
    }
  };

  // Function to run after the audio visualizer ends
  const handleAnswerEnd = () => {
    // Check if there any videos left to play in this phase
    checkVideosLeft();
    // If there are any videos left to play, show the Video component
    setShowVideo(true);
  };

  // Function to check if there are any videos left to play in this phase
  // If that are, it picks a new video to play from the remaning videos
  const checkVideosLeft = () => {
    // Reduce the number of videosToPlay by 1
    const newNumVideosToPlay = numVideosToPlay - 1;
    setNumVideosToPlay(newNumVideosToPlay);
    console.log(newNumVideosToPlay);
    // If there are no videos left to play, end the phase
    if (newNumVideosToPlay === 0) {
      handlePhaseEnd();
      return;
    } else {
      // Remove the video that was just played from the array of videos
      const newVideoSources = videoSources.filter(
        (video, index) => index !== videoToPlay
      );
      setVideoSorces(newVideoSources);
      // Pick a new video to play from the remaining videos
      pickNewVideo(newVideoSources);
    }
  };

  // Function that picks a new video to play out of the remaining videos
  const pickNewVideo = (newVideoSources) => {
    const newVideoToPlay = Math.floor(Math.random() * newVideoSources.length);
    setVideoToPlay(newVideoToPlay);
  };

  return (
    <div>
      {showVideo && (
        <Video
          key={numVideosToPlay}
          className="video-player"
          path={videoSources[videoToPlay]}
          handleVideoEnd={handleVideoEnd}
        />
      )}
      {showVisualizer && <AudioVisualizer handleAnswerEnd={handleAnswerEnd} />}
    </div>
  );
};

export default Phase;
