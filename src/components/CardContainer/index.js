/* eslint-disable no-lone-blocks */
import React, { useContext, useEffect, useState } from "react";
import QuestionContext from '../../utils/QuestionContext';

function CardContainer() {
  //Assigning projects 
  const { question, handleNextClick } = useContext(QuestionContext);
  const [flag, setFlag] = useState(false);

  useEffect(()=>{
    if(question !== undefined)
        setFlag(true);
  },[question])
  
  return(
        <>
     { flag &&
        (<div className="card text-center">
        <h2 className="card-header">
            {question.question}
        </h2>
        <ul className="list-group list-group-flush">
            {question.options.map(option => (
                <li className="list-group-item" key={option}>{option}</li>
                ))
            }
        </ul>
        <button onClick={handleNextClick} className="btn btn-success btn-lg m-5 px-3 rounded-pill">next</button> 
        <div className="card-footer text-muted small">
            {question.level}
        </div> 
    </div>
    )}
    </>
    )
  }
  
  export default CardContainer;

