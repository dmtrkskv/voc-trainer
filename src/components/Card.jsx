import React from "react";

export default function Card(props) {
    const { side, word, style, isCorrect, shakes, removed } = props;

    let wrapperClasses = ["card-wrapper"], classes = ["card"];

    side && classes.push("card_flip");
    removed && classes.push("card_removed");

    if (shakes) {
        wrapperClasses.push("card-wrapper_shake");
        style.animationDelay = -Math.floor((Math.random()) * 150) + "ms";
    }

    let sidesClasses = { front: "card__front", back: "card__back" };
    if (typeof isCorrect === "boolean") {
        const activeSide = side ? "back" : "front";
        if (isCorrect === true) {
            sidesClasses[activeSide] += ` card__${activeSide}_correct`;
        } else if (isCorrect === false) {
            sidesClasses[activeSide] += ` card__${activeSide}_wrong`;
        }
    }

    return <div
        style={style}
        className={wrapperClasses.join(" ")}
        onClick={props.onClick}
    >
        <div
            className={classes.join(" ")}>
            <div className={sidesClasses.front}>{word.en}</div>
            <div className={sidesClasses.back}>{word.ru}</div>
        </div>
    </div >;
}


Card.defaultProps = { side: false, style: {} };