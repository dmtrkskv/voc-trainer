import React from "react";
import { connect } from "react-redux";

import ReactSwipe from "react-swipe";
import TabsPanel from "./TabsPanel.jsx";

import WordsBox from "./WordsBox/index.jsx";
import CardsBox from "./CardsBox/index.jsx";
import TapeBox from "./TapeBox/index.jsx";

// при клике по вкладке, сначала переключается индикатор
// , а затем проиходит переключение

// при свайпе сначала проиходит переключение,
// а затем загорается индикатор

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nightTheme: false };
        this.bodyRef = document.getElementsByTagName("body")[0];
    }

    toggleTheme = () => {
        const newTheme = !this.state.nightTheme;
        this.bodyRef.style.background = newTheme ? "black" : "white";
        this.setState({ nightTheme: newTheme });
    }

    switchTab = toPos => {
        let r = this.reactSwipeEl;

        if (typeof toPos === "string") {
            r[toPos]();
        } else {
            r.slide(toPos);
        }
    }

    render() {
        let wrapperClassName = "";
        this.state.nightTheme && (wrapperClassName += " night");

        return <div id="main-wrapper" className={wrapperClassName}>

            <TabsPanel
                toggleTheme={this.toggleTheme}
                switchTab={this.switchTab}
            />

            <ReactSwipe
                swipeOptions={{
                    transitionEnd: this.props.swipe,
                    startSlide: this.props.activeTab
                }}
                ref={el => (this.reactSwipeEl = el)}
            >
                <WordsBox />
                <CardsBox />
                <TapeBox />

            </ReactSwipe>
        </div>;
    }
}

export default connect(
    store => ({
        activeTab: store.activeTab
    }),
    dispatch => ({
        // была ошибка при возврате значения, т.к. тело не оборачивалось в {}
        swipe: pos => { (dispatch({ type: "SWITCH_TAB", payload: pos })) }
    })
)(App);