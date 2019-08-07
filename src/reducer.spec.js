import reducer from "./reducer.js";

const stateBefore = {
    items: {
        key1: { en: "a", isSelected: false },
        key2: { en: "b", isSelected: false },
        key3: { en: "c", isSelected: false }
    },
    modifiedItems: {
        key1: { en: "a", isSelected: false },
        key2: { en: "b", isSelected: true },
        key3: { en: "c", isSelected: true }
    },
    selected: {
        key1: { en: "a", isSelected: true },
        key2: { en: "b", isSelected: true }
    },
    selectionBuffer: {
        key3: { en: "c", isSelected: true }
    },
    totalItems: 3,
    activeTab: 0
}

describe("reducer", () => {
    it("UPDATE_ITEMS", () => {
        const action = {
            type: "UPDATE_ITEMS",
            payload: {
                items: {
                    key6: { en: "f", isSelected: false },
                    key7: { en: "g", isSelected: true }
                },
                totalItems: 20
            }
        };

        expect(reducer(stateBefore, action))
            .toEqual({
                ...stateBefore,
                items: {
                    key6: { en: "f", isSelected: false },
                    key7: { en: "g", isSelected: true },
                },
                totalItems: 20
            });
    })

    it("MODIFY_ITEMS", () => {
        const action = {
            type: "MODIFY_ITEMS"
        };

        expect(reducer(stateBefore, action))
            .toEqual({
                ...stateBefore,
                modifiedItems: {
                    key1: { en: "a", isSelected: true },
                    key2: { en: "b", isSelected: true },
                    key3: { en: "c", isSelected: true }
                }
            });
    })

    it("ADD_TO_SELECTION_BUFFER", () => {
        const action = {
            type: "ADD_TO_SELECTION_BUFFER",
            payload: {
                key: "key5",
                word: { en: "e", isSelected: false }
            }
        };

        const { key, word } = action.payload;

        expect(reducer(stateBefore, action))
            .toEqual({
                ...stateBefore,
                selectionBuffer: { [key]: word, ...stateBefore.selectionBuffer }
            });
    })

    it("COMBINE_SELECTED_WITH_BUFFER", () => {
        const action = {
            type: "COMBINE_SELECTED_WITH_BUFFER"
        }

        expect(reducer(stateBefore, action))
            .toEqual({
                ...stateBefore,
                selected: {
                    key1: { en: "a", isSelected: true },
                    key2: { en: "b", isSelected: true },
                    key3: { en: "c", isSelected: true }
                },
                selectionBuffer: {}
            });
    })

    it("REMOVE_SELECTED_BY_KEYS", () => {
        const action = {
            type: "REMOVE_SELECTED_BY_KEYS",
            payload: ["key1", "key2"]
        }

        expect(reducer(stateBefore, action))
            .toEqual({
                ...stateBefore,
                selected: {}
            });
    })
});
