import data from "./serverImitation.js";

export const downloadRandom = num => dispatch => {
    let arr = Object.entries(data);

    arr = arr.sort(() => Math.random() - .5);
    arr = arr.slice(0, num);

    const items = Object.fromEntries(arr);
    dispatch({ type: "UPDATE_ITEMS", payload: items });
    dispatch({ type: "MODIFY_ITEMS" });
}