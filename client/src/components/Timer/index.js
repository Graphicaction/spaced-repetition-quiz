import React, { useContext, useEffect, useState } from "react";
import QuestionContext from '../../utils/QuestionContext';
import "./style.css"; 

function CardContainer(props) {
  const { question } = useContext(QuestionContext);
  const [totalTime, setTotalTime] = useState(0);
  const [flag, setFlag] = useState(false);

//Making sure question array is not undefined
  useEffect(()=>{
    if(question !== undefined){
      setFlag(true);
      setTotalTime(props.time);
      startCountdown();
    }
  },[question])

  const startCountdown = () => {
    // setting countdown and total time interval
    let countdown = props.time;
    const currentInterval = setInterval(function() {
      countdown = --countdown <= 0 ? 0 : countdown;
      if(countdown !== 0) {
        setTotalTime(countdown);
      }else if(countdown <= 0){
        //If time up for the question go to next question
        clearInterval(currentInterval);
      }
    }, 1000);
  }
  
  return(
        <>
     { totalTime &&
        (<div id="countdown">
            <div id="countdown-number">{totalTime}</div>
            <svg>
            <circle r="18" cx="20" cy="20"></circle>
            </svg>
        </div>)}
    </>
    )
  }
  
  export default CardContainer;

