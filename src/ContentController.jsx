import React from "react";
import WordsBox from "./WordsBox.jsx";
import CardsBox from "./CardsBox.jsx";
import TapeBox from "./TapeBox.jsx";
import data from "./data.js";
import ReactSwipe from "react-swipe";
import TabsPanel from "./TabsPanel.jsx";

export default class ContentController extends React.Component {
    constructor(props) {
        super(props);

        // получаю данные c сервера и привожу их к типу [ id: {en, ru, tr, isSelected}]
        this.data = this.prepareDataObj(data);

        this.state = {
            pageWords: {},

            selectedWords: {},

            selectedWordsSortMode: "en",
            // массив ключей в нужном порядке
            selectedWordsSortedKeys: [],

            selectedWordsBuffer: {}
        }
    }

    prepareDataObj(data) {
        let obj = {};
        data.forEach(item => {
            item.isSelected = false;
            obj[item.en] = item;
        });
        return obj;
    }

    // заменить на получение данных с сервера
    loadWords = async (page, wordsQuantityOnPage) => {
        let arr = Object.entries(this.data);
        const start = page * wordsQuantityOnPage;
        arr = arr.slice(start, start + wordsQuantityOnPage);
        this.setState({ pageWords: Object.fromEntries(arr) });
    }

    sortSelectedWords = (mode, words) => {
        const sortMode = mode || this.state.selectedWordsSortMode;
        const selectedWords = words || this.state.selectedWords;

        let sE = Object.entries(selectedWords);

        if (sortMode === "random") {
            sE.sort(compareRandom);
        } else if (sortMode === "en" || sortMode === "ru") {
            sE.sort((a, b) => compare(a, b, sortMode));
        } else {
            throw new Error("unknown sort mode");
        }

        const sortedKeys = sE.map(item => item[0]);

        this.setState({
            selectedWordsSortMode: sortMode,
            selectedWordsSortedKeys: sortedKeys
        });

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
    }

    completeSelection = save => {
        if (save) {
            this.mergeSelectedWordsWithBuffer();
        } else {
            this.clearSelectedWordsBuffer();
        }
    }

    putSelectedWordInBuffer = (key, word) => {
        const { selectedWords, selectedWordsBuffer } = this.state;

        let s = clone(selectedWordsBuffer);

        const isSelected = word.isSelected;

        if (selectedWords[key] &&
            selectedWords[key].isSelected === isSelected) {
            // удаляем элемент из буфера, если он дублирует то, что уже есть
            delete s[key];
        } else {
            s[key] = word;
        }

        this.setState({ selectedWordsBuffer: s });
    }

    mergeSelectedWordsWithBuffer = () => {
        const s1 = clone(this.state.selectedWords);
        const s2 = this.state.selectedWordsBuffer;

        for (let key in s2) {
            const value = s2[key];
            if (value.isSelected === false) {
                delete s1[key];
            } else if (value.isSelected === true) {
                s1[key] = value;
            }
        }

        this.clearSelectedWordsBuffer();
        this.sortSelectedWords(null, s1);
        this.setState({ selectedWords: s1 });
    }

    updateObjectByMerging = (object, ...fromObjects) => {
        let newObject = {};
        for (let key in object) {
            let value = object[key];
            fromObjects.forEach(obj => {
                if (obj[key]) {
                    value = obj[key];
                }
            });
            newObject[key] = value;
        }
        return newObject;
    }

    clearSelectedWordsBuffer() {
        this.setState({ selectedWordsBuffer: {} });
    }

    removeSelectedWordsByKeys = keys => {
        let s = clone(this.state.selectedWords);
        keys.forEach(key => {
            delete s[key];
        });

        this.sortSelectedWords(null, s);
        this.setState({ selectedWords: s });
    }

    render() {
        const {
            pageWords,
            selectedWords,
            selectedWordsBuffer,
            selectedWordsSortedKeys,
            selectedWordsSortMode } = this.state;

        const pageWordsWithSelection = this.updateObjectByMerging(
            pageWords, selectedWords, selectedWordsBuffer
        );

        return <div id="body">
            <TabsPanel defaultPos={0} reactSwipeEl={this.reactSwipeEl} />
            <ReactSwipe
                swipeOptions={{ continuous: false }}
                ref={el => (this.reactSwipeEl = el)}
            >
                <WordsBox
                    pageWords={pageWordsWithSelection}
                    loadWords={this.loadWords}
                    completeSelection={this.completeSelection}
                    handleMark={this.putSelectedWordInBuffer}
                />

                <CardsBox
                    words={selectedWords}
                    sortedKeys={selectedWordsSortedKeys}
                    removeCards={this.removeSelectedWordsByKeys}
                    sort={this.sortSelectedWords}
                    sortMode={selectedWordsSortMode}
                />

                <TapeBox
                    words={selectedWords}
                    sortedKeys={selectedWordsSortedKeys}
                />
            </ReactSwipe>
        </div>
    }
}