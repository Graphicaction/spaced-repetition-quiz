import React from "react";

const QuestionContext = React.createContext({
  id: "",
  question: "",
  answers: [],
  options: [],
  level: "",
  handleNextClick: () => {}
});

export default QuestionContext;