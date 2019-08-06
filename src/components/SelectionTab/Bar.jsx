import React from "react";
import Button from "../Button.jsx"

import DicesSVG from "../../svg/dices.svg";
import MagnifierSVG from "../../svg/magnifier.svg";

export default function Bar(props) {
    const { isCheckBoxesOpened, activeParts, mode } = props;

    const switchToRandomMode = () => {
        if (props.mode === "random") return;
        props.switchMode("random");
        props.load("random");
    }

    const switchToSearchMode = () => {
        props.switchMode("search");
        props.load("search", "");
    }

    const childWithProps = React.cloneElement(props.children, { load: props.load, mode: props.mode });

    return <div className="bar">
        <div className="bar__main">
            {
                isCheckBoxesOpened ?
                    <div className="buttons-bundle">
                        <Button attractive onClick={props.confirmSelection}>Done</Button>
                        <Button onClick={props.cancelSelection}>Cancel</Button>
                    </div> :
                    <div>
                        <Button attractive onClick={props.openChecks}>Edit</Button>
                    </div>
            }
            <div className="buttons-bundle">
                <Button active={activeParts.en} onClick={() => props.toggleWordsPart("en")}>EN</Button>
                <Button active={activeParts.tr} onClick={() => props.toggleWordsPart("tr")}>TR</Button>
                <Button active={activeParts.ru} onClick={() => props.toggleWordsPart("ru")}>RU</Button>
            </div>
            <div className="buttons-bundle">
                <Button active={mode === "random"} onClick={switchToRandomMode}><DicesSVG /></Button>
                <Button active={mode === "search"} onClick={switchToSearchMode}><MagnifierSVG /></Button>
            </div>
        </div>
        {childWithProps}
    </div >;
}