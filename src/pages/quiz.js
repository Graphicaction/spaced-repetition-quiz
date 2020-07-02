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
    const [time, setTime] = useState(0);
    const [newQuestion, setNewQuestion] = useState(false);
    const [newTime, setNewTime] = useState(false);
    //const [answer, setAnswer] = useState();
    const [score, setScore] = useState();
    let myInterval;
    
    // When the component mounts, a call will be made to get questions.
    useEffect(() => {
      loadQuestions();
      setScore(0);
    }, []);
  
    function loadQuestions() {
      let totalTime =0;
      API.getQuestions()
          .then(res => {
            // return new question array with time col  
            const newQuestions = res.map(question => {
                question.time = 5 * question.level;
                totalTime += question.time;
                return question;     
                })
            return newQuestions;
        })
        .then(questions => {
          console.log("My questions ", questions);
          setQuestions(questions);
          setQuestion(questions[0]);
          setNewQuestion(true);
          setTime(questions[0].time);
          setNewTime(true);
        })
        .catch(err => console.log(err));
    }

    function nextQuestion(newQuestionIndex) {
        // Ensure that the question index stays within our range of questions
        if (newQuestionIndex >= questions.length) {
          let message = "All done!";
          clearInterval(myInterval);
          displayScore(message);    
          return;
        }
        setQuestionIndex(newQuestionIndex);
        setQuestion(questions[newQuestionIndex]);
        setNewQuestion(true);
      }
      
      function handleNextClick(option) {
        // Setting answer and nextClicked flag
        if(option !== ""){
          let answer =  option.option;
          tallyAnswer(answer);
        }
        clearInterval(myInterval);
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
      let countdown = questionTime;
      console.log("now my q index is ", questionIndex)
      
        myInterval = setInterval(function() {
          countdown = --countdown <= 0 ? 0 : countdown;
          if(countdown !== 0) {
            setTime(questionTime);
            setNewTime(true);
          }else {
            const newQuestionIndex = questionIndex + 1;
            clearInterval(myInterval);
            nextQuestion(newQuestionIndex);
          }
        }, 1000);     
      
    }

      const displayScore = (message) => {
        setQuestions([]);
        alert(message);
      }

    return (
        <div className="container mt-5">
            {questions.length ? (
            <QuestionContext.Provider value={{ question, questions, handleNextClick, handleTimer }}>
                <div className="row">
                    <div className="col-sm-9 col-md-9 col-lg-9">
                      {(newQuestion && <CardContainer />)}
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3 circleDiv">
                      {(newTime &&<Timer time={time} />)}
                    </div>
                </div>
            </QuestionContext.Provider>
            ): 
            (<h5 className="center">Your Score is {score}</h5>)
            }
        </div>
      );
}

export default Quiz;