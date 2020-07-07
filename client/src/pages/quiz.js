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
    let totalTime = 0;
    const root = document.documentElement;
        
  // When the component mounts, a call will be made to get questions.
  useEffect(() => {
    loadQuestions();
  }, []);
  
  const loadQuestions = () => {
    API.getQuestions()
        .then(res => {
          //total time is calculated according to length of quiz
         totalTime = res.data.questions.length * 13;
          //return new question array with time for each ques 
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
        setTime(totalTime);
        setNewQuestion(true);
        setNewTime(true);
        setCSSVariable();
      })
      .catch(err => console.log(err));
  }

  const sortByDifficultyLevel = (unSortedQuestions) => {
     // Sort questions by dificulty level
     const sortedQuestions = unSortedQuestions.sort((a,b) => {
      return b.level - a.level;
    })
    return sortedQuestions;
  }
  //Setting CSS root variable with total time for the animation of circle
  const setCSSVariable = () =>{
    root.style.setProperty('--time', totalTime);
  }

  const nextQuestion = (newQuestionIndex, option) => {
    // Setting answer and calling tallyAnswer()
    let answer = "";
    option !== ""? answer =  option.option : answer = "";
    const points = tallyAnswer(answer);
    // Ensure that the question index stays within our range of questions
      if (newQuestionIndex >= questions.length) {
        setScore(score => points);
        displayScore(points);   
        return; 
      }
      //set new question
      setQuestionIndex(newQuestionIndex);
      setQuestion(questions[newQuestionIndex]);
      setNewQuestion(true);
      setScore(score => points);
  }
      
  const handleNextClick = (option) => {
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

  const displayScore = (points) => {
    setQuestions([]);
    setNewQuestion(false);
    setNewTime(false);
  }

  return (
      <div className="container mt-5">
          {questions.length ? (
            <div className="row">
              <QuestionContext.Provider value={{ question, questions, handleNextClick }}>
                <div className="col-sm-9 col-md-9 col-lg-9">
                {(newQuestion && <CardContainer questionNumber={questionIndex} />)}
                </div>
              </QuestionContext.Provider>
                <div className="col-sm-2 col-md-2 col-lg-2 circleDiv m-3">
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