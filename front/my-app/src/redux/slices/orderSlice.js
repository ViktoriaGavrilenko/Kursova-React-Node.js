import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axiosInstance';

const API_URL = "http://localhost:5000/orders";

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axiosInstance.post(
                "/orders", orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (data && data._id) {
                return data;
            } else {
                console.error("Відповідь не має productId");
                return rejectWithValue("Не має orderId");
            }
        } catch (error) {
            console.error("Помилка при створенні замовлення:", error);
            return rejectWithValue(error.response?.data || "Не створено замовлення");
        }
    }
);

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axiosInstance.get("/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            if (!Array.isArray(data)) {
                return rejectWithValue("Невірный формат данних від сервера");
            }
            console.log("Відповідь від сервера при отриманні замовлень:", data);
            return data;
        } catch (error) {
            console.error("Помилка при отриманні замовлень:", error);
            return rejectWithValue(error.response?.data || "Не вдалось завантажити замовлення");
        }
    }
);
export const deleteOrder = createAsyncThunk("order/deletePrder",
    async (orderId, {rejectWithValue})=> {
        try {
            const token = localStorage.getItem("token");
            await axiosInstance.delete(`/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Відповідь від сервера при видаленні замовлень:", orderId);
            return orderId;
        } catch (error) {
            console.error("Помилка при видаленні замовленя:", error);
            return rejectWithValue(error.response?.data || "Не вдалось видалити");
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: [],
        isLoading: false,
        error: null,
        _id: null,
        searchQuery: '',
    },
    reducers: {
        clearOrderState: (state) => {
            state._id = null;
            state.status = null;
            state.error = null;
            state.order = null;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "succeeded";
                state._id = action.payload._id;
                state.order = action.payload;
                console.log("Відповідь від сервера при створенні замовлення:", action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "failed";
                state.error = action.payload || "Помилка при створенні замовлення";
            })
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "succeeded";
                state.order = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "failed";
                state.error = action.payload || "Помилка при завантаженні замовлень";
            })
            .addCase(deleteOrder.pending, (state)=>{
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.order = state.order.filter(order => order._id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearOrderState, setSearchQuery } = orderSlice.actions;
export default orderSlice.reducer;
