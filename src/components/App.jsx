import React from "react";
import { connect } from "react-redux";

import ReactSwipe from "react-swipe";
import Nav from "./Nav.jsx";

import SelectionTab from "./SelectionTab/index.jsx";
import LearningTab from "./LearningTab/index.jsx";
import CheckTab from "./CheckTab/index.jsx";

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
        let appClassName = "app";
        this.state.theme === "night" && (appClassName += " app_night");

        return <div className={appClassName}>
            <Context.Provider value={
                { theme: this.state.theme, beginSelection: this.beginSelection }
            }>
                <Nav
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
                    <SelectionTab />
                    <LearningTab />
                    <CheckTab />

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
