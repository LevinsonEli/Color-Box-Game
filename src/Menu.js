import React, { Component } from "react";

class Menu extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="menu">
                <button onClick={() => {this.props.startNewGame(1)}}>
                    Easy
                </button>
                <button onClick={() => {this.props.startNewGame(2)}}>
                    Medium
                </button>
                <button onClick={() => {this.props.startNewGame(3)}}>
                    Hard
                </button>
            </div>
        )
    }
}

export default Menu;