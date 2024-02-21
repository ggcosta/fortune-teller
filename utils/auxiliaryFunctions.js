// Function to pick a random video from the current phase
const pickRandomVid = (vidsPaths) => {
  const randomIndex = Math.floor(Math.random() * vidsPaths.length);
  return vidsPaths[randomIndex];
};

// Function to shuffle an array and return a subset of elements
const shuffleArray = (array, numElements) => {
  console.log(numElements);
  let shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, numElements);
};

/**
 * Handles the phases data by filtering and manipulating the old phases array.
 *
 * @param {Array} nonProcessedPhases - The array of old phases.
 * @returns {Array} - The new phases array.
 */
function handlePhasesData(nonProcessedPhases) {
  // Filter the old phases array to get the stand by phase
  const standByPhase = nonProcessedPhases.find(
    (phase) => phase.type === "stand_by"
  );

  // Filter the old phases array to get the intro phase
  const introPhase = nonProcessedPhases.find(
    (phase) => phase.type === "intro"
  );

  // Filter the old phases array to get the question phase
  const questionPhase = nonProcessedPhases.find(
    (phase) => phase.type === "question"
  );

  // Filter the old phases array to get the output phase
  const outputPhase = nonProcessedPhases.find(
    (phase) => phase.type === "output"
  );

  // Shuffle the question paths and select a subset of 2 paths
  const randomizedQuestionPaths = shuffleArray(questionPhase.paths, questionPhase.numQuestions);

  // Create a new stand by phase object
  const newStandByPhase = {
    path: standByPhase.path,
    useAudioInput: false,
    type: "stand_by",
  };

  // Create a new intro phase object
  const newIntroPhase = {
    path: introPhase.path,
    useAudioInput: false,
    type: "intro",
  };

  // Create new question phase objects with shuffled paths
  const newQuestionPhases = randomizedQuestionPaths.map((path) => ({
    path: path,
    useAudioInput: true,
    type: "question",
    transitionImage: questionPhase.transitionImage,
  }));

  // Create a new output phase object with a random path
  const newOutputPhase = {
    path: pickRandomVid(outputPhase.paths),
    useAudioInput: false,
    type: "output",
  };

  // Combine all the new phases into a single array
  const newPhases = [
    newStandByPhase,
    newIntroPhase,
    ...newQuestionPhases,
    newOutputPhase,
  ].flat();

  // Log the new phases array
  console.log(newPhases);

  // Return the new phases array
  return newPhases;
}

export default handlePhasesData;
