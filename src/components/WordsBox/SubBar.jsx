import React from "react";

import Search from "./Search.jsx";
import Button from "../Button.jsx"

import BackspaceArrowSVG from "../../svg/backspace-arrow.svg";
import RefreshSVG from "../../svg/refresh.svg";

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

    if (mode === "default") return <div className="sub" style={{ height: 0 }}></div>;

    const exit = <BackspaceArrowSVG onClick={resetMode} />;

    if (mode === "random") return <div className="sub">
        <div style={{ fontSize: "15px", marginRight: 0 }}>{"10 random"}</div>
        <Button onClick={loadRandom}>
            <RefreshSVG />
        </Button>
        {exit}
    </div>

    if (mode === "search") return <div className="sub">
        <Search search={loadSearched} />
        {exit}
    </div>;
}