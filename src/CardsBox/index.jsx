import React from "react";
import { connect } from "react-redux";
import memoize from "memoize-one";

import Bar from "./Bar.jsx";
import Empty from "../Empty.jsx";
import Content from "./Content.jsx";

import { unselectWords } from "../actions/unselectWords.js";

class CardsBox extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            defaultSide: false,
            sides: {},
            isRemoveMode: false,
            removedKeysBuffer: {},
            sortMode: "en",
            shufflePassNum: 0
        };
        this.prevShufflePassNum;
        this.sortedKeys;
        this.flipTimer;
        this.sideValues = { "en": false, "ru": true, "random": null };
        Object.freeze(this.sideValues);
    }

    // при добавлении новых слов обновить состояние sides 
    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.words !== state.prevWords) {
            let sides = {};

            for (let key in nextProps.words) {
                const s = state.sides[key];
                if (s === undefined) {
                    const d = state.defaultSide;
                    sides[key] = d === null ? Math.random() >= .5 : d;
                } else if (typeof s === "boolean") {
                    sides[key] = s;
                }
            }
            return { sides: sides, prevWords: nextProps.words };
        }
        return null;
    }

    getSortedKeys = memoize((sortMode, words, appendage) => {
        let wE = Object.entries(words);

        if (sortMode === "random") {
            let newKeys = Object.keys(words);
            if (this.prevShufflePassNum === appendage) {
                // получить старые ключи
                let prevKeys = clone(this.sortedKeys);
                // удалить ключи, которые теперь пропали
                prevKeys = prevKeys.filter(key => words[key] !== undefined);
                // получить ключи, которые теперь появились
                newKeys = newKeys.filter(key => !prevKeys.includes(key));
                // добавить в начало ключи, которые пришли                 
                return [...newKeys, ...prevKeys];
            } else {
                this.prevShufflePassNum = appendage;
                return newKeys.sort(compareRandom);
            }
        } else if (sortMode === "en" || sortMode === "ru") {
            wE.sort((a, b) => compare(a, b, sortMode));
        } else {
            throw new Error("unknown sort mode");
        }

        return wE.map(item => item[0]);

        function compare(a, b, field) {
            // field - "en" / "ru"
            const a2 = a[1][field], b2 = b[1][field];
            if (a2 > b2) {
                return 1;
            }
            if (a2 < b2) {
                return -1;
            }
            return 0;
        }

        function compareRandom() {
            return Math.random() - 0.5;
        }
    });

    sort = mode => {
        let { shufflePassNum } = this.state;

        if (mode === "random") {
            shufflePassNum++;
        }
        const toSide = this.sideValues[mode];
        clearTimeout(this.flipTimer);
        this.flipTimer = setTimeout(() => this.resetSides(toSide), 200);

        this.setState({
            sortMode: mode,
            shufflePassNum: shufflePassNum,
        });
    }

    resetSides = toSide => {
        let keys = Object.keys(this.state.sides);
        const s = {};
        if (toSide === null) {
            keys.forEach(key => {
                s[key] = Math.random() >= 0.5;
            });
        } else {
            keys.forEach(key => {
                s[key] = toSide;
            });
        }

        this.setState({ sides: s, defaultSide: toSide });
    }

    handleClick = key => {
        if (this.state.isRemoveMode) {
            let buffer = clone(this.state.removedKeysBuffer);
            if (buffer[key]) {
                delete buffer[key];
            } else {
                buffer[key] = true;
            }
            this.setState({ removedKeysBuffer: buffer });
        } else {
            this.flipCard(key);
        }
    }

    flipCard(key) {
        let sides = clone(this.state.sides);
        sides[key] = !sides[key];
        this.setState({ sides: sides });
    }

    removeCards = () => {
        this.props.removeCards(
            Object.keys(this.state.removedKeysBuffer)
        );
        this.toggleRemoveMode();
    }

    toggleRemoveMode = () => {
        this.setState({
            isRemoveMode: !this.state.isRemoveMode,
            removedKeysBuffer: {}
        })
    }

    render() {
        const { words } = this.props;
        const { sides, isRemoveMode, removedKeysBuffer, sortMode, shufflePassNum } = this.state;

        const appendage = sortMode === "random" ? shufflePassNum : void 0;
        this.sortedKeys = this.getSortedKeys(sortMode, words, appendage);

        const isBoxEmpty = this.sortedKeys.length === 0

        const bar = <Bar
            isRemoveMode={isRemoveMode}
            toggleRemoveMode={this.toggleRemoveMode}
            removeCards={this.removeCards}
            sortMode={sortMode} sort={this.sort}
            isBoxEmpty={isBoxEmpty}
        />;

        if (isBoxEmpty) {
            return <div id="cards-box">
                {bar}
                <Empty />
            </div>;
        }

        return <div id="cards-box">
            {bar}
            <Content sortedKeys={this.sortedKeys} words={words}
                isRemoveMode={isRemoveMode}
                removedKeysBuffer={removedKeysBuffer}
                sides={sides} handleClick={this.handleClick}
            />
        </div>;

    }
}

export default connect(
    store => ({
        words: store.selected
    }),
    dispatch => ({
        removeCards: keys => dispatch(unselectWords(keys))
    })
)(CardsBox);