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
    const [score, setScore] = useState(0);
    const [myInterval,setCurrentInterval] = useState();
    let clear = false, totalTime = 0;
    const root = document.documentElement;
        
  // When the component mounts, a call will be made to get questions.
  useEffect(() => {
    loadQuestions();
  }, []);
  
  const loadQuestions = () => {
    API.getQuestions()
        .then(res => {
          totalTime = res.data.questions.length * 15;
          //return new question array with time col 
          const newQuestions = res.data.questions.map(question => {
              question.time = 5 * question.level;
              return question;     
              });
          return newQuestions;
      })
      .then(unSortedQuestions => {
       const sortedQuestions = sortByDifficultyLevel(unSortedQuestions);
       //Setting states for rendering correspoing components
        setQuestions(sortedQuestions);
        setQuestion(sortedQuestions[0]);
        setNewQuestion(true);
        setTime(totalTime);
        setNewTime(true);
        clear = true;
        setCSSVariable();
      })
      .catch(err => console.log(err));
  }

  const sortByDifficultyLevel = (unSortedQuestions) => {
     // Sort this.state.employees by years
     const sortedQuestions = unSortedQuestions.sort((a,b) => {
      return b.level - a.level;
    })
    return sortedQuestions;
  }

  const setCSSVariable = () =>{
    root.style.setProperty('--time', totalTime);
  }

  const nextQuestion = (newQuestionIndex, option) => {
    // Setting answer 
    let answer = "";
    option !== ""? answer =  option.option : answer = "";
    const points = tallyAnswer(answer);
    // Ensure that the question index stays within our range of questions
      if (newQuestionIndex >= questions.length) {
        clearInterval(myInterval);
        setScore(score => points);
        displayScore(points);   
        return; 
      }
      clearInterval(myInterval);
      //set new question
      setQuestionIndex(newQuestionIndex);
      setQuestion(questions[newQuestionIndex]);
      setNewQuestion(true);
      setScore(score => points);
  }
      
  const handleNextClick = (option) => {
    clearInterval(myInterval);
    //loading next question
    const newQuestionIndex = questionIndex + 1;
    nextQuestion(newQuestionIndex, option);
  }

  const tallyAnswer = (answer) => {
    //Checking if answer is correct or not and updating score accordinly
    let points = 0, levelChanged = false;
    if(questions[questionIndex].answer === answer){
        points = score + 10
        if(questions[questionIndex].level > 1){
          questions[questionIndex].level -= 1;  //If answer is right move the question card into right deck by 1
          levelChanged = true;
        }
      }else {
        points = score - 10;
        if(questions[questionIndex].level < 5){
          questions[questionIndex].level += 1;  //If answer is wrong move the question card into left deck by 1
          levelChanged = true;
        }
      }
    if(levelChanged){
      API.updateQuestion(questions[questionIndex]._id,{
        level: questions[questionIndex].level 
      })
      .then((res) => {
        console.log("Record updated!");
      })
      .catch((err) => {
        console.log(err);
      });
    }
    return points;
  }

  const handleTimer = (questionTime) => {
      // Go to next question
      let countdown = questionTime;
      clearInterval(myInterval);
      //Setting time interval for each question
      if(questionIndex < questions.length){
        const currentInterval = setInterval(function() {
          if(!clear)
            return;
          countdown = --countdown <= 0 ? 0 : countdown;
          if(countdown <= 0){
            //If time up for the question go to next question
            const newQuestionIndex = questionIndex + 1;
            clearInterval(myInterval);
            nextQuestion(newQuestionIndex, "");
          }
        }, 1000);
        setCurrentInterval(currentInterval);
    }
  }
  
  const displayScore = (points) => {
    clearInterval(myInterval);
    setQuestions([]);
    clear = false;
  }

  return (
      <div className="container mt-5">
          {questions.length ? (
            <div className="row">
              <QuestionContext.Provider value={{ question, questions, handleNextClick, handleTimer }}>
                <div className="col-sm-9 col-md-9 col-lg-9">
                {(newQuestion && <CardContainer />)}
                </div>
              </QuestionContext.Provider>
                <div className="col-sm-3 col-md-3 col-lg-3 circleDiv">
                  {(newTime && <Timer time={time} displayScore={displayScore} />)}
                </div>
            </div>
          ): 
          (<h1 className="text-center">Your Score is {score}</h1>)
          }
      </div>
    );
}
export default Quiz;