import { useState, useMemo } from "react";
import Phase from "./Phase";
import Image from "next/image";
import handlePhasesData from "@/utils/auxiliaryFunctions";

const PhaseHandler = ({ data, handlePresentationEnd }) => {
  // State to keep track of which phase we are on
  const [currentPhase, setCurrentPhase] = useState(0);
  const [noInputError, setNoInputError] = useState(false);
  // Data descontruction
  const bgImage = data.bgImg;
  const errorVid = data.errorVid;
  const transitionVid = data.transitionVid;
  const phases = useMemo(
    () => handlePhasesData(data.phases, transitionVid),
    [data.phases, transitionVid]
  );
  const inputData = data.inputData;

  // Total number of phases
  const totalNumPhases = phases.length;

  // Function to run after a phase ends
  const handlePhaseEnd = (noInput) => {
    if (noInput) {
      setNoInputError(true);
      return;
    }
    if (currentPhase < totalNumPhases - 1) {
      setCurrentPhase(currentPhase + 1);
      console.log(`currentPhase ${currentPhase + 1}`);
    } else {
      handlePresentationEnd();
    }
  };

  return (
    <div className="app">
      <Image
        className="bg-img"
        alt="background image"
        width={1080}
        height={1920}
        src={bgImage}
      />
      {noInputError && (
        <video
          autoPlay
          className="video-player"
          onEnded={handlePresentationEnd}
        >
          <source src={errorVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {!noInputError && (
        <Phase
          key={currentPhase}
          path={phases[currentPhase].paths}
          useAudioInput={phases[currentPhase].useAudioInput}
          handlePhaseEnd={handlePhaseEnd}
          inputData={inputData}
        />
      )}
    </div>
  );
};

export default PhaseHandler;
