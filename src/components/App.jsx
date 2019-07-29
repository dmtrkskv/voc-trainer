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

import { Context } from "./Context.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { theme: "day" };
        this.bodyRef = document.getElementsByTagName("body")[0];
    }

    toggleTheme = () => {
        const newTheme = this.state.theme === "day" ? "night" : "day";
        this.bodyRef.style.background = newTheme === "night" ? "black" : "white";
        this.setState({ theme: newTheme });
    }

    switchTab = toPos => {
        let r = this.reactSwipeEl;

        if (typeof toPos === "string") {
            r[toPos]();
        } else {
            r.slide(toPos);
        }
    }

    beginSelection = () => {
        this.reactSwipeEl.slide(0);
    }

    render() {
        let wrapperClassName = "";
        this.state.theme === "night" && (wrapperClassName += " night");

        return <div id="main-wrapper" className={wrapperClassName}>
            <Context.Provider value={
                {theme: this.state.theme, beginSelection: this.beginSelection}
                }>
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
            </Context.Provider>
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