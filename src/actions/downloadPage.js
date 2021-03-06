import data from "../serverImitation/index.js";

export const downloadPage = (page, num) => dispatch => {
    let arr = Object.entries(data);
    const n = arr.length;
    const start = page * num;
    arr = arr.slice(start, start + num);

    const items = Object.fromEntries(arr);
    dispatch({ type: "UPDATE_ITEMS", payload: { items: items, totalItems: n } });
    dispatch({ type: "MODIFY_ITEMS" });
}