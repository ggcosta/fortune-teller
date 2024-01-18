import { useEffect, useState } from "react";
import { BarVisualizer } from "react-mic-visualizer";

const Audio = ( {handleAnswerEnd} ) => {
  const [audioContext, setAudioContext] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState([]);
  const [isSilent, setIsSilent] = useState(false);

  useEffect(() => {
    // Function to handle audio data
    const handleAudioData = (event) => {
      const inputData = event.inputBuffer.getChannelData(0);
      setAudioData(inputData);

      // Check if the input audio level is significant
      const isSignificant = inputData.some((value) => Math.abs(value) > 0.2);
      setIsSilent(!isSignificant);
    };

    // Set up the microphone and audio processing
    const setupMicrophone = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const microphone = context.createMediaStreamSource(stream);
      const processor = context.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = handleAudioData;

      microphone.connect(processor);
      processor.connect(context.destination);

      setMediaStream(stream);
      setAudioContext(context);
      setIsRecording(true);
    };

    // Start recording when the component mounts
    setupMicrophone();

    // Cleanup when the component unmounts
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  // Function to handle when the user stops providing significant audio input
  useEffect(() => {
    let silenceTimer;

    if (isSilent) {
      silenceTimer = setTimeout(() => {
        // Perform your desired action when silence is detected for 3 seconds
        console.log("User stopped talking for 5 seconds");
        handleAnswerEnd();
      }, 5000);
    } else {
      clearTimeout(silenceTimer);
    }

    return () => clearTimeout(silenceTimer);
  }, [isSilent]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>{isRecording ? "Recording..." : "Not recording"}</p>
      {isSilent ? (
        <p style={{ paddingBottom: "2rem" }}>User is silent</p>
      ) : (
        <p style={{ paddingBottom: "2rem" }}>User is speaking</p>
      )}
      {
        <BarVisualizer
          stream={mediaStream}
          size={150}
          circle={true}
          addTransparency={false}
          barColor="#12b7eb"
          bgColor="#000000"
          barBgColor="#D1D5DB"
        />
      }
    </div>
  );
};

export default Audio;
