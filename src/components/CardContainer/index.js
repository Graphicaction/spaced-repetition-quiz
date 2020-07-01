import React, { useContext, useEffect, useState } from "react";
import QuestionContext from '../../utils/QuestionContext';
import "./style.css"; 

function CardContainer(props) {
  const { question, handleNextClick } = useContext(QuestionContext);
  const [flag, setFlag] = useState(false);

//Making sure question array is not undefined
  useEffect(()=>{
    if(question !== undefined)
        setFlag(true);
  },[question])
  
  return(
        <>
     { flag &&
        (<div className="card text-center">
            <h2 className="card-header text-white bg-info"> {question.question} </h2>
            <ul className="list-group list-group-flush">
                {question.options.map(option => (
                    <li onClick={handleNextClick} 
                    className="list-group-item" 
                    value={option}
                    onChange={props.handleInputChange}
                    key={option}>{option}</li>
                    ))}
            </ul>
            <div className="card-footer text-muted small">
                {question.level}
            </div> 
        </div>)}
    </>
    )
  }
  
  export default CardContainer;

