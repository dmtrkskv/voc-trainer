import React from "react";
import Button from "./Button.jsx";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: true, className: "" };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const a = this.state.active;
        const c = a ? "hidden" : "";
        this.setState({ active: !a, className: c });
    }

    render() {
        let { active, className } = this.state;
        return <div id="header" className={className}>
            <Button onClick={this.toggle} className="toggle">
                toggle
            </Button>
        </div>
    }
}