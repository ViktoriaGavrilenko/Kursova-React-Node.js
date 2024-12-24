import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: 'Усі',
    searchQuery: ''
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
});

export const { setCategory, setSearchQuery } = filterSlice.actions;

export default filterSlice.reducer;
