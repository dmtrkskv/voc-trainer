import React from "react";
import Word from "./Word.jsx";

export default function Content(props) {
    const { isCheckBoxesOpened, activeParts, words } = props;

    return <div id="words">
        <Word
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
                return <Word
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