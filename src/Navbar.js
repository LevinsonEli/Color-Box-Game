import React, { Component } from "react";
import Menu from "./Menu";

class Navbar extends Component {

    render(){
        return (
            <div className="navbar">
                <h1 className="header">
                    Match The Color
                </h1>
                <Menu 
                    startNewGame={this.props.startNewGame} 
                />
            </div>
        )
    }
}

export default Navbar;