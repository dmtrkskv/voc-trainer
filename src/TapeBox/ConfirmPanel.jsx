import React from "react";
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import Button from "../Button.jsx";

import { Context } from "../Context.jsx";


export default class ConfirmPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputValue: "" };

        this.inputRef = React.createRef();

        this.scrollingTimerDur = 1500;
        this.scrollingTimerId = null;
    }

    static contextType = Context;

    setScrollingTimer = () => {
        this.scrollingTimerId = setTimeout(
            this.props.next, this.scrollingTimerDur
        );
    }

    validateInput = e => {
        const inputValue = e.target.value;
        const targetValue = this.props.checkWord;

        if (targetValue.trim().toLowerCase() === inputValue.trim().toLowerCase()) {
            this.setState({ inputValue: "" });
            this.onAnswer(true);
            return;
        }
        this.setState({ inputValue: inputValue });
    }

    onAnswer(correct) {
        this.setScrollingTimer();
        correct ? this.props.confirm() : this.props.decline();
    }

    onNextClick = () => {
        clearTimeout(this.scrollingTimerId);
        this.props.next();
    }

    render() {
        const { mode, isActiveCardFlipped: flipped } = this.props;

        const { theme } = this.context;
        const chartBg = theme === "day" ? "#efefef" : "#242424";
        const nextBtnLabelColor = theme === "day" ?
            (flipped ? "black" : "lightgrey") :
            (flipped ? "white" : "grey");

        const next = <div className="next-wrapper" onClick={this.onNextClick}>
            <ReactMinimalPieChart
                label={() => "Next"}
                labelPosition={0}
                labelStyle={{
                    fontSize: "20px",
                    fill: nextBtnLabelColor
                }}
                data={[{ value: 1, key: 1, color: '#00ceff' }]}
                background={chartBg}

                startAngle={-90}
                reveal={flipped ? 100 : 0}

                lineWidth={8}

                animate={flipped}
                animationDuration={this.scrollingTimerDur}
            />
        </div>;

        if (mode === "write") {

            return <div className="confirm">
                <div className="bundle">
                    <input
                        type="text"
                        ref={this.inputRef}
                        autoFocus={true}
                        value={this.state.inputValue}
                        onChange={this.validateInput} />
                    <Button
                        disabled={flipped}
                        onClick={() => {
                            this.onAnswer(false);
                            this.inputRef.current.focus();
                        }} >
                        Decline
                    </Button>
                </div>
                {next}
            </div>;
        } else if (mode === "affirm") {

            return <div className="confirm">
                <div className="bundle">
                    <Button
                        disabled={flipped}
                        onClick={() => this.onAnswer(true)}>
                        Remember
                    </Button>
                    <Button
                        disabled={flipped}
                        onClick={() => this.onAnswer(false)}>
                        Forgot
                    </Button>
                </div>
                {next}
            </div>;
        }
    }
}