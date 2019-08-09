import React from 'react';
import { connect } from "react-redux";

import Bar from "./Bar.jsx";
import SubBar from "./SubBar.jsx";
import Table from "./Table.jsx";
import Pagination from "react-paginate";

import { downloadPage } from '../../actions/downloadPage.js';
import { downloadRandom } from '../../actions/downloadRandom.js';
import { downloadSearched } from '../../actions/downloadSearched.js';
import { completeSelection } from '../../actions/completeSelection.js';
import { selectWord } from '../../actions/selectWord.js';

class SelectionTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCheckBoxesOpened: false,
            activeParts: { en: true, tr: true, ru: true },
            mode: "default"
        };

        this.numberPerPage = 15;
        this.pageNumber = 0;

        this.onPageChange({ selected: this.pageNumber });
    }

    switchMode = mode => {
        this.setState({ mode: mode });
    }

    load = (mode, str) => {
        switch (mode) {
            case "random":
                this.props.getRandom(10);
                break;
            case "search":
                this.props.getSearched(str, 10);
                break;
            default:
                this.props.getPage(
                    this.pageNumber, this.numberPerPage
                );
        }
    }

    toggleWordsPart = (part) => {
        let a = clone(this.state.activeParts);
        if (isAttemptDisableAll(a)) return;
        a[part] = !a[part];
        this.setState({ activeParts: a });

        function isAttemptDisableAll(parts) {
            const arr = Object.entries(parts);
            return (arr.filter(item => item[1] === true).length === 1 &&
                arr.find(item => item[1] === true)[0] === part);
        }
    }

    completeSelection(save) {
        this.props.completeSelection(save);
        this.switchWordsSelectable(false);
    }

    switchWordsSelectable(state) {
        this.setState({ isCheckBoxesOpened: state });
    }

    onPageChange = (pagesObj) => {
        this.pageNumber = pagesObj.selected;

        this.props.getPage(
            this.pageNumber, this.numberPerPage
        );
    }

    render() {
        const { words, totalWords } = this.props;
        const { isCheckBoxesOpened, activeParts, mode } = this.state;

        const wordsNum = Object.keys(words).length;

        return (
            <div className="selection-tab">

                <Bar
                    mode={mode} switchMode={this.switchMode} load={this.load}
                    activeParts={activeParts} toggleWordsPart={this.toggleWordsPart}
                    isCheckBoxesOpened={isCheckBoxesOpened}
                    openChecks={() => this.switchWordsSelectable(true)}
                    confirmSelection={() => this.completeSelection(true)}
                    cancelSelection={() => this.completeSelection(false)}>
                    <SubBar
                        switchMode={this.switchMode}
                    />
                </Bar>

                <Table
                    isCheckBoxesOpened={isCheckBoxesOpened} activeParts={activeParts}
                    words={words} handleClickOnWord={this.props.selectWord}
                />

                {wordsNum >= this.numberPerPage &&
                    <Pagination
                        initialPage={this.pageNumber}
                        pageCount={totalWords / this.numberPerPage}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        containerClassName="pagination"
                        onPageChange={this.onPageChange}
                    />
                }

            </div>
        );
    }
}

export default connect(
    store => ({
        words: store.modifiedItems,
        totalWords: store.totalItems
    }),
    dispatch => ({
        getPage: (page, num) => dispatch(downloadPage(page, num)),
        getRandom: num => dispatch(downloadRandom(num)),
        getSearched: (str, num) => dispatch(downloadSearched(str, num)),
        completeSelection: save => dispatch(completeSelection(save)),
        selectWord: (key, word) => dispatch(selectWord(key, word))
    })
)(SelectionTab);

