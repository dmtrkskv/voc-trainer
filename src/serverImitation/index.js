import data from "./data.js";

export default prepareDataObj(data);

function prepareDataObj(data) {
    let obj = {};
    data.forEach(item => {
        const key = item.en;
        item.isSelected = false;
        obj[key] = item;
    });
    return obj;
}