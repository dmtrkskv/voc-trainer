import React from "react";
import { connect } from "react-redux";

import Button from "./Button.jsx";
import MoonSVG from "../svg/moon.svg";

class TabsPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { pos, toggleTheme, switchTab } = this.props;

        return <div id="nav">
            <MoonSVG onClick={toggleTheme} id="moon" style={{}} />
            <div id="tabs">
                <Button active={pos === 0} onClick={() => switchTab(0)}>Selection</Button>
                <Button active={pos === 1} onClick={() => switchTab(1)}>Learning</Button>
                <Button active={pos === 2} onClick={() => switchTab(2)}>Check</Button>
            </div>
        </div>;
    }
}

export default connect(store => ({
    pos: store.activeTab
}))(TabsPanel);