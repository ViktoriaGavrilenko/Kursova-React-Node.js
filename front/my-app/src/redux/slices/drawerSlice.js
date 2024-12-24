import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const API_URL="http://localhost:5000/drawer";

export const fetchDrawer = createAsyncThunk('drawers/fetchDrawers', async ()=>{
    const response = await axios.get(API_URL);
    return response.data;
});
export const saveDrawer = createAsyncThunk('drawers/saveDrawer', async(card)=>{
    const response = await axios.post(`${API_URL}/add`, {card});
    return response.data;
})

export const addToDrawer = createAsyncThunk('drawers/addToDrawer', async (card)=>{
    const response = await axios.post(API_URL, card);
    return response.data;
});

export const removeFromDrawer = createAsyncThunk('drawers/removeFromDrawer', async(_id)=>{
   await axios.delete(`${API_URL}/remove/${_id}`);
   return _id;
});

const drawerSlice = createSlice({
    name: 'drawer',
    initialState:{
        items:[],
        isOpen: false, // открыта ли корзина
        totalPrice: 0,
        status: null,
        loading: false,
        error: null
    },
    reducers: {
        addToDrawerSync: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i._id === item._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({...item, quantity: 1});
            }
            state.totalPrice += item.price;
        },
        removeFromDrawerSync: (state, action) => {
            const itemId = action.payload;
            const itemIndex = state.items.findIndex((i) => i._id === itemId);
            if (itemIndex !== -1) {
                state.totalPrice -= state.items[itemIndex].price * state.items[itemIndex].quantity;
                state.items.splice(itemIndex, 1);
            }
        },
        clearDrawer: (state) => {
            state.items = [];
            state.totalPrice = 0;

        },
        toggleDrawer: (state) => {
            state.isOpen = !state.isOpen;
        },
        closeDrawer: (state) => {
            state.isOpen = false;
        },
        openDrawer: (state) => {
            state.isOpen = true;
        },
        resetAddedStatus: (state) => {
            state.items.forEach(item => {
                item.isAdded = false;
            });
        },
    },
    extraReducers: (builder)=>{
         builder.addCase(fetchDrawer.pending, (state)=> {
             state.loading = true;
             state.error = null;
         }).addCase(fetchDrawer.fulfilled,(state, action)=>{
             state.items = action.payload.items;
             state.totalPrice = action.payload.totalPrice;
             state.loading = false;
             state.status = "succeeded";
         }).addCase(fetchDrawer.rejected, (state, action)=>{
             state.error = action.error.message || "Помилка у додаванні у корзину";
             state.loading = false;

         }).addCase(saveDrawer.pending, (state)=>{
             state.loading = true;
             state.error = null;
         }).addCase(saveDrawer.fulfilled, (state, action)=>{
            state.items = action.payload.items;
            state.totalPrice = action.payload.totalPrice;
            state.loading = false;
            state.error = null;
         }).addCase(saveDrawer.rejected, (state, action)=> {
             state.error = action.error.message || "Помилка у додаванні у корзину";
             state.loading = false;

         }).addCase(addToDrawer.pending, (state,action)=>{
             state.loading = true;
             state.error = null;
         }).addCase(addToDrawer.fulfilled,(state,action)=> {
             const item = action.payload;
             const existingItem = state.items.find((i) => i._id === item._id);
             if (existingItem) {
                 existingItem.quantity += 1;
             } else {
                 state.items.push({ ...item, quantity: 1 });
             }
             state.totalPrice += item.price;
             state.loading = false;
             state.error = null;
         }).addCase(addToDrawer.rejected, (state, action)=>{
             state.error = action.error.message || "Помилка у додаванні у корзину";
             state.loading = false;

         }).addCase(removeFromDrawer.pending, (state, action)=>{
             state.loading = true;
             state.error = null;
         }).addCase(removeFromDrawer.fulfilled, (state, action)=>{
             state.items = state.items.filter((item)=> item._id !== action.payload);
             state.loading = false;
             state.error = null;
         }).addCase(removeFromDrawer.rejected, (state, action)=>{
             state.error = action.error.message;
             state.loading = false;
         })
    },
});
console.log(drawerSlice)
export const { addToDrawerSync, removeFromDrawerSync, clearDrawer, closeDrawer, openDrawer, toggleDrawer, resetAddedStatus } = drawerSlice.actions
export default drawerSlice.reducer
