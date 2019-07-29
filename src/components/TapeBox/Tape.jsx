import React from "react";
import Card from "../Card.jsx";

import ReactResizeDetector from 'react-resize-detector';

export default class Tape extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            interval: 0,
            offset: 0
        };

        this.cardWidth = 300;
        this.maxRenderedCardsNum = 7;
        if (this.maxRenderedCardsNum % 2 === 0) throw new Error("необходимо нечетное число");
        this.centerPos = Math.floor(this.maxRenderedCardsNum / 2);
    }

    onResize = width => {
        this.setParams(width);
    }
    setParams(elWidth) {
        const interval = this.cardWidth + 50;
        const offset = (interval * this.maxRenderedCardsNum - elWidth) / 2;

        this.setState({
            interval: interval,
            offset: offset
        });
    }

    getCards = () => {
        const { words, sortedKeys, sides, responsesStatuses, activeIndex, isActiveCardFlipped } = this.props;
        const { maxRenderedCardsNum: q, centerPos } = this;
        const { interval, offset } = this.state;

        const totalCardsNum = Object.keys(words).length;
        if (totalCardsNum === 0) return <div></div>;

        const c = centerPos;
        const startPos = activeIndex < c ? c - activeIndex : 0;
        const remainCardsNum = totalCardsNum - 1 - activeIndex;
        const endPos = c > remainCardsNum ?
            c + remainCardsNum + 1 : q;

        let arr = [];

        for (let pos = startPos; pos < endPos; pos++) {
            const curKey = sortedKeys[activeIndex + pos - c];
            const word = words[curKey];

            const deviationK = Math.cos(Math.abs(pos - c) * .6);
            const style = {
                opacity: deviationK,
                transform: `perspective(1px) translateZ(${deviationK - 1}px)`,
                left: pos * interval - offset,
                width: interval
            };

            let side = sides[curKey], isCorrect = null;
            if (pos < c || (pos === c && isActiveCardFlipped)) {
                side = !sides[curKey];
                isCorrect = responsesStatuses[curKey];
            }

            arr.push(
                <Card
                    key={word.en} style={style} side={side} isCorrect={isCorrect} word={word} />
            );
        }
        return arr;
    }

    render() {
        return <ReactResizeDetector handleWidth onResize={this.onResize} >
            <div className="cards">
                {
                    this.getCards()
                }
            </div>
        </ReactResizeDetector>;
    }
}