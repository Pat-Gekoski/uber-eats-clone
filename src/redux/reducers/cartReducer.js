const defaultState = {
   selectedItems: [],
}

const addItem = (state, item) => {
   const rest = state.selectedItems.find((r) => r.restaurantName === item.restaurantName)

   if (rest) {
      const updatedItems = [...rest.items, item]
      const updatedCart = state.selectedItems.map((item) => {
         if (item.restaurantName === rest.restaurantName) {
            return { restaurantName: item.restaurantName, items: updatedItems }
         }
         return item
      })
      return { ...state, selectedItems: updatedCart }
   } else {
      const newRestItem = { items: [item], restaurantName: item.restaurantName }
      const updatedStateItems = [...state.selectedItems, newRestItem]
      return { ...state, selectedItems: updatedStateItems }
   }
}

const removeItem = (state, item) => {
   const rest = state.selectedItems.find((r) => r.restaurantName === item.restaurantName)

   if (rest) {
      const updatedItems = rest.items.filter((food) => food.title !== item.title)
      if (updatedItems.length <= 0) {
         const updatedItems = state.selectedItems.filter(
            (item) => item.restaurantName !== rest.restaurantName
         )
			return {...state, selectedItems: updatedItems}
      } else {
         const updatedCart = state.selectedItems.map((item) => {
            if (item.restaurantName === rest.restaurantName) {
               return { restaurantName: item.restaurantName, items: updatedItems }
            }
         })
			return { ...state, selectedItems: updatedCart }
      }
   } else {
      return state
   }
}

const cartReducer = (state = defaultState, action) => {
   switch (action.type) {
      case 'ADD_TO_CART': {
         return addItem(state, action.payload)
      }
      case 'REMOVE_FROM_CART': {
         return removeItem(state, action.payload)
      }
      default:
         return state
   }
}

export default cartReducer
