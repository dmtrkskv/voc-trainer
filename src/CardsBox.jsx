import React from "react";
import Card from "./Card.jsx";
import Button from "./Button.jsx";

// как назвать?
export default class CardsBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prevWords: this.props.words,
            defaultSide: false,
            sides: {},
            removeMode: false,
            removedKeysBuffer: {}
        };
    }

    // при добавлении новых слов обновить состояние sides 
    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.words !== state.prevWords) {
            let sides = {};

            for (let key in nextProps.words) {
                const s = state.sides[key];
                if (s === undefined) {
                    sides[key] = state.defaultSide;
                } else if (typeof s === "boolean") {
                    sides[key] = s;
                }
            }

            return { sides: sides, prevWords: nextProps.words };
        }

        return null;
    }

    handleClick(key) {
        if (this.state.removeMode) {
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

    resetSides = toSide => {
        let sides = clone(this.state.sides);

        for (let key in sides) {
            sides[key] = toSide;
        }

        this.setState({ sides: sides, defaultSide: toSide });
    }

    removeCards = () => {
        this.props.removeCards(
            Object.keys(this.state.removedKeysBuffer)
        );
        this.toggleRemoveMode();
    }

    toggleRemoveMode = () => {
        this.setState({
            removeMode: !this.state.removeMode,
            removedKeysBuffer: {}
        })
    }

    getControlBar = () => {
        const { sortMode } = this.props;
        const { defaultSide, removeMode } = this.state;

        // const isBoxEmpty = sortedKeys.length === 0;
        // const isReseted = Object.values(sides)
        //     .find(item => item !== defaultSide) === undefined;

        return <div className="bar">
            <Button
                active={defaultSide === true}
                onClick={() => this.resetSides(true)}>ResetRu</Button>
            <Button
                active={defaultSide === false}
                onClick={() => this.resetSides(false)}>ResetEn</Button>
            <Button
                active={sortMode === "en"}
                onClick={() => this.props.sort("en")}>Sort En</Button>
            <Button
                active={sortMode === "ru"}
                onClick={() => this.props.sort("ru")}>Sort Ru</Button>
            <Button
                active={sortMode === "random"}
                onClick={() => this.props.sort("random")}>Shuffle</Button>
            {removeMode ?
                <div className="inline">
                    <Button onClick={this.removeCards}>Confirm</Button>
                    <Button onClick={this.toggleRemoveMode}>Cancel</Button>
                </div> :
                <Button onClick={this.toggleRemoveMode}>Remove</Button>
            }
        </div>;
    }

    render() {
        const { words, sortedKeys } = this.props;
        const { sides, removeMode, removedKeysBuffer } = this.state;

        if (sortedKeys.length === 0) {
            return <div className="wrapper">
                {this.getControlBar()}
                <div>Пусто</div>
            </div>;
        }

        return <div>

            <div className="wrapper">
                {this.getControlBar()}
                <div id="selection">
                    {
                        sortedKeys.map(key => {
                            const word = words[key], side = sides[key];
                            return <Card
                                key={key}
                                side={side}
                                onClick={() => this.handleClick(key)}
                                word={word}
                                style={{ position: "relative" }}
                                shakes={removeMode}
                                removed={removedKeysBuffer[key]}
                            />
                        })
                    }
                </div>
            </div>
        </div>;

    }
}