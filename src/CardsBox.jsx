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

    resetSides = () => {
        let sides = clone(this.state.sides);

        for (let key in sides) {
            sides[key] = this.state.defaultSide;
        }

        this.setState({ sides: sides });
    }

    toggleRemoveMode = () => {
        this.setState({
            removeMode: !this.state.removeMode,
            removedKeysBuffer: {}
        })
    }

    getControlBar = () => {
        const { sortedKeys } = this.props;
        const { sides, defaultSide } = this.state;

        const isReseted = Object.values(sides)
            .find(item => item !== defaultSide) === undefined;

        return <div className="bar">
            <Button
                disabled={sortedKeys.length === 0 || isReseted}
                onClick={this.resetSides}>Reset</Button>
            <Button onClick={null}>Sort</Button>
            <Button onClick={null}>Shuffle</Button>
            <Button onClick={this.toggleRemoveMode}>Remove</Button>
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