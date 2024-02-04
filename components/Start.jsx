import { useEffect } from "react";

const Start = ({ path, handleStart }) => {
  useEffect(() => {
    const handleEnter = (event) => {
      if (event.key === "Enter") {
        handleStart();
      }
    };

    document.addEventListener("keydown", handleEnter);

    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, []);

  return (
    <div className="app">
      <video autoPlay className="video-player">
        <source src={path} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Start;
