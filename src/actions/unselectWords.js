export const unselectWords = (keys) => dispatch => {
    dispatch({ type: "REMOVE_SELECTED_BY_KEYS", payload: keys });
    dispatch({ type: "MODIFY_ITEMS" });
}