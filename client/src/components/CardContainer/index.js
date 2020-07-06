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
        start();
    }
  },[question])

  const msToSec = ms => (ms / 1000).toFixed(1);

  const restart = React.useCallback(() => {
    // you can start existing timer with an arbitrary value
    // if new value is not passed timer will start with initial value
    const newTime = question.time;
    start(newTime);
  }, [start]);

  return(
        <>
     { flag &&
        (<div className="card text-center">
            <h2 className="card-header text-white bg-info"> {questionNumber}. {question.question} </h2>
            <ul className="list-group list-group-flush">
                {question.options.map(option => (
                    <li onClick={ ()=> { handleNextClick({option}); restart();} } 
                    className="list-group-item" key={option}>
                      {option}
                    </li>
                    ))}
            </ul>
            <div className="card-footer text-muted small">
                {/* Difficulty level: {question.level} */}
                {(timeLeft === 0 ) && handleNextClick("")}
                Time left for this question: {msToSec(timeLeft)}
            </div> 
        </div>)}
    </>
    )
  }
  
  export default CardContainer;

