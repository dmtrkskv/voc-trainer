import React from "react";

import Search from "./Search.jsx";
import Button from "../Button.jsx"

import BackspaceArrowSVG from "../svg/backspace-arrow.svg";

export default function SubBar(props) {
    const { mode } = props;

    const resetMode = () => {
        props.switchMode("default");
        props.load("default");
    }

    const loadRandom = () => {
        props.load("random");
    }

    const loadSearched = str => {
        props.load("search", str);
    }

    if (mode === "default") return <div></div>;

    const exit = <BackspaceArrowSVG onClick={resetMode} />;
    const style = { marginRight: "50px" };

    if (mode === "random") return <div className="sub-bar">
        <Button style={style} onClick={loadRandom}>Repeat</Button>
        {exit}
    </div>

    if (mode === "search") return <div className="sub-bar">
        <Search search={loadSearched} />
        {exit}
    </div>;
}