import React, { useContext, useEffect, useState } from "react";
import QuestionContext from '../../utils/QuestionContext';

function Timer(props) {
  const { question } = useContext(QuestionContext);
  const [totalTime, setTotalTime] = useState(0);
 
//Making sure question array is not undefined
  useEffect(()=>{
    let mount = true;
    if(mount) {
      if(question !== undefined){
        setTotalTime(props.time);
        startCountdown();
      }
    }
    return () => mount = false;
  },[question])

  const startCountdown = () => {
    // setting countdown and total time interval
    let countdown = props.time;
    const currentInterval = setInterval(function() {
      countdown = --countdown <= 0 ? 0 : countdown;
      if(countdown !== 0) {
        setTotalTime(countdown);
      }else if(countdown <= 0){
        //If time up clear interval and display score
        clearInterval(currentInterval);
        props.displayScore("");
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
  
  export default Timer;

