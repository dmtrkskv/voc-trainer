import React from "react";
import { connect } from "react-redux";

import Bar from "./Bar.jsx";
import Empty from "../Empty.jsx";
import Result from "./Result.jsx";
import Tape from "./Tape.jsx";
import ConfirmPanel from "./ConfirmPanel.jsx";
import Button from "../Button.jsx";

export class CheckTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            words: {},
            sides: {},
            sortedKeys: [],
            activeIndex: null,
            isActiveCardFlipped: false,
            inputMode: "affirm",
        };

        this.responsesStatuses = {};
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.words !== state.words && state.activeIndex === 0) {
            return { activeIndex: null };
        }
        return null;
    }

    setNext = () => {
        if (!this.state.isActiveCardFlipped) return;
        this.setState({
            activeIndex: this.state.activeIndex + 1,
            isActiveCardFlipped: false,
        });
    }

    flipCurCard(isCorrect) {
        if (this.state.isActiveCardFlipped) return;

        const key = this.state.sortedKeys[this.state.activeIndex];
        this.responsesStatuses[key] = isCorrect;

        this.setState({
            isActiveCardFlipped: true,
        });
    }

    reset = () => {
        this.responsesStatuses = {};

        let keys = Object.keys(this.props.words);
        keys.sort(() => Math.random() - 0.5);

        let sides = {};
        keys.forEach(key => {
            sides[key] = Math.random() >= 0.5;
        });

        this.setState({
            words: this.props.words,
            isActiveCardFlipped: false,
            activeIndex: 0,
            sides: sides,
            sortedKeys: keys
        });
    }

    switchInputMode = mode => {
        this.setState({ inputMode: mode });
    }

    getCheckWord = () => {
        const { activeIndex, sortedKeys, sides } = this.state;

        const key = sortedKeys[activeIndex];
        const field = sides[key] ? "en" : "ru";
        return this.state.words[key][field];
    }

    render() {
        const { words, activeIndex, sortedKeys, sides, inputMode, isActiveCardFlipped } = this.state;

        const bar = <Bar
            activeIndex={activeIndex}
            isActiveCardFlipped={isActiveCardFlipped}
            inputMode={inputMode} switchInputMode={this.switchInputMode}
            reset={this.reset}
        />;

        const totalDerivedCardsNum = Object.keys(this.props.words).length;

        // пока пусто
        if (totalDerivedCardsNum === 0 && !activeIndex) {
            return <div className="tape-box">
                {bar}
                <Empty />
            </div>;
        }

        const totalCardsNum = sortedKeys.length;

        // начать
        if (activeIndex === null) {
            return <div className="tape-box">
                {bar}
                <div className="center-wrapper">
                    <Button attractive style={{ fontSize: "40px" }} onClick={this.reset}>Start</Button>
                </div>
            </div>;
        }

        // результат
        if (activeIndex >= totalCardsNum) {
            const correctNum = Object.values(this.responsesStatuses)
                .filter(item => item === true)
                .length;

            return <div className="check-tab">
                {bar}
                <div className="check-tab__tape">
                    <Result correctNum={correctNum} totalCardsNum={totalCardsNum} />
                </div>
            </div>;
        }

        const checkWord = this.getCheckWord();
        // лента
        return <div className="check-tab">
            {bar}
            <div className="check-tab__tape">
                <Tape
                    words={words}
                    sides={sides}
                    sortedKeys={sortedKeys}
                    responsesStatuses={this.responsesStatuses}
                    activeIndex={activeIndex}
                    isActiveCardFlipped={isActiveCardFlipped}
                />
                <ConfirmPanel
                    confirm={() => this.flipCurCard(true)}
                    decline={() => this.flipCurCard(false)}
                    next={this.setNext}
                    mode={inputMode}
                    isActiveCardFlipped={isActiveCardFlipped}
                    checkWord={checkWord}
                />
            </div>
        </div >;
    }
}

export default connect(store => ({
    words: store.selected
}))(CheckTab);