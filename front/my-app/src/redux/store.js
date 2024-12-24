import {configureStore} from '@reduxjs/toolkit';
import drawerReducer from "./slices/drawerSlice";
import cardReducer from "./slices/cardSlice";
import filterReducer from "./slices/filterSlice";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import favoritesReducer from "./slices/favoritesSlice";

const store = configureStore({
    reducer: {
        card: cardReducer,
        drawer: drawerReducer,
        filter: filterReducer,
        auth: authReducer,
        order: orderReducer,
        favorites: favoritesReducer
    },
});

export default store;
