export const data = {
  standByVideo: "/videos/stand_by.mp4",
  phasesData: {
    errorVid: "/videos/no_input_error.mp4",
    phases: [
      {
        path: "/videos/stand_by.mp4",
        type: "stand_by",
      },
      {
        path: "videos/intro.mp4",
        type: "intro",
      },
      {
        paths: [
          "videos/question_1.mp4",
          "videos/question_2.mp4",
          "videos/question_3.mp4",
          "videos/question_4.mp4",
          "videos/question_5.mp4",
          "videos/question_6.mp4",
          "videos/question_7.mp4",
          "videos/question_8.mp4",
          "videos/question_9.mp4",
          "videos/question_10.mp4",
          "videos/question_11.mp4",
          "videos/question_12.mp4",
        ],
        type: "question",
        numQuestions: 4,
        transitionImage: "/images/bg.jpg",
      },
      {
        paths: [
          "videos/output_1.mp4",
          "videos/output_2.mp4",
          "videos/output_3.mp4",
          "videos/output_4.mp4",
          "videos/output_5.mp4",
          "videos/output_6.mp4",
          "videos/output_7.mp4",
          "videos/output_8.mp4",
          "videos/output_9.mp4",
          "videos/output_10.mp4",
          "videos/output_11.mp4",
          "videos/output_12.mp4",
        ],
        type: "output",
      },
    ],
    inputData: {
      inputVid: "/videos/audio_input.mp4",
      noInputTimeout: 15000, // 15 seconds
      answerEndTimeout: 7000, // 7 seconds
    },
  },
};
