export const data = {
  standByVideo: "/videos/stand_by.mp4",
  phasesData: {
    bgImg: "/images/background.png",
    errorVid: "/videos/no_input_error.mp4",
    transitionVid: "/videos/transition.mp4",
    inputData: {
      inputVid: "/videos/audio_input.mp4",
      noInputTimeout: 15000, // 15 seconds
      answerEndTimeout: 7000, // 7 seconds
    },
    phases: [
      {
        paths: ["videos/intro.mp4"],
        type: "intro",
      },
      {
        paths: [
          "videos/question_1.mp4",
          "videos/question_5.mp4",
          "videos/question_7.mp4",
          "videos/question_9.mp4",
        ],
        type: "question",
        numQuestions: 2,
      },
      {
        paths: [
          "videos/output_1.mp4",
          "videos/output_6.mp4",
        ],
        type: "output",
      },
    ],
  },
};
