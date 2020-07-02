import React from "react";

const QuestionContext = React.createContext({
  id: "",
  question: "",
  answers: [],
  options: [],
  level: "",
  time: 0,
  handleNextClick: () => {},
  handleTimer: () => {}
});

export default QuestionContext;