import React, { Component } from "react";
import Menu from "./Menu";

class Navbar extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="navbar">
                <h1 className="header">
                    <span className="firstAnimatedLetter">Match </span>
                    The
                    <span className="firstAnimatedLetter"> Color</span>
                </h1>
                <Menu startNewGame={this.props.startNewGame} />
            </div>
        )
    }
}

export default Navbar;