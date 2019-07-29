import React from "react";

export default function Word(props) {
    let { word, isCheckBoxesOpened, checked, activeParts, handleClick, head } = props;

    let className = "word";
    if (isCheckBoxesOpened && !head) {
        className += " selectable";
        if (checked) {
            className += " checked";
        }
    }
    head && (className += " head");

    const parts = Object.entries(activeParts);
    return <div className={className} onClick={handleClick}>
        <input
            readOnly
            style={getFlexStyle(isCheckBoxesOpened, .5)}
            type="checkbox"
            checked={checked} />
        {
            parts.map(item => {
                const key = item[0], value = item[1];
                return <div style={getFlexStyle(value)} key={word[key]}>{word[key]}</div>;
            })
        }
    </div>;

    function getFlexStyle(state, def = 1) {
        return state === true ? { flexGrow: def } : { flexGrow: "0" };
    }
}
