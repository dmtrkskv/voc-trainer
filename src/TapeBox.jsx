import React from "react";
import Card from "./Card.jsx";
import Button from "./Button.jsx";

export default class TapeBox extends React.Component {
    constructor(props) {
        super(props);

        this.inputModes = { write: 0, affirm: 1 };
        Object.freeze(this.inputModes);

        this.state = {
            activeIndex: 0,
            isActiveCardFlipped: false,
            inputMode: this.inputModes.affirm,
            inputValue: ""
        };
        this.inputRef = React.createRef();
        this.timerId;
        this.responsesStatuses = {};
        this.setParameters();
    }

    shouldComponentUpdate() {
        return true;
    }

    setParameters() {
        const { clientWidth } = document.documentElement;
        const cardWidth = 300;
        const maxRenderedCardsQuantity = 7;

        if (maxRenderedCardsQuantity % 2 === 0) throw new Error("необходимо нечетное число");
        this.centerPos = Math.floor(maxRenderedCardsQuantity / 2);
        this.interval = cardWidth + 50;
        this.offset = (this.interval * maxRenderedCardsQuantity - clientWidth) / 2;
        this.maxRenderedCardsQuantity = maxRenderedCardsQuantity;
    }

    getVisibleCards = () => {
        const { activeIndex, isActiveCardFlipped } = this.state;
        const { words, sortedKeys } = this.props;

        const cardsQuantity = Object.keys(words).length;
        if (cardsQuantity === 0) return;

        const c = this.centerPos;
        const startPos = activeIndex < c ? c - activeIndex : 0;
        const remainCardsQuantity = cardsQuantity - 1 - activeIndex;
        const endPos = c > remainCardsQuantity ?
            c + remainCardsQuantity + 1 : this.maxRenderedCardsQuantity;

        let arr = [];

        for (let pos = startPos; pos < endPos; pos++) {
            const curKey = sortedKeys[activeIndex + pos - c];
            const word = words[curKey];

            const deviationK = Math.cos(Math.abs(pos - c) * .6);
            const style = {
                opacity: deviationK,
                transform: `perspective(1px) translateZ(${deviationK - 1}px)`,
                left: pos * this.interval - this.offset,
                width: this.interval
            };

            let side = false, isCorrect = null;
            if (pos < c || (pos === c && isActiveCardFlipped)) {
                side = true;
                isCorrect = this.responsesStatuses[curKey];
            }

            arr.push(
                <Card
                    key={word.en} style={style} side={side} isCorrect={isCorrect} word={word} />
            );
        }
        return arr;
    }

    getConfirmPanel = () => {
        const inp = this.inputModes;
        const fl = this.state.isActiveCardFlipped;

        if (this.state.inputMode === inp.write) {

            return <div className="inline">
                <input
                    type="text"
                    ref={this.inputRef}
                    autoFocus={true}
                    value={this.state.inputValue}
                    onChange={this.validateInput} />
                <Button
                    disabled={fl}
                    onClick={() => {
                        this.flipCurCard(false);
                        this.inputRef.current.focus();
                    }} >
                    Decline
                </Button>
                <Button
                    disabled={!fl}
                    onClick={this.setNext}>
                    Next
                    </Button>
            </div>;
        } else if (this.state.inputMode === inp.affirm) {

            return <div className="inline">
                <Button
                    disabled={fl}
                    onClick={() => this.flipCurCard(true)}>
                    Remember
                    </Button>
                <Button
                    disabled={fl}
                    onClick={() => this.flipCurCard(false)}>
                    Forgot
                    </Button>
                <Button
                    disabled={!fl}
                    onClick={this.setNext}>
                    Next
                    </Button>
            </div>;
        }
    }

    validateInput = e => {
        const inputValue = e.target.value;

        const key = this.props.sortedKeys[this.state.activeIndex];
        const targetValue = this.props.words[key].ru;

        if (targetValue.trim().toLowerCase() === inputValue.trim().toLowerCase()) {
            this.setState({ inputValue: "" });
            this.flipCurCard(true);
            return;
        }

        this.setState({ inputValue: inputValue });
    }

    setNext = () => {
        if (!this.state.isActiveCardFlipped) return;
        clearTimeout(this.timerId);
        this.setState({
            activeIndex: this.state.activeIndex + 1,
            isActiveCardFlipped: false
        });
    }

    flipCurCard(memorized) {
        if (this.state.isActiveCardFlipped) return;

        this.timerId = setTimeout(this.setNext, 2000);

        const key = this.props.sortedKeys[this.state.activeIndex];
        this.responsesStatuses[key] = memorized;

        this.setState({
            isActiveCardFlipped: true,
        });
    }

    reset = () => {
        this.responsesStatuses = {};

        this.setState({ isActiveCardFlipped: false, activeIndex: 0 });
    }

    switchInputMode(mode) {
        this.setState({ inputMode: mode });
    }

    getControlBar = () => {
        const { inputMode, activeIndex, isActiveCardFlipped } = this.state;
        const inp = this.inputModes;

        return <div className="bar">
            <Button
                disabled={activeIndex === 0 && !isActiveCardFlipped}
                onClick={this.reset}>Reset</Button>
            <Button>Exchange</Button>
            <Button>Sort</Button>

            <Button
                disabled={inputMode !== inp.write}
                onClick={() => this.switchInputMode(inp.write)}>Write</Button>
            <Button
                disabled={inputMode !== inp.affirm}
                onClick={() => this.switchInputMode(inp.affirm)}>Affirm</Button>
        </div>;
    }

    render() {
        const { activeIndex } = this.state;

        if (this.props.sortedKeys.length === 0) {
            return <div className="wrapper">
                {this.getControlBar()}
                <div>Пусто</div>
            </div>;
        }

        if (activeIndex > this.props.sortedKeys.length - 1) {
            return <div className="wrapper">
                {this.getControlBar()}
                <div>Ваш результат</div>
            </div>;
        }

        return <div>
            <div className="wrapper">
                {this.getControlBar()}
                <div id="tape-container">
                    <div id="tape">
                        {
                            this.getVisibleCards()
                        }
                    </div>
                    {
                        this.getConfirmPanel()
                    }
                </div>
            </div>
        </div >;
    }
}