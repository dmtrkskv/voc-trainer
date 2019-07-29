import React from "react";

export default function Card(props) {
    const { side, word, style, isCorrect, shakes, removed } = props;

    let className = "card", wrapperClassName = "card-wrapper";
    side && (className += " flip");
    removed && (className += " removed");

    if (shakes) {
        wrapperClassName += " shake";
        style.animationDelay = -Math.floor((Math.random()) * 150) + "ms";       
    }

    let sidesClasses = { front: "front", back: "back" };
    if (typeof isCorrect === "boolean") {
        const activeSide = side ? "back" : "front";
        if (isCorrect === true) {
            sidesClasses[activeSide] += " correct";
        } else if (isCorrect === false) {
            sidesClasses[activeSide] += " wrong";
        }
    }

    return <div
        style={style}
        className={wrapperClassName}
        onClick={props.onClick}
    >
        <div
            className={className}>
            <div className={sidesClasses.front}>{word.en}</div>
            <div className={sidesClasses.back}>{word.ru}</div>
        </div>
    </div >;
}


Card.defaultProps = { side: false, style: {} };