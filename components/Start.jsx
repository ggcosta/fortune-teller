import { useEffect } from "react";

const Start = ({ path, handleStart }) => {
  useEffect(() => {
    const handleEnter = (event) => {
      if (event.key === "Enter" || event.type === "click") {
        handleStart();
      }
    };

    document.addEventListener("keydown", handleEnter);
    document.addEventListener("click", handleEnter);

    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, []);

  return (
    <>
      <video autoPlay muted loop className="video-player">
        <source src={path} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
    </>
  );
};

export default Start;
