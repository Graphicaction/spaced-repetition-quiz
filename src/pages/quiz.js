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
    const [time, setTime] = useState(5);
    //const [answer, setAnswer] = useState();
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

    function nextQuestion(newQuestionIndex) {
        // Ensure that the question index stays within our range of questions
        if (newQuestionIndex >= questions.length) {
         alert("All done!");
          return;
        }
        setQuestionIndex(newQuestionIndex);
        setQuestion(questions[newQuestionIndex]);
      }
      
      function handleNextClick(option) {
        // Setting answer
        if(option !== ""){
          let answer =  option.option;
          tallyAnswer(answer);
        }
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

      function handleTimer(questionTime) {
        // Go to next question
        let countdown = questionTime, message = "";
        let length = questions.length;
        let index = questionIndex;
        let myInterval = setInterval(function() {
          countdown = --countdown <= 0 ? 0 : countdown;
          if(countdown !== 0) {
              setTime(time);
          }else {
            console.log("currently at question " + index + "out of " + length);
        
            if( countdown <=0 && (index < length)) {
              console.log("less than length");
              clearInterval(myInterval);
              handleNextClick("");
            }else if(countdown <= 0 && (index >= length)) {
              console.log("greater than length");
                  message = "All done!";
                  setTimeout(() => {
                    clearInterval(myInterval);
                      displayScore(message);    
                  }, 1000)
              } 
              setTime("");
          }
      }, 1000);     
      }

      const displayScore = (message) => {
        alert(message);
      }

    return (
        <div className="container mt-5">
            {questions.length ? (
            <QuestionContext.Provider value={{ question, questions, handleNextClick }}>
                <div className="row">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                        <CardContainer handleTimer={handleTimer} />
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