import React, {useState, useEffect} from "react";
import API from "../utils/API";
import QuestionContext from "../utils/QuestionContext";
import CardContainer from "../components/CardContainer";
import Timer from "../components/Timer";

function Quiz(){
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    
    // When the component mounts, a call will be made to get questions.
    useEffect(() => {
      loadQuestions();
    }, []);
  
    function loadQuestions() {
      API.getQuestions()
        .then(questions => {
          setQuestions(questions);
          setQuestion(questions[0]);
        })
        .catch(err => console.log(err));
    }

    function nextQuestion(questionIndex) {
        // Ensure that the question index stays within our range of questions
        if (questionIndex >= questions.length) {
          questionIndex = 0;
        }
        setQuestionIndex(questionIndex);
        setQuestion(questions[questionIndex]);
      }
        
      function handleNextClick(event) {
        // Go to next question
        const newQuestionIndex = questionIndex + 1;
        nextQuestion(newQuestionIndex);
      }

      function handleTimer(event) {
        // Go to next question
        const newQuestionIndex = questionIndex + 1;
        nextQuestion(newQuestionIndex);
      }

    return (
        <div className="container mt-5">
            {questions.length ? (
            <QuestionContext.Provider value={{ question, handleNextClick, handleTimer }}>
                <div className="row">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <CardContainer />
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <Timer />
                    </div>
                </div>
            </QuestionContext.Provider>
            ): 
            (<h3>No Quiz For this Subject!</h3>)
            }
        </div>
      );
}

export default Quiz;