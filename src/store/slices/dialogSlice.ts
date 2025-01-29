import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dialog, DialogState } from '../types/dialogTypes';

const initialState: DialogState = {
    isEnabled: false,
    title: '',
    content: null,
    buttons: []
};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        manageDialog: (state, action: PayloadAction<Dialog>) => {
            state.isEnabled = action.payload.isEnabled;
            state.title = action.payload.title;
            state.content = action.payload.content;
            state.buttons = action.payload.buttons;
        }
    },
});

export const { manageDialog } = dialogSlice.actions;
export default dialogSlice.reducer;