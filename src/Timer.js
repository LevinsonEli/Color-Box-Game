import React, { Component } from "react";

class Timer extends Component {
    render() {
        let {time} = this.props;
        let min = parseInt(time / 60);
        let sec = parseInt(time - (min * 60));
        return (
            <div className="timer">
                Time: { min < 10 ? ("0" + min) : min }
                        :{ sec < 10 ? ("0" + sec) : sec }
            </div>
        )
    }
}

export default Timer;