import React from "react";
import Button from "./Button.jsx";

export default class TabsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: this.props.defaultPos
        }
    }

    handleSwitch(toPos) {
        let r = this.props.reactSwipeEl;

        if (typeof toPos === "string") {
            r[toPos]();
        } else {
            r.slide(toPos);
        }

        this.setState({ pos: r.getPos() });
    }

    render() {
        const r = this.props.reactSwipeEl;
        const num = r ? r.getNumSlides() : 0;
        const pos = this.state.pos;

        return <div id="nav" className="inline">
            <Button disabled={pos === 0} onClick={() => this.handleSwitch("prev")}>Prev</Button>
            <Button disabled={pos === 0} onClick={() => this.handleSwitch(0)}>1</Button>
            <Button disabled={pos === 1} onClick={() => this.handleSwitch(1)}>2</Button>
            <Button disabled={pos === 2} onClick={() => this.handleSwitch(2)}>3</Button>
            <Button disabled={pos === num - 1} onClick={() => this.handleSwitch("next")}>Next</Button>
        </div>;
    }
}