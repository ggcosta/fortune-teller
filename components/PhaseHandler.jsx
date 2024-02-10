import { useState, useMemo, useEffect } from "react";
import Phase from "./Phase";
import handlePhasesData from "@/utils/auxiliaryFunctions";
import { CSSTransition } from "react-transition-group";

const PhaseHandler = ({ data, handlePresentationEnd }) => {
  // State to keep track of which phase we are on
  const [currentPhase, setCurrentPhase] = useState(0);
  const [noInputError, setNoInputError] = useState(false);
  const [showPhase, setShowPhase] = useState(false);
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
      setShowPhase(false);
      setTimeout(() => {
        setNoInputError(true);
      }, 1000);
      return;
    }
    if (currentPhase < totalNumPhases - 1) {
      console.log("phase ended");
      setShowPhase(false);
      setTimeout(() => {
        setCurrentPhase(currentPhase + 1);
        setShowPhase(true);
      }, 1000);
    } else {
      handlePresentationEnd();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowPhase(true);
    }, 1000);
  }, []);

  return (
    <>
      <CSSTransition
        in={noInputError}
        timeout={1000}
        classNames="fade"
        unmountOnExit
      >
        <video
          autoPlay
          className="video-player"
          onEnded={handlePresentationEnd}
        >
          <source src={errorVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CSSTransition>
      <CSSTransition
        in={showPhase}
        timeout={1000}
        classNames="fade"
        unmountOnExit
      >
        <Phase
          key={currentPhase}
          path={phases[currentPhase].paths}
          useAudioInput={phases[currentPhase].useAudioInput}
          handlePhaseEnd={handlePhaseEnd}
          inputData={inputData}
        />
      </CSSTransition>
    </>
  );
};

export default PhaseHandler;
