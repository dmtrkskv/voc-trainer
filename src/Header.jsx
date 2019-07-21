import React from "react";
import Button from "./Button.jsx";
import MoonSVG from "./svg/moon.svg";
import VerticalResizeSVG from "./svg/vertical-resize.svg";


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hidden: true };
    }

    toggle = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        let className = "";
        let arrowClass = "toggle";

        if (this.state.hidden) {
            className = "hidden";
            arrowClass += " active";
        }

        return <div id="header" className={className}>
            <VerticalResizeSVG onClick={this.toggle} className={arrowClass} />
            <MoonSVG onClick={this.props.toggleTheme} />
        </div>
    }
}