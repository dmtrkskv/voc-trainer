export const selectWord = (key, word) => dispatch => {
    const clonedWord = clone(word);
    clonedWord.isSelected = !word.isSelected;
    dispatch({ type: "ADD_TO_SELECTION_BUFFER", payload: { key: key, word: clonedWord } });
    dispatch({ type: "MODIFY_ITEMS" });
}