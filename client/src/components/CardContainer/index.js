import React, { useContext, useEffect, useState } from "react";
import QuestionContext from '../../utils/QuestionContext';
import "./style.css"; 

function CardContainer() {
  const { question, questions, handleNextClick, handleTimer } = useContext(QuestionContext);
  const [flag, setFlag] = useState(false);

//Making sure question array is not undefined
  useEffect(()=>{
    if(question !== undefined){
        setFlag(true);
        handleTimer(question.time);
    }
  },[question])
  
  return(
        <>
     { flag &&
        (<div className="card text-center">
            <h2 className="card-header text-white bg-info"> {question.question} </h2>
            <ul className="list-group list-group-flush">
                {question.options.map(option => (
                    <li onClick={ ()=> handleNextClick({option}) } 
                    className="list-group-item" 
                    key={option}>{option}</li>
                    ))}
            </ul>
            <div className="card-footer text-muted small">
                Difficulty level: {question.level}
            </div> 
        </div>)}
    </>
    )
  }
  
  export default CardContainer;
