import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/products";

export const addCardAsync = createAsyncThunk('card/addProduct',
    async (item, {rejectWithValue}) => {
        try {
            const response = await axios.post(API_URL, item);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });
export const fetchCardAsync = createAsyncThunk('card/fetchProducts',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },

    reducers: {
        clearCard: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCardAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addCardAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(addCardAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCardAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCardAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchCardAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const {clearCard} = cardSlice.actions;
export default cardSlice.reducer;