import { useEffect } from "react";

const Video = ({ path, handleEnd, useLoop = false }) => {
  useEffect(() => {
    const handlePress = (event) => {
      if (event.type === "mousemove" || event.type === "touchstart") {
        handleEnd();
      }
    };

    if (useLoop) {
      document.addEventListener("mousemove", handlePress);
      document.addEventListener("touchstart", handlePress);
    }
    return () => {
      if (useLoop) {
        document.removeEventListener("mousemove", handlePress);
        document.removeEventListener("touchstart", handlePress);
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
