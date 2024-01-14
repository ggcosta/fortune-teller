import { useEffect, useState } from "react";
import { Visualizer } from "react-sound-visualizer";

const AudioVisualizer = ({ handleAnswerEnd }) => {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then(setAudio);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleAnswerEnd();
    }, 5000);
  }, []);

  return (
    <Visualizer audio={audio}>
      {({ canvasRef, start }) => {
        useEffect(() => {
          if (start) {
            start();
          }
        }, [start]);

        return (
          <>
            <canvas ref={canvasRef} width={1920} height={1080} />
          </>
        );
      }}
    </Visualizer>
  );
};

export default AudioVisualizer;
