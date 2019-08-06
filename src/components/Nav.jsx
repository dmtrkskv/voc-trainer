import React from "react";
import { connect } from "react-redux";

import Button from "./Button.jsx";
import MoonSVG from "../svg/moon.svg";

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { pos, toggleTheme, switchTab } = this.props;

        return <div className="nav">
            <MoonSVG onClick={toggleTheme} className="nav__theme-switch" style={{}} />
            <div className="nav__tabs">
                <Button className="nav__button" active={pos === 0} onClick={() => switchTab(0)}>Selection</Button>
                <Button className="nav__button" active={pos === 1} onClick={() => switchTab(1)}>Learning</Button>
                <Button className="nav__button" active={pos === 2} onClick={() => switchTab(2)}>Check</Button>
            </div>
        </div>;
    }
}

export default connect(store => ({
    pos: store.activeTab
}))(Nav);