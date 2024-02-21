import { useEffect } from "react";

const Video = ({ path, handleEnd, useLoop = false }) => {
  useEffect(() => {
    const handlePress = (event) => {
      if (event.key === "Enter" || event.type === "click") {
        handleEnd();
      }
    };

    if (useLoop) {
      document.addEventListener("keydown", handlePress);
      document.addEventListener("click", handlePress);
    }
    return () => {
      if (useLoop) {
        document.removeEventListener("keydown", handlePress);
        document.removeEventListener("click", handlePress);
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
