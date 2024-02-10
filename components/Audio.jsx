import { useEffect, useState } from "react";
import { BarVisualizer } from "react-mic-visualizer";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Audio = ({ handleAnswerEnd, inputData }) => {
  // state to keep track of the media stream
  const [mediaStream, setMediaStream] = useState(null);
  // state to keep track of the transcript
  const { transcript } =
    useSpeechRecognition();

  // Timeouts
  const answerEndTimeout = inputData.answerEndTimeout;
  const noInputTimeout = inputData.noInputTimeout;
  // UseEffect to setup the microphone and start listening with speech recognition
  useEffect(() => {
    const setupMicrophone = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
    };

    setupMicrophone();

    SpeechRecognition.startListening({ continuous: true, language: "pt-PT" });
  }, []);

  // UseEffect to run every time the transcript changes
  useEffect(() => {
    // Function to run when the user stops talking for 5 seconds
    const handleLongSilence = (noInput = false) => {
      mediaStream.getTracks().forEach((track) => track.stop());
      SpeechRecognition.stopListening();
      handleAnswerEnd(noInput);
    };

    let silenceTimer;

    if (transcript.length === 0) {
      silenceTimer = setTimeout(() => {
        handleLongSilence(true);
      }, noInputTimeout);
    } else {
      silenceTimer = setTimeout(() => {
        handleLongSilence(false);
      }, answerEndTimeout);
    }

    console.log(`transcript ${transcript}`);
    return () => {
      // Clear the timer when the component unmounts
      clearTimeout(silenceTimer);
    };
  }, [transcript, mediaStream]);

  return (
    <>
      <video
        autoPlay
        className="video-player"
        onEnded={() => handleAnswerEnd(false)}
      >
        <source src={inputData.inputVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default Audio;
