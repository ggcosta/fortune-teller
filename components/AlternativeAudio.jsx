import { useEffect, useState } from 'react';

const AlternativeAudio = () => {
  const [decibels, setDecibels] = useState(0);

  useEffect(() => {
    let audioContext;
    let analyser;
    let microphone;

    const getMicrophoneInput = async () => {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        microphone = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = audioContext.createMediaStreamSource(microphone);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.fftSize = 32;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateDecibels = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
          setDecibels(average);
          requestAnimationFrame(updateDecibels);
        };

        updateDecibels();
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    getMicrophoneInput();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (microphone) {
        microphone.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ color: 'white' }}>
      <h1>Decibels: {decibels}</h1>
    </div>
  );
};

export default AlternativeAudio;
