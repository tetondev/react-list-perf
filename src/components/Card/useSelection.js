import { useCallback, useReducer } from 'react'

function selectionReducer(state, action) {
  const { selectableItems, selectedItems } = state
  switch (action.type) {
    case 'clear':
      return {
        selectableItems: selectableItems.map((selectedItem) =>
          selectedItem.selected ? { ...selectedItem, selected: false } : selectedItem
        ),
        selectedItems: [],
      }
    case 'updateSelected': {
      const selectedIndex = selectableItems.findIndex((selectedItem) => selectedItem.id === action.id)
      if (selectedIndex < 0) return state
      let updatedSelection = []

      if (action.shiftClick && selectedItems.length) {
        let lowestIndex = selectableItems.indexOf(selectedItems[0])
        let highestIndex = selectableItems.indexOf(selectedItems[selectedItems.length - 1])
        // Remove range if lowest/highest selected item is shift-clicked
        if (
          selectableItems[selectedIndex].selected &&
          (selectedIndex === lowestIndex || selectedIndex === highestIndex)
        ) {
          lowestIndex = selectedIndex
          highestIndex = selectedIndex
        }
        // Include selectableItems preceding the selected range
        if (selectedIndex < lowestIndex) lowestIndex = selectedIndex
        // Reduce the selected range
        if (selectedIndex > lowestIndex) highestIndex = selectedIndex

        updatedSelection = [
          ...selectableItems.slice(0, lowestIndex).map((selectedItem) => ({ ...selectedItem, selected: false })),
          ...selectableItems
            .slice(lowestIndex, highestIndex + 1)
            .map((selectedItem) => ({ ...selectedItem, selected: true })),
          ...selectableItems.slice(highestIndex + 1).map((selectedItem) => ({ ...selectedItem, selected: false })),
        ]
      } else {
        const currentSelection = selectableItems[selectedIndex]
        updatedSelection = [
          ...selectableItems.slice(0, selectedIndex),
          { ...currentSelection, selected: !currentSelection.selected },
          ...selectableItems.slice(selectedIndex + 1),
        ]
      }
      return {
        ...state,
        selectableItems: updatedSelection,
        selectedItems: updatedSelection.filter((selectedItem) => selectedItem.selected),
      }
    }
    default:
      throw new Error(`Unknown Action type: ${action.type}`)
  }
}

export default function useSelection({ initialItems, selectableDefault = false }) {
  const [{ selectableItems, selectedItems }, dispatch] = useReducer(selectionReducer, {
    selectedItems: [],
    selectableItems: initialItems,
    selectable: selectableDefault,
  })

  const updateSelectedStatus = useCallback((id, shiftClick = false) => {
    dispatch({ type: 'updateSelected', id, shiftClick })
  }, [])

  return {
    selectableItems,
    selectedItems,
    updateSelectedStatus,
  }
}
