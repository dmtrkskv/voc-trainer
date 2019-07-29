import React from "react";
import Button from "../Button.jsx"

import RemoveSVG from "../../svg/remove.svg";

export default function Bar(props) {
    const { isRemoveMode, sortMode, isBoxEmpty } = props;

    return <div className="bar">
        <div className="main">
            {isRemoveMode ?
                <div className="bundle">
                    <Button attractive onClick={props.removeCards}>Done</Button>
                    <Button onClick={props.toggleRemoveMode}>Cancel</Button>
                </div> :
                <Button
                    disabled={isBoxEmpty}
                    onClick={props.toggleRemoveMode}><RemoveSVG /></Button>
            }
            <div className="bundle">
                <Button
                    active={sortMode === "en"}
                    onClick={() => props.sort("en")}>Sort En</Button>
                <Button
                    active={sortMode === "ru"}
                    onClick={() => props.sort("ru")}>Sort Ru</Button>
            </div>
            <Button
                onClick={() => props.sort("random")}>Shuffle</Button>
        </div>
    </div >;
}