import React from 'react';
import Word from "./Word.jsx";
import Button from "./Button.jsx";
import Pagination from "react-paginate";

// Получает метод для загрузки слов с сервера
// Получает методы для редактирования заучиваемых слов
// Ессно управляет своим отображением и сам выбирает как ему сортировать слова
// назвать стоит логичнее

export default class WordsBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCheckBoxesOpened: false,
            activeParts: { en: true, tr: true, ru: true },
        };

        this.numberPerPage = 10;
    }

    toggleWordsPart(part) {
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

    // запрашиваю newProps у ContentController
    onPageChange = (pagesObj) => {
        this.props.loadWords(
            pagesObj.selected, this.numberPerPage
        ).then(() => { })
    }

    handleClickOnWord(key) {
        let word = clone(this.props.pageWords[key]);
        word.isSelected = !word.isSelected;
        this.props.handleMark(key, word);
    }

    getControlBar = () => {
        const { isCheckBoxesOpened, activeParts } = this.state;

        return <div className="bar">
            {
                isCheckBoxesOpened ?
                    <div className="inline">
                        <Button onClick={() => this.completeSelection(true)}>Confirm</Button>
                        <Button onClick={() => this.completeSelection(false)}>Cancel</Button>
                    </div> :
                    <div>
                        <Button onClick={() => this.switchWordsSelectable(true)}>Edit</Button>
                    </div>
            }
            <div className="toggle-words-parts inline">
                <Button disabled={!activeParts.en} onClick={() => this.toggleWordsPart("en")}>EN</Button>
                <Button disabled={!activeParts.tr} onClick={() => this.toggleWordsPart("tr")}>TR</Button>
                <Button disabled={!activeParts.ru} onClick={() => this.toggleWordsPart("ru")}>RU</Button>
            </div>
        </div>;
    }

    render() {
        const { pageWords } = this.props;
        const { isCheckBoxesOpened, activeParts } = this.state;

        return (
            <div className="wrapper">
                {this.getControlBar()}
                <div id="words-container" >
                    {
                        Object.entries(pageWords).map(item => {
                            const key = item[0], word = item[1];
                            return <Word
                                handleClick={() => this.handleClickOnWord(key)}
                                key={key}
                                word={word}
                                isCheckBoxesOpened={isCheckBoxesOpened}
                                checked={word.isSelected}
                                activeParts={activeParts}
                            />
                        })
                    }
                </div>
                <Pagination
                    initialPage={0}
                    pageCount={10}
                    pageRangeDisplayed={6}
                    marginPagesDisplayed={2}
                    containerClassName="pagination"
                    onPageChange={this.onPageChange} />
            </div>
        );
    }
}

