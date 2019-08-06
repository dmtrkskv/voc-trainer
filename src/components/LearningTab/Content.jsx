import React from "react";
import Card from "../Card.jsx";

export default function Content(props) {
    const { sortedKeys, words, sides, isRemoveMode, removedKeysBuffer } = props;
    return <div className="learning-tab__cards">
        {
            sortedKeys.map(key => {
                const word = words[key], side = sides[key];
                return <Card
                    key={key}
                    side={side}
                    onClick={() => props.handleClick(key)}
                    word={word}
                    style={{ position: "relative" }}
                    shakes={isRemoveMode}
                    removed={removedKeysBuffer[key]}
                />
            })
        }
    </div>;
}