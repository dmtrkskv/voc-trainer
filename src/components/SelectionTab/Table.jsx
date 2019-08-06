import React from "react";
import TableItem from "./TableItem.jsx";

export default function Table(props) {
    const { isCheckBoxesOpened, activeParts, words } = props;

    return <div className="words-table">
        <TableItem
            key={0}
            word={{ en: "English", tr: "Transcription", ru: "Russian" }}
            isCheckBoxesOpened={isCheckBoxesOpened}
            activeParts={activeParts}
            checked={false}
            head
        />
        {
            Object.entries(words).map(item => {
                const key = item[0], word = item[1];
                return <TableItem
                    handleClick={() => props.handleClickOnWord(...item)}
                    key={key}
                    word={word}
                    isCheckBoxesOpened={isCheckBoxesOpened}
                    checked={word.isSelected}
                    activeParts={activeParts}
                />
            })
        }
    </div>;
}