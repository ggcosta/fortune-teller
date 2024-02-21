import { useState, useMemo } from "react";
import Phase from "./Phase";
import Image from "next/image";
import handlePhasesData from "@/utils/auxiliaryFunctions";

const PhaseHandler = ({ data }) => {
  // State to keep track of which phase we are on
  const [currentPhase, setCurrentPhase] = useState(0);
  const [noInputError, setNoInputError] = useState(false);
  const [presentationRerun, setPresentationRerun] = useState(false);
  // Data descontruction
  const errorVid = data.errorVid;
  const phases = useMemo(
    () => handlePhasesData(data.phases),
    [presentationRerun]
  );
  const inputData = data.inputData;

  // Total number of phases
  const totalNumPhases = phases.length;
  
  const handlePresentationEnd = () => {
    setPresentationRerun(!presentationRerun);
    if (noInputError) setNoInputError(false);
    setCurrentPhase(0);
  };

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
    <>
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
          data={phases[currentPhase]} // phase data
          handlePhaseEnd={handlePhaseEnd}
          inputData={inputData}
        />
      )}
    </>
  );
};

export default PhaseHandler;
