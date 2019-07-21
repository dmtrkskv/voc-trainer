import React from "react";

export default function Word(props) {
    let { word, isCheckBoxesOpened, checked, activeParts, handleClick } = props;

    let className = "word";
    isCheckBoxesOpened && (className += " selectable");

    const parts = Object.entries(activeParts);
    return <div className={className} onClick={handleClick}>
        <input
            readOnly
            style={getFlexStyle(isCheckBoxesOpened)}
            type="checkbox"
            checked={checked} />
        {
            parts.map(item => {
                const key = item[0], value = item[1];
                return <div style={getFlexStyle(value)} key={word[key]}>{word[key]}</div>;
            })
        }
    </div>;

    function getFlexStyle(state) {
        return state === true ? { flexGrow: "1" } : { flexGrow: "0" };
    }
}
