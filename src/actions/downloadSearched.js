import data from "./serverImitation.js";

export const downloadSearched = (str, num) => dispatch => {
    let arr = Object.entries(data);

    str = str.toLowerCase().trim();
    const lang = /[A-Za-z]*/.test(str) ? "en" : "ru";

    const l = str.length;

    const prepareWord = word => {
        return word.toLowerCase().slice(0, l);
    }

    arr = arr.filter(item => prepareWord(item[1][lang]) === str);
    arr = arr.slice(0, num);

    const items = Object.fromEntries(arr);
    dispatch({ type: "UPDATE_ITEMS", payload: items });
    dispatch({ type: "MODIFY_ITEMS" });
}