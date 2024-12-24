import {createSlice} from "@reduxjs/toolkit";

const initialFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    console.log(favorites);
    try {
        const favorites = JSON.parse(localStorage.getItem("favorites"));
        if (!Array.isArray(favorites)) throw new Error("Invalid favorites format");
        return favorites.filter((item) => item && item._id);
    } catch (error) {
        console.error("Error loading favorites:", error);
        localStorage.setItem("favorites", JSON.stringify([]));
        return [];
    }
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: initialFavorites(),
    },
    reducers: {
        addToFavorites(state, action){
            const item = action.payload;
            if (item && item._id && !state.items.find((fav) => fav._id === item._id)) {
                state.items.push(item);
                localStorage.setItem("favorites", JSON.stringify(state.items));
            }
        },
        removeFromFavorites(state, action) {
            const updatedItems = state.items.filter((item) => item && item._id !== action.payload);
            state.items = updatedItems;
            localStorage.setItem("favorites", JSON.stringify(state.items));
        }
    }
});

export const { addToFavorites, removeFromFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;