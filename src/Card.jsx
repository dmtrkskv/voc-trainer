import React from "react";

export default function Card(props) {
    const { side, word, style, isCorrect, shakes, removed } = props;

    let className = "card", wrapperClassName = "card-wrapper";
    side && (className += " flip");
    removed && (className += " removed");

    if (shakes) {
        wrapperClassName += " shake";
        style.animationDelay = Math.floor((Math.random()) * 150) + "ms";
    }

    if (isCorrect === true) {
        className += " correct";
    } else if (isCorrect === false) {
        className += " wrong";
    }


    return <div
        style={style}
        className={wrapperClassName}
        onClick={props.onClick}
    >
        <div
            className={className}>
            <div className="front">{word.en}</div>
            <div className="back">{word.ru}</div>
        </div>
    </div >;
}


Card.defaultProps = { side: false, style: {} };