import React from "react";
import Button from "./Button.jsx";

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
        this.state.hidden && (className = "hidden");

        return <div id="header" className={className}>
            <Button onClick={this.toggle} className="toggle">
                toggle
            </Button>
            <Button onClick={this.props.toggleTheme} >
                Toggle Theme
            </Button>
        </div>
    }
}