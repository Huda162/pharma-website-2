import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { addCartSlice } from "./cartSlice";
import persistStore from "redux-persist/es/persistStore";
import { favoriteSlice } from "./favoriteSlice";

const rootPersistConfig = {
    key: 'root',
    storage: storage
}
const cartPersistConfig = {
    key: 'cart',
    storage: storage
}

const favoritePersistConfig = {
    key: 'favorite',
    storage: storage
}
const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, addCartSlice.reducer),
    favorit: persistReducer(favoritePersistConfig, favoriteSlice.reducer)
})
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
