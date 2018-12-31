import React, { Component } from "react";

class Winner extends Component {
    constructor(props){
        super(props);
        this.state = {
            nickName: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            nickName: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        alert("Done: @" + this.state.nickName + " " + this.props.time);
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.nickName}
                        onChange={this.handleChange}
                        name="nickName"
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Winner;