import React, { Component } from 'react';
import Navbar from "./Navbar";
import Game from "./Game";
import './App.css';


const GAME_SIZE = 16;
const COLORS = ["red", "yellow", "blue", "lightblue", "orange", "black", "pink", "green"];

var arrayColors = [];
for (let i = 0; i < GAME_SIZE; i += 2)
{
  arrayColors[i] = COLORS[i/2];
  arrayColors[i + 1] = COLORS[i/2];
}
//arrayColors.sort( (a,b) => Math.random() - 0.5);
const defaultColor = "#777";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayColors: arrayColors.sort( (a,b) => Math.random() - 0.5)
    }

    this.startNewGame = this.startNewGame.bind(this);
  }

  startNewGame(level){
    let newArrayColors = this.state.arrayColors.slice().sort( (a,b) => Math.random() - 0.5);
    let timeLevel;
    if (level === 3){
      timeLevel = 300;}
    else if (level === 2){
      timeLevel = 1000;}
    else{
      timeLevel = 2000;}
    this.setState({
      arrayColors: newArrayColors,
      timeLevel: timeLevel
    });
  }

  render() {
    return (
      <div className="App">
        {/* <Navbar startNewGame={this.startNewGame} /> */}
        <Game 
          // GAME_SIZE={GAME_SIZE}
          // arrayColors={this.state.arrayColors}
          // defaultColor={defaultColor}
          // timeLevel={this.state.timeLevel}
        />
      </div>
    );
  }
}

export default App;
