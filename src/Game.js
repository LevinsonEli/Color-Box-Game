import React, { Component } from "react";
import Square from "./Square";
import Navbar from "./Navbar";
import WinnerForm from "./WinnerForm";
import Timer from "./Timer";
import HintButton from "./HintButton";
import ScoreTable from "./ScoreTable";


class Game extends Component {
  constructor(props) {
    super(props);

    this.GAME_SIZE = 16;
    this.COLORS = ["red", "yellow", "blue", "lightblue", "orange", "black", "pink", "green"];
    this.defaultColor = "#777";

    this.state = {
      arrayColors: Array(this.GAME_SIZE),
      renderedColors: Array(this.GAME_SIZE).fill(this.defaultColor),
      previousColor: this.defaultColor,
      available: true,
      time: 0,
      winner: false,
      timeLevel: 1000,
      hints: 2,
      players: [
        {
            name: "@Salvador",
            score: 37
         },
        {
            name: "@Mickael",
            score: 42
        },
        {
            name: "@Donatelo",
            score: 56
        },
        {
            name: "@Denis",
            score: 73
        },
        {
            name: "@Mikhel",
            score: 105
        }
      ]
    }

    this.makeAhint = this.makeAhint.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.theSameColors = this.theSameColors.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.handleNewScore = this.handleNewScore.bind(this);
  }

  componentDidMount () {
    this.myTimer = setInterval(() => {
      this.setState(prevState => ({
        time: prevState.time + 1
      })
      )
    }, 1000);
    var arrayColors = [];
    for (let i = 0; i < this.GAME_SIZE; i += 2)
    {
      arrayColors[i] = this.COLORS[i/2];
      arrayColors[i + 1] = this.COLORS[i/2];
    }
    arrayColors.sort( (a,b) => Math.random() - 0.5);
    this.setState({...this.state, arrayColors});
  }
  componentWillUnmount() {
    clearInterval(this.myTimer);
  }

  startNewGame(level){
    let arrayColors = [...this.state.arrayColors].sort( (a,b) => Math.random() - 0.5);
    let timeLevel, hints;
    if (level === 3){
      timeLevel = 300;
      hints = 0;
    } else if (level === 2){
      timeLevel = 600;
      hints = 1
    } else{
      timeLevel = 1000;
      hints = 2;
    }
    this.setState({
      arrayColors: arrayColors,
      renderedColors: Array(this.GAME_SIZE).fill(this.defaultColor),
      previousColor: this.defaultColor,
      available: true,
      time: 0,
      winner: false,
      timeLevel: timeLevel,
      hints: hints
    });
    clearInterval(this.myTimer);
    this.myTimer = setInterval(() => {
      this.setState(prevState => ({
        time: prevState.time + 1
      })
      )
    }, 1000);
  }

  theSameColors(ar1, ar2, size) {
      for (let i = 0; i < size; i++)
        if (ar1[i] !==ar2[i])
        return false;
    return true;
  }

  makeAhint() {
    // Copy the state
    if (this.state.hints < 1)
      return;
    const data = Object.assign({}, this.state);
    data.renderedColors = this.state.renderedColors.slice();
    let availableHints = Array(0);
    let count = 0;
    
    // Get the indexes of unopened boxes
    data.renderedColors.forEach( (color, index) => {
        if (color === this.defaultColor)
            availableHints[count++] = index;
    } );

    // Take the hint if there is more then 2 unopened boxes
    if (availableHints.length > 2 && data.available && data.previousColor === this.defaultColor) {
        let hintIndexFirst = availableHints[Math.floor(Math.random() * availableHints.length)];
        availableHints = availableHints.filter (index => index !== hintIndexFirst);
        let hintIndexSecond = availableHints[Math.floor(Math.random() * availableHints.length)];

        data.renderedColors[hintIndexFirst] = this.state.arrayColors[hintIndexFirst];
        data.renderedColors[hintIndexSecond] = this.state.arrayColors[hintIndexSecond];
        data.available = false;
        data.hints--;
        this.setState(data, () => {
            setTimeout( () => {
                data.renderedColors[hintIndexFirst] = this.defaultColor;
                data.renderedColors[hintIndexSecond] = this.defaultColor;
                data.available = true;
              this.setState(data);
            }, this.state.timeLevel);
        });
    }
  }

  handleClick(i) {
    if (!this.state.available || this.state.renderedColors[i] === this.state.arrayColors[i])
      // If was clicked already opened color
      return;

    const data = Object.assign({}, this.state);
    data.renderedColors = this.state.renderedColors.slice();
    data.renderedColors[i] = this.state.arrayColors[i];
    
    if (data.previousColor === this.defaultColor)
      // Nothing to do. First Box.
      data.previousColor = data.renderedColors[i];

    else if (data.previousColor === data.renderedColors[i]) {
      // Check end of the game:
      if (this.theSameColors (data.renderedColors, this.state.arrayColors, this.GAME_SIZE)) {
        this.setState(data, () => {
            this.setState({...this.state, winner: true});
            clearInterval(this.myTimer);
        });
        return;
      }
      // Here is the match
      data.previousColor = this.defaultColor;
    }
    else
    {
      // No Match
      // data.previousColor[i] = data.renderedColors[i];
      data.available = false;
      this.setState(data, () => {
        setTimeout( () => {
          data.renderedColors[i] = this.defaultColor;
          data.renderedColors[
            data.renderedColors.indexOf(data.previousColor)] = 
            this.defaultColor;
          data.previousColor = this.defaultColor;
          data.available = true;
          data.time += 10;
          this.setState(data);
        }, this.state.timeLevel);
      });
      return;
    }
    this.setState(data);
  }

  handleNewScore(name) {
    let players = [...this.state.players];
    players.push({name: "@"+name, score: this.state.time});
    players = players.sort((a,b) => a.score - b.score);
    this.setState({...this.state, players});
    this.startNewGame(this.state.timeLevel);
  }

  render () {
    let output = (this.state.winner)?(<WinnerForm handleNewScore={this.handleNewScore} />) : 
    (this.state.renderedColors.map((color, index) => (
      <Square 
        color={color}
        onClick={ () => this.handleClick(index) }
        key={index}
      />
    )));
    return (
      <div className="game">
        <Navbar toogleScoreView={this.toogleScoreView} startNewGame={this.startNewGame} />
        <div className="gameAndTime">
          <ScoreTable players={this.state.players} />
          <div className="gameBox">
            {output}
          </div>
          <div>
            <Timer time={this.state.time} />
            <HintButton makeAhint={this.makeAhint} hints={this.state.hints} />
          </div>
        </div>
      </div>
    )
  }
}

export default Game;