import { useState } from "react";
import Phase from "./Phase";

const PhaseHandler = ({ phases, handlePresentationEnd }) => {
  // State to keep track of which phase we are on
  const [currentPhase, setCurrentPhase] = useState(0);
  // Total number of phases
  const totalNumPhases = phases.length;

  // Function to run after a phase ends
  const handlePhaseEnd = () => {
    if (currentPhase < totalNumPhases - 1) {
      setCurrentPhase(currentPhase + 1);
    } else {
      handlePresentationEnd();
    }
  };

  // Function to pick a random video from the current phase
  const pickRandomVid = () => {
    const vidsPaths = phases[currentPhase].paths;
    const randomIndex = Math.floor(Math.random() * vidsPaths.length);
    return vidsPaths[randomIndex];
  };

  return (
    <>
      {
        <Phase
          key={currentPhase}
          path={pickRandomVid()}
          useVisualizer={phases[currentPhase].audioVisualizer}
          handlePhaseEnd={handlePhaseEnd}
        />
      }
    </>
  );
};

export default PhaseHandler;
