import { useEffect, useState } from "react";
import { BarVisualizer } from "react-mic-visualizer";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Audio = ({ handleAnswerEnd }) => {
  // state to keep track of the media stream
  const [mediaStream, setMediaStream] = useState(null);
  // state to keep track of the transcript
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // UseEffect to setup the microphone and start listening with speech recognition
  useEffect(() => {
    const setupMicrophone = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
    };

    setupMicrophone();

    SpeechRecognition.startListening({ continuous: true });
  }, []);

  // UseEffect to run every time the transcript changes
  useEffect(() => {
    // Function to run when the user stops talking for 5 seconds
    const handleLongSilence = () => {
      mediaStream.getTracks().forEach((track) => track.stop());
      console.log("User stopped talking for 5 seconds");
      SpeechRecognition.stopListening();
      handleAnswerEnd();
    };

    let silenceTimer = setTimeout(() => {
      if (transcript.length === 0) return;
      handleLongSilence();
    }, 5000);

    return () => {
      // Clear the timer when the component unmounts
      clearTimeout(silenceTimer);
    };
  }, [transcript]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
