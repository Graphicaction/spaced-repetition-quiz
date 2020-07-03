import React, { useContext, useEffect, useState } from "react";
import QuestionContext from '../../utils/QuestionContext';
import "./style.css"; 

function CardContainer(props) {
  const { question } = useContext(QuestionContext);
  const [flag, setFlag] = useState(false);

//Making sure question array is not undefined
  useEffect(()=>{
    if(question !== undefined)
        setFlag(true);
  },[question])
  
  return(
        <>
     { flag &&
        (<div id="countdown">
            <div id="countdown-number">{question.time}</div>
            <svg>
            <circle r="18" cx="20" cy="20"></circle>
            </svg>
        </div>)}
    </>
    )
  }
  
  export default CardContainer;

