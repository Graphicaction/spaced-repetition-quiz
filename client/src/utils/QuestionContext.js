import React from "react";

const QuestionContext = React.createContext({
  id: "",
  question: "",
  answer: "",
  options: [],
  level: "",
  time: 0,
  handleNextClick: () => {},
});

export default QuestionContext;