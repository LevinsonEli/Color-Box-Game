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
        this.props.handleNewScore(this.state.nickName);
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label title="nickName" htmlFor="nickName">
                        Enter your nickName: <br/>
                        <input
                            type="text"
                            value={this.state.nickName}
                            onChange={this.handleChange}
                            name="nickName"
                            autoComplete="off"
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Winner;