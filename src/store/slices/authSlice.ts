import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/authTypes";

const initialState: AuthState = {
    isAuth: Boolean(localStorage.getItem('token'))
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.isAuth = true;
            localStorage.setItem('token', action.payload)
        },
        setLogout: (state) => {
            state.isAuth = false;
            localStorage.clear();
        }
    }
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;