import React, { useState } from "react";
import "./Style/lengthinput.css";

function LengthInput(prop) {
  
    const updateValue = (e)=> prop.handleRange(e);
  return (
    <>
      <div className="slider">
        <input type="range" min="6" max="50" value={prop.initialRange} onChange={(e)=>updateValue(e)}/>
        <p>{prop.initialRange}</p>{" "}
      </div>
    </>
  );
}

export default LengthInput;
