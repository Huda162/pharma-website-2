import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        items: []
    },
    reducers: {
        addFavorite: (state, action) => {
            const existItemIndex = state.items.findIndex(item => item.id === action.payload.newItem.id);
            if (existItemIndex !== -1) {
                state.items[existItemIndex].quantity += 1;
            } else {
                state.items.push({ ...action.payload.newItem, quantity: 1 });
            }
        },
        removeFavorite: (state, action) => {
            return { ...state, items: state.items.filter((_, index) => index !== action.payload) }
        },
        decrementFavorite: (state, action) => {
            if (state.items[action.payload].quantity > 1) {
                state.items[action.payload].quantity -= 1
            }
        },
        changeFavoriteQuantity: (state, action) => {
            state.items[index].quantity = action.payload
        }
    }
});
export const { addFavorite, removeFavorite, decrementFavorite, changeFavoriteQuantity } = favoriteSlice.actions;
export default favoriteSlice.reducer