import { useEffect } from "react";

const Video = ({ path, handleEnd, useLoop = false }) => {
  useEffect(() => {
    const handlePress = (event) => {
      if (event.type === "click" || event.type === "touchstart" || event.key === "Enter") {
        handleEnd();
      }
    };

    if (useLoop) {
      document.addEventListener("click", handlePress);
      document.addEventListener("touchstart", handlePress);
      document.addEventListener("keydown", handlePress);
    }
    return () => {
      if (useLoop) {
        document.removeEventListener("click", handlePress);
        document.removeEventListener("touchstart", handlePress);
        document.removeEventListener("keydown", handlePress);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    if (useLoop) return;
    handleEnd();
  };

  return (
    <>
      <video
        autoPlay
        muted={false}
        loop={useLoop}
        className="video-player"
        onEnded={handleVideoEnd}
      >
        <source src={path} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default Video;
