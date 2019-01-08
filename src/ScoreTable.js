import React, { Component } from "react";

class ScoreTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            scoreView: true
        }
        this.toggleScoreView = this.toggleScoreView.bind(this);
    }

    toggleScoreView(){
        let scoreTable = document.getElementsByClassName("scoreTable")[0];
        if (this.state.scoreView) {
            scoreTable.style.opacity = "0";
            scoreTable.style.display = "none";
        }
        else {
            scoreTable.style.opacity = "1";
            scoreTable.style.display = "block";
        }
        this.setState((prevState) => {return {scoreView: !prevState.scoreView}});
    }

    render() {
        let output = this.props.players.map((player, i) => 
            <li key={i}>
                <span>{player.name}</span>
                <span>{player.score}</span>
            </li> )
        return (
            <div className="scoreAside">
                <button className="scoreView" onClick={this.toggleScoreView}>View Score Table</button>
                <ol className="scoreTable">
                    {output}
                </ol>
            </div>
        )
    }
}

export default ScoreTable;