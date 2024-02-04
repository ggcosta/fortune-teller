// Function to pick a random video from the current phase
const pickRandomVid = (vidsPaths) => {
  const randomIndex = Math.floor(Math.random() * vidsPaths.length);
  return vidsPaths[randomIndex];
};

const shuffleArray = (array, numElements) => {
  let shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, numElements);
};

// Funtion that adds a transitionVid between each questionPhase
const addTransitionVid = (phases, transitionVid) => {
  const newPhases = [];
  phases.forEach((phase, index) => {
    newPhases.push(phase);
    newPhases.push({
      paths: transitionVid,
      useAudioInput: false,
    });
  });
  return newPhases;
};

/**
 * Handles the phases data by filtering and manipulating the old phases array.
 * 
 * @param {Array} oldPhases - The array of old phases.
 * @param {string} transitionVid - The transition video.
 * @returns {Array} - The new phases array.
 */
function handlePhasesData(oldPhases, transitionVid) {
  const introPhase = oldPhases.filter((phase) => phase.type === "intro")[0];
  const questionPhase = oldPhases.filter(
    (phase) => phase.type === "question"
  )[0];
  const outputPhase = oldPhases.filter((phase) => phase.type === "output")[0];

  const randomizedQuestionPaths = shuffleArray(questionPhase.paths, 2);

  const questionPhasesNoTransition = randomizedQuestionPaths.map((path) => ({
    paths: path,
    useAudioInput: true,
  }));

  const newQuestionPhases = addTransitionVid(
    questionPhasesNoTransition,
    transitionVid
  );

  const newOutputPhase = {
    paths: pickRandomVid(outputPhase.paths),
    useAudioInput: false,
  };

  const newPhases = [introPhase, ...newQuestionPhases, newOutputPhase].flat();

  console.log(newPhases);

  return newPhases;
}

export default handlePhasesData;
