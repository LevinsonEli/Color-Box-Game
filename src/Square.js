import React from "react";
import './App.css';

const Square = (props) => (
  <div 
    className="box"
    style={{
      backgroundColor: props.color
    }}
    onClick={props.onClick}
  >
  </div>
)

export default Square;