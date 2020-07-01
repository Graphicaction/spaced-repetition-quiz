import React, {useState, useEffect} from "react";
import API from "../utils/API";
import QuestionContext from "../utils/QuestionContext";
import CardContainer from "../components/CardContainer";
import Timer from "../components/Timer";
import "./quiz.css";

function Quiz(){
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    const [time, setTime] = useState(180);
    const [answer, setAnswer] = useState();
    const [score, setScore] = useState();
    
    // When the component mounts, a call will be made to get questions.
    useEffect(() => {
      loadQuestions();
      setScore(0);
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
      
      function handleNextClick(option) {
        // Setting answer
        let answer =  option.option;
        tallyAnswer(answer);
        //loading next question
        const newQuestionIndex = questionIndex + 1;
        nextQuestion(newQuestionIndex);
      }

      const tallyAnswer = (answer) => {
        //Checking if answer is correct or not and updating score accordinly
        let points = 0;
        if(questions[questionIndex].answer === answer){
            points = score + 10
         }else {
            points = score - 10;
         }
        setScore(score => points);
      }

      function handleTimer(event) {
        // Go to next question
        let countdown = time, message = "";
        setInterval(function() {
          countdown = --countdown <= 0 ? 0 : countdown;
          if(countdown !== 0) {
              setTime(time);
          }else {
              if(countdown <= 0) {
                  message = "Time Up!";
                  setTimeout(() => {
                      // clearStatusClass(document.body);
                      // displayScore();    
                  }, 1000)
              }
              setTime("");
          }
      }, 1000);     
      }

    return (
        <div className="container mt-5">
            {questions.length ? (
            <QuestionContext.Provider value={{ question, handleNextClick, handleTimer }}>
                <div className="row">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <CardContainer />
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3 circleDiv">
                        <Timer time={time} />
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