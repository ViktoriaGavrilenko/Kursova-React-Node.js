import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axiosInstance';

const API_URL = "http://localhost:5000/auth";

export const fetchRegisterUser = createAsyncThunk("auth/registerUser",
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("http://localhost:5000/auth/register", userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (credentials, {rejectWithValue}) => {
    try {
        const {data} = await axiosInstance.post(`${API_URL}/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        localStorage.setItem('token', data.token);
        return data.token;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const logoutUser = () => {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch(clearAuthData());
        dispatch(logout());
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token') || null,
        data: null,
        status: "idle",
        error: null,
    },
    reducers: {
        clearAuthData(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.data = null;
            state.status = "idle";
            state.error = null;
        },

        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.data = null;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('token');
        },
        loginUser: (state) => {
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.status = "loading";
            state.error = null;
        }).addCase(fetchUserData.fulfilled, (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
            state.isAuthenticated = true;
        }).addCase(fetchUserData.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;

        }).addCase(fetchRegisterUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        }).addCase(fetchRegisterUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(fetchRegisterUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    }
})

export const {clearAuthData,loginUser, logout} = authSlice.actions;
export default authSlice.reducer;