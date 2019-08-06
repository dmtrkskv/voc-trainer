import React from "react";

export default function TableItem(props) {
    let { word, isCheckBoxesOpened, checked, activeParts, handleClick, head } = props;

    let classes = [];
    if (head) {
        classes.push("words-table__head");
    } else {
        classes.push("words-table__row");
        if (isCheckBoxesOpened && !head) {
            classes.push("words-table__row_selectable");
            if (checked) {
                classes.push("words-table__row_checked");
            }
        }
    }

    const parts = Object.entries(activeParts);

    return <div className={classes.join(" ")} onClick={handleClick}>
        <input
            className="words-table__checkbox"
            readOnly
            style={getFlexStyle(isCheckBoxesOpened, .5)}
            type="checkbox"
            checked={checked} />
        {
            parts.map(item => {
                const key = item[0], value = item[1];
                return <div
                    className="words-table__cell"
                    style={getFlexStyle(value)}
                    key={word[key]}>{word[key]}</div>;
            })
        }
    </div>;

    function getFlexStyle(state, def = 1) {
        return state === true ? { flexGrow: def } : { flexGrow: "0" };
    }
}
