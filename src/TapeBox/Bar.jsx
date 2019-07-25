import React from "react";
import Button from "../Button.jsx";

export default function Bar(props) {
    const { activeIndex, isActiveCardFlipped, inputMode } = props;

    return <div className="bar">
        <Button
            disabled={(activeIndex === 0 && !isActiveCardFlipped) || activeIndex === null}
            onClick={props.reset}>Reset</Button>
        <div className="bundle">
            <Button
                active={inputMode === "write"}
                onClick={() => props.switchInputMode("write")}>Write</Button>
            <Button
                active={inputMode === "affirm"}
                onClick={() => props.switchInputMode("affirm")}>Affirm</Button>
        </div>
    </div>;
}