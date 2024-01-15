import React from "react";
import { useState } from "react";
import Phase from "./Phase";

const PhaseHandler = ({ phases, handlePresentationEnd }) => {
  // State to keep track of which phase we are on
  const [currentPhase, setCurrentPhase] = useState(0);
  // Number of phases
  const numPhases = phases.length;

  // Function to run after a phase ends
  const handlePhaseEnd = () => {
    if (currentPhase < numPhases - 1) {
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
    <div>
      {
        <Phase
          key={currentPhase}
          path={pickRandomVid()}
          useVisualizer={phases[currentPhase].audioVisualizer}
          handlePhaseEnd={handlePhaseEnd}
        />
      }
    </div>
  );
};

export default PhaseHandler;
