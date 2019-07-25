import React from "react";
import Button from "./Button.jsx";
import MoonSVG from "./svg/moon.svg";

export default function TabsPanel(props) {
    const pos = props.pos;

    return <div id="nav">
        <MoonSVG onClick={props.toggleTheme} id="moon" style={{}} />
        <Button active={pos === 0} onClick={() => props.switch(0)}>Selection</Button>
        <Button active={pos === 1} onClick={() => props.switch(1)}>Learning</Button>
        <Button active={pos === 2} onClick={() => props.switch(2)}>Check</Button>
    </div>;
}