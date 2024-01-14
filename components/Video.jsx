const Video = ({path, handleVideoEnd}) => {

  return (
    <video
      muted
      // controls
      autoPlay
      style={{ width: "100%", height: "100vh", objectFit: "cover", margin: 0, padding: 0}}
      onEnded={handleVideoEnd}
    >
      <source src={path} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
