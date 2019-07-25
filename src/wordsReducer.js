const initialState = { items: {}, modifiedItems: {}, selected: {}, selectionBuffer: {} };

export default function wordsReducer(state = initialState, action) {
    const { items, selected, selectionBuffer } = state;

    if (action.type === "UPDATE_ITEMS") {
        return { ...state, items: action.payload };

    } else if (action.type === "MODIFY_ITEMS") {
        let modifiedNewItems = {};
        const newItems = items;

        for (let key in newItems) {
            let value = newItems[key];

            [selected, selectionBuffer].forEach(obj => {
                if (obj[key]) {
                    value = obj[key];
                }
            });

            modifiedNewItems[key] = value;
        }
        return { ...state, modifiedItems: clone(modifiedNewItems) };

    } else if (action.type === "ADD_TO_SELECTION_BUFFER") {
        const { key, word } = action.payload;

        let s = clone(selectionBuffer);
        const isSelected = word.isSelected;

        if (selected[key] &&
            selected[key].isSelected === isSelected) {
            // удаляем элемент из буфера, если он дублирует то, что уже есть
            delete s[key];
        } else {
            s[key] = word;
        }
        return { ...state, selectionBuffer: s };

    } else if (action.type === "COMBINE_SELECTED_WITH_BUFFER") {
        const s1 = clone(selected);
        const s2 = selectionBuffer;

        for (let key in s2) {
            const value = s2[key];
            if (value.isSelected === false) {
                delete s1[key];
            } else if (value.isSelected === true) {
                s1[key] = value;
            }
        }
        return { ...state, selected: s1, selectionBuffer: {} };

    } else if (action.type === "CLEAR_SELECTION_BUFFER") {
        return { ...state, selectionBuffer: {} };

    } else if (action.type === "REMOVE_SELECTED_BY_KEYS") {
        let s = clone(selected);

        action.payload.forEach(key => {
            delete s[key];
        });
        return { ...state, selected: s };
    }
    return state;
}
