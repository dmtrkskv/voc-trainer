export const completeSelection = (save) => dispatch => {
    if (save) {
        dispatch({ type: "COMBINE_SELECTED_WITH_BUFFER" });
    } else {
        dispatch({ type: "CLEAR_SELECTION_BUFFER" });
        dispatch({ type: "MODIFY_ITEMS" });
    }
}