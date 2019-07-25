import React from "react";

import ReactSwipe from "react-swipe";
import TabsPanel from "./TabsPanel.jsx";

import WordsBox from "./WordsBox/index.jsx";
import CardsBox from "./CardsBox/index.jsx";
import TapeBox from "./TapeBox/index.jsx";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nightTheme: false, activeTab: 0 };
    }

    toggleTheme = () => {
        this.setState({ nightTheme: !this.state.nightTheme });
    }

    switchTab = toPos => {
        let r = this.reactSwipeEl;

        if (typeof toPos === "string") {
            r[toPos]();
        } else {
            r.slide(toPos);
        }

        this.setState({ activeTab: r.getPos() });
    }

    render() {
        let wrapperClassName = "wrapper";
        this.state.nightTheme && (wrapperClassName += " night");

        return <div className={wrapperClassName}>
            <div id="main">

                <TabsPanel
                    toggleTheme={this.toggleTheme}
                    pos={this.state.activeTab}
                    switch={this.switchTab}
                />

                <ReactSwipe
                    swipeOptions={{ continuous: false }}
                    ref={el => (this.reactSwipeEl = el)}
                >
                    <WordsBox />
                    <CardsBox />
                    <TapeBox />

                </ReactSwipe>

            </div>
        </div>;
    }
}