import React, { useState, useEffect } from 'react';
//import '../App.css';
//import helpers from "./helpers.js";

const InputSpinner = (props) => {

const id = props.id;
const [num, setNum]= useState(0);


const handleChange = (e) => {
    setNum(e.target.value);
}

const incNum = () => {
    setNum(Number(num)+1)
}

const decNum = () => {
    setNum(Number(num)-1)
}
    
  return (
    <div className="input-group input-group-sm">
        <div className="input-group-prepend">
          <button id="input-spinner-left-button" onClick={decNum} type="button" className="btn btn-dark">-</button>
        </div>
        <input className="form-control" type="number" value={num} onChange={handleChange}/>
        <div className="input-group-append">
          <button id="input-spinner-right-button" onClick={incNum} type="button" className="btn btn-dark">+</button>
        </div>
    </div>
  );
};

export default InputSpinner;