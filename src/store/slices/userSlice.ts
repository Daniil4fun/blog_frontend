import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/userTypes";

const initialState: UserState = {
    username: '',
    id: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.username = action.payload.username;
            state.id = action.payload.id;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;