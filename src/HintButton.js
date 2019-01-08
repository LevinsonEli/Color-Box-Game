import React, { Component } from "react";

class HintButton extends Component {

    render(){
        return (
            <button onClick={this.props.makeAhint}>
                <span>{this.props.hints} </span>
                MAKE A HINT
            </button>
        )
    }
}

export default HintButton;