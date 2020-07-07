import React, { useContext, useEffect, useState } from "react";
import useCountDown from 'react-countdown-hook';
import QuestionContext from '../../utils/QuestionContext';
import "./style.css"; 

function CardContainer(props) {
  const { question, handleNextClick } = useContext(QuestionContext);
  const [flag, setFlag] = useState(false);
  const [timeLeft, start] = useCountDown(question.time * 1000, 1000);
  let questionNumber = props.questionNumber + 1;

//Making sure question array is not undefined
  useEffect(()=>{
    if(question !== undefined){
      setFlag(true);
      start(question.time * 1000);
    }
  },[question])

  useEffect(()=>{
    if(timeLeft === 0 && flag){
      handleNextClick("");
    }
  },[timeLeft])

  const msToSec = ms => (ms / 1000).toFixed(1);

  return(
        <>
     { flag &&
        (<div className="card text-center">
            <h2 className="card-header text-white bg-info"> {questionNumber}. {question.question} </h2>
            <ul className="list-group list-group-flush">
                {question.options.map(option => (
                    <li onClick={ ()=> { handleNextClick({option})} } 
                    className="list-group-item" key={option}>
                      {option}
                    </li>
                    ))}
            </ul>
            <div className="card-footer text-muted small">
                Time left for this question: {msToSec(timeLeft)}
            </div> 
        </div>)}
    </>
    )
  }
  
  export default CardContainer;

