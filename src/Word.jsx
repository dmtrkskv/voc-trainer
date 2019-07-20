import React from "react";

export default function Word(props) {
    let { word, isCheckBoxesOpened, defaultChecked, activeParts, onChange } = props;

    const parts = Object.entries(activeParts);
    return <div className="word">
        <input
            style={getFlexStyle(isCheckBoxesOpened)}
            onChange={onChange}
            type="checkbox"
            defaultChecked={defaultChecked} />
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
