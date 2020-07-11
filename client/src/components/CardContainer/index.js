import React, { useContext, useEffect, useState } from "react";
import useCountDown from 'react-countdown-hook';
import QuestionContext from '../../utils/QuestionContext';
import "./style.css"; 

function CardContainer(props) {
  const { question, handleNextClick } = useContext(QuestionContext);
  const [answer, setAnswer] = useState("");
  const [isActive, setActive] =useState(false);
  const [flag, setFlag] = useState(false);
  const [timeLeft, start] = useCountDown(question.time * 1000, 1000);
  let questionNumber = props.questionNumber + 1;

//Making sure question array is not undefined
  useEffect(()=>{
    let mount = true;
    if(mount){
      if(question !== undefined){
        setFlag(true);
        start(question.time * 1000);
      }
    }
    return () => mount = false;
  },[question])

  useEffect(()=>{
    let mount = true;
    if(mount){
      if(timeLeft === 0 && flag){
        handleNextClick("");
      }
    }
    return () => mount = false;
  },[timeLeft])

  const msToSec = ms => (ms / 1000).toFixed(1);
  
  const handleChange = (option) => {
    let i = option.i;
    setAnswer(option.option);
    setActive(i);
  }

  const handleNext = () => {
    if(answer !== "")
      handleNextClick(answer);
  }

  return(
        <>
     { flag &&
        (<div className="card text-center">
            <h2 className="card-header text-white bg-dark"> {questionNumber}. {question.question} </h2>
            <ul className="list-group list-group-flush">
                {question.options.map((option, i) => (
                    <li  
                    className={(isActive === i) ? "list-group-item active": "list-group-item"} key={option}
                    onClick={ ()=> { handleChange({option, i})} } 
                    >
                      {option}
                    </li>
                    ))}
            </ul>
            <button type="button" id="nextBtn" onClick={ handleNext } className="btn btn-dark btn-lg m-3 px-3 rounded-pill">Next</button>
            <div className="card-footer text-muted small">
                Time left for this question: {msToSec(timeLeft)}
            </div> 
        </div>)}
    </>
    )
  }
  
  export default CardContainer;

